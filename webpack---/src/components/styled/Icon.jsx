import PropTypes from 'prop-types'
import styled from 'styled-components'
import customIcons from './icons'

const Container = styled.div`
  display: inline-flex;
`

const CustomIcon = styled.svg`
  height: ${(props) => props.height || 26}px;
  width: ${(props) => props.width || 26}px;
  fill: ${(props) => (props.color ? `${props.color} !important` : '#888')};
`

const Icon = (props) => {
  const { custom, icon, arrow, social, className, ...rest } = props

  const renderCustomIcon = (icon) => {
    const defaultWidth = icon === 'menu' ? 4 : 26
    const defaultHeight = icon === 'menu' ? 22 : 26
    const { color, height = defaultHeight, viewBox, width = defaultWidth } = props
    const Geometry = customIcons[icon]

    return (
      <CustomIcon
        width={width}
        height={height}
        viewBox={viewBox}
        color={color}>
        <Geometry />
      </CustomIcon>
    )
  }

  if (custom) {
    return (
      <Container
        {...rest}
        className={className}>
        {renderCustomIcon(custom)}
      </Container>
    )
  }

  if (icon) {
    return (
      <Container
        {...rest}
        className={className}>
        <i className={`icon_${icon}`} />
      </Container>
    )
  }

  if (social) {
    return (
      <Container
        {...rest}
        className={className}>
        <i className={`social_${social}`} />
      </Container>
    )
  }

  if (arrow) {
    return (
      <Container
        {...rest}
        className={className}>
        <i className={`arrow_${arrow}`} />
      </Container>
    )
  }

  return null
}

Icon.propTypes = {
  arrow: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  custom: PropTypes.string,
  height: PropTypes.number,
  icon: PropTypes.string,
  social: PropTypes.string,
  viewBox: PropTypes.string,
  width: PropTypes.number,
}

export default Icon
