import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { useRef } from 'react'

import useBrowser from '../hooks/useBrowser'
import useWindowSize from '../hooks/useWindowSize'
import { breakpoints, media } from './styled/Grid'
import {
  blueLightest,
  lime,
  mint,
  orangeDarkish,
  orangeLightest,
  primaryCta,
  primaryDarker,
  violetLight,
} from '../colors'
import { t } from '../locales'

import CvCard from './CvCard'
import JournalPin from './JournalPin'
import NoPins from './NoPins'
import ScrollingNav from './ScrollingNav'
import Pane from './Pane'
import PinSkeleton from './PinSkeleton'

const Content = styled.div`
  overflow-x: scroll;
  scroll-behavior: smooth;
  // At some point Safari should also have 'x mandatory' enabled
  // https://github.com/iamdustan/smoothscroll/issues/177
  scroll-snap-type: ${({ isSafari }) => (isSafari ? 'initial' : 'x mandatory')};

  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 16px;

  // hacky way to escape 'overflow: hidden' for Dropdown menu
  // https://stackoverflow.com/a/44893032/100852
  padding-bottom: 360px;
  margin-bottom: calc(-360px + ${({ showNavigation }) => (showNavigation ? '32px + 16px' : '0px')});

  // hide now out-of-bounds scrollbar
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`

const pinStyles = css`
  pointer-events: auto;
  scroll-snap-align: start;

  flex: none;

  // 2 columns
  ${media.sm`
    max-width: calc(50% - 16px / 2);
  `}

  // 3 columns
  ${media.md`
    max-width: calc(33.333333% - 32px / 3);
  `}

  // 4 columns
  ${media.lg`
    max-width: calc(25% - 48px / 4);
  `}
`

const JournalEntryPin = styled(JournalPin)`
  ${pinStyles}
`

const CvPin = styled(CvCard)`
  ${pinStyles}
`

const { sm, md, lg } = breakpoints

const colors = {
  resume: orangeLightest,
  website: blueLightest,
  cover_letter: violetLight,
  journal_entry: mint,
}

const iconColors = {
  resume: orangeDarkish,
  website: primaryDarker,
  cover_letter: primaryCta,
  journal_entry: lime,
}

const titles = {
  resume: t('pinned_resumes'),
  website: t('pinned_websites'),
  cover_letter: t('pinned_cover_letters'),
  journal_entry: t('pinned_journal_entries'),
}

/**
 * @param {string} type resume / cover_letter / website / journal_entry
 */
const Pins = ({ pins, type }) => {
  const { isSafari } = useBrowser()
  const { viewportWidth } = useWindowSize()

  // ref is required for horizontal scrolling of pins using buttons
  const containerRef = useRef(null)

  const color = colors[type]
  const iconColor = iconColors[type]
  const title = titles[type]

  const pinsCount = pins.length
  const empty = pinsCount === 0

  const visibleSkeletonsCount = () => {
    if (viewportWidth > lg) {
      const count = 4 - pinsCount

      return count > 0 ? count : 0
    }

    if (viewportWidth > md) {
      const count = 3 - pinsCount

      return count > 0 ? count : 0
    }

    if (viewportWidth > sm) {
      const count = 2 - pinsCount

      return count > 0 ? count : 0
    }

    return 0
  }

  const showNavigation = () => {
    if (empty) {
      return false
    }

    if (viewportWidth >= lg) {
      return pinsCount > 4
    }

    if (viewportWidth >= md) {
      return pinsCount > 3
    }

    if (viewportWidth >= sm) {
      return pinsCount > 2
    }

    return pinsCount > 1
  }

  const cvType = type !== 'journal_entry'

  return (
    <Pane
      color={color}
      icon="pin"
      iconColor={iconColor}
      title={title}>
      {empty && <NoPins type={type} />}

      {!empty && (
        <>
          <Content
            className="pins"
            isSafari={isSafari}
            ref={containerRef}
            showNavigation={showNavigation()}>
            {pins.map((pin, index) =>
              cvType ? (
                <CvPin
                  cv={pin}
                  index={index}
                  key={`cv-pin-${pin.id}`}
                  size="small"
                />
              ) : (
                <JournalEntryPin
                  index={index}
                  journalEntry={pin}
                  key={`journal-entry-pin-${pin.id}`}
                />
              )
            )}

            {new Array(visibleSkeletonsCount()).fill(0).map((_el, index) => (
              <PinSkeleton
                key={`skeleton-${index}`}
                type={type}
              />
            ))}
          </Content>

          {showNavigation() && <ScrollingNav containerRef={containerRef} />}
        </>
      )}
    </Pane>
  )
}

Pins.propTypes = {
  pins: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
}

export default Pins
