import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { primary } from '../colors'

import SectionTitle from './SectionTitle'
import { media } from './styled/Grid'

const Container = styled(({ featured, small, ...props }) => <Link {...props} />)`
  background: white;
  box-shadow: 0 1px 2px 0 rgb(218, 234, 249);
  border-radius: 4px;
  color: #aaa;
  cursor: ${(props) => (props.to ? 'pointer' : 'default')};
  text-align: center;
  transition: all 250ms ease 0s;
  z-index: 1;

  flex: 1 0 auto;

  display: block;
  margin: 0 17px 30px;
  max-width: ${(props) => (props.small ? '400px' : '480px')};
  width: 300px;

  padding-bottom: ${(props) => (props.small ? '30px' : '40px')};

  ${media.sm`
    padding-bottom: ${(props) => (props.small ? '30px' : '70px')};
  `}

  &:hover {
    box-shadow: 0 20px 60px 0 rgb(218, 234, 249);
    transform: translateY(-10px);
  }
`

const FeaturedBanner = styled.div`
  background-color: ${primary};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  color: white;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;

  padding: 7px 0;
`

const Title = styled(SectionTitle)`
  margin-bottom: 0;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: ${(props) => (props.featured ? '22px' : '52px')};
`

const FeaturesCard = ({ small, featured, to, heading, title, onClick, children }) => {
  return (
    <Container
      small={small}
      featured={featured}
      to={to}
      onClick={onClick}>
      {featured && <FeaturedBanner>{heading}</FeaturedBanner>}

      <Title featured={featured}>{title}</Title>

      {children}
    </Container>
  )
}

FeaturesCard.propTypes = {
  small: PropTypes.bool,
  featured: PropTypes.bool,
  to: PropTypes.string,
  heading: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
}

export default FeaturesCard
