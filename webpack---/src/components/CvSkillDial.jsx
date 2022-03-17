import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useState } from 'react'

import debounce from '../helpers/debounce'
import { styleProps } from '../helpers/cv'
import { flex } from '../themes/styles/shared/Mixins'

// competency-dial
const Container = styled.div`
  ${flex('none')}

  height: ${({ size }) => size};
  margin-right: 15px;
  position: relative;
  width: ${({ size }) => size};
`

const Level = styled.div`
  font-size: 125%;
  transform: translate(-50%, -50%);

  position: absolute;
  left: 50%;
  top: 50%;
`

const Svg = styled.svg`
  height: ${({ size }) => size};
  width: ${({ size }) => size};

  &:hover {
    cursor: ${({ inEditor }) => (inEditor ? 'pointer' : 'unset')};
  }
`

const OuterCircle = styled.circle`
  fill: ${({ foregroundColor }) => foregroundColor};
  opacity: 0.2;
`

const FilledPath = styled.path`
  fill: ${({ foregroundColor }) => foregroundColor};
  opacity: ${({ selecting }) => (selecting ? 0.6 : 1)};
  transition: opacity 0.3s;
`

const InsideCircle = styled.circle`
  fill: ${({ backgroundColor }) => backgroundColor};
  stroke: ${({ backgroundColor }) => backgroundColor};
  stroke-width: 22px;
`

const InnermostCircle = styled.circle`
  fill: ${({ foregroundColor }) => foregroundColor};
  opacity: 0.2;
  stroke: ${({ foregroundColor }) => foregroundColor};
  stroke-width: 17px;
`

const calculateValue = (event) => {
  const { target } = event

  // one of the inner circles might have received the event
  const svg = target.tagName === 'svg' ? target : target.parentNode
  const svgRect = svg.getBoundingClientRect()
  const svgX = svgRect.x
  const svgY = svgRect.y
  const svgWidth = svgRect.width
  const svgHeight = svgRect.height

  // force non-integer calculation to avoid NaN results
  const selectionX = event.clientX + 0.01
  const selectionY = event.clientY + 0.01

  // middle of the circle
  const midX = svgX + svgWidth / 2
  const midY = svgY + svgHeight / 2

  // construct a triangle between 1) middle 2) clicked point and 3) topmost
  // point of the circle
  const distanceA = Math.sqrt(Math.pow(midX - selectionX, 2) + Math.pow(midY - selectionY, 2))
  const distanceB = Math.sqrt(Math.pow(midX - selectionX, 2) + Math.pow(midY - distanceA - selectionY, 2))

  // calculate half of the angle of the above triangle (near the midpoint)
  const angleRad = Math.acos(Math.sqrt(Math.pow(distanceA, 2) - Math.pow(distanceB / 2, 2)) / distanceA)

  // then double it
  const angleDeg = (2 * angleRad * 180) / Math.PI

  // values 5-10
  const angleAbove180 = selectionX < midX

  const angle = angleAbove180 ? 180 + (180 - angleDeg) : angleDeg

  // there are 10 pizza slices, each 36degs
  const value = Math.round(angle / 36)

  return value
}

const CvSkillDial = ({ cv, inEditor, onClick, skillValue }) => {
  const [selecting, setSelecting] = useState(false)
  const [selectedValue, setSelectedValue] = useState(0) // 0-10

  const { backgroundColor, competencySize, primaryColor } = styleProps(cv)

  const handleClick = (event) => {
    if (!inEditor) {
      return
    }

    onClick(calculateValue(event))
  }

  const handleMouseMove = (event) => {
    if (!inEditor) {
      return
    }

    setSelectedValue(calculateValue(event))
  }

  const handleMouseMoveDebounced = debounce(handleMouseMove, 10)

  const handleMouseEnter = () => inEditor && setSelecting(true)
  const handleMouseLeave = () => inEditor && setSelecting(false)

  const displayedValue = selecting ? selectedValue : skillValue

  const percentage = (displayedValue || 0) * 10 // 0-100

  const diameter = 60
  const r = diameter / 2
  const unit = (2 * Math.PI) / 100
  const startAngle = 0
  const endAngle = percentage * unit - 0.001
  const x1 = r + r * Math.sin(startAngle)
  const y1 = r - r * Math.cos(startAngle)
  const x2 = r + r * Math.sin(endAngle)
  const y2 = r - r * Math.cos(endAngle)
  const big = endAngle - startAngle > Math.PI ? 1 : 0

  const d =
    `M ${r}, ${r}` + // Start at circle center
    ` L ${x1}, ${y1}` + // Draw line to (x1, y1)
    ` A ${r}, ${r}` + // Draw an arc of radius r
    ` 0 ${big} 1` + // Arc details...
    ` ${x2}, ${y2}` + // Arc goes to (x2, y2)
    ` Z` // Close path back to (cx, cy)

  return (
    <Container
      className="competency-dial"
      role="form"
      size={competencySize}>
      <Level className="competency-level">{displayedValue}</Level>

      <Svg
        inEditor={inEditor}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMoveDebounced}
        role="figure"
        size={competencySize}
        viewBox="0 0 60 60">
        <OuterCircle
          cx="30"
          cy="30"
          r="30"
          foregroundColor={primaryColor}
        />

        <FilledPath
          foregroundColor={primaryColor}
          selecting={selecting}
          d={d}
        />

        <InsideCircle
          cx="30"
          cy="30"
          r="15"
          backgroundColor={backgroundColor}
        />

        <InnermostCircle
          cx="30"
          cy="30"
          r="13"
          foregroundColor={primaryColor}
        />
      </Svg>
    </Container>
  )
}

CvSkillDial.propTypes = {
  cv: PropTypes.object.isRequired,
  inEditor: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  skillValue: PropTypes.number.isRequired,
}

export default CvSkillDial
