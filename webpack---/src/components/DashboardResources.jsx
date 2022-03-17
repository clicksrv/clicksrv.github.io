import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useRef } from 'react'
import { useSelector } from 'react-redux'

import conf from '../conf'
import useBrowser from '../hooks/useBrowser'
import { buttonBorderless, buttonHollowSmall } from '../styles/buttons'
import { greyLightish, greySubtleBluish } from '../colors'
import { media } from './styled/Grid'
import { openUrl } from '../helpers/cordova'
import { t } from '../locales'

import careerResources from '../assets/images/resources-career-resources.png'
import coverLetter from '../assets/images/resources-write-cover-letter.png'
import hiringStatistics from '../assets/images/resources-hiring-statistics.png'
import resumeGuide from '../assets/images/resources-resume-guide.png'

import DashboardResourcesItem from './DashboardResourcesItem'
import PageTitle from './PageTitle'
import Pane from './Pane'
import ScrollingNav from './ScrollingNav'

const Container = styled(Pane)`
  margin: 0;
  width: 100%;
`

const GoTo = styled.a`
  ${buttonHollowSmall}
  ${buttonBorderless}

  position: absolute;
  top: 16px;
  right: 16px;
`

const Title = styled(PageTitle)`
  font-size: 26px;

  margin: 20px 0px 24px;

  ${media.md`
    font-size: 32px;
  `}
`

const Items = styled.div`
  overflow-x: scroll;
  scroll-behavior: smooth;
  // At some point Safari should also have 'x mandatory' enabled
  // https://github.com/iamdustan/smoothscroll/issues/177
  scroll-snap-type: ${({ isSafari }) => (isSafari ? 'initial' : 'x mandatory')};

  // hide scrollbar
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }

  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  ${media.sm`
    grid-template-columns: 1fr 1fr 1fr 1fr;

    margin-bottom: calc(16px + 32px);
  `}
`

const Nav = styled(ScrollingNav)`
  display: none;

  ${media.sm`
    display: flex;
  `}
`

const resourceUrls = {
  resource1: {
    en: `${conf.host}/blog/cover-letter-examples/`,
    ar: `${conf.host}/ar/المدوَّنة/alsyrh-althatyh-walbryd-alilktrwny-wamthlh-cv-alghlaf-rsalh/`,
    zh: `${conf.host}/zh/博客/qiuzhi-xin-de-lizi/`,
    fr: `${conf.host}/fr/blog/exemples-de-lettre-de-couverture/`,
    de: `${conf.host}/de/blog/anschreiben-beispiele/`,
    pt: `${conf.host}/pt/blog/exemplos-tampa-letter/`,
    ru: `${conf.host}/ru/блог/rezyume-elektronnaya-pochta-i-cv-soprovo-itelnoe-pismo-primery/`,
    es: `${conf.host}/es/blog/ejemplos-de-carta-de-presentacion/`,
    tr: `${conf.host}/tr/blog/devam-e-posta-ve-cv-kapak-mektubu-ornekleri/`,
  },
  resource2: {
    en: `${conf.host}/blog/how-to-write-a-resume/`,
  },
  resource3: {
    en: `${conf.host}/blog/online-career-resources/`,
  },
  resource4: {
    en: `${conf.host}/blog/hiring-statistics/`,
  },
}

const DashboardResources = ({ className }) => {
  const containerRef = useRef(null)
  const locale = useSelector((state) => state.application.locale)
  const { isSafari } = useBrowser()

  const resource1 = {
    title: t('cover_letter_examples_guide'),
    url: `${resourceUrls.resource1[locale] || resourceUrls.resource1.en}`,
    image: coverLetter,
  }

  const resource2 = {
    title: t('how_to_write_resume'),
    url: `${resourceUrls.resource2[locale] || resourceUrls.resource2.en}`,
    image: resumeGuide,
  }

  const resource3 = {
    title: t('online_career_resources_guide'),
    url: `${resourceUrls.resource3[locale] || resourceUrls.resource3.en}`,
    image: careerResources,
  }

  const resource4 = {
    title: t('hiring_statistics_report'),
    url: `${resourceUrls.resource4[locale] || resourceUrls.resource4.en}`,
    image: hiringStatistics,
  }

  const resources = [resource1, resource2, resource3, resource4]
  const resourcesUrl = `${conf.host}/resources/`

  return (
    <Container
      className={className}
      color={greySubtleBluish}
      icon="pencil"
      iconColor={greyLightish}
      title={t('resources')}>
      <GoTo
        href={resourcesUrl}
        onClick={openUrl(resourcesUrl)}
        rel="noopener noreferrer"
        target="_blank">
        {t('go_to_knowledge_center')}
      </GoTo>

      <Title as={'h3'}>{t('help_getting_started')}</Title>

      <Items
        isSafari={isSafari}
        ref={containerRef}>
        {resources.map((resource, index) => (
          <DashboardResourcesItem
            key={index}
            image={resource.image}
            title={resource.title}
            url={resource.url}
          />
        ))}
      </Items>

      <Nav containerRef={containerRef} />
    </Container>
  )
}

DashboardResources.propTypes = {
  className: PropTypes.string,
}

export default DashboardResources
