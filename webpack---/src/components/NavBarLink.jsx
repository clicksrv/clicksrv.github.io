import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { black, grey, primary, transparent } from '../colors'
import { media } from './styled/Grid'

const Container = styled(Link)`
  border-color: ${({ $active }) => ($active ? primary : transparent)};
  border-style: solid;
  border-width: 0 0 1px;
  color: ${({ $active }) => ($active ? primary : grey)};
  font-weight: 400;
  text-align: center;
  transition: color 0.3s, border-color 0.3s;

  display: flex;
  align-items: center;
  flex: ${({ grow }) => (grow ? 1 : '0 1 auto')};
  justify-content: center;

  height: 100%;
  padding: ${({ grow }) => (grow ? '0 5px' : '0 7px')};
  position: relative;

  &:hover {
    border-color: ${primary};
    color: ${({ $active }) => ($active ? primary : black)};
  }

  ${media.xs`
    padding: ${({ grow }) => (grow ? '0 8px' : '0 10px')};
  `}

  ${media.sm`
    font-size: 13px;

    padding: 0 12px;
  `}

  ${media.md`
    font-size: 14px;

    min-width: 55px;
    padding: 0 18px;
  `}

  ${media.lg`
    padding: 0 20px;
  `}

  ${media.xl`
    padding: 0 24px;
  `}
`

const Icon = styled.i`
  color: ${primary};
  font-size: 23px;

  display: block;

  ${media.sm`
    width: 40px;
  `}

  ${media.md`
    display: block;
    margin-right: 9px;
    width: auto;
  `}
`

const Title = styled.span`
  font-size: 12px;

  display: none;

  ${media.sm`
    font-size: 13px;
  `}

  ${media.md`
    font-size: 14px;

    display: block;
  `}
`

const NavBarLink = ({ active, className, grow, icon, title, to }) => {
  return (
    <Container
      $active={active}
      className={className}
      grow={grow}
      to={to}>
      <Icon className={`icon-${icon}`} />

      <Title>{title}</Title>
    </Container>
  )
}

NavBarLink.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  grow: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export default NavBarLink
