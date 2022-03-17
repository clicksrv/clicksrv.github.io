import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { grey, greyLightish, greySubtleBluish } from '../colors'
import { media } from './styled/Grid'
import { t } from '../locales'

import expertIllustration from '../assets/images/expert-illustration.png'

import PageSubtitle from './PageSubtitle'
import Pane from './Pane'

const Container = styled(Pane)`
  margin: 0;
  width: 100%;
`

const Title = styled(PageSubtitle)`
  font-size: 32px;

  margin: 0 0 12px;
`

const Copy = styled.p`
  color: ${grey};
  font-size: 18px;
  line-height: 170%;

  margin-bottom: 24px;
`

const CardLink = styled(Link)`
  border-bottom: 1px solid;
  font-weight: 600;
  font-size: 14px;
  pointer-events: all;
`

const Image = styled.img`
  margin: 0 auto;
  object-fit: contain;
  max-width: 350px;
  width: 100%;

  ${media.sm`
    max-width: 230px;
    padding-right: 10px;
    width: 40%;
  `}
`

const Content = styled.div`
  text-align: center;

  margin: 8px 0 24px;
  width: 100%;

  ${media.sm`
    text-align: initial;

    margin: 16px 0 35px;
    padding-right: 15px;
    width: 60%;
  `}
`

const ExpertCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const DashboardExpert = ({ className }) => {
  const user = useSelector((state) => state.session.user)

  const { paid_tier: paidTier } = user

  const title = t('let_us_format_resume')
  const subtitle = paidTier ? t('get_your_resume_formatted') : t('get_your_resume_formatted_when_you_upgrade')
  const linkText = paidTier ? t('upload_your_resume') : t('upgrade_to_pro')
  const to = paidTier ? '/upload' : '/checkout'

  return (
    <Container
      className={className}
      color={greySubtleBluish}
      icon="pencil"
      iconColor={greyLightish}
      title={t('visualcv_expert')}>
      <ExpertCardContainer>
        <Image src={expertIllustration} />

        <Content>
          <Title>{title}</Title>

          <Copy>{subtitle}</Copy>

          <CardLink to={to}>{linkText}</CardLink>
        </Content>
      </ExpertCardContainer>
    </Container>
  )
}

DashboardExpert.propTypes = {
  className: PropTypes.string,
}

export default DashboardExpert
