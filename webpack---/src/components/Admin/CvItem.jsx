import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { formatDate } from '../../helpers/dates'

const CvItem = ({ cv }) => {
  const locale = useSelector((state) => state.application.locale)

  const { id, url, name, createdAt, updatedAt } = cv

  return (
    <tr>
      <td>
        <Link to={`/cvs/${id}`}>{url}</Link>
      </td>
      <td>{name}</td>
      <td>{formatDate(createdAt, locale, { dateStyle: 'medium' })}</td>
      <td>{formatDate(updatedAt, locale, { dateStyle: 'medium' })}</td>
    </tr>
  )
}

CvItem.propTypes = {
  cv: PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
}

export default CvItem
