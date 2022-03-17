import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import useCvs from '../hooks/useCvs'
import useJournalEntries from '../hooks/useJournalEntries'
import useWindowSize from '../hooks/useWindowSize'
import { blueLightest, lime, mint, primaryCta, primaryDarker, violetLight } from '../colors'
import { breakpoints, media } from './styled/Grid'
import { buttonBorderless, buttonHollowSmall } from '../styles/buttons'
import { isCoverLetter, isWebsite } from '../helpers/cv'
import { t } from '../locales'

import ButtonAdd from './ButtonAdd'
import ButtonGhost from './ButtonGhost'
import CvCard from './CvCard'
import JournalPin from './JournalPin'
import Pane from './Pane'
import PinSkeleton from './PinSkeleton'

const Container = styled(Pane)`
  margin: 0;
  width: 100%;
`

const SeeAll = styled(Link)`
  ${buttonHollowSmall}
  ${buttonBorderless}

  position: absolute;
  top: 16px;
  right: 16px;
`

const Content = styled.section`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  grid-template-rows: ${({ empty }) => (empty ? 'var(--cv-card-normal-height)' : 'auto var(--cv-card-normal-height)')};
  justify-items: center;

  ${media.sm`
    grid-template-columns: 1fr 1fr;
    grid-template-rows: var(--cv-card-small-height);
  `}

  ${media.md`
    grid-template-columns: 1fr 1fr 1fr;
  `}

  ${media.lg`
    grid-template-columns: 1fr 1fr;
  `}
`

const ButtonAddItem = styled(ButtonAdd)`
  ${media.sm`
    grid-column: 1 / span-2;
  `}

  ${media.md`
    grid-column: 1 / span-3;
  `}

  ${media.lg`
    grid-column: 1 / span-2;
  `}
`

const colors = {
  cover_letter: violetLight,
  journal_entry: mint,
  website: blueLightest,
}

const icons = {
  cover_letter: 'cover-letter',
  journal_entry: 'journal',
  website: 'browser-alt',
}

const iconColors = {
  cover_letter: primaryCta,
  journal_entry: lime,
  website: primaryDarker,
}

const links = {
  cover_letter: '/cover-letters',
  journal_entry: '/journal',
  website: '/websites',
}

const titles = {
  cover_letter: t('cover_letters'),
  journal_entry: t('career_journal'),
  website: t('websites'),
}

/**
 * @param {string} type cover_letter / website / journal_entry
 */
const DashboardItems = ({ className, type }) => {
  const { cvs } = useCvs()
  const { journalEntries } = useJournalEntries()
  const { viewportWidth } = useWindowSize()

  const { md, lg } = breakpoints

  const filteredItems = (type) => {
    switch (type) {
      case 'website':
        return cvs.filter(isWebsite)
      case 'cover_letter':
        return cvs.filter(isCoverLetter)
      case 'journal_entry':
        return journalEntries
    }
  }

  const items = filteredItems(type)

  // maximum items excluding ButtonGhost
  const maximumVisibleItems = viewportWidth >= md && viewportWidth < lg ? 2 : 1
  const pinnedItems = items.filter((item) => item.pinned)
  const visibleItems = [...new Set([...pinnedItems, ...items])].slice(0, maximumVisibleItems)
  const visibleItemsCount = visibleItems.length

  const visibleSkeletonsCount = () => {
    if (visibleItemsCount === 0) {
      return 0
    }

    // 3-columns
    if (viewportWidth >= md && viewportWidth < lg) {
      const count = 2 - visibleItemsCount

      return count > 0 ? count : 0
    }

    return 0
  }

  const cvType = type !== 'journal_entry'

  const pluralizedType = type.replace('_', '-').concat('s').replace('ys', 'ies')

  const color = colors[type]
  const icon = icons[type]
  const iconColor = iconColors[type]
  const title = titles[type]
  const to = links[type]

  const empty = !items || items.length === 0

  return (
    <Container
      className={className}
      color={color}
      icon={icon}
      iconColor={iconColor}
      title={title}
      to={to}>
      {!empty && <SeeAll to={to}>{t('see_all')}</SeeAll>}

      <Content
        className={pluralizedType}
        empty={empty}>
        {visibleItemsCount === 0 && <ButtonAddItem type={type} />}
        {visibleItemsCount > 0 && <ButtonGhost type={type} />}

        {visibleItems.map((item, index) =>
          cvType ? (
            <CvCard
              cv={item}
              index={index}
              key={`cv-${item.id}`}
              size="small"
            />
          ) : (
            <JournalPin
              index={index}
              journalEntry={item}
              key={`journal-entry-${item.id}`}
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
    </Container>
  )
}

DashboardItems.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
}

export default DashboardItems
