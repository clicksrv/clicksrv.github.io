import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import useItems from '../hooks/useItems'

import {
  black,
  blueLight,
  blueLighter,
  greyBluish,
  greyLightest,
  mintDark,
  mintDarker,
  orangeDark,
  orangeLighter,
  violet,
  violetDark,
} from '../colors'
import { atLimit, newPath, trackNewClick } from '../helpers/cv'
import { buttonRegular, buttonRegularActive, buttonRegularHover } from '../styles/buttons'
import { media } from './styled/Grid'
import { t } from '../locales'

const CircleIcon = styled.i`
  ${buttonRegular}
  border-radius: 50%;
  font-size: 27px;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 37px;
  margin: 0 auto 8px;
  padding: 0;
  width: 37px;
`

const Container = styled(Link)`
  background-color: ${({ $color }) => $color};
  border-radius: 8px;
  text-align: center;
  transition: background-color 0.3s;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  min-height: var(--cv-card-half-height);
  width: 100%;

  &:hover {
    background-color: ${({ $colorHover }) => $colorHover};

    ${CircleIcon} {
      ${buttonRegularHover}
    }
  }

  &:active {
    ${CircleIcon} {
      ${buttonRegularActive}
    }
  }
`

const Content = styled.span`
  display: block;
`

const Title = styled.span`
  color: ${black};
  font-size: 14px;
  font-weight: 600;

  display: block;

  ${media.md`
    margin-bottom: 10px;
  `}
`

const colors = {
  cover_letter: violet,
  journal_entry: mintDark,
  resume: orangeLighter,
  website: blueLighter,
}

const colorsHover = {
  cover_letter: violetDark,
  journal_entry: mintDarker,
  resume: orangeDark,
  website: blueLight,
}

/**
 * @param {boolean} grey force grey color regardless of passed type
 * @param {string} type resume / cover_letter / website / journal_entry
 */
const ButtonGhost = ({ className, grey, type }) => {
  const { items } = useItems(type)
  const user = useSelector((state) => state.session.user)

  const color = grey ? greyLightest : colors[type]
  const colorHover = grey ? greyBluish : colorsHover[type]
  const cta = atLimit(user, items, type)
  const to = newPath(user, items, type)

  return (
    <Container
      $color={color}
      $colorHover={colorHover}
      $cta={cta}
      className={className}
      onClick={trackNewClick(type, cta)}
      role="button"
      to={to}>
      <Content>
        <CircleIcon
          $cta={cta}
          className="icon-plus"
        />

        <Title>{t('create_new')}</Title>
      </Content>
    </Container>
  )
}

ButtonGhost.propTypes = {
  className: PropTypes.string,
  grey: PropTypes.bool,
  type: PropTypes.string.isRequired,
}

export default ButtonGhost
