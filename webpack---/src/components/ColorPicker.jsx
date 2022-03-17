import PropTypes from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components'
import { getLuminance } from 'polished'
import { CustomPicker } from 'react-color'
import { EditableInput, Hue, Saturation } from 'react-color/lib/components/common'

import { grey, greyLightest, primaryFaded, redDanger, redErrorLighter, transparent, white } from '../colors'
import { t } from '../locales'

const ContainerSaturation = styled.div`
  height: 150px;
  margin: 10px 9px;
  min-width: 270px;
  position: relative;
`

const PointerSaturation = styled.div`
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px #fff, 0 0 1px 1px rgba(0, 0, 0, 0.8);
  cursor: pointer;
  transform: translate(-6px, -6px);

  height: 12px;
  width: 12px;
`

const ContainerHue = styled.div`
  height: 16px;
  margin: 10px 9px;
  position: relative;
`

const PointerHue = styled.div`
  background-color: white;
  border: 1px solid ${greyLightest};
  border-radius: 50%;
  box-shadow: 0 1px 1px 0 ${primaryFaded};
  cursor: pointer;
  transform: translate(-45%, -2px);

  height: 22px;
  width: 22px;
`

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;

  margin: 10px 9px;
`

const ContainerTextInput = styled.div`
  margin-right: 25px;
`

const ContainerSingleColors = styled.div``

const Title = styled.p`
  color: ${grey};
  font-size: 12px;
  font-weight: 600;
  line-height: 200%;

  margin: 0;
`

const SingleColor = styled.span`
  background-color: ${(props) => props.backgroundColor};
  border: 1px solid ${(props) => (getLuminance(props.backgroundColor) > 0.95 ? greyLightest : transparent)};
  border-radius: 50%;
  cursor: pointer;

  display: inline-block;
  height: 24px;
  margin-top: 2px;
  margin-right: 4px;
  width: 24px;

  &:last-child {
    margin-right: 0;
  }
`

const isValidColor = (color) => /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)

const ColorPicker = ({ hsl, hsv, hex, onChange, defaultColors }) => {
  const [valid, setValid] = useState(true)

  const inputStyle = () => ({
    input: {
      backgroundColor: valid ? white : redErrorLighter,
      border: `1px solid ${greyLightest}`,
      borderRadius: 4,
      color: valid ? grey : redDanger,
      fontSize: 13,
      fontWeight: 500,
      height: 20,
      padding: '13px 8px',
      width: 80,
    },
  })

  // Make black and white always available
  const availableColors = defaultColors.concat(['#000000', '#FFFFFF'])

  const handleInputChange = (hexValue, event) => {
    event.nativeEvent.stopImmediatePropagation()

    if (isValidColor(hexValue)) {
      setValid(true)

      onChange(hexValue, event)
    } else {
      setValid(false)
    }
  }

  return (
    <>
      <ContainerSaturation>
        <Saturation
          hsl={hsl}
          hsv={hsv}
          onChange={onChange}
          pointer={PointerSaturation}
        />
      </ContainerSaturation>

      <ContainerHue>
        <Hue
          hsl={hsl}
          hsv={hsv}
          onChange={onChange}
          pointer={PointerHue}
          direction="horizontal"
        />
      </ContainerHue>

      <Footer>
        <ContainerTextInput>
          <Title>Hex</Title>

          <EditableInput
            value={hex}
            style={inputStyle()}
            onChange={handleInputChange}
          />
        </ContainerTextInput>

        <ContainerSingleColors>
          <Title>{t('cv_colors')}</Title>

          {availableColors.map((color, index) => (
            <SingleColor
              key={index}
              backgroundColor={color}
              onClick={() => onChange(color)}
            />
          ))}
        </ContainerSingleColors>
      </Footer>
    </>
  )
}

ColorPicker.propTypes = {
  hsl: PropTypes.object,
  hsv: PropTypes.object,
  hex: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  defaultColors: PropTypes.array.isRequired,
}

export default CustomPicker(ColorPicker)
