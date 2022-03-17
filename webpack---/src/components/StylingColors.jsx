import PropTypes from 'prop-types'
import styled from 'styled-components'

import api from '../services/api'
import conf from '../conf'
import debounce from '../helpers/debounce'

import ColorPicker from './ColorPicker'
import { DropdownNav, DropdownNavTab } from './Dropdown'
import { t } from '../locales'

const Nav = styled(DropdownNav)`
  padding-left: 9px;
  padding-right: 9px;
`

// updateCv needs to be defined outside of the component for debounce to work
const updateCv = (cv, element, value) => {
  const updatedCv = {
    id: cv.id,
    style: {
      ...cv.style,
      [element]: value,
    },
  }

  api.updateCv(updatedCv)
}

const updateCvDebounced = debounce(updateCv, 300)

const StylingColors = ({ currentElement, currentValue, cv, setCurrentElement, setCurrentValue }) => {
  const cvStyleValue = (element) => cv.style[element]

  const defaultStyles = conf.themes[cv.theme].styles

  const allElements = ['@primary', '@secondary', '@link', '@background']
  const elements = allElements.filter((element) => defaultStyles[element])

  const defaultColors = elements.map((element) => defaultStyles[element])

  const selectValue = (value) => {
    setCurrentValue(value)

    if (value !== cvStyleValue) {
      updateCvDebounced(cv, currentElement, value)
    }
  }

  const editElement = (element) => () => {
    setCurrentElement(element)
    setCurrentValue(cvStyleValue(element))
  }

  const handleChangeComplete = ({ hex }) => selectValue(hex)

  // 'unfinished' color change (dragging/typing) event
  const handleChange = ({ hex }) => setCurrentValue(hex)

  return (
    <>
      <Nav>
        {elements.map((element) => (
          <DropdownNavTab
            key={element}
            active={currentElement === element}
            onClick={editElement(element)}>
            {t(element.replace('@', ''))}
          </DropdownNavTab>
        ))}
      </Nav>

      <ColorPicker
        color={currentValue}
        defaultColors={defaultColors}
        onChange={handleChange}
        onChangeComplete={handleChangeComplete}
      />
    </>
  )
}

StylingColors.propTypes = {
  currentElement: PropTypes.string,
  currentValue: PropTypes.string,
  cv: PropTypes.object.isRequired,
  setCurrentElement: PropTypes.func.isRequired,
  setCurrentValue: PropTypes.func.isRequired,
}

export default StylingColors
