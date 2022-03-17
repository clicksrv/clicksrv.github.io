import PropTypes from 'prop-types'
import styled from 'styled-components'

import { media } from './styled/Grid'

import PageSubtitle from './PageSubtitle'

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;

  margin-bottom: 20px;
`

const Intro = styled.div``

const Title = styled(PageSubtitle)`
  font-size: 26px;

  margin: 0 0 0.3em;

  ${media.md`
    font-size: 32px;
  `}
`

const Subtitle = styled.h2`
  font-size: 16px;
  font-weight: 400;

  margin: 0;

  ${media.md`
    font-size: 18px;
  `}
`

const PageHeader = ({ children, className, subtitle, title }) => {
  return (
    <Container className={className}>
      <Intro>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Intro>

      {children}
    </Container>
  )
}

PageHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default PageHeader
