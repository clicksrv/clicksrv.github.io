import cookies from 'js-cookie'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import api from '../services/api'
import history from '../services/history'
import notify from '../services/notify'
import usePricing from '../hooks/usePricing'
import useOnboarding from '../hooks/useOnboarding'
import useQuery from '../hooks/useQuery'
import { greyLightest, mint } from '../colors'
import { media } from './styled/Grid'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import BillingInfo from './BillingInfo'
import CheckoutPlanCard from './CheckoutPlanCard'
import CheckoutTitle from './CheckoutTitle'
import CheckoutTestimonial from './CheckoutTestimonial.jsx'
import LoadingSpinner from './LoadingSpinner'
import CheckoutGuarantee from './CheckoutGuarantee.jsx'
import OnboardingFunnelProgress from './OnboardingFunnelProgress'

const Container = styled.div`
  padding-top: ${({ onboarding }) => (onboarding ? 5 : 0)}px;

  ${media.md`
    border-top: ${({ onboarding }) => (onboarding ? `1px solid ${greyLightest}` : 'none')};

    margin-top: ${({ onboarding }) => (onboarding ? 60 : 0)}px;
    padding-top: ${({ onboarding }) => (onboarding ? 15 : 0)}px;
  `}
`

const FunnelProgress = styled(OnboardingFunnelProgress)`
  margin: 0;
`

const Cart = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Testimonial = styled.div`
  flex: 1 1 370px;

  margin: 0 auto 30px;
  padding: calc(var(--nav-bar-height) + 20px) 30px 0;

  ${media.md`
    padding-top: calc(var(--nav-bar-height) + 40px);
  `}
`

const PaymentWrapper = styled.div`
  background-color: ${mint};

  flex: 1 1 460px;

  min-height: 100vh;
  padding: 15px 15px 30px;

  ${media.xs`
    padding-left: 20px;
    padding-right: 20px;
  `}

  ${media.sm`
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
  `}

  ${media.md`
    padding-top: calc(var(--nav-bar-height) + 50px);
  `}
`

const PaymentDetails = styled.div`
  margin: 0 auto;
  max-width: 530px;

  ${media.xl`
    margin-left: 50px;
  `}
`

const FeaturedPlans = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;

  margin-bottom: 40px;

  ${media.xs`
    flex-direction: row;
    gap: 20px;
  `}

  ${media.sm`
    gap: 40px;
  `}
`

const Checkout = () => {
  const user = useSelector((state) => state.session.user)
  const query = useQuery()

  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState(null)
  const [upgraded, setUpgraded] = useState(false)

  const { onboarding } = useOnboarding()
  const { monthlyAmount, quarterlyMonthlyAmount, monthlyPlan, quarterlyPlan } = usePricing()

  const plan = query.plan || cookies.get('vcv_plan') || quarterlyPlan
  const coupon = query.coupon || cookies.get('vcv_coupon')

  const onApiError = () => {
    setLoading(false)

    notify.error(t('cart_loading_error'))
  }

  useEffect(() => {
    const event = onboarding ? 'viewed-onboarding-checkout-page' : 'viewed-checkout-page'

    trackEvent(event, 'pageview')
  }, [onboarding])

  useEffect(() => {
    // We handle free tier users redirect in here so that we can properly
    // redirect upgraded user to the `/thank-you` page once they upgrade before
    // `freeUsers` Route prop kicks in and ignores our redirect
    if (user.paid_tier && !upgraded) {
      history.replace('/')
    }
  }, [user, upgraded])

  useEffect(() => {
    api
      .getCart(plan, coupon)
      .then(setCart)
      .then(() => setLoading(false))
      .catch(onApiError)
  }, [plan, coupon])

  const showFeaturedPlans = [monthlyPlan, quarterlyPlan].includes(plan)

  return (
    <Container onboarding={onboarding}>
      <FunnelProgress />

      <Cart>
        <Testimonial>
          <CheckoutTestimonial />
        </Testimonial>

        <PaymentWrapper>
          {loading && <LoadingSpinner />}

          {!loading && cart && (
            <PaymentDetails>
              {showFeaturedPlans && (
                <>
                  <CheckoutTitle>{t('choose_frequency')}</CheckoutTitle>

                  <FeaturedPlans>
                    <CheckoutPlanCard
                      selected={plan === quarterlyPlan}
                      plan={quarterlyPlan}
                      coupon={coupon}
                      title={t('best_pricing')}
                      amount={`$${quarterlyMonthlyAmount}`}
                      subtext={t('billed_quarterly')}
                      onClick={() => setLoading(true)}
                      quarterly
                    />

                    <CheckoutPlanCard
                      selected={plan === monthlyPlan}
                      plan={monthlyPlan}
                      coupon={coupon}
                      title={t('flex_pricing')}
                      amount={`$${monthlyAmount}`}
                      subtext={t('billed_monthly')}
                      onClick={() => setLoading(true)}
                    />
                  </FeaturedPlans>
                </>
              )}

              <CheckoutTitle>{t('your_payment_details')}</CheckoutTitle>

              <BillingInfo
                cart={cart}
                couponCode={cart.coupon_code}
                loading={loading}
                planCode={cart.plan_code}
                setUpgraded={setUpgraded}
                total={cart.total}
              />

              <CheckoutGuarantee />
            </PaymentDetails>
          )}
        </PaymentWrapper>
      </Cart>
    </Container>
  )
}

export default Checkout
