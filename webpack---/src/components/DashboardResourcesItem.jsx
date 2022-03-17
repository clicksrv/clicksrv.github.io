import PropTypes from 'prop-types'
import styled from 'styled-components'

import { media } from './styled/Grid.jsx'
import { openUrl } from '../helpers/cordova'
import { primary } from '../colors'
import { t } from '../locales'

import PageTitle from './PageTitle'

const Background = styled.img`
  object-fit: cover;
  transition: transform 0.4s;

  position: absolute;

  height: 100%;
  width: 100%;
`

const Title = styled(PageTitle)`
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -0.5px;
  line-height: 24px;
  transition: margin 0.4s;

  display: block;
  margin: 0 0 8px;

  &:hover {
    color: black;
  }
`

const Container = styled.a`
  border-radius: 8px;
  scroll-snap-align: start;

  flex: 0 0 auto;

  display: block;
  height: 260px;
  overflow: hidden;
  position: relative;
  width: 100%;

  :last-child {
    margin-right: unset;
  }

  ${media.sm`
    width: 370px;
  `}

  :hover {
    ${Background} {
      transform: scale(1.08);
    }

    ${Title} {
      margin-bottom: 12px;
    }
  }
`

const Content = styled.span`
  background-color: white;
  border-radius: 8px;

  position: absolute;
  right: 16px;
  bottom: 16px;
  left: 16px;

  display: block;
  padding: 16px 20px;
`

const ItemLink = styled.span`
  color: ${primary};
  font-size: 14px;
`

const DashboardResourcesItem = ({ image, title, url }) => (
  <Container
    href={url}
    onClick={openUrl(url)}
    rel="noopener noreferrer"
    target="_blank">
    <Background src={image} />

    <Content>
      <Title as="span">{title}</Title>

      <ItemLink>{t('read_post')}</ItemLink>
    </Content>
  </Container>
)

DashboardResourcesItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default DashboardResourcesItem
