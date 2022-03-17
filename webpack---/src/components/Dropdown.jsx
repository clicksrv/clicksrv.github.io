import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { useCallback, useState } from 'react'

import useWindowSize from '../hooks/useWindowSize'

import {
  black,
  grey,
  greyDarkest,
  greyLighter,
  greyLightest,
  greySubtle,
  greySubtleBluish,
  primary,
  primaryCta,
  primaryCtaLightest,
  primaryFaded,
  primaryLightest,
  redDanger,
  transparent,
  white,
} from '../colors'

import { breakpoints, media } from '../components/styled/Grid'
import { buttonHollow } from '../styles/buttons'
import { t } from '../locales'

export const Dropdown = styled.div`
  position: relative;
`

export const DropdownIcon = styled.i`
  font-size: 13px;
  transition: transform 0.3s;
  transform: rotate(${({ dropdownOpen }) => (dropdownOpen ? -90 : 90)}deg);

  display: inline-block;
  margin-left: 5px;
  margin-bottom: -1px;
`

export const DropdownValue = styled.p`
  color: ${({ dropdownOpen }) => (dropdownOpen ? black : grey)};
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;

  margin: 0;
`

const topMargin = (dropdownOpen, separated) => {
  const base = -10
  const openDiff = 12
  const separation = separated ? 5 : 0
  const offset = dropdownOpen ? openDiff : 0

  return base + separation + offset
}

export const DropdownTrigger = styled.section`
  border: 1px solid ${({ dropdownOpen }) => (dropdownOpen ? primary : greyLighter)};
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 ${primaryFaded};
  color: ${({ dropdownOpen }) => (dropdownOpen ? primary : greyDarkest)};
  cursor: pointer;
  transition: all 0.3s;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 25px;
  max-width: 100%;
  padding: 10px 12px;
  width: 260px;

  ${media.md`
    margin-bottom: 0;
    width: ${({ narrow }) => (narrow ? 90 : 120)}px;
  `}

  ${media.lg`
    width: ${({ narrow }) => (narrow ? 90 : 170)}px;
  `}
`

const lockedDropdownTriggerStyles = css`
  background-color: ${greySubtleBluish};
  border-color: ${greySubtleBluish};
  color: ${greySubtleBluish};
  cursor: unset;

  :hover {
    background-color: ${greySubtleBluish};
    border-color: ${greySubtleBluish};
    color: ${grey};
  }

  :after {
    color: ${grey};
  }
`

export const DropdownTriggerDots = styled.i`
  ${buttonHollow}

  ${({ locked }) => locked && lockedDropdownTriggerStyles}

  border-radius: 50%;

  height: 36px;
  padding: 0;
  width: 36px;

  &:after {
    content: '\\e92a';
    font-family: Icons;
    font-size: 22px;
    font-style: normal;
    line-height: 1;
  }
`

export const DropdownNav = styled.nav`
  border-bottom: 1px solid ${primaryFaded};

  display: flex;
  justify-content: space-between;

  margin: 5px 0 8px;
  padding: 7px 11px 0 16px;
`

export const DropdownNavTab = styled.a`
  border-bottom: 2px solid ${({ active }) => (active ? primary : white)};
  color: ${({ active }) => (active ? black : grey)};
  cursor: ${({ active }) => (active ? 'default' : 'pointer')};
  font-size: 12px;
  font-weight: ${({ active }) => (active ? 650 : 500)};
  text-transform: capitalize;
  transition: all 0.2s;

  padding-bottom: 8px;

  &:hover {
    color: ${black};
  }
`

export const DropdownList = styled.ul`
  list-style: none;
  overflow: scroll;

  margin: 0 0 7px;
  max-height: 390px;
  min-width: 180px;
`

export const DropdownItem = styled.li`
  background-color: ${({ selected }) => (selected ? greySubtle : transparent)};
  border-radius: 6px;
  color: ${({ disabled, selected }) => (selected ? black : disabled ? greyLighter : grey)};
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  font-size: 14px;
  font-weight: ${({ selected }) => (selected ? 650 : 500)};

  padding: 5px 8px;
  margin: 0 8px 1px;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'unset' : greySubtle)};
  }
`

export const DropdownMenu = styled.div`
  overflow: scroll;

  display: flex;
  flex-direction: column;

  margin: 2px 0;
`

const menuItemStyles = css`
  background-color: ${transparent};
  border-radius: 8px;
  color: ${grey};
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  transition: background-color 0.3s, color 0.3s;
  white-space: nowrap;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  padding: 13px 30px 13px 17px;
  margin: 2px 4px;

  &:hover {
    background-color: ${primaryLightest};
    color: ${black};
  }
`

// for 'href' links
export const DropdownMenuHyperlink = styled.a`
  ${menuItemStyles}
`

