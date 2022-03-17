import Formsy from 'formsy-react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { black, greenSuccess, grey, greyLight } from '../colors'
import { t } from '../locales'
import { useState } from 'react'

import Icon from './styled/Icon'
import Input from './Input'
import PageTitle from './PageTitle'
import PageParagraph from './PageParagraph'
import { Btn } from './styled/Button'

const Content = styled.div`
  margin: 20px auto 0;
  max-width: 450px;
`

const ReasonSelect = styled.div`
  border: 1px solid ${(props) => (props.selected ? greenSuccess : greyLight)};
  border-radius: 3px;
  color: ${(props) => (props.selected ? black : grey)};
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 50px;
  padding: 0 15px;
  margin-bottom: 10px;

  i {
    color: ${(props) => (props.selected ? greenSuccess : grey)};
    font-size: 20px;
  }
`

const Info = styled.p`
  color: ${grey};
  font-size: 14px;
  font-weight: 300;

  margin-top: 20px;
`

const Survey = ({ title, deleteAccount, actionText, onComplete }) => {
  const [reasonProvided, setReasonProvided] = useState(false)
  const [feedbackProvided, setFeedbackProvided] = useState(false)

  const [feedback, setFeedback] = useState('')
  const [reason, setReason] = useState('')
  const [selectedPredefinedReason, setSelectedPredefinedReason] = useState(null)
  const [customReason, setCustomReason] = useState('')

  const selectPredefinedReason = (value) => () => {
    setSelectedPredefinedReason(value)
    setCustomReason('')
    setReason(value)
    setReasonProvided(true)
  }

  const onChange = (form) => {
    if (form.reason !== '') {
      setSelectedPredefinedReason(null)
      setReasonProvided(true)
      setReason(form.reason)
    }

    if (form.reason === '' && !selectedPredefinedReason) {
      setReasonProvided(false)
      setReason('')
    }

    if (form.feedback !== '') {
      setFeedbackProvided(true)
      setFeedback(form.feedback)
    } else {
      setFeedbackProvided(false)
      setFeedback('')
    }
  }

  const complete = () => onComplete({ reason, feedback })

  const predefinedReasons = ['I got a job', 'I can’t afford the subscription', 'VisualCV is too hard to use']

  const reasonAndFeedbackProvided = reasonProvided && feedbackProvided

  return (
    <>
      <Formsy onChange={onChange}>
        <PageTitle>{title}</PageTitle>

        <Content>
          <PageParagraph as="h2">{t('why_leaving')} *</PageParagraph>

          {predefinedReasons.map((predefined, i) => {
            const selected = predefined === selectedPredefinedReason

            return (
              <ReasonSelect
                key={predefined}
                onClick={selectPredefinedReason(predefined)}
                selected={selected}>
                <div>{t(`downgrade_reason${i + 1}`)}</div>
                {selected && <Icon icon="check" />}
              </ReasonSelect>
            )
          })}

          <Input
            type="text"
            name="reason"
            placeholder={t('other_downgrade_reason')}
            value={customReason}
          />

          <PageParagraph as="h3">{t('feedback_prompt')} *</PageParagraph>

          <Input
            type="textarea"
            name="feedback"
            value={feedback}
          />

          <Btn
            disabled={!reasonAndFeedbackProvided}
            onClick={complete}>
            {actionText}
          </Btn>

          {deleteAccount && <Info>{t('delete_account_details')}</Info>}
        </Content>
      </Formsy>
    </>
  )
}

Survey.propTypes = {
  title: PropTypes.string.isRequired,
  deleteAccount: PropTypes.bool,
  actionText: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired,
}

export default Survey
