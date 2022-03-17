import styled from 'styled-components'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import api from '../services/api'
import history from '../services/history'
import notify from '../services/notify'
import { media } from './styled/Grid'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import Content from './styled/Content'
import Cv from './Cv'
import EditorNavBar from './EditorNavBar'
import PreviewBarShareDownload from './PreviewBarShareDownload'

const Container = styled(Content)`
  padding-top: calc(var(--preview-bar-height) + 10px);

  ${media.sm`
    padding-top: calc(var(--preview-bar-height) + 20px);
  `}

  && {
    .mce-item-table {
      border: none;

      td,
      th,
      caption {
        border: none;
      }
    }
  }
`

const Preview = () => {
  const { id } = useParams()
  const cv = useSelector((state) => state.editor.cv)

  const onLoadingCvError = () => {
    history.push('/cvs')

    notify.error(t('cv_loading_error'))
  }

  useEffect(() => {
    trackEvent('previewed-cv', 'interaction')
  }, [id])

  useEffect(() => {
    if (!cv || !cv.id) {
      api.getCv(id).catch(onLoadingCvError)
    }
  }, [id, cv])

  return (
    <>
      <EditorNavBar cv={cv} />

      <PreviewBarShareDownload cv={cv} />

      <Container>
        <Cv
          className="cv-viewer cv-preview"
          cv={cv}
        />
      </Container>
    </>
  )
}

export default Preview
