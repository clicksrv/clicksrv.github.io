import styled from 'styled-components'
import { darken } from 'polished'

import { greyLight, primary, primaryCta, redDanger, redErrorLight } from '../../colors'
import { media } from './Grid'

const color = ({ cta, neutral }) => {
  if (cta) {
    return primaryCta
  }

  if (neutral) {
    return greyLight
  }

  return primary
}

// prettier-ignore
const bg = (props) => props.hollow ? 'rgba(0,0,0,0)' : props.white ? 'white' : props.danger ? redErrorLight : color(props)

// prettier-ignore
const fg = (props) => props.hollow ? props.white ? 'white' : color(props) : props.white ? color(props) : props.danger ? redDanger : 'white'

// prettier-ignore
const hoverBg = (props) => props.hollow ? fg(props) : props.white ? 'rgba(255, 255, 255, 0.75)' : (props.danger || props.cta) ? darken(0.05, bg(props)) : darken(0.1, bg(props))

// prettier-ignore
const hoverFg = (props) => (props.white ? color(props) : props.danger ? darken(0.1, fg(props)) : 'white')

// prettier-ignore
const border = (props) => props.white ? '1px solid white' : props.hollow ? `1px solid ${color(props)}` : `1px solid ${bg(props)}`

const padding = ({ big, small }) => (big ? '15px 30px' : small ? '6px 20px' : '8px 30px')

const paddingMobile = ({ big, small }) => (big ? '10px 20px' : small ? '6px 15px' : '8px 20px')

const width = ({ fluid }) => (fluid ? '100%' : 'auto')

const minWidth = ({ wide }) => (wide ? '200px' : 'none')

const fontSize = ({ small }) => (small ? 14 : 16)

/**
 * this component is an almost 1-to-1 copy of Button/Btn; think about unifying their styles
 * @param {object} props big / compact / small / fluid / cta / neutral / hollow / partial / white / wide
 */
const Hyperlink = styled.a`
  background-color: ${bg};
  border: ${({ partial }) => (partial ? 'none' : border)};
  border-radius: ${(props) => (props.small ? 4 : 8)}px;
  color: ${fg};
  font-size: ${fontSize}px;
  text-align: center;
  transition: all 0.3s;
  user-select: none;
  -webkit-touch-callout: none;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: ${minWidth};
  padding: ${paddingMobile};
  width: ${width};

  i {
    font-size: 18px;

    margin-right: 6px;

    &.icon-plus {
      font-size: ${(props) => (props.small ? 22 : 24)}px;

      margin-left: -8px;
    }

    &.icon_clipboard,
    &.arrow_right,
    &.icon_check,
    &.icon_trash_alt {
      margin-right: 0;
    }
  }

  &:hover {
    background-color: ${hoverBg};
    border-color: ${hoverBg};
    color: ${hoverFg};
  }

  ${media.sm`
    padding: ${({ compact }) => (compact ? paddingMobile : padding)};
  `}
`

export default Hyperlink
