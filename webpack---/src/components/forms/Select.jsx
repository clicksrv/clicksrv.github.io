import PropTypes from 'prop-types'
import styled from 'styled-components'

import { primaryLight, primaryLightest } from '../../colors'

const SelectContainer = styled(({ altStyle, ...rest }) => <div {...rest} />)`
  position: relative;

  select {
    appearance: none;
    background-color: ${primaryLightest};
    border-radius: 8px;
    border: 1px solid ${primaryLight};
    color: #333;
    line-height: 1.4em;

    display: block;
    height: 49px;
    padding: 0 35px 0 15px;
    width: 100%;
  }

  &:after {
    font-family: FontAwesome;
    speak: none;
    font-size: 24px;
    content: '\f107';
    position: absolute;
    right: 11px;
    top: 13px;
    color: #333;
    pointer-events: none;
    line-height: 100%;
  }

  ${({ altStyle }) =>
    altStyle &&
    `
    select {
      height: 35px;
      background-color: rgba(0,0,0,0);
      border: 1px solid #999;
    }

    &:after {
      top: 4px;
    }
  `}
`

const Select = ({ altStyle, ...selectProps }) => (
  <SelectContainer altStyle={altStyle}>
    <select {...selectProps} />
  </SelectContainer>
)

Select.propTypes = {
  altStyle: PropTypes.bool,
}

Select.defaultProps = {
  altStyle: false,
}

export default Select
