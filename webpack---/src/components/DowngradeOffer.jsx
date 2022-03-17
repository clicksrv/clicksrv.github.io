import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import api from '../services/api'
import conf from '../conf'
import history from '../services/history'
import notify from '../services/notify'
import { black, primaryCta, redDanger } from '../colors'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'
import { usedDowngradeOffer } from '../helpers/user'

import FeaturesCard from './FeaturesCard'
import PageParagraph from './PageParagraph'
import PageTitle from './PageTitle'
import { Btn } from './styled/Button'

const Container = styled.div`
  margin: 0 auto;
  max-width: 850px;
  padding-bottom: 40px;
`

const Offers = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  margin: 60px auto 0;
  max-width: 730px;
  padding: 0 20px 10px;
`

const FeaturesCardSubtitle = styled.p`
  color: ${(props) => (props.featured ? primaryCta : black)};
  font-size: 48px;
  font-weight: 550;

  margin: 8px 20px 0;
`

const Cents = styled.span`
  font-size: 35px;
`

const Period = styled.span`
  color: #aaa;
  font-size: 18px;
  font-weight: 300;

  margin-left: 3px;
`

const Incentive = styled.p`
  color: #aeaeae;
  font-size: 14px;
  font-weight: 300;

  margin-top: ${(props) => (props.bottom ? '5px' : '0')};
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: ${(props) => (props.bottom ? '0' : '20px')};
`

const UpgradeButton = styled(Btn)`
  && {
    font-size: 15px;
    font-weight: 550;
    border-radius: 4px;
    border-width: 2px;

    display: inline-block;
    margin: 15px 25px 10px;
    padding: 15px 70px;
  }
`

const Error = styled.p`
  && {
    color: ${redDanger};
    font-size: 13px;

    margin: 0 0 30px;
  }
`

const DowngradeOffer = () => {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const user = useSelector((state) => state.session.user)

  const dispatch = useDispatch()

  useEffect(() => trackEvent('viewed-downgrade-offer-page', 'pageview'), [])

  const { pathname } = useLocation()
  const { downgradePlans } = conf

  const downgradeFlow = pathname.match(/downgrade/)
  const deleteFlow = pathname.match(/delete/)

  if (!user) {
    return null
  }

  // if user is already on one of the Downgrade plans, don't display this offer
  if (usedDowngradeOffer(user)) {
    const redirectUrl = downgradeFlow ? '/account/downgrade' : '/account/delete'

    history.push(redirectUrl)

    return null
  }

  const onSubscriptionChanged = (data) => {
    setSubmitting(false)

    const { user } = data

    // set updated `user` in store
    dispatch({
      type: 'SETTINGS::PATCH',
      data: user,
    })

    // plan switch will be reflected on the next billing cycle
    const currentSubscription = user.current_subscription
    const plan = currentSubscription.pending_plan_code || currentSubscription.plan_code

    const eventValue = plan === downgradePlans.oneYear ? 99 : 199

    trackEvent('used-downgrade-offer', 'transaction', eventValue, { plan })

    history.push(`/thank-you?plan=${plan}`)
  }

  const onError = (error) => {
    setSubmitting(false)

    setError(error.message)

    notify.error(t('upgrade_error'))
  }

  const onSubscriptionApiError = (error) => {
    if (error?.response?.data) {
      // most likely a handled 422 error
      onError(error.response.data)
    } else {
      // generic error
      onError(error.message)
    }
  }

  const changeSubscription = (planCode) => {
    setSubmitting(true)

    api.changeSubscription(planCode).then(onSubscriptionChanged).catch(onSubscriptionApiError)
  }

  const upgradeToOneYearPlan = (e) => {
    e.preventDefault()

    changeSubscription(downgradePlans.oneYear)
  }

  const upgradeToThreeYearPlan = (e) => {
    e.preventDefault()

    changeSubscription(downgradePlans.threeYears)
  }

  return (
    <Container>
      <PageTitle>{t('downgrade_headline')}</PageTitle>
      <PageParagraph as="h2">{t('best_job_opportunities')}</PageParagraph>
      <PageParagraph as="h3">{t('upgrade_to_get_biggest_savings')}</PageParagraph>

      <Offers>
        <FeaturesCard
          small
          to={pathname}
          onClick={upgradeToOneYearPlan}
          title={t('one_year_plan')}>
          <FeaturesCardSubtitle>
            $8
            <Cents>.25</Cents>
            <Period>/{t('month')}</Period>
          </FeaturesCardSubtitle>

          <Incentive>({t('one_year_billed_for')})</Incentive>

          <UpgradeButton
            big
            cta
            hollow
            className="one-year"
            disabled={submitting}>
            {t('upgrade_now')}
          </UpgradeButton>

          <Incentive bottom>{t('save_with_one_year_plan')}</Incentive>
        </FeaturesCard>

        <FeaturesCard
          small
          featured
          to={pathname}
          onClick={upgradeToThreeYearPlan}
          heading={t('best_value')}
          title={t('three_year_plan')}>
          <FeaturesCardSubtitle featured>
            $5
            <Cents>.53</Cents>
            <Period>/{t('month')}</Period>
          </FeaturesCardSubtitle>

          <Incentive>({t('three_years_billed_for')})</Incentive>

          <UpgradeButton
            big
            cta
            className="three-years"
            disabled={submitting}>
            {t('upgrade_now')}
          </UpgradeButton>

          <Incentive bottom>{t('save_with_three_year_plan')}</Incentive>
        </FeaturesCard>
      </Offers>

      {error && <Error>{error}</Error>}

      {downgradeFlow && (
        <p>
          <Link to="/account/downgrade">{t('cancel_my_subscription')}</Link>
        </p>
      )}

      {deleteFlow && (
        <p>
          <Link to="/account/delete">{t('permanently_delete_my_account')}</Link>
        </p>
      )}
    </Container>
  )
}

export default DowngradeOffer
