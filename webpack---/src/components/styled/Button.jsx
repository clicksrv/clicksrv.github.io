import styled from 'styled-components'
import { darken } from 'polished'
import { Link } from 'react-router-dom'

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

const minWidth = ({ wide }) => (wide ? '200px' : 'auto')

const fontSize = ({ small }) => (small ? 14 : 16)

const Button = styled(({ big, compact, cta, danger, fluid, hollow, neutral, partial, small, white, wide, ...rest }) => (
  <Link {...rest} />
))`
  transition: all 0.2s !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${paddingMobile};
  font-size: ${fontSize}px;
  border-radius: ${(props) => (props.small ? 4 : 8)}px;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  text-align: center;
  background-color: ${bg};
  color: ${fg} !important;
  border: ${({ partial }) => (partial ? 'none' : border)};
  width: ${width};
  min-width: ${minWidth};

  i {
    font-size: 18px;

    margin-right: 6px;

    &.icon-plus {
      font-size: ${(props) => (props.small ? 22 : 24)}px;

      margin-left: -8px;
    }

    &.icon-gear-alt {
      margin-right: 10px;
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
    color: ${hoverFg} !important;
  }

  ${media.sm`
    padding: ${({ compact }) => (compact ? paddingMobile : padding)};
  `}
`

export const Btn = styled(
  ({ big, compact, cta, danger, fluid, hollow, neutral, partial, small, white, wide, ...rest }) => <button {...rest} />
)`
  transition: all 0.3s !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${paddingMobile};
  font-size: ${fontSize}px;
  border-radius: 4px;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  text-align: center;
  background-color: ${bg};
  color: ${fg} !important;
  border: ${({ partial }) => (partial ? 'none' : border)};
  width: ${width};
  min-width: ${minWidth};

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
    color: ${hoverFg} !important;
  }

  &:disabled {
    opacity: 0.6;
  }

  ${media.sm`
    padding: ${({ compact }) => (compact ? paddingMobile : padding)};
  `}
`

export const IconButton = styled(({ circle, ...rest }) => <Btn {...rest} />)`
  position: relative;
  width: 1.8em;
  height: 1.8em;
  padding: 0 !important;
  ${({ circle }) => circle && 'border-radius: 1.8em;'}

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`

export default Button
