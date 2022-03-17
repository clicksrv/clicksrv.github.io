import PropTypes from 'prop-types'
import styled from 'styled-components'

import { t } from '../../locales'

import SectionTitle from '../SectionTitle'
import Statistic from '../shared/Statistic'

const Title = styled(SectionTitle)`
  margin: 0 0 20px;
`

const CompanyStats = ({ stats }) => (
  <>
    <Title>{t('accounts_overview')}</Title>

    {stats.users && (
      <>
        <Statistic
          label={t('users')}
          value={stats.users}
        />
        <Statistic
          label={t('cvs_created')}
          value={stats.createdCvs}
        />
        <Statistic
          label={t('total_cv_views')}
          value={stats.totalCvViews}
        />
        <Statistic
          label={t('cvs_updated_this_week')}
          value={stats.cvsUpdatedThisWeek}
        />
        <Statistic
          label={t('user_logins_this_week')}
          value={stats.userLoginsThisWeek}
        />
      </>
    )}
  </>
)

CompanyStats.propTypes = {
  stats: PropTypes.shape({
    users: PropTypes.number,
    createdCvs: PropTypes.number,
    totalCvViews: PropTypes.number,
    cvsUpdatedThisWeek: PropTypes.number,
    userLoginsThisWeek: PropTypes.number,
  }),
}

export default CompanyStats
