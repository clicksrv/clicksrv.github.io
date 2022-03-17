import { useDispatch, useSelector } from 'react-redux'

import api from '../services/api'
import history from '../services/history'
import notify from '../services/notify'
import { dateFromISOString, dateToISOString } from '../helpers/dates'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import DowngradeFlow from './DowngradeFlow'

const AccountDowngrade = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user)

  const onSubscriptionCanceled = (data) => {
    // set updated `user` in store
    dispatch({
      type: 'SETTINGS::PATCH',
      data: data.user,
    })

    notify.success(t('your_subscription_canceled'))

    history.push('/account')
  }

  const onError = () => notify.error(t('downgrade_account_error'))

  const cancelSubscription = ({ reason, feedback }) => {
    trackEvent('canceled-subscription', 'interaction')

    api.cancelSubscription(reason, feedback).then(onSubscriptionCanceled).catch(onError)
  }

  return (
    <DowngradeFlow
      title={t('downgrade_account')}
      actionText={t('downgrade_on', {
        date: dateToISOString(dateFromISOString(user.current_subscription.current_period_ends_at)),
      })}
      onComplete={cancelSubscription}
    />
  )
}

export default AccountDowngrade
