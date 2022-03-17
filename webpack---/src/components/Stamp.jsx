import PropTypes from 'prop-types'
import styled from 'styled-components'

const Icon = styled.i`
  background-color: ${({ $color }) => $color};
  border-radius: 4px;
  color: white;
  font-size: 24px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  margin-right: 12px;
  height: 32px;
  width: 32px;
`

const Stamp = ({ color, icon }) => (
  <Icon
    className={`icon-${icon}`}
    $color={color}
    role="img"
  />
)

Stamp.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}

export default Stamp
