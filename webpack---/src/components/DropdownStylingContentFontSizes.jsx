import PropTypes from 'prop-types'
import styled from 'styled-components'

import { primary } from '../colors'

import Slider from './Slider'

const Container = styled.div`
  box-sizing: content-box;

  display: flex;
  align-items: center;

  min-width: 250px;
  padding: 16px;
`

const AaIcon = styled.span`
  color: ${primary};
  font-size: 16px;
  font-weight: 500;

  margin-right: 13px;
`

const Value = styled.span`
  color: black;
  font-size: 14px;
  font-weight: 700;

  margin-left: 13px;
`

const DropdownStylingContentFontSizes = ({ currentValue, selectValue }) => {
  const unit = 'px'

  const changeValue = (value) => {
    selectValue(`${value}${unit}`)
  }

  return (
    <Container>
      <AaIcon>Aa</AaIcon>

      <Slider
        currentValue={currentValue}
        min={11}
        max={22}
        step={1}
        onChange={changeValue}
      />

      <Value>{currentValue}</Value>
    </Container>
  )
}

DropdownStylingContentFontSizes.propTypes = {
  currentValue: PropTypes.string.isRequired,
  selectValue: PropTypes.func.isRequired,
}

export default DropdownStylingContentFontSizes
