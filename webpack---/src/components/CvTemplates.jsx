import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import themes from '../constants/themes'
import useOnboarding from '../hooks/useOnboarding'
import { buttonRegular } from '../styles/buttons'
import { grey } from '../colors'
import { isFreeTheme, isNewTheme } from '../helpers/theme'
import { t } from '../locales'

// eslint-disable-next-line import/no-unresolved
import * as previews from '../themes/previews'

import PageSubtitle from './PageSubtitle'

import {
  CvContent,
  CvContentContainer,
  CvImageContainer,
  CvName,
  CvPoster,
  CvPostersContainer,
  CvScreenshot,
  FreeBadge,
  NewBadge,
  SelectedIndicator,
} from './CvPoster'

const Info = styled.p`
  color: ${grey};
  font-size: 15px;

  margin: 0 auto 40px;
  width: 85%;
`

const Name = styled(CvName)`
  font-size: 15px;

  margin: 0 0 15px;
`

const Button = styled.span`
  ${buttonRegular};
`

const CvTemplates = ({ cv, onClick, title }) => {
  const user = useSelector((state) => state.session.user)
  const { onboarding } = useOnboarding()

  const selectTheme = (theme) => (e) => {
    e.stopPropagation()

    onClick(theme)
  }

  const templatesList = () => {
    const { type } = themes[cv.theme]

    const themeAccessible = (theme) => theme.type === type

    return Object.keys(themes)
      .map((key) => ({ ...themes[key], key }))
      .filter(themeAccessible)
  }

  const isSelected = (theme) => cv.theme === theme

  const freeBadge = (theme) => isFreeTheme(theme.key, user)
  const newBadge = (theme) => isNewTheme(theme.key)
  const selectedIndicator = (theme) => isSelected(theme.key)

  return (
    <>
      {title && <PageSubtitle>{title}</PageSubtitle>}

      {onboarding && <Info>{t('templates_are_customizable')}</Info>}

      <CvPostersContainer>
        {templatesList().map((theme) => (
          <CvPoster
            key={theme.key}
            onClick={selectTheme(theme.key)}
            role="figure"
            selected={isSelected(theme.key)}
            size="normal">
            {freeBadge(theme) && <FreeBadge role="tooltip">{t('free')}</FreeBadge>}

            {newBadge(theme) && <NewBadge role="tooltip">{t('new')}</NewBadge>}

            {selectedIndicator(theme) && <SelectedIndicator />}

            <CvImageContainer>
              <CvScreenshot
                className={theme.key}
                selected={isSelected(theme.key)}
                size="normal"
                src={previews[theme.key]}
                height="325px"
                width="244px"
              />
            </CvImageContainer>

            <CvContentContainer>
              <CvContent>
                <Name as="span">{theme.name}</Name>

                <Button> {t('use_this_template')}</Button>
              </CvContent>
            </CvContentContainer>
          </CvPoster>
        ))}
      </CvPostersContainer>
    </>
  )
}

CvTemplates.propTypes = {
  cv: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
}

export default CvTemplates
