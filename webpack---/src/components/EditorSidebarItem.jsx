import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import useSidebar from '../hooks/useSidebar'
import { black, grey, primary, primaryLighter, primaryLightest, transparent } from '../colors'
import { t } from '../locales'

import Tooltip from './Tooltip'

const icons = {
  appearance: 'brush-alt',
  layout: 'margins-alt',
  samples: 'document-alt',
  import: 'upload-alt',
  templates: 'blocks-alt',
  settings: 'gear-alt',
  history: 'clock-alt',
}

const translationKeys = {
  appearance: 'appearance',
  layout: 'page_layout',
  samples: 'use_sample_content',
  import: 'import_resume',
  templates: 'change_template',
  settings: 'settings',
  history: 'history',
}

const Title = styled.span`
  color: ${({ active }) => (active ? black : grey)};
  font-size: 14px;
  font-weight: 400;
  opacity: ${({ sidebarOpen }) => (sidebarOpen ? 1 : 0)};
  overflow: hidden;
  transition: all 0.3s;
  text-transform: capitalize;
  white-space: nowrap;

  width: ${({ sidebarOpen }) => (sidebarOpen ? 100 : 0)}%;
`

const ItemTooltip = styled(Tooltip)``

const Container = styled.li`
  background-color: ${({ active }) => (active ? primaryLighter : transparent)};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  margin: 5px;
  position: relative;

  :hover {
    background-color: ${({ active }) => (active ? primaryLighter : primaryLightest)};

    ${ItemTooltip} {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }

    ${Title} {
      color: ${black};
    }
  }

  :active {
    background-color: ${primaryLighter};
  }
`

const Item = styled(Link)`
  display: flex;
  align-items: center;

  margin: 0;
`

const Icon = styled.i`
  color: ${primary};
  font-family: 'Icons';
  font-size: 25px;
  transition: padding 0.3s;

  padding: 14px ${({ sidebarOpen }) => (sidebarOpen ? 18 : 12)}px;
`

const EditorSidebarItem = ({ item, to }) => {
  const { sidebarOpen, sidebarItem, activateSidebarItem } = useSidebar()

  const active = item === sidebarItem
  const title = t(translationKeys[item])

  const handleClick = () => activateSidebarItem(item)

  return (
    <Container
      active={active}
      onClick={handleClick}>
      <Item to={to}>
        <Icon
          sidebarOpen={sidebarOpen}
          className={`icon-${icons[item]}`}
        />

        <Title
          sidebarOpen={sidebarOpen}
          active={active}>
          {title}
        </Title>
      </Item>

      {!sidebarOpen && <ItemTooltip title={title} />}
    </Container>
  )
}

EditorSidebarItem.propTypes = {
  item: PropTypes.string.isRequired,
  to: PropTypes.string,
}

export default EditorSidebarItem
