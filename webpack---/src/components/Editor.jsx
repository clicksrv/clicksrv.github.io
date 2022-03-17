import classNames from 'classnames'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import api from '../services/api'
import history from '../services/history'
import notify from '../services/notify'
import usePageBreaks from '../hooks/usePageBreaks'
import useSidebar from '../hooks/useSidebar'
import { media } from './styled/Grid'
import { primaryFaded, primaryGreyish } from '../colors'
import { t } from '../locales'

import Content from './styled/Content'
import Cv from './Cv'
import EditArticleModal from './EditArticleModal'
import EditAssetModal from './EditAssetModal'
import EditorBarAppearance from './EditorBarAppearance'
import EditorBarPageLayout from './EditorBarPageLayout'
import EditorNavBar from './EditorNavBar'
import EditorSidebar from './EditorSidebar'
import EditorSidebarExpandCollapseMobile from './EditorSidebarExpandCollapseMobile'
import EditorSidePaneAppearance from './EditorSidePaneAppearance'
import EditorSidePaneHistory from './EditorSidePaneHistory'
import EditorSidePaneImport from './EditorSidePaneImport'
import EditorSidePanePageLayout from './EditorSidePanePageLayout'
import EditorSidePaneSamples from './EditorSidePaneSamples'
import EditorSidePaneSettings from './EditorSidePaneSettings'
import EditorSidePaneTemplates from './EditorSidePaneTemplates'
import LoadingSpinner from './LoadingSpinner'
import TinyMCEStyles from './TinyMCEStyles'

const Container = styled.section`
  transition: margin 0.3s;

  // extra padding to display on-hover section editing controls (at least a part of them)
  padding: 10px;

  ${media.md`
    margin-left: 60px;
    margin-top: calc(var(--nav-bar-height));
  `}

  ${media.xl`
    margin-left: var(--editor-sidebar-${({ sidebarState }) => sidebarState}-width);
  `}

  .cv-editor {
    .cv-container {
      margin: 0 auto 80px;
    }

    // disable some styling of headers in editor (we don't persist headers styling)
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      [contenteditable] {
        i {
          font-style: inherit;
        }

        b {
          font-weight: inherit;
        }
      }
    }

    // section hovers

    section {
      outline: 2px dashed transparent;
      outline-offset: 7px;
      transition: outline 0.2s;

      position: relative;

      &:hover {
        outline-color: ${primaryGreyish};

        .section-edit {
          opacity: 1;
          visibility: visible;
        }
      }
    }

    // article hovers

    article {
      outline: 2px dashed transparent;
      transition: outline 0.2s, background-color 0.2s;

      position: relative;

      &:hover {
        background-color: ${primaryFaded};
        outline-color: ${primaryGreyish};

        .article-edit {
          opacity: 1;
          visibility: visible;
        }
      }
    }

    &.page-break-mode {
      section:hover,
      span:hover,
      p:hover,
      .mce-content-body:hover {
        outline-color: transparent;
      }

      article:hover {
        background-color: initial;
        outline-color: transparent;
      }
    }

    // Custom hover effects for specific sections

    section[data-bind='profile'],
    section[data-bind='profile_sidebar'] {
      &:hover {
        outline-color: transparent;
      }

      article:hover {
        background-color: initial;
      }
    }

    section.text_story {
      article:hover {
        background-color: initial;
      }
    }
  }
`

const Editor = () => {
  const { id } = useParams()

  const { sidebarState } = useSidebar()
  const { pageBreaksMode } = usePageBreaks()

  const assetMatch = useRouteMatch({ path: '/cvs/:id/articles/:sectionKey/assets/:assetIndex', exact: true })
  const assetModal = assetMatch ? <EditAssetModal params={assetMatch.params} /> : null

  const articleMatch = useRouteMatch({ path: '/cvs/:id/articles/:sectionKey/:index?', exact: true })
  const articleModal = articleMatch ? <EditArticleModal params={articleMatch.params} /> : null

  const cv = useSelector((state) => state.editor.cv)

  const onLoadingCvError = () => {
    history.push('/cvs')

    notify.error(t('cv_loading_error'))
  }

  useEffect(() => {
    api.getCv(id).catch(onLoadingCvError)
  }, [id])

  if (isNaN(cv.id)) {
    return <LoadingSpinner />
  }

  const cvClassNames = classNames('cv-editor', { 'page-break-mode': pageBreaksMode })

  return (
    <>
      <TinyMCEStyles
        inEditor
        sidebarState={sidebarState}
      />

      <EditorNavBar cv={cv} />
      <EditorSidebar cv={cv} />

      <EditorBarAppearance cv={cv} />
      <EditorBarPageLayout cv={cv} />

      <EditorSidePaneAppearance cv={cv} />
      <EditorSidePanePageLayout cv={cv} />
      <EditorSidePaneSamples cv={cv} />
      <EditorSidePaneImport cv={cv} />
      <EditorSidePaneTemplates cv={cv} />
      <EditorSidePaneSettings cv={cv} />
      <EditorSidePaneHistory cv={cv} />

      <EditorSidebarExpandCollapseMobile />

      <Content>
        <Container
          className="scrollable-container"
          sidebarState={sidebarState}>
          <Cv
            className={cvClassNames}
            cv={cv}
            editing={true}
            inEditor={true}
          />
        </Container>
      </Content>

      {articleModal || assetModal}
    </>
  )
}

export default Editor
