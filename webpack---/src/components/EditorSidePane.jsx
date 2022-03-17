import PropTypes from 'prop-types'
import styled from 'styled-components'

import useSidebar from '../hooks/useSidebar'
import { grey, greyLightest } from '../colors'
import { media } from './styled/Grid'
import { t } from '../locales'

import EditorSidePaneTitle from './EditorSidePaneTitle'

const Container = styled.aside`
  background-color: white;
  overflow: scroll;
  overscroll-behavior: none;
  transition: left 0.4s, width 0.4s;
  z-index: 6; // displayed on top of EditorSidebar (on mobile)

  position: fixed;
  bottom: 0;
  left: ${({ active }) => (active ? 0 : '-100vw')};
  top: var(--nav-bar-height);

  padding: 20px;
  width: 100%;

  ${media.md`
    border-right: 1px solid ${greyLightest};
    transform: translateX(0);
    z-index: ${({ active }) => (active ? 4 : 1)}; // displayed underneath EditorSidebar

    left: ${({ active, sidebarState, sidePaneWidth }) =>
      active
        ? `var(--editor-sidebar-${sidebarState}-width)`
        : `calc(0px - ${sidePaneWidth} + var(--editor-sidebar-${sidebarState}-width))`};

    max-width: ${({ sidePaneWidth }) => sidePaneWidth};
    width: calc(100% - var(--editor-sidebar-${({ sidebarState }) => sidebarState}-width));
  `}
`

const Header = styled.header`
  background-color: white;
  z-index: 1;

  position: sticky;
  top: -20px;

  margin: -20px -20px 10px;
  padding: 20px;
`

const Icon = styled.i`
  color: ${grey};
  cursor: pointer;
  font-size: 16px;

  position: absolute;
  top: 20px;
  right: 20px;
`

const EditorSidePaneTitleCentered = styled(EditorSidePaneTitle)`
  text-align: center;
`

const titles = {
  appearance: 'appearance',
  history: 'revision_history',
  import: 'import_cv',
  layout: 'page_layout',
  samples: 'resume_samples',
  settings: 'settings',
  templates: 'select_template',
}

const EditorSidePane = ({ active, className, children, cv, item }) => {
  const { activateDefaultSidebarItem, sidebarState } = useSidebar()

  const closePane = () => activateDefaultSidebarItem(cv)

  // Templates and Samples are always 100% of available width
  const fullWidth = ['samples', 'templates'].includes(item)
  const sidePaneWidth = fullWidth ? '100%' : 'var(--editor-side-pane-width)'

  return (
    <Container
      active={active}
      className={className}
      sidebarState={sidebarState}
      sidePaneWidth={sidePaneWidth}>
      <Header>
        {!fullWidth && <EditorSidePaneTitle>{t(titles[item])}</EditorSidePaneTitle>}

        {fullWidth && <EditorSidePaneTitleCentered>{t(titles[item])}</EditorSidePaneTitleCentered>}

        <Icon
          className="icon-close"
          onClick={closePane}
        />
      </Header>

      {children}
    </Container>
  )
}

EditorSidePane.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  cv: PropTypes.object.isRequired,
  item: PropTypes.string,
}

export default EditorSidePane
