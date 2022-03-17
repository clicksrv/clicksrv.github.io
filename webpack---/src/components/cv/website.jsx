import PropTypes from 'prop-types'
import { formatURL } from '../../helpers/cv'

const Website = ({ url, inEditor }) => {
  if (!url || !url.length) {
    return null
  }

  const label = url.replace(/https?:\/\/(www\.)?/i, '')

  let icon = 'globe'

  const icons = [
    'linkedin',
    'twitter',
    'facebook',
    'wordpress',
    'github',
    'vimeo',
    'gplus',
    'tumblr',
    'instagram',
    'pinterest',
    'dribbble',
    'behance',
    'skype',
  ]

  icons.forEach((name) => {
    const regex = new RegExp(name, 'i')

    if (regex.test(url)) {
      icon = name
      return false
    }
  })

  const handleClick = (event) => inEditor && event.preventDefault()

  return (
    <li className="website">
      <a
        href={formatURL(url)}
        target="_blank"
        onClick={handleClick}
        rel="noopener noreferrer nofollow">
        <i className={`fa fa-fw fa-${icon}`} />
        {label}
      </a>
    </li>
  )
}

Website.propTypes = {
  url: PropTypes.string,
  inEditor: PropTypes.bool,
}

export default Website
