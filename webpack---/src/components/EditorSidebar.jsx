import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import useSidebar from '../hooks/useSidebar'
import { greyLightest } from '../colors'
import { isResume, isWebsite } from '../helpers/cv'
import { media } from './styled/Grid'

import EditorSidebarExpandCollapse from './EditorSidebarExpandCollapse'
import EditorSidebarItem from './EditorSidebarItem'

const Container = styled.aside`
  background-color: white;
  border-right: 1px solid ${greyLightest};
  transition: left 0.4s, width 0.4s;
  z-index: 5; // so that EditorBar/EditorSidePane can be animated as sliding from underneath

  flex-direction: column;

  position: fixed;
  top: var(--nav-bar-height);
  left: ${({ sidebarOpen }) => (sidebarOpen ? 0 : 'calc(0px - var(--editor-sidebar-open-width))')};
  bottom: 0;

  display: flex;
  width: var(--editor-sidebar-open-width);

  ${media.md`
    transform: translateX(0);

    left: 0;

    width: var(--editor-sidebar-${({ sidebarState }) => sidebarState}-width);
  `}
`

const Items = styled.ul`
  list-style: none;
`

const EditorSidebar = ({ cv }) => {
  const { pane } = useParams()
  const { activateDefaultSidebarItem, activateSidebarItem, sidebarOpen, sidebarState } = useSidebar()

  useEffect(() => {
    if (pane) {
      activateSidebarItem(pane)
    } else {
      // if no pane is selected, default item should be selected
      activateDefaultSidebarItem(cv)
    }
  }, [cv.id, pane])

  const basePath = `/cvs/${cv.id}`

  return (
    <Container
      role="complementary"
      sidebarOpen={sidebarOpen}
      sidebarState={sidebarState}>
      <Items>
        <EditorSidebarItem
          item="appearance"
          to={`${basePath}/appearance`}
        />

        <EditorSidebarItem
          item="layout"
          to={`${basePath}/layout`}
        />

        {(isResume(cv) || isWebsite(cv)) && (
          <>
            <EditorSidebarItem
              item="samples"
              to={`${basePath}/samples`}
            />

            <EditorSidebarItem
              item="import"
              to={`${basePath}/import`}
            />

            <EditorSidebarItem
              item="templates"
              to={`${basePath}/templates`}
            />
          </>
        )}

        <EditorSidebarItem
          item="settings"
          to={`${basePath}/settings`}
        />

        <EditorSidebarItem
          item="history"
          to={`${basePath}/history`}
        />
      </Items>

      <EditorSidebarExpandCollapse />
    </Container>
  )
}

EditorSidebar.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default EditorSidebar
