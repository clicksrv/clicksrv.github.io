import styled from 'styled-components'
import { Route, Switch, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AccountInfo from './AccountInfo'
import Extras from './Extras'

import history from '../../services/history'
import Tabs from '../styled/Tabs'
import { t } from '../../locales'

const TABS = [
  { label: 'account', to: '/account' },
  ...(process.env.CORDOVA ? [] : [{ label: 'custom_domain', to: '/account/extras' }]),
]

const Container = styled.div`
  max-width: 930px;
  margin: 0 auto;
  width: 100%;
`

const MyAccount = () => {
  // adding `locale` dependency so that the component updates the translations
  // when user chooses another language
  useSelector((state) => state.application.locale)

  const { pathname } = useLocation()

  const selectTab = (tabIndex) => {
    history.push(TABS[tabIndex].to)
  }

  const currentTabIndex = () => {
    return TABS.findIndex((tab) => tab.to === pathname)
  }

  return (
    <Container>
      <Tabs
        tabs={TABS.map((tab) => t(tab.label))}
        selected={currentTabIndex()}
        onSelect={selectTab}
      />

      <Switch>
        <Route
          exact
          path="/account"
          component={AccountInfo}
        />

        <Route
          exact
          path="/account/extras"
          component={Extras}
        />
      </Switch>
    </Container>
  )
}

export default MyAccount
