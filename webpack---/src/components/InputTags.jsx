import PropTypes from 'prop-types'
import styled from 'styled-components'
import { propTypes, withFormsy } from 'formsy-react'
import { useRef, useState } from 'react'

import {
  black,
  greyDarker,
  greyLight,
  greyLighter,
  primary,
  primaryFaded,
  primaryLighter,
  primaryLightest,
  white,
} from '../colors'

import { t } from '../locales'

const Container = styled.div`
  background-color: ${white};
  border: 1px solid ${(props) => (props.focused ? primary : greyLighter)};
  border-radius: 4px;
  box-shadow: 0 2px 4px ${primaryFaded};
  cursor: text;
  transition: all 0.2s;

  padding: 6px 20px 5px 10px;
  position: relative;
  margin-bottom: 25px;

  &:hover {
    border-color: ${greyLight};
  }
`

const AddTag = styled.a`
  background-color: ${primaryLightest};
  border-radius: 50%;
  font-size: 120%;
  font-weight: 700;

  position: absolute;
  right: 12px;
  bottom: 15px;

  padding: 3px;
`

const Tags = styled.ul`
  list-style: none;

  display: flex;
  align-items: center;
  flex-wrap: wrap;

  padding: 6px 0 0;
  max-width: calc(100% - 15px);
`

const Tag = styled.li`
  background-color: ${primaryLighter};
  border-radius: 12px;
  color: ${primary};
  font-size: 14px;
  font-weight: 500;

  flex: 0 1 auto;

  display: inline-block;
  padding: 4px 6px 4px 14px;
  margin: 0 4px 8px;
`

const ContainerInput = styled.li`
  flex: 1 1 auto;

  display: inline-flex;

  margin: 0 4px 8px;
`

const IconDelete = styled.span`
  background-color: ${primary};
  border-radius: 50%;
  color: ${primaryLighter};
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  transition: all 0.2s;

  display: inline-block;

  height: 19px;
  margin-left: 8px;
  width: 19px;

  &:hover {
    color: ${primaryLightest};
  }
`

const Input = styled.input`
  appearance: none;
  border: none;
  outline: none;
  color: ${greyDarker};
  font-size: ${(props) => (props.small ? 15 : 16)}px;

  flex: 1 1 auto;

  min-width: 100px;
  max-width: 100%;

  ::placeholder {
    color: ${greyLight};
    font-weight: 300;
  }

  &:focus {
    color: ${black};
  }
`

const InputTags = ({ id, value, setValue }) => {
  const [inputValue, setInputValue] = useState('')
  const [focused, setFocused] = useState(false)

  const inputRef = useRef(null)

  const focusInput = () => {
    if (!inputRef.current) {
      return
    }

    inputRef.current.focus()
    setFocused(true)
  }

  const addTag = () => {
    const tag = inputValue.trim()

    // only add unique tags
    if (!value.includes(tag) && tag !== '') {
      setValue(value.concat(tag))
    }

    setInputValue('')
  }

  const deleteTag = (tagToRemove) => (event) => {
    event.stopPropagation()

    setValue(value.filter((tag) => tag !== tagToRemove))
  }

  const onChange = (event) => {
    setInputValue(event.currentTarget.value)
  }

  const onKeyDown = (event) => {
    // pressing tab, enter, comma, period or semicolon will create a new tag
    if ([9, 13, 188, 190, 186].includes(event.keyCode)) {
      event.preventDefault()

      addTag()
    }
  }

  const onBlur = () => {
    setFocused(false)

    addTag()
  }

  return (
    <Container
      focused={focused}
      onClick={focusInput}>
      {inputValue && (
        <AddTag
          onclick={addTag}
          className="icon-plus"
        />
      )}

      <Tags>
        {value.map((tag, index) => (
          <Tag key={`tag${index}`}>
            {tag}

            <IconDelete onClick={deleteTag(tag)}>×</IconDelete>
          </Tag>
        ))}

        <ContainerInput>
          <Input
            id={id}
            ref={inputRef}
            placeholder={t('new_tag')}
            type="text"
            value={inputValue}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
          />
        </ContainerInput>
      </Tags>

      <input
        name="tags[]"
        type="hidden"
        value={value}
      />
    </Container>
  )
}

InputTags.propTypes = {
  id: PropTypes.string,
  ...propTypes,
}

export default withFormsy(InputTags)
