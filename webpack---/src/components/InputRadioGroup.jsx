import PropTypes from 'prop-types'
import styled from 'styled-components'
import { propTypes, withFormsy } from 'formsy-react'

const Container = styled.div`
  margin-bottom: 15px;
`

const Label = styled.label`
  cursor: pointer;

  display: flex;
`

const Input = styled.input`
  cursor: pointer;

  height: 20px;
  margin-right: 8px;
`

const InputRadioGroup = ({ value, setValue, items, name, ...props }) => {
  const handleChange = (e) => setValue(e.currentTarget.value)

  return items.map((item, index) => (
    <Container key={index}>
      <Label>
        <Input
          {...props}
          name={name}
          type="radio"
          value={item.value}
          checked={item.value === value}
          onChange={handleChange}
        />

        {item.label}
      </Label>
    </Container>
  ))
}

InputRadioGroup.propTypes = {
  items: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  ...propTypes,
}

export default withFormsy(InputRadioGroup)
