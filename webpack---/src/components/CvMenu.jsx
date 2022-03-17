import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import themes from '../constants/themes'
import { placeholderText } from '../locales'
import { media } from './styled/Grid'

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;

  ${({ menuDefault }) => menuDefault && MenuDefault};
`

const Element = styled.li`
  display: flex;
`

const Link = styled.a``

const MenuDefault = css`
  height: 50px;

  ${Link} {
    line-height: 20px;

    display: inline-block;
    padding: 10px 20px;

    &:hover,
    &:focus {
      background: rgba(255, 255, 255, 0.3);
    }

    ${media.md`
      padding-top: 15px;
      padding-bottom: 15px;
    `}
  }
`

const CvMenu = ({ cv: { theme }, sections }) => {
  const { menu } = themes[theme]

  const menuDefault = menu === 'default'

  return (
    <Container menuDefault={menuDefault}>
      {sections.map((section) => (
        <Element
          data-scroll-to={`#${section.key}`}
          key={section.key}>
          <Link href="javacript:void(0);">
            {section?.content?.title || section.label || placeholderText(section.key)}
          </Link>
        </Element>
      ))}
    </Container>
  )
}

CvMenu.propTypes = {
  cv: PropTypes.object.isRequired,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default CvMenu
