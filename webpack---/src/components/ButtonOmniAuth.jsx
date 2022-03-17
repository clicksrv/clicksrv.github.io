import styled, { css } from 'styled-components'

import { blueGoogle, greyLightest, greySubtleBluish, white } from '../colors'
import { media } from './styled/Grid'

const authButtonStyles = css`
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgb(62 148 228 / 20%);
  border-radius: 8px;
  font-size: 16px;
  transition: box-shadow 0.2s linear, background-color 0.2s linear;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 17px;
  min-height: 57px;

  ${media.md`
    justify-content: flex-start;
  `}

  > div {
    margin-right: 12px;
  }

  :hover {
    box-shadow: 0px 5px 10px -5px rgba(62, 148, 228, 0.2), 0px 15px 30px 5px rgba(62, 148, 228, 0.15);
  }

  ${media.md`
    width: calc(50% - 8px);
  `}
`

export const LinkedinAuthButton = styled.a`
  background-color: ${white};
  border: 1px solid ${greyLightest};
  color: #3275b0;

  padding: 13px 14px;

  > div {
    margin-bottom: 2px;
  }

  :hover {
    color: #3275b0;
  }

  :focus {
    background: ${greySubtleBluish};
  }

  ${authButtonStyles}
`

export const GoogleAuthButton = styled.a`
  background-color: ${blueGoogle};
  border: 1px solid ${blueGoogle};
  color: ${white};

  padding: 8px;

  :hover {
    color: ${white};
  }

  :focus {
    background: #0074cd;
  }

  ${authButtonStyles}
`
