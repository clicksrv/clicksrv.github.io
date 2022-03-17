import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useEffect, useState } from 'react'

import api from '../services/api'
import conf from '../conf'
import debounce from '../helpers/debounce'
import useDropdown from '../hooks/useDropdown'
import { grey } from '../colors'
import { media } from './styled/Grid'
import { t } from '../locales'

import DropdownStylingContentFontFamilies from './DropdownStylingContentFontFamilies'
import DropdownStylingContentMargins from './DropdownStylingContentMargins'
import DropdownStylingContentFontSizes from './DropdownStylingContentFontSizes'

import {
  Dropdown,
  DropdownContent,
  DropdownIcon,
  DropdownNav,
  DropdownNavTab,
  DropdownTrigger,
  DropdownValue,
} from './Dropdown'

const Title = styled.p`
  color: ${grey};
  cursor: pointer;
  font-size: 15px;
  font-weight: 300;

  margin: 3px 15px 3px 0;

  ${media.md`
    display: none;
  `}

  ${media.xxl`
    display: block;
  `}
`

const GroupTitle = styled(Title)`
  display: none;

  ${media.xl`
    display: block;
  `}

  ${media.xxl`
    display: none;
  `}
`

const FontsGroupTitle = styled(GroupTitle)``

const MarginsGroupTitle = styled(GroupTitle)`
  ${media.md`
    display: block;
  `}

  ${media.xxl`
    display: none;
  `}
`

// updateCv needs to be defined outside of the component for debounce to work
const updateCv = (cv, element, value) => {
  const updatedCv = {
    id: cv.id,
    style: {
      ...cv.style,
      [element]: value,
    },
  }

  api.updateCv(updatedCv)
}

const updateCvDebounced = debounce(updateCv, 300)

const DropdownStyling = ({ cv, element, narrow }) => {
  const cvValue = cv.style[element]
  const defaultValue = conf.themes[cv.theme].styles[element]

  const [currentValue, setCurrentValue] = useState(cvValue || defaultValue)
  const { closeDropdown, dropdownOpen, openDropdown, toggleDropdown } = useDropdown()

  useEffect(() => {
    // this is necessary to update the UI on 'Reset Styling'
    if (cvValue) {
      setCurrentValue(cvValue)
    }
  }, [cvValue])

  // don't display the dropdown if CV theme does not support this styling element
  if (!defaultValue) {
    return null
  }

  const headerFont = element === '@header-font'
  const bodyFont = element === '@body-font'
  const fontFamilies = headerFont || bodyFont

  const fontSizes = element === '@body-font-size'

  const sectionMargins = element === '@section-margins'
  const articleMargins = element === '@article-margins'
  const margins = sectionMargins || articleMargins

  const currentLabel = () => {
    switch (true) {
      case fontFamilies:
        return conf.fonts[currentValue].name
      case fontSizes:
        return currentValue
      case margins:
        return `${Math.round(parseFloat(currentValue) * 100)}%`
    }
  }

  const selectValue = (value) => {
    if (value !== currentValue) {
      setCurrentValue(value)
      updateCvDebounced(cv, element, value)
    }
  }

  /**
   * @returns {string} translation for keys: header_font body_font body_font_size section_margins article_margins
   */
  const translatedTitle = () => {
    const translationKey = element.replaceAll('-', '_').replace('@', '')

    return t(translationKey)
  }

  return (
    <>
      <Title onClick={toggleDropdown}>{translatedTitle()}</Title>

      {headerFont && <FontsGroupTitle onClick={toggleDropdown}>{t('fonts')}</FontsGroupTitle>}
      {sectionMargins && <MarginsGroupTitle onClick={toggleDropdown}>{t('margins')}</MarginsGroupTitle>}

      <Dropdown>
        <DropdownTrigger
          narrow={narrow}
          dropdownOpen={dropdownOpen}
          onClick={openDropdown}>
          <DropdownValue dropdownOpen={dropdownOpen}>{currentLabel()}</DropdownValue>

          <DropdownIcon
            as="span"
            dropdownOpen={dropdownOpen}
            className="icon-chevron"
          />
        </DropdownTrigger>

        <DropdownContent
          ignoreInnerClicks
          separated
          closeDropdown={closeDropdown}
          dropdownOpen={dropdownOpen}>
          {fontFamilies && (
            <>
              <DropdownNav>
                <DropdownNavTab active={true}>{translatedTitle()}</DropdownNavTab>
              </DropdownNav>

              <DropdownStylingContentFontFamilies
                currentValue={currentValue}
                selectValue={selectValue}
              />
            </>
          )}

          {fontSizes && (
            <>
              <DropdownNav>
                <DropdownNavTab active={true}>{translatedTitle()}</DropdownNavTab>
              </DropdownNav>

              <DropdownStylingContentFontSizes
                currentValue={currentValue}
                selectValue={selectValue}
              />
            </>
          )}

          {margins && (
            <>
              <DropdownNav>
                <DropdownNavTab active={true}>{translatedTitle()}</DropdownNavTab>
              </DropdownNav>

              <DropdownStylingContentMargins
                currentValue={currentValue}
                selectValue={selectValue}
              />
            </>
          )}
        </DropdownContent>
      </Dropdown>
    </>
  )
}

DropdownStyling.propTypes = {
  cv: PropTypes.object.isRequired,
  element: PropTypes.string.isRequired,
  narrow: PropTypes.bool,
}

export default DropdownStyling
