import PropTypes from 'prop-types'
import styled from 'styled-components'

import { primary } from '../colors'

const Discount = styled.p`
  color: ${primary};
  font-size: 13px;
  font-weight: 700;

  margin: 10px 0 0 0;
`

const CheckoutOrderSummaryItem = ({ item }) => {
  const { quantity, description, note, waived, price_description: priceDescription } = item

  const displayDetails = quantity < 6
  const isFree = priceDescription === '$0'

  return (
    <tr>
      <td colSpan="2">
        {description}

        {note && <Discount>{note}</Discount>}
      </td>

      <td>{displayDetails && !waived && isFree ? 'FREE' : displayDetails && priceDescription}</td>
    </tr>
  )
}

CheckoutOrderSummaryItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default CheckoutOrderSummaryItem
