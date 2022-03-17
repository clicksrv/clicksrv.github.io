import Formsy from 'formsy-react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import api from '../../services/api'
import capitalize from '../../helpers/capitalize'
import conf from '../../conf'
import history from '../../services/history'
import notify from '../../services/notify'
import { dateFromISOString, dateToISOString } from '../../helpers/dates'
import { t } from '../../locales'
import { usedDowngradeOffer } from '../../helpers/user'

import Input from '../forms/input'
import Modal from '../Modal'
import SectionTitle from '../SectionTitle'

const SubscriptionModal = (props) => {
  const dispatch = useDispatch()

  const { user, pathname } = props

  if (!user) {
    return null
  }

  const onSubscriptionReactivated = (data) => {
    // set updated `user` in store
    dispatch({
      type: 'SETTINGS::PATCH',
      data: data.user,
    })

    notify.success(t('your_subscription_reactivated'))

    history.push(pathname)
  }

  const onError = () => notify.error(t('reactivate_subscription_error'))

  const reactivateSubscription = () => api.reactivateSubscription().then(onSubscriptionReactivated).catch(onError)

  const downgradeLink = usedDowngradeOffer(user) ? '/account/downgrade' : '/account/downgrade/offer'

  const paidTier = user.paid_tier
  const currentSubscription = user.current_subscription
  const subscriptionActive = currentSubscription?.state === 'active'
  const currentPlanName = currentSubscription?.plan_name || capitalize(user.tier)
  const currentPlanCode = currentSubscription?.plan_code
  const pendingPlanName = currentSubscription?.pending_plan_name
  const onLifetimePlan = currentPlanCode === conf.discontinuedDowngradePlans.lifetime

  return (
    <Modal
      maxWidth={680}
      closeUrl={pathname}
      {...props}>
      <SectionTitle>{t('subscription')}</SectionTitle>

      <Formsy>
        <Input
          name="current_plan"
          label={t('current_plan')}
          disabled
          value={currentPlanName}
        />

        {paidTier &&
          !onLifetimePlan &&
          (subscriptionActive ? (
            <>
              {pendingPlanName ? (
                <div>
                  <p>
                    {t('changing_plan_info')}{' '}
                    {dateToISOString(dateFromISOString(currentSubscription.current_period_ends_at))}:
                  </p>
                  <Input
                    name="pending_plan"
                    disabled
                    value={pendingPlanName}
                  />
                </div>
              ) : (
                <div>
                  <p>
                    {t('active_plan_info1')} <strong style={{ color: '#00C021' }}>{t('active').toLowerCase()}</strong>{' '}
                    {t('active_plan_info2')}:
                  </p>
                  <Input
                    name="period_end"
                    disabled
                    value={
                      currentSubscription?.current_period_ends_at &&
                      dateToISOString(dateFromISOString(currentSubscription.current_period_ends_at))
                    }
                  />
                </div>
              )}

              <p style={{ textAlign: 'right', marginTop: 5 }}>
                <Link to={downgradeLink}>{t('downgrade_account')}</Link>
              </p>
            </>
          ) : (
            <>
              <p>
                {t('cancelled_plan_info1')} <strong style={{ color: '#e55' }}>{t('cancelled').toLowerCase()}</strong>{' '}
                {t('cancelled_plan_info2')}:
              </p>
              <Input
                name="period_end"
                disabled
                value={dateToISOString(dateFromISOString(currentSubscription.current_period_ends_at))}
              />
              <p style={{ textAlign: 'right', marginTop: 5 }}>
                <a onClick={reactivateSubscription}>{t('resubscribe')}</a>
              </p>
            </>
          ))}

        {onLifetimePlan && (
          <p>
            {t('active_plan_info1')} <strong style={{ color: '#00C021' }}>{t('active').toLowerCase()}</strong>.
          </p>
        )}
      </Formsy>
    </Modal>
  )
}

SubscriptionModal.propTypes = {
  pathname: PropTypes.string,
  user: PropTypes.object,
  isOpen: PropTypes.bool,
}

export default SubscriptionModal
