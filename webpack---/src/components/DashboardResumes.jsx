import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import useCvs from '../hooks/useCvs'
import useWindowSize from '../hooks/useWindowSize'
import { breakpoints, media } from './styled/Grid'
import { buttonBorderless, buttonHollowSmall } from '../styles/buttons'
import { isResume } from '../helpers/cv'
import { orangeDarkish, orangeLightest } from '../colors'
import { t } from '../locales'

import ButtonAdd from './ButtonAdd'
import ButtonGhost from './ButtonGhost'
import CvCard from './CvCard'
import Pane from './Pane'
import PinSkeleton from './PinSkeleton'

const Container = styled(Pane)`
  margin: 0;
  width: 100%;
`

const SeeAll = styled(Link)`
  ${buttonHollowSmall}
  ${buttonBorderless}

  position: absolute;
  top: 16px;
  right: 16px;
`

const Content = styled.section`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  grid-template-rows: ${({ empty }) => (empty ? 'var(--cv-card-normal-height)' : 'auto var(--cv-card-normal-height)')};
  justify-items: center;

  ${media.sm`
    grid-template-columns: 1fr 1fr;
    grid-template-rows: var(--cv-card-normal-height) var(--cv-card-normal-height);
  `}

  ${media.md`
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: var(--cv-card-normal-height);
  `}

  ${media.lg`
    grid-template-columns: 1fr 1fr;
    grid-template-rows: var(--cv-card-normal-height) var(--cv-card-normal-height);
  `}
`

const ButtonAddResume = styled(ButtonAdd)`
  ${media.sm`
    grid-column: 1 / span-2;
  `}

  ${media.md`
    grid-column: 1 / span-3;
  `}

  ${media.lg`
    grid-column: 1 / span-2;
    grid-row: 1 / span-2;
  `}
`

const DashboardResumes = ({ className }) => {
  const { cvs } = useCvs()
  const { viewportWidth } = useWindowSize()

  const { sm, md, lg } = breakpoints

  const resumes = cvs.filter(isResume)
  const pinnedResumes = resumes.filter((resume) => resume.pinned)

  // maximum resumes excluding ButtonGhost
  const maximumVisibleResumes = viewportWidth >= md && viewportWidth < lg ? 2 : 3
  const visibleResumes = [...new Set([...pinnedResumes, ...resumes])].slice(0, maximumVisibleResumes)
  const visibleResumesCount = visibleResumes.length

  const visibleSkeletonsCount = () => {
    if (visibleResumesCount === 0) {
      return 0
    }

    // 2 columns
    if (viewportWidth >= lg) {
      const count = 3 - visibleResumesCount

      return count > 0 ? count : 0
    }

    // 3 columns
    if (viewportWidth >= md) {
      const count = 2 - visibleResumesCount

      return count > 0 ? count : 0
    }

    // 2 columns
    if (viewportWidth >= sm) {
      const count = 3 - visibleResumesCount

      return count > 0 ? count : 0
    }

    return 0
  }

  const resumesPath = '/resumes'
  const empty = !resumes || resumes.length === 0

  return (
    <Container
      className={className}
      color={orangeLightest}
      icon="document-alt"
      iconColor={orangeDarkish}
      title={t('resumes')}
      to={resumesPath}>
      {!empty && <SeeAll to={resumesPath}>{t('see_all')}</SeeAll>}

      <Content
        className="resumes"
        empty={empty}>
        {visibleResumesCount === 0 && <ButtonAddResume type="resume" />}
        {visibleResumesCount > 0 && <ButtonGhost type="resume" />}

        {visibleResumes.map((cv, index) => (
          <CvCard
            cv={cv}
            index={index}
            key={cv.id}
            size="normal"
          />
        ))}

        {new Array(visibleSkeletonsCount()).fill(0).map((_el, index) => (
          <PinSkeleton
            key={`skeleton-${index}`}
            large
            type="resume"
          />
        ))}
      </Content>
    </Container>
  )
}

DashboardResumes.propTypes = {
  className: PropTypes.string,
}

export default DashboardResumes
