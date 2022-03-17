import PropTypes from 'prop-types'
import styled from 'styled-components'

import { primary, primaryCta } from '../colors'

// Tooltip is defined as <aside role="tooltip"> with `opacity: 0`
// it is up to the parent component to define the visible state
const Container = styled.aside`
  background-color: ${({ cta }) => (cta ? primaryCta : primary)};
  border-radius: 3px;
  font-size: 14px;
  font-weight: 300;
  color: white;
  opacity: 0;
  pointer-events: none;
  ${({ bottom }) => bottom && 'transform: translate3d(0, -10px, 0)'};
  ${({ left }) => left && 'transform: translate3d(-10px, 0, 0)'};
  ${({ top }) => top && 'transform: translate3d(0, 10px, 0)'};
  transition: opacity 0.15s ease, transform 0.15s ease;
  white-space: nowrap;
  z-index: 20;

  position: absolute;
  ${({ bottom }) => bottom && 'left: calc(38% - 19px)'};
  ${({ bottom }) => bottom && 'top: 42px'};
  ${({ left }) => left && 'left: 69px'};
  ${({ left }) => left && 'top: calc(50% - 15px)'};
  ${({ top }) => top && 'left: calc(38% - 19px)'};
  ${({ top }) => top && 'top: -42px'};

  padding: 5px 15px;

  :before {
    color: ${({ cta }) => (cta ? primaryCta : primary)};
    content: '\f0d9';
    font-family: FontAwesome;
    font-size: 22px;
    ${({ bottom }) => bottom && 'transform: rotate(90deg)'};
    ${({ left }) => left && 'transform: rotate(0deg)'};
    ${({ top }) => top && 'transform: rotate(270deg)'};

    position: absolute;
    ${({ bottom }) => bottom && 'left: 18px'};
    ${({ bottom }) => bottom && 'top: -14px'};
    ${({ left }) => left && 'left: -7px'};
    ${({ left }) => left && 'top: 4px'};
    ${({ top }) => top && 'left: 18px'};
    ${({ top }) => top && 'top: 20px'};
  }
`

/**
 * @param {boolean} bottom place Tooltip at the bottom of the element
 * @param {boolean} cta CTA variant of the tooltip ('primaryCta' color)
 * @param {string} title Tooltip's title
 * @param {boolean} top place Tooltip at the top of the element
 */
const Tooltip = ({ bottom, className, cta, title, top }) => {
  const left = !bottom && !top

  return (
    <Container
      bottom={bottom}
      className={className}
      cta={cta}
      left={left}
      role="tooltip"
      top={top}>
      {title}
    </Container>
  )
}

Tooltip.propTypes = {
  bottom: PropTypes.bool,
  className: PropTypes.string,
  cta: PropTypes.bool,
  title: PropTypes.string.isRequired,
  top: PropTypes.bool,
}

export default Tooltip
