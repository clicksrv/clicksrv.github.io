import PropTypes from 'prop-types'
import styled from 'styled-components'

import { black, grey } from '../colors'
import { buttonDanger, buttonHollow, buttonRegular } from '../styles/buttons'

import warning from '../assets/images/warning.svg'

import Modal from './Modal'

const Warning = styled.img`
  display: block;
  margin: 10px auto;
`

const Title = styled.h1`
  color: ${black};
  font-size: 20px;
  font-weight: 500;
  text-align: center;

  margin: 0 0 10px;
`

const Message = styled.p`
  color: ${grey};
  font-size: 15px;
  line-height: 140%;
  text-align: center;
`

const Buttons = styled.div`
  text-align: center;

  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center;

  margin: 30px auto 0;
`

const ButtonCancel = styled.a`
  ${buttonHollow}
`

const ButtonConfirm = styled.a`
  ${buttonRegular}

  ${({ danger }) => danger && buttonDanger}
`

const ModalConfirm = ({ cancelLabel, confirmLabel, danger, onCancel, onConfirm, message, title, ...props }) => (
  <Modal
    maxWidth={390}
    {...props}>
    <Warning
      alt={title}
      src={warning}
    />

    <Title>{title}</Title>

    {message && <Message>{message}</Message>}

    <Buttons>
      <ButtonCancel onClick={onCancel}>{cancelLabel}</ButtonCancel>

      <ButtonConfirm
        danger={danger}
        onClick={onConfirm}>
        {confirmLabel}
      </ButtonConfirm>
    </Buttons>
  </Modal>
)

ModalConfirm.propTypes = {
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  danger: PropTypes.bool,
  message: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  title: PropTypes.string.isRequired,
}

export default ModalConfirm
