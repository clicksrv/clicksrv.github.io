import styled from 'styled-components'

import { t } from '../locales'
import { media } from './styled/Grid'

import PageTitle from './PageTitle'

import background from '../assets/images/authentication-background.png'

const ImageTextContent = styled.div`
  display: none;
  max-width: min(440px, 45%);

  ${media.md`
    display: block;
  `}

  ${media.lg`
    padding-right: 40px;
  `}
`

const Title = styled(PageTitle)`
  font-size: 49px;
  line-height: 100%;

  margin: 0 0 1em;
`

const BackgroundImage = styled.img`
  display: block;
`

const ImageText = () => (
  <ImageTextContent>
    <Title>{t('login_page_image_text')}</Title>
    <BackgroundImage src={background} />
  </ImageTextContent>
)

export default ImageText
