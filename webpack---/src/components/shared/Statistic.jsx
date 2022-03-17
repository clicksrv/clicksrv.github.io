import AnimatedNumber from 'react-animated-number'
import num from 'numeral'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { greyLight } from '../../colors'

import SectionSubtitle from '../SectionSubtitle'

const Label = styled(SectionSubtitle)`
  margin: 0 0 3px;
`

const Value = styled.p`
  color: ${greyLight};
  font-size: 24px;
  font-weight: 400;

  margin-bottom: 25px;
`

const Statistic = ({ label, value }) => (
  <>
    <Label>{label}</Label>

    <Value>
      <AnimatedNumber
        component="span"
        value={parseInt(value, 10)}
        duration={750}
        formatValue={(n) => num(n).format(0, 0)}>
        {value}
      </AnimatedNumber>
    </Value>
  </>
)

Statistic.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
}

export default Statistic
