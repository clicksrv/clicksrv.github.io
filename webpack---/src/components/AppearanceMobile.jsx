import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useState } from 'react'

import { isCoverLetter } from '../helpers/cv'
import { grey } from '../colors'
import { t } from '../locales'

import ButtonResetStyling from './ButtonResetStyling'
import ChangeImage from './ChangeImage'
import DropdownCoverLetterFormat from './DropdownCoverLetterFormat'
import DropdownStyling from './DropdownStyling'
import PageNumbersToggle from './PageNumbersToggle'
import StylingColors from './StylingColors'
import { DropdownNav } from './Dropdown'

const Content = styled.div`
  margin: 20px 0;
  max-width: 290px;

  ${DropdownNav} {
    margin-left: 9px;
    margin-right: 9px;
    padding-left: 0;
    padding-right: 0;
  }
`

const Title = styled.p`
  color: ${grey};
  cursor: pointer;
  font-size: 15px;
  font-weight: 300;
`

const ContainerStylingColors = styled.div`
  margin-left: -9px;
`

const Appearance = ({ cv }) => {
  const dropdownElements = ['@header-font', '@body-font', '@body-font-size']

  const cvStyleValue = (element) => cv.style[element]

  const [currentColorElement, setCurrentColorElement] = useState('@primary')
  const [currentColorValue, setCurrentColorValue] = useState(cvStyleValue[currentColorElement])

  const coverLetter = isCoverLetter(cv)

  return (
    <>
      {coverLetter && <DropdownCoverLetterFormat cv={cv} />}

      {dropdownElements.map((element) => (
        <DropdownStyling
          cv={cv}
          element={element}
          key={element}
        />
      ))}

      <Content>
        <Title>{t('colors')}</Title>

        <ContainerStylingColors>
          <StylingColors
            cv={cv}
            currentValue={currentColorValue}
            setCurrentValue={setCurrentColorValue}
            currentElement={currentColorElement}
            setCurrentElement={setCurrentColorElement}
          />
        </ContainerStylingColors>
      </Content>

      <Content>
        <ChangeImage
          element="@bg-url"
          cv={cv}
        />
      </Content>

      <Content>
        <ChangeImage
          element="@logo-url"
          cv={cv}
        />
      </Content>

      <Content>
        <ButtonResetStyling cv={cv} />
      </Content>

      <Content>
        <PageNumbersToggle cv={cv} />
      </Content>
    </>
  )
}

Appearance.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default Appearance
