import cookies from 'js-cookie'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import events from '../services/events'
import history from '../services/history'
import publicPaths from '../helpers/publicPaths'
import useLocationHistory from '../hooks/useLocationHistory'
import useOnboarding from '../hooks/useOnboarding'
import usePricing from '../hooks/usePricing'
import useQuery from '../hooks/useQuery'
import useUtm from '../hooks/useUtm'
import { createCv } from '../helpers/cv'
import { localStorage } from '../services/localstorage'
import { trackEvent, trackPageView } from '../helpers/analytics'

import LoadingSpinner from './LoadingSpinner'

const Container = styled.article`
  background-color: #eee;

  display: flex;
  flex-direction: column;

  min-height: 100vh;
  position: relative;
`

const Root = ({ children }) => {
  const [loading, setLoading] = useState(false)

  const user = useSelector((state) => state.session.user)
  const token = useSelector((state) => state.session.token)

  const location = useLocation()
  const { pathname, search } = location

  const query = useQuery()
  const { coupon, event, plan, referrer } = query

  const { utmSource, utmMedium, storeUtmSource, storeUtmMedium } = useUtm()

  const { monthlyPlan, quarterlyPlan } = usePricing()

  const { pushLocation } = useLocationHistory()

  const { onboarding, setOnboardingLinkedIn, startCheckoutOnboarding, startOnboarding, synchronizeOnboardingStep } =
    useOnboarding()

  const signedUp = event === 'signup'
  const signedIn = event === 'signin'

  const cvSample = localStorage.getItem('vcv_sample')
  const sample = cvSample || query.sample

  const returnTo = localStorage.getItem('vcv_return_to')

  const path = `${pathname}${search}`

  // plan and coupon cookies will be valid only for a week
  const storePlanAndCoupon = () => {
    // exclude common plans
    if (plan && ![monthlyPlan, quarterlyPlan].includes(plan)) {
      cookies.set('vcv_plan', plan, { expires: 7 })
    }

    if (coupon) {
      cookies.set('vcv_coupon', coupon, { expires: 7 })
    }
  }

  const storeReturnTo = () => localStorage.setItem('vcv_return_to', path)
  const clearReturnTo = () => localStorage.removeItem('vcv_return_to')

  const storeLocation = () => pushLocation(pathname, search)

  const createResume = () => {
    setLoading(true)

    const method = sample ? 'sample' : 'blank'
    const type = 'resume'

    const params = { type }

    if (sample) {
      params.slug = sample
    }

    const onCreatedOrError = () => {
      setLoading(false)

      localStorage.removeItem('vcv_sample')
    }

    createCv(method, params).then(onCreatedOrError).catch(onCreatedOrError)
  }

  const handleSignup = () => {
    const corporateSignup = user.company_id

    if (corporateSignup) {
      if (user.latest_cv_id) {
        // backend has already created a company CV for this user
        history.replace(`/cvs/${user.latest_cv_id}`)
      } else {
        // fallback just in case (should not reach here)
        createResume()
      }
    } else {
      if (user.linkedin) {
        setOnboardingLinkedIn()
      }

      trackEvent('started-onboarding', 'interaction')

      startOnboarding()
    }
  }

  useEffect(() => {
    trackPageView(user, path)
  }, [path])

  // separate effect so that it's counted only once
  useEffect(() => {
    if (signedUp) {
      trackEvent('signed-up', 'interaction')
    }
  }, [signedUp])

  // separate effect so that it's counted only once
  useEffect(() => {
    if (signedIn) {
      trackEvent('logged-in', 'interaction')
    }
  }, [signedIn])

  // synchronize current path with onboarding step
  // (i.e. Browser's back button support)
  useEffect(() => {
    if (onboarding) {
      synchronizeOnboardingStep(pathname)
    }
  }, [pathname, onboarding])

  // store UTM source as soon as you see it
  useEffect(() => {
    storeUtmSource()
  }, [utmSource])

  // store UTM medium as soon as you see it
  useEffect(() => {
    storeUtmMedium()
  }, [utmMedium])

  useEffect(() => {
    if (referrer) {
      // referrer in cookie is required for OmniAuth company signups
      cookies.set('vcv_referrer', referrer, { expires: 7 }) // days
    }
  }, [referrer])

  useEffect(() => {
    // user is unauthenticated
    if (!token) {
      if (pathname === '/checkout') {
        storeReturnTo()
        storePlanAndCoupon()

        history.push('/signup')
      } else if (query.sample) {
        // 'Use this sample' flow
        localStorage.setItem('vcv_sample', query.sample)

        history.push('/signup')
      } else if (pathname === '/') {
        // root redirect (for unauthenticated users)
        history.push('/login')
      } else if (!publicPaths.includes(pathname)) {
        // all other non-public pages
        storeReturnTo()

        history.push('/login')
      }
    }

    // get user if we have token in store (i.e. user is authenticated)
    if (token && !user) {
      events.emit('USER::GET')
    }

    // the reason those redirects are handled in a separate Root component is
    // because route change detection in Router (due to its async nature)
    // sometimes fires on "authenticated" paths, without `user` in store;
    // with separate component we can "wait" until user is available
    if (!user) {
      return
    }

    // 'Use this sample' flow for authenticated users
    if (query.sample) {
      createResume()

      return
    }

    // user just signed in
    if (signedIn) {
      if (cvSample) {
        createResume()
      } else if (returnTo) {
        clearReturnTo()

        history.replace(returnTo)
      } else {
        history.replace('/cvs')
      }

      return
    }

    // user just signed up
    if (signedUp) {
      if (cvSample) {
        createResume()
      } else if (returnTo) {
        // unauthenticated user landed on /upgrade or /checkout, now he signed
        // up, so start a special signup funnel
        if (returnTo.startsWith('/upgrade') || returnTo.startsWith('/checkout')) {
          clearReturnTo()

          startCheckoutOnboarding()

          return
        }

        // otherwise clear returnTo value as we won't be redirecting to it
        // during the onboarding funnel
        clearReturnTo()

        handleSignup()

        return
      } else {
        handleSignup()

        return
      }
    }

    // root redirect for authenticated users (direct url manipulation)
    if (pathname === '/' && !sample) {
      history.replace('/cvs')

      return
    }

    if (pathname !== '/') {
      storeLocation()
    }
  }, [user, location])

  return (
    <Container>
      {loading && <LoadingSpinner />}

      {!loading && children}
    </Container>
  )
}

Root.propTypes = {
  children: PropTypes.node,
}

export default Root
