import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Flip, ToastContainer } from 'react-toastify'

import { greenSuccess, redDanger } from '../colors'

import 'react-toastify/dist/ReactToastify.css'

const CloseButton = ({ closeToast }) => <span onClick={closeToast}>×</span>

CloseButton.propTypes = {
  closeToast: PropTypes.func,
}

// prettier-ignore
const Notifications = styled(props => <ToastContainer transition={Flip} closeButton={<CloseButton />} {...props} />)`
  && {
    padding: 0;
    right: 0;
    top: var(--nav-bar-height);
    width: 100%;
  }

  .Toastify__toast {
    border-radius: 0;
    box-shadow: none;
    text-align: center;

    margin-bottom: 1px;
    min-height: auto;
    padding: 7px 15px;

    span {
      font-size: 16px;

      margin-left: 7px;
      margin-top: 4px;
    }

    a {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: underline;
    }
  }

  .Toastify__toast-body {
    margin: 0 auto;
  }

  .Toastify__toast--error {
    background-color: ${redDanger};
  }

  .Toastify__toast--success {
    background-color: ${greenSuccess};
  }

  .Toastify__toast-body {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 300;

    @supports (font-variation-settings: normal) {
      font-family: 'InterVariable', sans-serif;
    }
  }

  .Toastify__progress-bar {
    background-color: rgba(255, 255, 255, 0.35);

    height: 2px;
  }
`

export default Notifications
