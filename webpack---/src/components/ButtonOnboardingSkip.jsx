import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import useOnboarding from '../hooks/useOnboarding'
import { media } from './styled/Grid'
import { primary } from '../colors'
import { t } from '../locales'

const Btn = styled.a`
  color: ${primary};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  display: flex;
  align-items: center;

  position: absolute;
  top: 22px;
  right: 30px;

  ${media.md`
    top: 27px;
  `}
`

const Icon = styled.i`
  font-size: 15px;

  margin: 0 8px 1px 0;
`

const ButtonOnboardingSkip = () => {
  const { pathname } = useLocation()
  const { finishOnboarding, finishCheckoutOnboarding } = useOnboarding()

  const onClick = () => {
    if (pathname.startsWith('/uploaded')) {
      finishCheckoutOnboarding()
    } else {
      finishOnboarding()
    }
  }

  return (
    <Btn onClick={onClick}>
      <Icon className="icon-close" />
      {t('skip')}
    </Btn>
  )
}

export default ButtonOnboardingSkip
