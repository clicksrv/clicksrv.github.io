import PropTypes from 'prop-types'
import styled from 'styled-components'

import { black, greenSuccess, grey, greyLightest, primary, primaryFaded } from '../colors'
import { media } from './styled/Grid'
import { t } from '../locales'

const Container = styled.aside`
  box-shadow: 0 1px 1px 0 ${primaryFaded};

  display: flex;
  justify-content: space-around;

  margin: 0;

  // minus margin so that box shadow fits whole width
  ${media.sm`
    margin: 0 -10px;
  `}

  ${media.md`
    margin: 0 -20px;
  `}
`

const Content = styled.div`
  margin: 0 20px;
  max-width: 100%;
  padding-bottom: 20px;
  width: 100px;

  ${media.sm`
    max-width: 850px;
    width: 100%;
  `}
`

const Bar = styled.section`
  background-color: transparent;
  border-radius: 3px;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 3px;
  margin: 25px auto 10px;
  position: relative;

  ${media.sm`
    background-color: ${greyLightest};

    display: block;
    max-width: ${({ barWidth }) => barWidth}%;
  `}
`

const Progress = styled.em`
  background-color: ${greenSuccess};
  border-radius: 3px;

  display: none;
  height: 3px;
  width: ${({ progress }) => progress}%;

  ${media.sm`
    display: block;
  `}
`

const Dot = styled.i`
  background-color: ${(props) => (props.completed ? greenSuccess : greyLightest)};
  border-radius: 4px;

  display: block;
  margin: 0 4px;
  height: 8px;
  width: 8px;

  ${media.sm`
    transform: translateX(-6px);

    position: absolute;
    left: ${({ progress }) => progress}%;
    top: -3px;
  `}
`

const DotCurrent = styled(Dot)`
  background-color: ${primary};

  top: -5px;

  height: 8px;
  width: 16px;

  ${media.sm`
    border-radius: 50%;

    height: 13px;
    width: 13px;
  `}
`

const Steps = styled.ul`
  display: none;

  ${media.sm`
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    grid-template-columns: 1fr;
  `}
`

const Step = styled.li`
  text-align: center;
`

const Name = styled.p`
  color: ${(props) => (props.active ? black : grey)};
  font-size: 12px;
  font-weight: ${(props) => (props.active ? 600 : 400)};

  ${media.sm`
    font-size: 13px;
  `}

  ${media.md`
    font-size: 14px;
  `}
`

const FunnelProgress = ({ className, step: currentStep, steps }) => {
  const stepProgress = (step) => {
    const stepIndex = steps.indexOf(step)

    return (stepIndex / (steps.length - 1)) * 100
  }

  const isCompleted = (step) => {
    const stepIndex = steps.indexOf(step)
    const currentStepIndex = steps.indexOf(currentStep)

    return stepIndex < currentStepIndex
  }

  // Dynamic width of the progress bar so that the dots match step names
  const barWidth = () => {
    switch (steps.length) {
      case 2:
        return 52
      case 3:
        return 68
      case 4:
        return 76
      case 5:
        return 80
    }
  }

  return (
    <Container className={className}>
      <Content>
        <Bar
          barWidth={barWidth()}
          role="progressbar">
          <Progress progress={stepProgress(currentStep)}></Progress>

          {steps.map((step) =>
            step === currentStep ? (
              <DotCurrent
                key={step}
                progress={stepProgress(step)}
              />
            ) : (
              <Dot
                key={step}
                completed={isCompleted(step)}
                progress={stepProgress(step)}
              />
            )
          )}
        </Bar>

        <Steps>
          {steps.map((step) => (
            <Step key={step}>
              <Name active={step === currentStep}>{t(step)}</Name>
            </Step>
          ))}
        </Steps>
      </Content>
    </Container>
  )
}

FunnelProgress.propTypes = {
  className: PropTypes.string,
  step: PropTypes.string.isRequired,
  steps: PropTypes.array.isRequired,
}

export default FunnelProgress
