import Formsy from 'formsy-react'
import styled from 'styled-components'
import { useRouteMatch } from 'react-router-dom'
import { useState } from 'react'

import conf from '../conf'
import useCvs from '../hooks/useCvs'
import { copyCv, createCv } from '../helpers/cv'
import { dateFromISOString, dateToISOString } from '../helpers/dates'
import { media } from './styled/Grid'
import { t } from '../locales'

import CvNewActions from './CvNewActions'
import Hyperlink from './styled/Hyperlink'
import PageParagraph from './PageParagraph'
import PageTitle from './PageTitle'
import Select from './Select'

const Container = styled.div`
  background: white;
  overflow: hidden;

  min-height: calc(100vh - var(--nav-bar-height));
  padding: 15px;

  ${media.sm`
    padding: 20px;
  `}

  ${media.md`
    padding: 20px;
  `}
`

const Content = styled.article`
  margin: 0 auto;
  max-width: 1100px;
`

const Title = styled(PageTitle)`
  margin-bottom: 60px;
`

const ContainerCvCopy = styled.section`
  display: flex;
  justify-items: center;
  align-content: center;

  margin: 0 auto 50px;
  max-width: 500px;

  form {
    flex: 1;

    margin-right: 10px;
  }

  ${media.md`
    max-width: 650px;
  `}
`

const CvNew = () => {
  const { cvs } = useCvs()
  const [copyCvId, setCopyCvId] = useState(cvs?.[0]?.id)
  const [coverLetterCreated, setCoverLetterCreated] = useState(false)

  const routeMatch = useRouteMatch({ path: '/:typePluralized/new', exact: true })
  const { typePluralized } = routeMatch.params
  const type = typePluralized.replace('-', '_').slice(0, -1)

  const coverLetter = type === 'cover_letter'

  const createCoverLetter = () => {
    setCoverLetterCreated(true)

    const theme = conf.defaults[type].theme
    const style = conf.themes[theme].styles

    const params = { type, style }

    return createCv('cover-letter', params)
  }

  const createFromCopy = () => {
    const originalCv = cvs.find((el) => el.id === copyCvId)

    return copyCv(type, originalCv)
  }

  const updateCopyCvId = (newCvId) => setCopyCvId(Number(newCvId))

  if (coverLetter && !coverLetterCreated) {
    createCoverLetter()

    return null
  }

  if (coverLetterCreated) {
    return null
  }

  const options = cvs.map((cv) => ({
    label: `${cv.name} - ${dateToISOString(dateFromISOString(cv.updated_at))}`,
    value: cv.id,
  }))

  return (
    <Container>
      <Content>
        <Title>{t('create_new_cv')}</Title>

        {cvs && cvs.length > 0 && (
          <>
            <PageParagraph as="h2">{t('copy_existing_cv')}</PageParagraph>

            <ContainerCvCopy>
              <Formsy>
                <Select
                  name="cv"
                  onChange={updateCopyCvId}
                  options={options}
                  value={copyCvId}
                />
              </Formsy>

              <Hyperlink onClick={createFromCopy}>{t('copy')}</Hyperlink>
            </ContainerCvCopy>

            <PageParagraph as="h3">{t('create_cv_alternate')}</PageParagraph>
          </>
        )}

        <CvNewActions type={type} />
      </Content>
    </Container>
  )
}

export default CvNew
