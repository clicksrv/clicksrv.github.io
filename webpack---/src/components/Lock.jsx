import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { buttonRegular } from '../styles/buttons'
import { media } from '../components/styled/Grid'
import { t } from '../locales'

import lock from '../assets/images/lock.svg'

const Content = styled.div`
  transition: transform 0.3s, top 0.3s, bottom 0.3s;

  position: absolute;

  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;

  max-height: 100%;

  ${media.md`
    transform: translateY(10px);
  `}
`

const Container = styled(Link)`
  overflow: hidden;
  transition: opacity 0.3s;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  ${media.md`
    opacity: 0;
  `}

  :hover {
    opacity: 1;

    ${Content} {
      transform: translateY(0);
    }
  }
`

const Image = styled.img`
  display: block;
  margin: -10px 10px -20px 7px;
  max-width: ${({ compact }) => (compact ? 110 : 90)}px;

  ${({ compact }) => compact && 'margin-bottom: 80px;'}

  ${media.md`
    display: block;
  `}
`

const Button = styled.span`
  ${buttonRegular}

  display: none;

  ${media.md`
    display: flex;
    margin-top: 11px;
    margin-bottom: 10px;
  `}
`

/**
 * @param {boolean} compact when true only the lock image will be displayed
 */
const Lock = ({ className, compact }) => {
  return (
    <Container
      $compact={compact}
      className={className}
      to="/checkout">
      <Content compact={compact}>
        <Image
          alt={t('upgrade_to_access')}
          compact={compact}
          src={lock}
        />

        {!compact && (
          <Button
            $cta
            role="button">
            {t('upgrade_to_access')}
          </Button>
        )}
      </Content>
    </Container>
  )
}

Lock.propTypes = {
  className: PropTypes.string,
  compact: PropTypes.bool,
}

export default Lock
