import CopyToClipboard from 'react-copy-to-clipboard'
import Formsy from 'formsy-react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useEffect, useState } from 'react'

import api from '../../services/api'
import conf from '../../conf'
import events from '../../services/events'
import history from '../../services/history'
import notify from '../../services/notify'
import store from '../../services/store'
import { companyUsers } from '../../transforms/admin'
import { green } from '../../colors'
import { t } from '../../locales'

import Icon from '../styled/Icon'
import Input from '../Input'
import Modal from '../Modal'
import SectionTitle from '../SectionTitle'
import { Btn, IconButton } from '../styled/Button'

const Submit = styled(Btn)``

const CopyToClipboardContainer = styled.div`
  position: absolute;
  right: 11px;
  top: 9px;
`

const SuccessMessage = styled.div`
  color: ${green};
  margin-top: 10px;
`

const NewUserModal = ({ path, isOpen, company }) => {
  const [copied, setCopied] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    events.emit('ADMIN::GET_COMPANY')
  }, [])

  const closeModal = () => {
    history.push(path || '/company')
  }

  const onCopied = () => setCopied(true)

  const onInvited = (data) => {
    setSubmitting(false)

    store.dispatch({ type: 'ADMIN::INVITE_USER', data: companyUsers([data])[0] })

    notify.success(t('new_user_invited'))

    closeModal()
  }

  const onError = (error) => {
    setSubmitting(false)
    setErrors({ email: error?.response?.data })
  }

  const handleSubmit = (data) => {
    setSubmitting(true)

    api.inviteCompanyUser(data).then(onInvited).catch(onError)
  }

  const url = `${conf.host}/app/signup?referrer=${company.key}`

  return (
    <Modal
      maxWidth={770}
      closeUrl={path}
      isOpen={isOpen}>
      <SectionTitle>{t('new_user')}</SectionTitle>

      <Formsy
        onSubmit={handleSubmit}
        validationErrors={errors}>
        <Input
          type="text"
          name="first_name"
          placeholder={t('first_name')}
          autoComplete="on"
          required={true}
          value=""
        />

        <Input
          type="text"
          name="last_name"
          placeholder={t('last_name')}
          autoComplete="on"
          required={true}
          value=""
        />

        <Input
          type="email"
          name="email"
          placeholder={t('email')}
          autoComplete="email"
          required
          value=""
        />

        <Submit
          type="submit"
          big
          fluid
          disabled={submitting}>
          {t('create_and_send_invite')}
        </Submit>
      </Formsy>

      <div style={{ position: 'relative', flex: 1, marginTop: 30 }}>
        <Formsy>
          <Input
            name="url"
            type="text"
            disabled
            value={url}
          />
        </Formsy>

        <CopyToClipboardContainer>
          <CopyToClipboard
            text={url}
            onCopy={onCopied}>
            <IconButton>
              <Icon icon="clipboard" />
            </IconButton>
          </CopyToClipboard>
        </CopyToClipboardContainer>

        {copied && (
          <SuccessMessage>
            <Icon icon="check" /> {t('copied_url')}
          </SuccessMessage>
        )}
      </div>
    </Modal>
  )
}

NewUserModal.propTypes = {
  company: PropTypes.object,
  isOpen: PropTypes.bool,
  path: PropTypes.string,
  success: PropTypes.bool,
}

export default NewUserModal
