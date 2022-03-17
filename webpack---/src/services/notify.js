import styled from 'styled-components'
import {
    toast
} from 'react-toastify'

import icons from '../components/styled/icons'

const CheckmarkSvg = styled.svg `
  fill: white;

  height: 13px;
  margin-right: 15px;
  transform: scale(1.6);
  width: 13px;
`

const WarningSvg = styled.svg `
  fill: white;

  height: 10px;
  margin-right: 13px;
  transform: scale(1.6);
  width: 10px;
`

const CheckmarkGeometry = icons.checkmark
const WarningGeometry = icons.warning

const IconCheckmark = () => ( <
    CheckmarkSvg viewBox = "0 0 26 26" >
    <
    CheckmarkGeometry / >
    <
    /CheckmarkSvg>
)
const IconWarning = () => ( <
    WarningSvg viewBox = "0 0 13 13" >
    <
    WarningGeometry / >
    <
    /WarningSvg>
)

const notify = {
    success: (notification, options) =>
        toast.success( <
            >
            <
            IconCheckmark / > {
                notification
            } <
            />,
            options
        ),
    error: (notification, options) =>
        toast.error( <
            >
            <
            IconWarning / > {
                notification
            } <
            />,
            options
        ),
}

export default notify