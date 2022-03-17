import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { lighten, transparentize } from 'polished'
import { useState } from 'react'

import debounce from '../helpers/debounce'
import { greyLightest, primary } from '../colors'
import { styleProps } from '../helpers/cv'

const containerHoverStyles = css`
  &:hover {
    background: linear-gradient(
      to top,
      ${transparentize(0.85, primary)} ${({ selectedHeight }) => selectedHeight}%,
      ${({ backgroundColor }) => transparentize(0.3, backgroundColor)} ${({ selectedHeight }) => selectedHeight}%
    );

    cursor: pointer;
  }
`

const Container = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 1px solid ${greyLightest};
  border-radius: 8px;
  color: ${({ foregroundColor }) => foregroundColor};
  font-family: ${({ headerFontFamily }) => headerFontFamily};
  font-size: ${({ bodyFontSize }) => bodyFontSize};
  font-weight: normal;
  letter-spacing: 1px;
  text-align: center;

  flex: none;

  margin-right: 20px;
  padding: 15px;

  transition: background 0.3s;

  height: ${({ size }) => size};
  width: ${({ size }) => size};

  ${({ inEditor }) => inEditor && containerHoverStyles};
`

const calculatePosition = (event) => {
  const clientRect = event.target.getBoundingClientRect()
  const targetY = clientRect.y
  const targetHeight = clientRect.height

  const selectionY = event.clientY

  // 0 - 10
  return 10 - Math.round(((selectionY - targetY) / targetHeight) * 10)
}

const CvSkillBox = ({ cv, inEditor, onClick, skillValue }) => {
  const [selecting, setSelecting] = useState(false)
  const [selectedValue, setSelectedValue] = useState(0) // 0-10

  const { backgroundColor, bodyFontSize, headerFontFamily, competencySize, primaryColor } = styleProps(cv)

  const handleClick = () => {
    if (!inEditor) {
      return
    }

    onClick(calculatePosition(event))
  }

  const handleMouseMove = (event) => {
    if (!inEditor) {
      return
    }

    setSelectedValue(calculatePosition(event))
  }

  const handleMouseMoveDebounced = debounce(handleMouseMove, 10)

  const handleMouseEnter = () => inEditor && setSelecting(true)
  const handleMouseLeave = () => inEditor && setSelecting(false)

  const displayedValue = selecting ? selectedValue : skillValue

  const filledHeight = 100

  const backgroundColorLighter = lighten(0.02, backgroundColor)

  return (
    <Container
      backgroundColor={backgroundColorLighter}
      bodyFontSize={bodyFontSize}
      foregroundColor={primaryColor}
      className="competency-level"
      filledHeight={filledHeight}
      headerFontFamily={headerFontFamily}
      inEditor={inEditor}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMoveDebounced}
      role="form"
      selectedHeight={selectedValue * 10}
      size={competencySize}>
      {displayedValue}
    </Container>
  )
}

CvSkillBox.propTypes = {
  cv: PropTypes.object.isRequired,
  inEditor: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  skillValue: PropTypes.number.isRequired,
}

export default CvSkillBox
