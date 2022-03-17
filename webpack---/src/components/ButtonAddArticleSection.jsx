import PropTypes from 'prop-types'
import styled from 'styled-components'

import { black, primaryFaded, primaryFadedLess, primaryGreyish, white } from '../colors'

const Button = styled.a`
  border: 2px dashed ${({ inverted }) => (inverted ? white : primaryGreyish)};
  color: ${({ inverted }) => (inverted ? white : black)} !important;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  text-align: center;
  text-decoration: none !important;
  transition: background-color 0.2s;

  display: ${({ pageBreaksMode }) => (pageBreaksMode ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;

  padding: 12px 0;
  max-width: 350px;

  @supports (font-variation-settings: normal) {
    font-family: 'InterVariable', sans-serif;
  }

  &:hover {
    background-color: ${primaryFaded};
  }

  &:focus,
  &:active {
    background-color: ${primaryFadedLess};
  }
`

const ButtonAddArticleSection = ({ children, className, cv, onClick, pageBreaksMode, sidebar }) => {
  const { theme } = cv

  const avant = theme === 'avant'
  const denali = theme === 'denali'
  const gallant = theme === 'gallant'
  const verge = theme === 'verge'

  const inverted = (sidebar && (avant || gallant || denali)) || verge

  return (
    <Button
      className={className}
      inverted={inverted}
      onClick={onClick}
      pageBreaksMode={pageBreaksMode}>
      {children}
    </Button>
  )
}

ButtonAddArticleSection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cv: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  pageBreaksMode: PropTypes.bool.isRequired,
  sidebar: PropTypes.bool,
}

export default ButtonAddArticleSection
