import PropTypes from 'prop-types'
import styled from 'styled-components'

import { media } from './Grid'

const Container = styled.main`
  -webkit-touch-callout: none;

  display: flex;
  flex-direction: column;

  flex: 1;

  height: 100%;
  margin-top: var(--nav-bar-height);
  min-height: calc(100vh - var(--nav-bar-height) - 20px);
  padding: 10px;

  ${media.sm`
    min-height: calc(100vh - var(--nav-bar-height) - 40px);
    padding: 20px;
  `}
`

const Content = ({ children, className }) => {
  return <Container className={className}>{children}</Container>
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default Content
