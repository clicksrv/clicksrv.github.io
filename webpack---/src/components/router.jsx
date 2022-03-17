import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader/root'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import history from '../services/history'

import AcceptInvitation from './AcceptInvitation'
import AccountDelete from './AccountDelete'
import AccountDowngrade from './AccountDowngrade'
import Application from './Application'
import Authentication from './Authentication'
import AuthenticationLogin from './AuthenticationLogin'
import AuthenticationSignup from './AuthenticationSignup'
import Checkout from './Checkout'
import Company from './Company'
import CoverLetters from './CoverLetters'
import CreateResume from './CreateResume'
import CvNew from './CvNew'
import Dashboard from './Dashboard'
import DowngradeOffer from './DowngradeOffer'
import Editor from './Editor'
import Journal from './Journal'
import JournalCongratulations from './JournalCongratulations'
import JournalEmailSettings from './JournalEmailSettings'
import JournalEntryEdit from './JournalEntryEdit'
import JournalEntryNew from './JournalEntryNew'
import JournalOnboarding from './JournalOnboarding'
import LayoutCompany from './LayoutCompany'
import LayoutMain from './LayoutMain'
import LoadingSpinner from './LoadingSpinner'
import MyAccount from './MyAccount'
import NotFound from './NotFound'
import Preview from './Preview'
import ResetPassword from './ResetPassword'
import Resumes from './Resumes'
import Root from './Root'
import ScrollToTop from './ScrollToTop'
import Stats from './Stats'
import Takeover from './Takeover'
import Template from './Template'
import ThankYou from './ThankYou'
import UpdateBilling from './UpdateBilling'
import Upload from './Upload'
import Uploaded from './Uploaded'
import Websites from './Websites'

const AppRouter = () => {
  const ApplicationRoute = (props) => (
    <Application>
      <Route {...props} />
    </Application>
  )

  const AuthenticationRoute = ({ imageLayout, ...props }) => {
    const token = useSelector((state) => state.session.token)

    if (token) {
      return <Redirect to="/cvs" />
    }

    return (
      <Authentication imageLayout={imageLayout}>
        <Route {...props} />
      </Authentication>
    )
  }

  AuthenticationRoute.propTypes = {
    imageLayout: PropTypes.bool,
  }

  const PublicRoute = (props) => {
    const token = useSelector((state) => state.session.token)

    if (token) {
      return <Redirect to="/cvs" />
    }

    return <Route {...props} />
  }

  const MainRoute = ({ payingUsers, ...props }) => {
    const user = useSelector((state) => state.session.user)

    if (!user) {
      return null
    }

    const { free_tier: freeTier } = user

    if (payingUsers && freeTier) {
      return <Redirect to="/" />
    }

    return (
      <Application>
        <LayoutMain>
          <Route {...props} />
        </LayoutMain>
      </Application>
    )
  }

  MainRoute.propTypes = {
    payingUsers: PropTypes.bool,
  }

  const TakeoverRoute = ({ freeUsers, payingUsers, ...props }) => {
    const user = useSelector((state) => state.session.user)

    if (!user) {
      return null
    }

    const { free_tier: freeTier, paid_tier: paidTier } = user

    if ((freeUsers && paidTier) || (payingUsers && freeTier)) {
      return <Redirect to="/" />
    }

    return (
      <Application>
        <Takeover>
          <Route {...props} />
        </Takeover>
      </Application>
    )
  }

  TakeoverRoute.propTypes = {
    freeUsers: PropTypes.bool,
    payingUsers: PropTypes.bool,
  }

  const CompanyRoute = (props) => (
    <Application>
      <LayoutCompany>
        <Route {...props} />
      </LayoutCompany>
    </Application>
  )

  // prettier-ignore
  return (
    <Router basename="/app" history={history}>
      <ScrollToTop />

      <Root>
        <Switch>
          <Route exact path="/" component={LoadingSpinner} />

          <AuthenticationRoute exact path="/login" imageLayout={true} component={AuthenticationLogin} />
          <AuthenticationRoute exact path="/signup" component={AuthenticationSignup} />
          <AuthenticationRoute exact path="/reset-password" imageLayout={true} component={ResetPassword} />

          <PublicRoute exact path="/invitation/accept" component={AcceptInvitation} />

          <TakeoverRoute exact path="/account/delete" component={AccountDelete} />
          <TakeoverRoute exact path="/account/delete/offer" payingUsers component={DowngradeOffer} />
          <TakeoverRoute exact path="/account/downgrade" payingUsers component={AccountDowngrade} />
          <TakeoverRoute exact path="/account/downgrade/offer" payingUsers component={DowngradeOffer} />

          <TakeoverRoute exact path="/checkout" component={Checkout} />
          <TakeoverRoute exact path="/create-resume" component={CreateResume} />
          <TakeoverRoute exact path="/template" component={Template} />
          <TakeoverRoute exact path="/thank-you" payingUsers component={ThankYou} />
          <TakeoverRoute exact path="/update-billing" payingUsers component={UpdateBilling} />
          <TakeoverRoute exact path="/upload" payingUsers component={Upload} />
          <TakeoverRoute exact path="/uploaded" payingUsers component={Uploaded} />

          <TakeoverRoute exact path="/resumes/new" component={CvNew} />
          <TakeoverRoute exact path="/websites/new" component={CvNew} />
          <TakeoverRoute exact path="/cover-letters/new" component={CvNew} />

          <MainRoute exact path="/resumes" component={Resumes} />
          <MainRoute exact path="/websites" component={Websites} />
          <MainRoute exact path="/cover-letters" component={CoverLetters} />
          <MainRoute exact path="/cvs" component={Dashboard} />

          <MainRoute exact path="/stats/:id?" component={Stats} />

          <MainRoute path="/account" component={MyAccount} />

          <MainRoute exact path="/journal" component={Journal} />
          <MainRoute exact path="/journal/congratulations" component={JournalCongratulations} />
          <MainRoute exact path="/journal/entries/new" component={JournalEntryNew} />
          <MainRoute exact path="/journal/entries/:id(\d+)/edit" component={JournalEntryEdit} />
          <MainRoute exact path="/journal/email-settings" payingUsers component={JournalEmailSettings} />
          <MainRoute exact path="/journal/onboarding" component={JournalOnboarding} />

          <CompanyRoute exact path="/company" component={Company} />

          <ApplicationRoute exact path="/cvs/:id/preview" component={Preview} />
          <ApplicationRoute path="/cvs/:id(\d+)/:pane?" component={Editor} />

          <Route path="*" component={NotFound} />
        </Switch>
      </Root>
    </Router>
  )
}

AppRouter.propTypes = {
  history: PropTypes.object,
  store: PropTypes.object,
}

export default hot(AppRouter)
