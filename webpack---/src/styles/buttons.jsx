import { css } from 'styled-components'

import {
  primary,
  primaryCta,
  primaryCtaDark,
  primaryCtaFaded,
  primaryCtaFaded40,
  primaryCtaFaded50,
  primaryCtaLight,
  primaryCtaLighter,
  primaryCtaLightish,
  primaryDark,
  primaryFaded,
  primaryFaded40,
  primaryFaded50,
  primaryLight,
  primaryLighter,
  primaryLightish,
  redDanger,
  redDangerLight,
  redErrorDark,
  redErrorLight,
  redErrorLightDark,
  white,
} from '../colors'

/*
 * @returns {string} css for :hover state for regular buttons
 */
export const buttonRegularHover = css`
  background-color: ${({ $cta }) => ($cta ? primaryCtaLightish : primaryLightish)};
  box-shadow: 0 6px 8px -2px ${({ $cta }) => ($cta ? primaryCtaFaded40 : primaryFaded40)},
    0 12px 16px ${({ $cta }) => ($cta ? primaryCtaFaded : primaryFaded)};
  color: ${white};
`

/*
 * @returns {string} css for :active state for regular buttons
 */
export const buttonRegularActive = css`
  background-color: ${({ $cta }) => ($cta ? primaryCtaDark : primaryDark)};
  box-shadow: 0 1px 1px ${({ $cta }) => ($cta ? 'rgba(37, 14, 119, 0.6)' : 'rgba(14, 63, 100, 0.6)')};
  color: ${({ $cta }) => ($cta ? primaryCtaLight : primaryLight)};
`

export const regular = css`
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 450;
  user-select: none;
  white-space: nowrap;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: 40px;
  padding-left: 22px;
  padding-right: 22px;
`

export const buttonRegular = css`
  ${regular}

  background-color: ${({ $cta }) => ($cta ? primaryCta : primary)};
  box-shadow: 0 2px 4px ${({ $cta }) => ($cta ? primaryCtaFaded50 : primaryFaded50)},
    0 6px 6px 2px ${({ $cta }) => ($cta ? primaryCtaFaded : primaryFaded)};
  color: ${white};
  transition: background-color 0.3s, box-shadow 0.3s, color 0.3s;

  &:after {
    color: ${white};
  }

  &:hover {
    ${buttonRegularHover}
  }

  &:active {
    ${buttonRegularActive}
  }
`

export const big = css`
  font-size: 16px;
  font-weight: 400;

  height: 48px;
  padding-left: 24px;
  padding-right: 24px;
`

export const buttonBig = css`
  ${buttonRegular}
  ${big}
`

export const small = css`
  font-size: 12px;
  font-weight: 600;

  height: 32px;
  padding-left: 12px;
  padding-right: 12px;
`

export const buttonSmall = css`
  ${buttonRegular}
  ${small}
`

export const buttonHollow = css`
  ${regular}

  background-color: white;
  border: 1px solid ${({ $cta }) => ($cta ? primaryCta : primary)};
  color: ${({ $cta }) => ($cta ? primaryCta : primary)};
  transition: background-color 0.3s;

  &:after {
    color: ${({ $cta }) => ($cta ? primaryCta : primary)};
  }

  &:hover {
    background-color: ${({ $cta }) => ($cta ? primaryCtaLighter : primaryLighter)};
    color: ${({ $cta }) => ($cta ? primaryCta : primary)};
  }

  &:active {
    background-color: ${({ $cta }) => ($cta ? primaryCtaLight : primaryLight)};
  }
`

export const buttonHollowBig = css`
  ${buttonHollow}
  ${big}
`

export const buttonHollowSmall = css`
  ${buttonHollow}
  ${small}
`

/*
 * @returns {string} complementary css for borderless variant; to be used together with base styling, such as 'buttonRegular'
 */
export const buttonBorderless = css`
  border: none;
  box-shadow: none;

  :hover,
  :active {
    box-shadow: none;
  }
`

/*
 * @returns {string} complementary css for danger variant; to be used together with base styling, such as 'buttonRegular'
 */
export const buttonDanger = css`
  background-color: ${redErrorLight};
  box-shadow: none;
  color: ${redDanger};
  font-weight: 550;

  padding-left: 45px;
  position: relative;

  :before {
    content: '\\e916';
    font-family: 'Icons';
    font-size: 145%;

    position: absolute;
    left: 15px;
  }

  :hover {
    background-color: ${redErrorLightDark};
    box-shadow: none;
    color: ${redDanger};
  }

  :active {
    background-color: ${redErrorDark};
    box-shadow: none;
    color: ${redDangerLight};
  }
`
