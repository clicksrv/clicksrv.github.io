import api from '../services/api'
import events from '../services/events'
import notify from '../services/notify'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import DowngradeFlow from './DowngradeFlow'

const AccountDelete = (props) => {
  const onAccountClosed = () => {
    events.emit('SESSION::LOGOUT')

    notify.success(t('your_account_deleted'))
  }

  const onError = () => notify.error(t('delete_account_error'))

  const deleteAccount = ({ reason, feedback }) => {
    trackEvent('deleted-account', 'interaction')

    api.deleteAccount(reason, feedback).then(onAccountClosed).catch(onError)
  }

  return (
    <DowngradeFlow
      title={t('delete_account')}
      actionText={t('delete_my_account')}
      onComplete={deleteAccount}
      deleteAccount={true}
      {...props}
    />
  )
}

export default AccountDelete
