import PropTypes from 'prop-types'
import styled from 'styled-components'
import { createPortal } from 'react-dom'

import history from '../services/history'
import { grey, greyDark } from '../colors'
import { media } from './styled/Grid'

const ModalOverlay = styled.div`
  height: 100%;
`

const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  overscroll-behavior: none;

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  min-height: 100%;
  min-width: 100vw;
  z-index: 30;
`

const ModalContainer = styled.div`
  border: none;
  border-radius: 0;
  background: none;
  overflow-y: scroll;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  margin: 0;
  min-height: inherit;
  min-width: inherit;
  padding: 0;
`

const ModalContent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;

  margin: 0 auto;
  max-width: ${({ maxWidth }) => maxWidth || 810}px;
  padding: 0;
  width: 100%;

  ${media.sm`
    top: 40px;
    right: 40px;
    left: 40px;

    width: calc(100% - 80px);
  `}
`

const ModalDialog = styled.div`
  animation-name: ${({ dismissable }) => (dismissable ? 'fadeInUpBig' : 'fadeInDown')};
  animation-duration: ${({ dismissable }) => (dismissable ? '0.5s' : '0.25s')};
  background-color: white;
  border-top-left-radius: ${({ dismissable }) => (dismissable ? '20px' : '0')};
  border-top-right-radius: ${({ dismissable }) => (dismissable ? '20px' : '0')};
  color: ${grey};
  overflow-y: scroll;
  pointer-events: auto;

  position: fixed;
  top: ${({ dismissable }) => (dismissable ? 'unset' : '0')};
  bottom: 0;
  left: 0;
  right: 0;

  height: ${({ dismissable }) => (dismissable ? 'max-content' : 'unset')};
  margin-top: auto;

  ${media.sm`
    animation-name: fadeInDown;
    animation-duration: 0.25s;
    border-radius: 8px;

    height: unset;
    position: relative;
    margin: unset;
    max-height: calc(100vh - 80px);
  `}

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${greyDark};
  }
`

const ModalHeader = styled.header`
  font-size: 20px;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: space-between;

  padding: 20px;
`

export const ModalSection = styled.section`
  height: inherit;
  padding: ${({ noPadding }) => (noPadding ? 'unset !important' : '20px 20px')};

  h1,
  h2,
  h3,
  h4 {
    margin-top: 0;
  }

  ${media.sm`
    height: initial;
    padding: 30px;
  `}

  ${media.md`
    padding: 40px 50px 50px;
  `}
`

const IconClose = styled.i`
  color: ${grey};
  cursor: pointer;
  font-size: 22px;
  z-index: 1;
`

const Modal = (props) => {
  const { bare, children, className, closeUrl, dismissable, header, isOpen, maxWidth, onClose, noPadding } = props

  const close = () => {
    if (onClose) {
      onClose()
    }

    if (closeUrl) {
      history.push(closeUrl)
    }
  }

  if (!isOpen) {
    return null
  }

  const closeable = onClose || closeUrl

  return createPortal(
    <ModalWrapper>
      <ModalContainer>
        <ModalOverlay onClick={close} />

        <ModalContent
          maxWidth={maxWidth}
          className={className}>
          {bare ? (
            <ModalDialog
              dismissable={dismissable}
              className="scrollable-container">
              {children}
            </ModalDialog>
          ) : (
            <ModalDialog
              dismissable={dismissable}
              className="scrollable-container animated">
              <ModalHeader>
                {header || <div />}
                {closeable && (
                  <IconClose
                    className="icon-close"
                    onClick={close}
                  />
                )}
              </ModalHeader>

              <ModalSection noPadding={noPadding}>{children}</ModalSection>
            </ModalDialog>
          )}
        </ModalContent>
      </ModalContainer>
    </ModalWrapper>,
    document.querySelector('#modalRoot')
  )
}

Modal.propTypes = {
  bare: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeUrl: PropTypes.string,
  dismissable: PropTypes.bool,
  header: PropTypes.node,
  isOpen: PropTypes.bool,
  maxWidth: PropTypes.number,
  onClose: PropTypes.func,
  noPadding: PropTypes.bool,
}

export default Modal
