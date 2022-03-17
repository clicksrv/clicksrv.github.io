import PropTypes from 'prop-types'

import conf from '../conf'

import { DropdownItem, DropdownList } from './Dropdown'

const DropdownStylingContentFontFamilies = ({ currentValue, selectValue }) => {
  const options = Object.keys(conf.fonts).map((value) => ({
    label: conf.fonts[value].name,
    value,
  }))

  return (
    <DropdownList>
      {options.map(({ label, value }) => (
        <DropdownItem
          selected={value === currentValue}
          onClick={() => selectValue(value)}
          key={value}>
          {label}
        </DropdownItem>
      ))}
    </DropdownList>
  )
}

DropdownStylingContentFontFamilies.propTypes = {
  currentValue: PropTypes.string.isRequired,
  selectValue: PropTypes.func.isRequired,
}

export default DropdownStylingContentFontFamilies
