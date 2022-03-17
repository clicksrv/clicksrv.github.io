import Formsy from 'formsy-react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useState } from 'react'

import { dateToISOString } from '../helpers/dates'
import { grey } from '../colors'
import { media } from './styled/Grid'
import { t } from '../locales'

import journalForm from '../assets/images/journal-form.png'

import ButtonJournalEntryDelete from './ButtonJournalEntryDelete'
import DatePicker from './DatePicker'
import Input from './Input'
import InputCheckbox from './InputCheckbox'
import InputTags from './InputTags'
import InputTinyMCE from './InputTinyMCE'
import JournalEntryFormAssets from './JournalEntryFormAssets'
import JournalEntryFormLabel from './JournalEntryFormLabel'
import TinyMCEStyles from './TinyMCEStyles'
import { Btn } from './styled/Button'

const Container = styled.div`
  font-size: 15px;
  font-weight: 300;

  display: flex;
  justify-content: space-between;

  margin: 50px 15px 150px;
`

const Content = styled.div`
  flex: 1;

  margin-right: 50px;
  max-width: 700px;
`

const Info = styled.p`
  color: ${grey};
  font-size: 14px;
`

const InfoTags = styled(Info)`
  margin: -18px 0 25px;
`

const InfoDate = styled(Info)`
  margin: -5px 0 10px;
`

const Actions = styled.div`
  margin-top: 80px;
`

const Image = styled.img`
  display: none;
  height: 510px;
  width: 566px;

  ${media.md`
    display: block;
    max-height: 315px;
    max-width: 350px;
    margin-right: -50px;
  `}

  ${media.lg`
    margin-right: -100px;
    max-height: 405px;
    max-width: 450px;
  `}

  ${media.xl`
    margin-right: -200px;
    max-height: 510px;
    max-width: 566px;
  `}

  ${media.xxl`
    margin-right: -300px;
  `}
`

const JournalEntryForm = ({ onSubmit, submitting, journalEntry }) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const locale = useSelector((state) => state.application.locale)

  const title = journalEntry?.title || ''
  const description = journalEntry?.description || ''
  const link = journalEntry?.link || ''
  const tags = journalEntry?.tags || []
  const date = journalEntry?.date || dateToISOString(new Date())
  const pinned = journalEntry?.pinned || false
  const assets = journalEntry?.assets || []
  const assetIds = assets.map(({ id }) => id)

  const submitLabel = journalEntry ? t('save') : t('publish')

  const focusDescription = () => {
    if (typeof tinyMCE === 'undefined') {
      return
    }

    tinyMCE.activeEditor.focus()
  }

  return (
    <Container>
      <TinyMCEStyles />

      <Content>
        <Formsy onSubmit={onSubmit}>
          <JournalEntryFormLabel
            isRequired
            htmlFor="title">
            {t('title')}
          </JournalEntryFormLabel>

          <Input
            id="title"
            type="text"
            name="title"
            placeholder={t('ex_achieved_revenue_goals')}
            autoComplete="title"
            required
            value={title}
          />

          <JournalEntryFormLabel onClick={focusDescription}>{t('description')}</JournalEntryFormLabel>

          <InputTinyMCE
            name="description"
            placeholder={t('ex_hit_revenue_targets')}
            value={description}
          />

          <JournalEntryFormLabel htmlFor="link">{t('url')}</JournalEntryFormLabel>

          <Input
            id="link"
            type="url"
            name="link"
            placeholder={t('ex_url')}
            autoComplete="url"
            value={link}
            validations="isUrl"
            validationError={t('valid_link_required')}
          />

          <JournalEntryFormLabel htmlFor="tags">{t('tags')}</JournalEntryFormLabel>

          <InputTags
            id="tags"
            name="tags"
            value={tags}
          />

          <InfoTags>{t('add_as_many_tags')}</InfoTags>

          <JournalEntryFormAssets
            name="assets"
            initialAssets={assets}
            value={assetIds}
          />

          <JournalEntryFormLabel
            htmlFor="date"
            onClick={() => setDatePickerOpen(true)}>
            {t('date')}
          </JournalEntryFormLabel>

          <InfoDate>{t('choose_entry_date')}</InfoDate>

          <DatePicker
            id="date"
            locale={locale}
            name="date"
            required={true}
            value={date}
            open={datePickerOpen}
            setOpen={setDatePickerOpen}
          />

          <JournalEntryFormLabel htmlFor="pinned">{t('add_to_pinned_entries')}</JournalEntryFormLabel>

          <InputCheckbox
            id="pinned"
            name="pinned"
            value={pinned}
            label={t('pin')}
          />

          <Actions>
            <Btn
              type="submit"
              big
              disabled={submitting}>
              {submitLabel}
            </Btn>

            {journalEntry && <ButtonJournalEntryDelete journalEntry={journalEntry} />}
          </Actions>
        </Formsy>
      </Content>

      <Image src={journalForm} />
    </Container>
  )
}

JournalEntryForm.propTypes = {
  journalEntry: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default JournalEntryForm
