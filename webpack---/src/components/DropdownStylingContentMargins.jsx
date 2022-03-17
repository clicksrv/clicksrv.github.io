import PropTypes from 'prop-types'
import styled from 'styled-components'

import { primary } from '../colors'

import Slider from './Slider'

const Container = styled.div`
  box-sizing: content-box;

  display: flex;
  align-items: center;

  padding: 10px 16px 16px;
  width: 250px;
`

const Icon = styled.span`
  color: ${primary};
  font-size: 16px;
  font-weight: 700;

  margin-right: 13px;
`

const Value = styled.span`
  color: black;
  font-size: 14px;
  font-weight: 700;

  margin-left: 13px;
`

const DropdownStylingContentMargins = ({ currentValue, selectValue }) => {
  const unit = 'em'

  const changeValue = (value) => {
    selectValue(`${value}${unit}`)
  }

  const percentageValue = `${Math.round(parseFloat(currentValue) * 100)}%`

  return (
    <Container>
      <Icon className="icon-margins-alt" />

      <Slider
        currentValue={currentValue}
        min={0}
        max={4.0}
        step={0.1}
        onChange={changeValue}
      />

      <Value>{percentageValue}</Value>
    </Container>
  )
}

DropdownStylingContentMargins.propTypes = {
  currentValue: PropTypes.string.isRequired,
  selectValue: PropTypes.func.isRequired,
}

export default DropdownStylingContentMargins
