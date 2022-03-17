import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import useQuery from '../../hooks/useQuery'
import { greyDarker, primary } from '../../colors'
import { t } from '../../locales'
import { usedDowngradeOffer } from '../../helpers/user'

import Profile from './Profile'
import SubscriptionModal from './SubscriptionModal'

const Container = styled.div`
  max-width: 930px;
  margin: 0 auto;
`

const ExtraInfo = styled.p`
  color: ${greyDarker};
  font-size: 14px;
  font-weight: 300;
  line-height: 19px;

  a {
    color: ${primary};
  }
`

const AccountInfo = () => {
  const { pathname } = useLocation()
  const query = useQuery()
  const user = useSelector((state) => state.session.user)

  const freeTier = user.free_tier
  const businessTier = user.tier === 'business'

  const deleteAccountLink =
    usedDowngradeOffer(user) || freeTier || businessTier ? '/account/delete' : '/account/delete/offer'

  const showSubscriptionModal = query.modal === 'subscription'

  return (
    <Container>
      {showSubscriptionModal && (
        <SubscriptionModal
          isOpen
          pathname={pathname}
          user={user}
        />
      )}

      <Profile user={user} />

      <ExtraInfo>
        {t('account_privacy_info')} <Link to="/cvs">{t('account_set_private')}</Link>.
      </ExtraInfo>

      <ExtraInfo>
        {t('cancellation_info')} <Link to={deleteAccountLink}>{t('here')}</Link>.
      </ExtraInfo>
    </Container>
  )
}

export default AccountInfo
