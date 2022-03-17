import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grey } from '../colors'
import { media } from './styled/Grid'

import JournalOnboardingFunnelProgress from './JournalOnboardingFunnelProgress'

const Container = styled.section`
  background: white;
  color: ${grey};
  overflow-y: auto;

  margin: -10px;
  min-height: calc(100vh - var(--nav-bar-height));
  padding: 1px 0;

  ${media.sm`
    margin: -20px;
    padding: 10px;
  `}

  ${media.md`
    padding: 20px;
  `}

  ${media.lg`
    padding: 40px;
  `}
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 1060px;
`

const ContainerJournal = ({ className, children }) => {
  return (
    <Container
      className={className}
      role="main">
      <JournalOnboardingFunnelProgress />

      <Content>{children}</Content>
    </Container>
  )
}

ContainerJournal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default ContainerJournal
