import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import useItems from '../hooks/useItems'
import { atLimit, newPath } from '../helpers/cv'
import { buttonBig } from '../styles/buttons'
import { greySubtleBluish, primary } from '../colors'
import { media } from './styled/Grid'
import { t } from '../locales'

import ButtonAdd from './ButtonAdd'
import ButtonGhost from './ButtonGhost'
import CvCard from './CvCard'
import PageHeader from './PageHeader'
import Pane from './Pane'
import Pins from './Pins'
import UpsellBanner from './UpsellBanner'

const Container = styled.section`
  background: white;

  margin: -10px;
  min-height: calc(100vh - var(--nav-bar-height));
  padding: 15px;

  ${media.sm`
    margin: -20px;
    padding: 20px;
  `}

  ${media.lg`
    padding: 30px;
  `}

  ${media.xl`
    padding: 40px;
  `}

  ${media.xxl`
    padding: 60px;
  `}
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 1320px;
`

const ButtonCreateNew = styled(Link)`
  ${buttonBig}

  padding-left: 20px;
`

const Icon = styled.i`
  font-size: 27px;

  margin-right: 6px;
`

const ItemsContainer = styled(Pane)``

const Items = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  grid-template-rows: ${({ empty }) => (empty ? 'var(--cv-card-normal-height)' : 'auto var(--cv-card-normal-height)')};
  justify-items: center;

  ${media.sm`
    grid-template-columns: 1fr 1fr;
    grid-template-rows: initial;
    grid-auto-rows: var(--cv-card-small-height);
  `}

  ${media.md`
    grid-template-columns: 1fr 1fr 1fr;
  `}

  ${media.lg`
    grid-template-columns: 1fr 1fr 1fr 1fr;
  `}
`

const ButtonAddItem = styled(ButtonAdd)`
  ${media.sm`
    grid-column: 1 / span-2;
  `}

  ${media.md`
    grid-column: 1 / span-3;
  `}

  ${media.lg`
    grid-column: 1 / span-2;
  `}
`

const titles = {
  resume: t('resume'),
  website: t('website'),
  cover_letter: t('cover_letter'),
}

const subtitles = {
  resume: t('create_custom_resumes'),
  website: t('turn_resume_into_website'),
  cover_letter: t('highlight_best_attributes'),
}

const icons = {
  resume: 'document-alt',
  website: 'browser-alt',
  cover_letter: 'cover-letter',
}

const sectionTitles = {
  resume: t('all_resumes'),
  website: t('all_websites'),
  cover_letter: t('all_cover_letters'),
}

/**
 * @param {string} type resume / cover_letter / website
 */
const PageCvs = ({ type }) => {
  const { items } = useItems(type)
  const user = useSelector((state) => state.session.user)

  const { free_tier: freeTier } = user

  const cta = atLimit(user, items, type)
  const to = newPath(user, items, type)

  const itemsCount = items.length
  const empty = itemsCount === 0

  const isPinned = (item) => item.pinned
  const pinnedItems = items.filter(isPinned)

  const title = titles[type]
  const subtitle = subtitles[type]
  const icon = icons[type]
  const sectionTitle = sectionTitles[type]

  return (
    <Container>
      <Content>
        <PageHeader
          subtitle={subtitle}
          title={title}>
          <ButtonCreateNew
            $cta={cta}
            to={to}>
            <Icon className="icon-plus" />

            {t('create_new')}
          </ButtonCreateNew>
        </PageHeader>

        <Pins
          pins={pinnedItems}
          type={type}
        />

        {freeTier && <UpsellBanner type={type} />}

        <ItemsContainer
          color={greySubtleBluish}
          icon={icon}
          iconColor={primary}
          title={sectionTitle}>
          <Items empty={empty}>
            {empty && (
              <ButtonAddItem
                grey
                type={type}
              />
            )}

            {!empty && (
              <ButtonGhost
                grey
                type={type}
              />
            )}

            {items.map((item, index) => (
              <CvCard
                cv={item}
                index={index}
                key={`cv-${item.id}`}
                size="small"
              />
            ))}
          </Items>
        </ItemsContainer>
      </Content>
    </Container>
  )
}

PageCvs.propTypes = {
  type: PropTypes.string.isRequired,
}

export default PageCvs
