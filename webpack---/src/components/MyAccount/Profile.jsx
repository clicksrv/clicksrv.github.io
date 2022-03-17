import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useState } from 'react'
import conf from '../../conf'
import { media } from '../styled/Grid'
import { t } from '../../locales'
import events from '../../services/events'
import { FormBuilder, updatePasswordFormSchema } from '../forms'
import CTAField from '../forms/cta-field'
import ProfileImageInput from '../forms/input-profile-image'
import { Btn } from '../styled/Button'
import { PanelWithMargin as Panel, PanelTitle } from '../styled/Panel'
import { trackEvent } from '../../helpers/analytics'

const Container = styled.div`
  .settings-remove-thumb {
    margin-bottom: 0;
  }

  ${media.md`
    .settings-profile-image {
      float: right;
      width: 47%;
      text-align: center;
      padding: 0 8%;

      .media-input div {
        flex-direction: column;

        & > div {
          align-self: center;
        }

        & > div + div {
          margin-left: 0;
          margin-top: 10px;
        }
      }
    }

    .settings-first-name,
    .settings-last-name {
      width: 47%;

      input {
        width: 100%;
      }
    }
  `}
`

const FIRST_COUNTRIES = ['US', 'GB', 'CA', 'AU', 'IN', 'CN'].reduce((map, code) => {
  map[code] = conf.countries[code]
  return map
}, {})

const optionsMap = (options) =>
  Object.keys(options).reduce((memo, key) => memo.concat({ label: options[key], value: key }), [])

const generateSchemas = () => ({
  infoSchema: {
    thumb: {
      label: t('profile_image'),
      customType: ProfileImageInput,
      required: false,
      className: 'settings-profile-image',
    },
    remove_thumb: {
      className: 'settings-remove-thumb',
      type: 'hidden',
    },
    first_name: {
      label: t('first_name'),
      type: 'text',
      required: true,
      className: 'settings-first-name',
    },
    last_name: {
      label: t('last_name'),
      type: 'text',
      className: 'settings-last-name',
    },
    headline: {
      label: t('headline'),
      type: 'text',
      required: false,
    },
    notifications: {
      label: t('enable_resume_tracking'),
      type: 'checkbox',
    },
  },

  accountInfoSchema: {
    email: {
      label: t('email'),
      type: 'text',
      required: true,
    },
    time_zone: {
      label: t('time_zone'),
      type: 'select',
      style: { width: '47%', float: 'left' },
      options: optionsMap(conf.timezones),
    },
    locale: {
      label: t('language'),
      type: 'select',
      style: { width: '47%', float: 'right' },
      options: optionsMap(conf.languages),
    },
  },

  contactSchema: {
    mobile: {
      label: t('mobile'),
      type: 'text',
    },
    country_code: {
      label: t('country_code'),
      type: 'select',
      nullable: true,
      priorityOptions: optionsMap(FIRST_COUNTRIES),
      options: optionsMap(conf.countries),
    },
    region: {
      label: t('region'),
      type: 'text',
    },
    municipality: {
      label: t('municipality'),
      type: 'text',
    },
  },
})

const Profile = ({ user }) => {
  const [canChangePassword, setCanChangePassword] = useState(false)
  const [removeThumb, setRemoveThumb] = useState(false)

  const updateUser = (formData) => {
    trackEvent('updated-profile', 'interaction')

    events.emit('SETTINGS::PATCH', formData)
  }

  const updatePassword = (formData) => {
    trackEvent('updated-password', 'interaction')

    events.emit('PASSWORD::PATCH', formData)
  }

  const enableChangePasswordButton = () => {
    setCanChangePassword(true)
  }

  const disableChangePasswordButton = () => {
    setCanChangePassword(false)
  }

  const { accountInfoSchema, infoSchema, contactSchema } = generateSchemas()

  const dataForSchema = (schema) =>
    Object.keys(schema).reduce((memo, key) => {
      memo[key] = user[key]
      return memo
    }, {})

  const infoData = Object.assign({}, dataForSchema(infoSchema), { remove_thumb: removeThumb })

  const contactData = dataForSchema(contactSchema)

  const accountInfoData = dataForSchema(accountInfoSchema)

  const savePasswordBtn = (
    <Btn
      type="submit"
      disabled={!canChangePassword}>
      {t('save')}
    </Btn>
  )

  const passwordData = {
    current_password: '',
    password: '',
    password_confirmation: '',
  }

  const passwordChangePanel = (
    <Panel>
      <PanelTitle>{t('change_password')}</PanelTitle>

      <FormBuilder
        formData={passwordData}
        schema={updatePasswordFormSchema}
        submitBtn={savePasswordBtn}
        onValid={enableChangePasswordButton}
        onInvalid={disableChangePasswordButton}
        onValidSubmit={updatePassword}
      />
    </Panel>
  )

  const handleInfoChange = ({ thumb }) => setRemoveThumb(!thumb)

  return (
    <Container>
      <Panel>
        <PanelTitle>{t('profile_info')}</PanelTitle>

        <FormBuilder
          formData={infoData}
          schema={infoSchema}
          submitLabel={t('save')}
          onValidSubmit={updateUser}
          onChange={handleInfoChange}
        />
      </Panel>

      <Panel>
        <PanelTitle>{t('account_info')}</PanelTitle>

        <CTAField
          name={t('account_tier')}
          tier={user.tier}
          paidTier={user.paid_tier}
        />

        <FormBuilder
          formData={accountInfoData}
          schema={accountInfoSchema}
          submitLabel={t('save')}
          onValidSubmit={updateUser}
        />
      </Panel>

      {!user.oauth && passwordChangePanel}

      <Panel>
        <PanelTitle>{t('contact_info')}</PanelTitle>

        <FormBuilder
          formData={contactData}
          schema={contactSchema}
          submitLabel={t('save')}
          onValidSubmit={updateUser}
        />
      </Panel>
    </Container>
  )
}

Profile.propTypes = {
  user: PropTypes.object,
}

export default Profile
