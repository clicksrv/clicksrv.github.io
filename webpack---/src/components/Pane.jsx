import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Stamp from './Stamp'

const Container = styled.div`
  background-color: ${({ $color }) => $color};
  border-radius: 16px;

  margin-bottom: var(--dashboard-spacing);
  max-width: 100%;
  padding: 16px;
  position: relative;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin-bottom: 16px;
`

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;

  margin: 0;
`

const TitleLink = styled(Link)`
  color: black;
  font-size: 16px;
  font-weight: 600;

  margin: 0;

  :hover {
    color: black;
  }
`

const IconStamp = styled(Stamp)`
  margin-right: 12px;
`

const Pane = ({ children, className, color, icon, iconColor, title, to }) => {
  return (
    <Container
      $color={color}
      className={className}>
      <Header>
        <IconStamp
          color={iconColor}
          icon={icon}
        />

        {to && <TitleLink to={to}>{title}</TitleLink>}
        {!to && <Title>{title}</Title>}
      </Header>

      {children}
    </Container>
  )
}

Pane.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
}

export default Pane
