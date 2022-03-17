import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { black, greyLightest, orange, orangeLightest, primary, primaryCta, primaryFadedLess } from '../colors'
import { media } from './styled/Grid'

export const CvPostersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--dashboard-spacing);
`

export const CvImageContainer = styled.div`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  overflow: hidden;
  transition: max-height 0.4s;

  display: block;
  max-height: calc(var(--cv-card-normal-height) - var(--cv-poster-content-full-height));

  ${media.sm`
    max-height: calc(var(--cv-card-normal-height) - var(--cv-poster-content-full-height));
  `}

  ${media.md`
    max-height: calc(var(--cv-card-normal-height) - var(--cv-poster-content-compact-height));
  `}
`

export const CvContentContainer = styled.div`
  overflow: hidden;
  transition: height 0.4s;

  height: var(--cv-poster-content-full-height);

  ${media.md`
    height: var(--cv-poster-content-compact-height);
  `}
`

/**
 * @param {string} size (small / normal) impacts component's height
 */
export const CvScreenshot = styled.img`
  user-select: none;

  min-height: var(--cv-card-${({ size }) => size}-height);
`

export const CvPoster = styled.div`
  background-color: white;
  border: 2px solid ${primary};
  border-width: ${({ selected }) => (selected ? 2 : 0)}px;
  border-radius: 8px;
  box-shadow: 0 1px 1px ${primaryFadedLess};
  cursor: pointer;
  transition: box-shadow 0.3s;

  max-width: calc(var(--cv-card-width) * 0.8);
  padding: ${({ selected }) => (selected ? 0 : 2)}px;
  position: relative;

  :hover {
    ${CvImageContainer} {
      ${media.md`
        max-height: calc(var(--cv-card-normal-height) - var(--cv-poster-content-full-height));
      `}
    }

    ${CvContentContainer} {
      ${media.md`
        height: var(--cv-poster-content-full-height);
      `}
    }
  }
`

export const CvContent = styled.div`
  border-top: 1px solid ${greyLightest};
  transition: margin-bottom 0.4s;

  padding: 16px;
  position: relative;
`

export const CvName = styled(Link)`
  color: ${black};
  font-size: 14px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  display: block;
  margin: 0 42px 6px 0;

  :hover {
    color: ${black};
  }
`

export const CvButtons = styled.aside`
  transition: margin-top 0.4s;

  display: flex;
  gap: 0 12px;

  margin-top: 13px;

  ${media.md`
    margin-top: 16px;
  `}
`

export const Badge = styled.span`
  border-radius: 12px;
  color: white;
  font-size: 12px;
  font-weight: 600;

  position: absolute;
  top: 16px;
  left: 16px;

  padding: 4px 8px;
`

export const FreeBadge = styled(Badge)`
  background-color: ${primary};
`

export const ProBadge = styled(Badge)`
  background-color: ${primaryCta};
`

export const NewBadge = styled(Badge)`
  background-color: ${orangeLightest};
  color: ${orange};
`

const SelectedContainer = styled.span`
  background-color: ${primary};
  border-radius: 50%;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 14px;
  right: 12px;

  height: 26px;
  width: 26px;
`

const SelectedIcon = styled.i`
  font-size: 15px;
  font-weight: 600;
`

export const SelectedIndicator = () => (
  <SelectedContainer>
    <SelectedIcon
      className="icon-checkmark"
      role="img"
    />
  </SelectedContainer>
)
