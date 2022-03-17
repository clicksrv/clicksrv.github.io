import { css } from 'styled-components'

export const breakpoints = {
  xs: 375,
  sm: 500,
  md: 768,
  lg: 1100,
  xl: 1300,
  xxl: 1500,
}

/* Used only in themes; Do not use it if possible
 *
 * {
 *  xs: '375px',
 *  sm: '500px',
 *  ...
 * }
 */
export const breakpointsPx = Object.keys(breakpoints).reduce(
  (acc, breakpoint) => ({ ...acc, [breakpoint]: `${breakpoints[breakpoint]}px` }),
  {}
)

const mediaQuery =
  (breakpoint) =>
  (...args) =>
    css`
      @media screen and (min-width: ${breakpoints[breakpoint]}px) {
        ${css(...args)}
      }
    `
// allows using media queries in styled components:
//   ${media.sm`
//     padding: 8px;
//   `}
export const media = Object.keys(breakpoints).reduce((definitions, label) => {
  definitions[label] = mediaQuery(label)
  return definitions
}, {})
