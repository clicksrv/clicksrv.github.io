import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { useEffect, useState } from 'react'

import { greyLightest, primary, primaryFaded } from '../colors'

const sliderThumbStyling = css`
  appearance: none;
  background-color: white;
  border: 1px solid ${greyLightest};
  border-radius: 50%;
  box-shadow: 1px 1px 1px 0 ${primaryFaded};
  cursor: pointer;

  height: 16px;
  margin-top: 0;
  width: 16px;
`

const sliderTrackStyling = css`
  background-color: ${primary};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  height: 4px;
  width: 100%;
`

const InputRange = styled.input`
  appearance: none;
  border: none !important;
  background: transparent;
  box-sizing: content-box;

  height: 20px;
  width: 100%;

  &:hover,
  &:active,
  &:focus {
    background: transparent;
  }

  &::-ms-track {
    background: transparent;
    border-color: transparent;
    color: transparent;
    cursor: pointer;

    width: 100%;
  }

  &::-webkit-slider-thumb {
    ${sliderThumbStyling};

    margin-top: -6px;
  }

  &::-moz-range-thumb {
    ${sliderThumbStyling};
  }

  &::-ms-thumb {
    ${sliderThumbStyling};
  }

  &::-webkit-slider-runnable-track {
    ${sliderTrackStyling};
  }

  &::-moz-range-track {
    ${sliderTrackStyling};
  }

  &::-ms-track {
    ${sliderTrackStyling};
  }

  &::-ms-fill-lower {
    background: ${primary};
  }

  &::-ms-fill-upper {
    background: ${greyLightest};
  }
`

const Slider = ({ currentValue, min, max, onChange, step }) => {
  const getInitialValue = () => parseFloat(currentValue) || 0

  const initialValue = getInitialValue()
  const [value, setValue] = useState(initialValue)

  // this fixes Slider updates when changing formatting in Cover Letters
  useEffect(() => {
    if (value !== initialValue) {
      setValue(initialValue)
    }
  }, [value, initialValue])

  const onSliderChange = (e) => {
    e.stopPropagation()

    const v = e.target.value

    setValue(v)
    onChange(v)
  }

  return (
    <InputRange
      max={max}
      min={min}
      onChange={onSliderChange}
      step={step}
      type="range"
      value={value}
    />
  )
}

Slider.propTypes = {
  currentValue: PropTypes.any,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number,
}

Slider.defaultProps = {
  step: 1,
}

export default Slider
