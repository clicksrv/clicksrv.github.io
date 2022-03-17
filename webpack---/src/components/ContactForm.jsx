import PropTypes from 'prop-types'
import { FormBuilder } from './forms'
import { t } from '../locales'

const formSchema = {
  cv_slug: {
    type: 'hidden',
    required: true,
  },
  from_name: {
    label: t('your_name'),
    placeholder: t('your_name'),
    type: 'text',
    required: true,
  },
  from_email: {
    label: t('your_email'),
    placeholder: t('your_email'),
    type: 'email',
    required: true,
  },
  subject: {
    label: t('subject'),
    placeholder: t('enter_subject'),
    type: 'text',
    required: true,
  },
  body: {
    label: t('message'),
    placeholder: t('enter_message'),
    type: 'textarea',
    required: true,
  },
}

// submitting of this form is handled in jquery.cv.js
const ContactForm = ({ cv }) => {
  const formData = {
    cv_slug: cv.url,
    from_name: '',
    from_email: '',
    subject: '',
    body: '',
  }

  return (
    <>
      <FormBuilder
        formData={formData}
        schema={formSchema}
        submitLabel={t('send_message')}
      />
      <p className="success-message">{t('message_sent_successfully')}.</p>
    </>
  )
}

ContactForm.propTypes = {
  cv: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
}

export default ContactForm
