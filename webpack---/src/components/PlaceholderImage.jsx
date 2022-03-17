import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import PlaceholderImageGeometry from './PlaceholderImageGeometry'

const greenStyling = css`
  .background {
    fill: #ecfbf7;
  }

  .dark-shape {
    fill: #8de5d1;
  }

  .light-shape {
    fill: #d3f2b2;
  }
`

const orangeStyling = css`
  .background {
    fill: #feefe5;
  }

  .dark-shape {
    fill: #faa064;
  }

  .light-shape {
    fill: #f9d2d2;
  }
`

const blueStyling = css`
  .background {
    fill: #e5f4fe;
  }

  .dark-shape {
    fill: #64bbfd;
  }

  .light-shape {
    fill: #c1edff;
  }
`

const purpleStyling = css`
  .background {
    fill: #f7e8fb;
  }

  .dark-shape {
    fill: #9f84fd;
  }

  .light-shape {
    fill: #e9bcf5;
  }
`

const greyStyling = css`
  ${blueStyling}

  filter: grayscale(1);
`

// viewBox="0 0 328 328" height="328" width="328"
const Container = styled.svg`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  height: 205px;
  width: 100%;

  ${({ color }) => color === 'green' && greenStyling};
  ${({ color }) => color === 'orange' && orangeStyling};
  ${({ color }) => color === 'blue' && blueStyling};
  ${({ color }) => color === 'purple' && purpleStyling};
  ${({ color }) => color === 'grey' && greyStyling};
`

const PlaceholderImage = ({ className, index, locked }) => {
  const colors = ['green', 'orange', 'blue', 'purple']
  const color = locked ? 'grey' : colors[index % colors.length]

  return (
    <Container
      className={className}
      color={color}
      viewBox="109 150 109 150">
      <PlaceholderImageGeometry />
    </Container>
  )
}

PlaceholderImage.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number.isRequired,
  locked: PropTypes.bool,
}

export default PlaceholderImage
