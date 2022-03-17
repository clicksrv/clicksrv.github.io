import PropTypes from 'prop-types'

import Input from '../forms/input'

import { t } from '../../locales'

const InputUrls = ({ value, setValue }) => {
  const urls = value || []

  if (urls.length < 2) {
    urls.push(null)
  }

  const updateValue = (event, index) => {
    urls[index] = event.currentTarget.value

    setValue(urls)
  }

  return (
    <>
      {urls.map((url, index) => (
        <Input
          key={index}
          name="website[]"
          type="text"
          placeholder={t('personal_website')}
          onKeyUp={(event) => updateValue(event, index)}
          value={url}
        />
      ))}
    </>
  )
}

InputUrls.propTypes = {
  setValue: PropTypes.func.isRequired,
  value: PropTypes.array,
}

export default InputUrls
