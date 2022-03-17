import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { math, transparentize } from 'polished'
import { useState } from 'react'

import debounce from '../helpers/debounce'
import { styleProps } from '../helpers/cv'

const Element = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ skewed }) => (skewed ? 'unset' : '2px')};
  transition: opacity 0.3s;

  height: 100%;
  width: ${({ filledWidth }) => filledWidth}%;
`

const containerHoverStyles = css`
  &:hover {
    background: linear-gradient(
      to right,
      ${({ backgroundColor }) => transparentize(0.2, backgroundColor)} ${({ selectedWidth }) => selectedWidth}%,
      ${({ backgroundColor }) => transparentize(0.85, backgroundColor)} ${({ selectedWidth }) => selectedWidth}%
    );

    ${Element} {
      display: none;
    }
  }
`

const Container = styled.div`
  background-color: ${({ backgroundColor }) => transparentize(0.8, backgroundColor)};
  border-radius: ${({ skewed }) => (skewed ? 'unset' : '2px')};
  cursor: ${({ inEditor }) => (inEditor ? 'pointer' : 'initial')};
  transform: ${({ skewed }) => (skewed ? 'skewX(-45deg)' : 'unset')};

  height: ${({ size }) => size};
  margin: ${({ articleMargins }) => math(`${articleMargins} * 0.1 + 0.3em`)} 0;

  ${({ inEditor }) => inEditor && containerHoverStyles};
`

const calculatePosition = (event) => {
  const clientRect = event.target.getBoundingClientRect()
  const targetX = clientRect.x
  const targetWidth = clientRect.width

  const selectionX = event.clientX

  // 0 - 10
  return Math.round(((selectionX - targetX) / targetWidth) * 10)
}

const CvSkillBar = ({ cv, inEditor, onClick, skillValue }) => {
  const [selectedWidth, setSelectedWidth] = useState(0) // 0-100

  const { articleMargins, competencySize, competencyStyle, primaryColor } = styleProps(cv)

  const handleClick = (event) => {
    if (!inEditor) {
      return
    }

    onClick(calculatePosition(event))
  }

  const handleMouseMove = (event) => {
    if (!inEditor) {
      return
    }

    setSelectedWidth(calculatePosition(event) * 10)
  }

  const handleMouseMoveDebounced = debounce(handleMouseMove, 10)

  const filledWidth = (skillValue || 0) * 10 // 0-100

  const skewed = competencyStyle === 'skewed'

  return (
    <Container
      articleMargins={articleMargins}
      backgroundColor={primaryColor}
      className="competency-bar"
      inEditor={inEditor}
      onClick={handleClick}
      onMouseMove={handleMouseMoveDebounced}
      role="form"
      selectedWidth={selectedWidth}
      size={competencySize}
      skewed={skewed}>
      <Element
        backgroundColor={primaryColor}
        className="competency-level"
        filledWidth={filledWidth}
        inEditor={inEditor}
        role="slider"
        skewed={skewed}
      />
    </Container>
  )
}

CvSkillBar.propTypes = {
  cv: PropTypes.object.isRequired,
  inEditor: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  skillValue: PropTypes.number.isRequired,
}

export default CvSkillBar
