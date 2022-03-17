import styled from 'styled-components'

import useSidebar from '../hooks/useSidebar'
import { grey, white } from '../colors'
import { media } from './styled/Grid'
import { shadowBigPrimary } from '../styles'
import { t } from '../locales'

import Tooltip from './Tooltip'

const IconTooltip = styled(Tooltip)``

const Container = styled.div`
  cursor: pointer;

  display: none;
  align-items: center;

  position: absolute;
  bottom: 15px;
  right: -24px;

  :hover {
    ${IconTooltip} {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  ${media.md`
    display: flex;
  `}
`

const Title = styled.span`
  color: ${grey};
  font-size: 14px;
  font-weight: 400;

  margin-right: 20px;
`

const Dot = styled.span`
  ${shadowBigPrimary};

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 48px;
  width: 48px;
`

const Icon = styled.i`
  color: ${white};
  font-size: 15px;
  transition: transform 0.3s;
  transform: rotate(${({ sidebarOpen }) => (sidebarOpen ? 180 : 0)}deg);
  transform-origin: 50% 50%;
`

const EditorSidebarExpandCollapse = () => {
  const { sidebarOpen, toggleSidebar } = useSidebar()

  const title = sidebarOpen ? t('collapse') : t('expand')

  return (
    <Container onClick={toggleSidebar}>
      {sidebarOpen && <Title>{title}</Title>}

      <Dot>
        <Icon
          className="icon-chevron"
          sidebarOpen={sidebarOpen}
        />
      </Dot>

      {!sidebarOpen && <IconTooltip title={title} />}
    </Container>
  )
}

export default EditorSidebarExpandCollapse
