import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { propTypes, withFormsy } from 'formsy-react'

import {
  black,
  greenSuccess,
  greyDarker,
  greyLight,
  greyLighter,
  primary,
  primaryFaded,
  redDanger,
  redError,
  redErrorLighter,
  white,
} from '../colors'

import { t } from '../locales'

const searchContainerStyling = css`
  :after {
    color: ${greyLight};
    content: '\\e936';
    font-family: Icons;
    font-size: 16px;
    font-style: normal;
    line-height: 1;
    transition: color 0.3s;

    position: absolute;
    left: 12px;
    top: 13px;
  }

  :hover:after {
    color: ${primary};
  }
`

const Container = styled.div`
  margin-bottom: 25px;

  ${({ search }) => search && searchContainerStyling}
`

const Error = styled.span`
  color: ${redError};
  vertical-align: -8px;
`

const validStyling = css`
  border-color: ${greenSuccess};
`

const erroneousStyling = css`
  background-color: ${redErrorLighter};
  border-color: ${redDanger};
  color: ${redDanger};
`

const elementStyling = css`
  appearance: none;
  background-color: ${white};
  border: 1px solid ${greyLighter};
  border-radius: 4px;
  box-shadow: 0 2px 4px ${primaryFaded};
  color: ${greyDarker};
  font-size: ${({ small }) => (small ? 15 : 16)}px;
  transition: all 0.2s;

  padding: ${({ small }) => (small ? '11px 15px' : '13px 18px')};
  width: 100%;

  ::placeholder {
    color: ${greyLight};
    font-weight: 300;
  }

  &:hover {
    border-color: ${greyLight};
  }

  &:focus {
    background-color: ${white};
    border-color: ${primary};
    color: ${black};
  }

  ${(props) => props.isValid && !props.isPristine && validStyling}
  ${(props) => !props.isValid && !props.isPristine && erroneousStyling}
`

const searchElementStyling = css`
  padding-left: ${({ small }) => (small ? 35 : 38)}px;
`

const ElementInput = styled.input`
  ${elementStyling}

  ${({ search }) => search && searchElementStyling}
`

const ElementTextarea = styled.textarea`
  ${elementStyling}
`

/**
 * @param {boolean} search indicates this should act as a search field (with magnifying glass icon)
 * @param {string} type text/email/password/url/textarea (supported types)
 */
const Input = ({ className, type, ...props }) => {
  const { errorMessage, isPristine, isValid, search, setValue, showError, showRequired } = props

  const onChange = (event) => {
    setValue(event.currentTarget.value)
  }

  const elementProps = {
    ...props,
    onChange,
    onBlur: onChange,
  }

  return (
    <Container
      className={className}
      search={search}>
      {type !== 'textarea' && (
        <ElementInput
          type={type}
          {...elementProps}
        />
      )}

      {type === 'textarea' && <ElementTextarea {...elementProps} />}

      {showError && <Error>{errorMessage}</Error>}
      {!isPristine && !isValid && showRequired && <Error>{t('cannot_be_empty')}</Error>}
    </Container>
  )
}

Input.propTypes = {
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  search: PropTypes.bool,
  small: PropTypes.bool,
  type: PropTypes.string.isRequired,
  ...propTypes,
}

export default withFormsy(Input)