// for 'onClick' actions
export const DropdownMenuItem = styled.span`
  ${menuItemStyles}
`

// for 'to' router links
export const DropdownMenuLink = styled(Link)`
  ${menuItemStyles}
`

export const DropdownMenuIcon = styled.i`
  color: ${({ cta, danger }) => (danger ? redDanger : cta ? primaryCta : primary)};
  font-size: 23px;
  text-align: center;

  display: inline-block;
  margin-right: 10px;
  padding-left: ${({ indented }) => (indented ? 3 : 0)}px;
  width: 25px;
`

// for 'Pro' or 'Beta' badges
export const DropdownMenuBadge = styled.span`
  background-color: ${({ cta }) => (cta ? primaryCtaLightest : primaryLightest)};
  border-radius: 12px;
  color: ${({ cta }) => (cta ? primaryCta : primary)};
  font-weight: 600;

  margin-bottom: -1px;
  margin-left: 12px;
  padding: 4px 10px;
`

const DropdownClose = styled.a`
  font-size: 14px;
  font-weight: 600;
  text-align: center;

  display: block;
  margin: 1px auto 10px;
  padding: 12px 0 14px;
`

const contentMobileStyles = css`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  box-shadow: ${({ dropdownOpen }) =>
    dropdownOpen ? `0 -5px 10px -5px ${primaryFaded}, 0 15px 30px 5px ${primaryFaded}` : 'none'};
  opacity: 1;
  transform: translateY(${({ dropdownOpen }) => (dropdownOpen ? '0' : '100%')});

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: unset;

  margin-top: 0;
  padding-bottom: env(safe-area-inset-bottom);
`

const Content = styled.div`
  background-color: white;
  border: 1px solid ${greyLightest};
  border-radius: 8px;
  box-shadow: 0 5px 10px -5px ${primaryFaded}, 0 15px 30px 5px ${primaryFaded};
  opacity: ${({ dropdownOpen }) => (dropdownOpen ? 1 : 0)};
  pointer-events: ${({ dropdownOpen }) => (dropdownOpen ? 'auto' : 'none')};
  transition: box-shadow 0.25s, opacity 0.25s, margin-top 0.25s, transform 0.4s;
  z-index: ${({ dropdownOpen }) => (dropdownOpen ? 9 : 8)};

  position: absolute;
  right: ${({ rightEdgeAligned }) => (rightEdgeAligned ? '0' : 'auto')};
  top: 100%;

  margin-top: ${({ dropdownOpen, separated }) => topMargin(dropdownOpen, separated)}px;

  ${({ mobile }) => mobile && contentMobileStyles}
`

/**
 * @param {boolean} desktopLayout don't use separate mobile view/layout for mobile screen widths
 * @param {number} index element's placement might change during re-rendering;
 *   adding index dependency keeps content menu appropriately left/right aligned
 * @param {boolean} separated indicates content should be rendered a couple of pixels lower
 */
export const DropdownContent = ({
  children,
  className,
  closeDropdown,
  desktopLayout,
  dropdownOpen,
  ignoreInnerClicks,
  index,
  separated,
}) => {
  const { viewportWidth } = useWindowSize()
  const [rightEdgeAligned, setRightEdgeAligned] = useState(false)

  const mobile = !desktopLayout && viewportWidth && viewportWidth < breakpoints.sm

  const contentRef = useCallback(
    (node) => {
      if (!node) {
        return
      }

      // is parent element displayed in the right part of the viewport/screen
      const renderedAtRightSideOfViewport = () => {
        const parent = node.parentNode

        const { x } = parent.getBoundingClientRect()

        if (!x) {
          return false
        }

        if (x > viewportWidth / 2) {
          return true
        }

        return false
      }

      // open on left side if parent is placed in right half of the screen
      setRightEdgeAligned(renderedAtRightSideOfViewport())
    },
    [index, viewportWidth]
  )

  const handleInnerClick = (event) => {
    if (ignoreInnerClicks) {
      event.nativeEvent.stopImmediatePropagation()
    }
  }

  return (
    <Content
      className={className}
      dropdownOpen={dropdownOpen}
      mobile={mobile}
      onClick={handleInnerClick}
      ref={contentRef}
      role="menu"
      rightEdgeAligned={rightEdgeAligned}
      separated={separated}>
      {children}

      {mobile && <DropdownClose onClick={closeDropdown}>{t('close')}</DropdownClose>}
    </Content>
  )
}

DropdownContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeDropdown: PropTypes.func.isRequired,
  desktopLayout: PropTypes.bool,
  dropdownOpen: PropTypes.bool.isRequired,
  ignoreInnerClicks: PropTypes.bool,
  index: PropTypes.number,
  separated: PropTypes.bool,
}
