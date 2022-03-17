import PropTypes from 'prop-types'
import styled from 'styled-components'
import n from 'numeral'

import { grey, greyLightest, greySubtleBluish } from '../colors'
import { media } from './styled/Grid'
import { t } from '../locales'

import CheckoutOrderSummaryItem from './CheckoutOrderSummaryItem'
import CheckoutTitle from './CheckoutTitle'

const Container = styled.div`
  text-align: left;
`

const Table = styled.table`
  width: 100%;

  tbody {
    td:nth-child(2) {
      white-space: nowrap;

      padding-left: 0;
      padding-right: 0;
    }
  }

  td {
    color: ${grey};
    font-size: 14px;
    text-align: right;

    padding: 4px 0px;

    ${media.sm`
      padding: 4px 0px;
    `}
  }

  td:first-child {
    text-align: left;

    padding-right: 15px;
    width: 72%;
  }

  td:nth-child(2) {
    white-space: nowrap;
  }

  td:last-child {
    color: black;
    font-weight: 600;
    white-space: nowrap;

    padding-left: 12px;
  }

  tfoot {
    margin-top: 14px;
    padding-top: 12px;

    tr:first-child {
      td {
        border-bottom: 1px solid ${greyLightest};
      }
    }

    tr:nth-child(3) {
      td:first-child {
        background: ${greySubtleBluish};
        border-bottom-left-radius: 8px;
        border-top-left-radius: 8px;

        padding: 8px;
      }
      td:nth-child(2) {
        background: ${greySubtleBluish};
        border-bottom-right-radius: 8px;
        border-top-right-radius: 8px;

        padding: 8px;
      }
    }

    tr:last-child {
      td {
        border-top: 1px solid ${greyLightest};
      }
    }
  }
`

const Summary = styled.p`
  color: black;
  font-size: 16px;
  font-weight: 600;
  text-align: inherit;

  ${media.sm`
    font-size: 17px;
  `}

  margin: 0;
`

const CheckoutOrderSummary = ({ cart }) => {
  return (
    <Container>
      <CheckoutTitle>{t('your_order_summary')}</CheckoutTitle>

      <Table>
        <tbody>
          {cart.items.map((item, index) => (
            <CheckoutOrderSummaryItem
              item={item}
              key={index}
            />
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td
              height="12"
              colSpan="3"
            />
          </tr>
          <tr>
            <td
              height="12"
              colSpan="3"
            />
          </tr>
          <tr>
            <td colSpan="2">
              <Summary>{t('todays_charge')}</Summary>
            </td>
            <td>
              <Summary>{`${n(cart.total / 100).format('$0[.]00')} USD`}</Summary>
            </td>
          </tr>
          <tr>
            <td
              height="12"
              colSpan="3"
            />
          </tr>
          <tr>
            <td
              height="16"
              colSpan="3"
            />
          </tr>
        </tfoot>
      </Table>
    </Container>
  )
}

CheckoutOrderSummary.propTypes = {
  cart: PropTypes.object.isRequired,
}

export default CheckoutOrderSummary
