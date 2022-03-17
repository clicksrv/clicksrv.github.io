import classNames from 'classnames/dedupe'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { transparentize } from 'polished'

import { flex } from '../themes/styles/shared/Mixins'
import { styleProps } from '../helpers/cv'

const elementBoxesSkewedStyling = css`
  background-color: ${({ primaryColor }) => primaryColor};
  transform: skewX(-30deg);

  height: 1em;
  margin-right: 2%;
  width: 8%;

  &:last-of-type {
    margin-right: 0;
  }
`

// separate styling for PDF is required to fix wkhtmltopdf ignoring opacity
const elementBoxesSkewedPdfStyling = css`
  background-color: ${({ primaryColor }) => transparentize(0.8, primaryColor)};
  opacity: 1;

  &.filled {
    background-color: ${({ primaryColor }) => primaryColor};
  }
`

const elementDashesStyling = css`
  background-color: ${({ secondaryColor }) => secondaryColor};
  border-radius: 1.5px;

  height: ${({ size }) => size};
  margin-right: 4%; // x9
  width: 6.4%; // x10

  &:last-of-type {
    margin-right: 0;
  }
`

const elementDotsStyling = css`
  background-color: ${({ primaryColor }) => primaryColor};
  border-radius: 50%;

  height: ${({ size }) => size};
  width: ${({ size }) => size};
`

const elementStarsStyling = css`
  &:last-of-type {
    margin-right: 0;
  }

  &:before {
    color: ${({ primaryColor }) => primaryColor};
    content: '\\e91e';
    font-family: 'Icons';
  }
`

// competency-list-element
const Element = styled.li`
  cursor: ${({ inEditor }) => (inEditor ? 'pointer' : 'initial')};
  opacity: 0.2;
  transition: opacity 0.3s;

  ${({ competencyStyle }) => competencyStyle === 'boxes-skewed' && elementBoxesSkewedStyling};
  ${({ competencyStyle, pdf }) => competencyStyle === 'boxes-skewed' && pdf && elementBoxesSkewedPdfStyling};
  ${({ competencyStyle }) => competencyStyle === 'dashes' && elementDashesStyling};
  ${({ competencyStyle }) => competencyStyle === 'dots' && elementDotsStyling};
  ${({ competencyStyle }) => competencyStyle === 'stars' && elementStarsStyling};

  &.filled {
    opacity: 1;
  }

  &.selected {
    && {
      opacity: 0.8;
    }
  }
`

const containerBoxesSkewedStyling = css`
  padding-left: 0.25em;
`

const containerDashesStyling = css`
  // specifying small font-size reduces vertical space this element occupies
  font-size: 40%;

  ${flex('1')}
`

const containerDotsStyling = css``

const containerStarsStyling = css``

const containerHoverStyles = css`
  &:hover {
    ${Element} {
      opacity: 0.15;
    }
  }
`

// competency-list
const Container = styled.ul`
  list-style: none;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 0.3em;
  width: 100%;

  ${({ competencyStyle }) => competencyStyle === 'boxes-skewed' && containerBoxesSkewedStyling};
  ${({ competencyStyle }) => competencyStyle === 'dashes' && containerDashesStyling};
  ${({ competencyStyle }) => competencyStyle === 'dots' && containerDotsStyling};
  ${({ competencyStyle }) => competencyStyle === 'stars' && containerStarsStyling};

  ${({ inEditor }) => inEditor && containerHoverStyles};
`

// supports the following styles: dots, dashes, stars
const CvSkillStripes = ({ cv, deselectValue, elementClasses, inEditor, onClick, pdf, selectValue }) => {
  const { competencySize, competencyStyle, primaryColor, secondaryColor } = styleProps(cv)

  const indices = [...Array(11).keys()].slice(1) // 1..10

  const handleClick = (index) => () => onClick(index)

  return (
    <Container
      className="competency-list"
      competencyStyle={competencyStyle}
      inEditor={inEditor}
      role="form">
      {indices.map((index) => (
        <Element
          className={classNames(elementClasses(index), 'competency-list-element')}
          competencyStyle={competencyStyle}
          inEditor={inEditor}
          key={`skill-element-${index}`}
          onClick={handleClick(index)}
          onMouseEnter={selectValue(index)}
          onMouseLeave={deselectValue}
          pdf={pdf}
          primaryColor={primaryColor}
          role="button"
          secondaryColor={secondaryColor}
          size={competencySize}
        />
      ))}
    </Container>
  )
}

CvSkillStripes.propTypes = {
  cv: PropTypes.object.isRequired,
  deselectValue: PropTypes.func.isRequired,
  elementClasses: PropTypes.func.isRequired,
  inEditor: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  pdf: PropTypes.bool,
  selectValue: PropTypes.func.isRequired,
}

export default CvSkillStripes
