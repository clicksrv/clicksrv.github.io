import styled from 'styled-components'
import Loader from 'react-loader-spinner'
import { green } from '../colors'

const Container = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;

  .inner {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const LoadingSpinner = () => (
  <Container>
    <div className="inner">
      <Loader
        type="Bars"
        color={green}
        height={50}
        width={50}
      />
    </div>
  </Container>
)

export default LoadingSpinner
