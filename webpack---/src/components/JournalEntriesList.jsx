import styled from 'styled-components'
import { useSelector } from 'react-redux'

import useJournalEntries from '../hooks/useJournalEntries'
import { dateFromISOString, dateToISOString } from '../helpers/dates'
import { greyBluish, greySubtleBluish, primary } from '../colors'
import { media } from './styled/Grid'
import { t } from '../locales'

import ButtonGhost from './ButtonGhost'
import JournalEntry from './JournalEntry'
import Pane from './Pane'
import PageSubtitle from './PageSubtitle'
import SectionTitle from './SectionTitle'

const ButtonNew = styled(ButtonGhost)`
  margin-bottom: 16px;

  ${media.md`
    height: var(--cv-card-small-height);
  `}
`

const List = styled.ul`
  margin: 8px 4px 0;

  ${media.sm`
    margin-left: 0;
    margin-right: 0;
  `}
`

const Item = styled.li`
  display: grid;

  ${media.sm`
    gap: 50px;
    grid-template-columns: 44px 1fr;
  `}
`

const DateIndicator = styled.aside`
  display: flex;
  align-items: baseline;

  ${media.sm`
    display: block;

    text-align: right;
  `}
`

const MonthName = styled.p`
  color: black;
  font-size: 15px;
  font-weight: 400;

  order: 2;

  margin-bottom: 2px;
  margin-left: 6px;

  ${media.sm`
    font-size: 14px;
  `}
`

const Day = styled(PageSubtitle)`
  font-size: 32px;
  font-weight: 700;

  order: 1;

  margin: 0 0 3px;
`

const Today = styled.p`
  color: ${primary};
  font-size: 14px;
  font-weight: 600;

  display: none;

  ${media.sm`
    display: block;
  `}
`

const MonthYear = styled(SectionTitle)`
  margin-top: 50px;
  margin-bottom: 5px;

  ${media.sm`
    margin-bottom: 20px;
  `}
`

const EntriesContainer = styled.div`
  min-width: 0; // required for grid item to not exceed 100%
  position: relative;

  // line
  &:before {
    background-color: ${greyBluish};
    content: '';

    display: none;
    position: absolute;
    left: -17px;
    top: ${({ last }) => (last ? 0 : 10)}px;

    height: ${({ last }) => (last ? '5px' : '100%')};
    width: 1px;

    ${media.sm`
      display: block;
    `}
  }

  // circle
  &:after {
    background-color: ${primary};
    border-radius: 50%;
    content: '';

    position: absolute;
    left: -22px;
    top: 4px;

    display: none;
    height: 11px;
    width: 11px;

    ${media.sm`
      display: ${({ today }) => (today ? 'none' : 'block')};
    `}
  }
`

const Entries = styled.ul``

/**
 * @param {object} entries Journal Entries grouped by date: { '2021-01-18': [{ id: 5, title: 'Entry', date: '2021-01-18' }] }
 */
const JournalEntriesList = () => {
  const locale = useSelector((state) => state.application.locale)
  const { groupedJournalEntries: entries } = useJournalEntries()

  const dates = Object.keys(entries)

  const today = dateToISOString(new Date()) // '2021-01-18'

  const day = (date) => dateFromISOString(date).toLocaleDateString(locale, { day: 'numeric' }) // 1..31
  const monthName = (date) => dateFromISOString(date).toLocaleDateString(locale, { month: 'long' }) // January
  const monthNameShort = (date) => dateFromISOString(date).toLocaleDateString(locale, { month: 'short' }) // Jan
  const monthNameYear = (date) => dateFromISOString(date).toLocaleDateString(locale, { month: 'long', year: 'numeric' }) // January 2021
  const month = (date) => dateFromISOString(date).toLocaleDateString(locale, { month: 'numeric' }) // 1..12
  const year = (date) => dateFromISOString(date).toLocaleDateString(locale, { year: 'numeric' }) // 2021

  const isToday = (date) => date === today
  const isCurrentMonth = (date) => year(date) === year(today) && month(date) === month(today)
  const isSameMonth = (date, otherDate) => year(date) === year(otherDate) && month(date) === month(otherDate)
  const isCurrentYear = (date) => year(date) === year(today)

  const isLastDate = (date) => dates.slice(-1)[0] === date

  /**
   * Determines whether to display month name for next batch of entries, and displays it
   * (display it only if there is a month/year change between current and next entry)
   * @param {boolean} isEntry 'false' means we're displaying it for ButtonGhost
   */
  const nextMonthName = (date, { isEntry } = { isEntry: true }) => {
    const groupsCount = dates.length

    const latestDate = dates[0]

    if (!latestDate) {
      return null
    }

    const currentEntryIndex = isEntry ? dates.indexOf(date) : -1
    const moreEntries = (!isEntry && groupsCount > 0) || (isEntry && currentEntryIndex < groupsCount - 1)

    if (!moreEntries) {
      return null
    }

    const nextEntryDate = currentEntryIndex >= 0 ? dates[currentEntryIndex + 1] : dates[0]

    // entries from the same month
    if (isCurrentMonth(nextEntryDate)) {
      return null
    }

    // entries from the same month as first entry (for non-current month)
    if (currentEntryIndex === 0 && isSameMonth(nextEntryDate, latestDate)) {
      return null
    }

    // entries from the same month as the current entry
    if (isEntry && isSameMonth(nextEntryDate, date)) {
      return null
    }

    if (isCurrentYear(nextEntryDate)) {
      return <MonthYear>{monthName(nextEntryDate)}</MonthYear>
    }

    return <MonthYear>{monthNameYear(nextEntryDate)}</MonthYear>
  }

  return (
    <Pane
      color={greySubtleBluish}
      icon="journal"
      iconColor={primary}
      title={t('timeline')}>
      <List>
        <Item>
          <DateIndicator>
            <MonthName>{monthNameShort(today)}</MonthName>
            <Day>{day(today)}</Day>

            <Today>{t('today')}</Today>
          </DateIndicator>

          <EntriesContainer>
            <ButtonNew
              grey
              type="journal_entry"
            />

            {nextMonthName(today, { isEntry: false })}
          </EntriesContainer>
        </Item>

        {dates.map((date, index) => (
          <Item key={index}>
            <DateIndicator>
              {!isToday(date) && <MonthName>{monthNameShort(date)}</MonthName>}
              {!isToday(date) && <Day>{day(date)}</Day>}
            </DateIndicator>

            <EntriesContainer
              today={isToday(date)}
              last={isLastDate(date)}>
              <Entries>
                {entries[date].map((journalEntry, subindex) => (
                  <JournalEntry
                    key={subindex}
                    journalEntry={journalEntry}
                  />
                ))}
              </Entries>

              {nextMonthName(date)}
            </EntriesContainer>
          </Item>
        ))}
      </List>
    </Pane>
  )
}

export default JournalEntriesList
