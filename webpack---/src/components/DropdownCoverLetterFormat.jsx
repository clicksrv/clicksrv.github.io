import hash from 'hash-sum'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useMemo } from 'react'

import api from '../services/api'
import debounce from '../helpers/debounce'
import themes from '../constants/themes'
import useDropdown from '../hooks/useDropdown'
import useCvs from '../hooks/useCvs'
import { grey } from '../colors'
import { t } from '../locales'

import {
  Dropdown,
  DropdownContent,
  DropdownIcon,
  DropdownItem,
  DropdownList,
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
`

const generateStyleHashes = (currentCv, cvs) => {
  const defaultStyles = themes[currentCv.theme].styles

  return cvs.reduce((memo, cv) => {
    const style = Object.keys(defaultStyles).reduce(
      (memo, styleKey) => ({
        ...memo,
        [styleKey]: cv.style[styleKey] || defaultStyles[styleKey],
      }),
      {}
    )

    const styleHash = hash(style)

    return {
      ...memo,
      [styleHash]: {
        style,
        cvNames: [...(memo[styleHash]?.cvNames ? memo[styleHash].cvNames : []), cv.name],
      },
    }
  }, {})
}

// updateCv needs to be defined outside of the component for debounce to work
const updateCv = (cv, style) => {
  const params = {
    id: cv.id,
    style,
  }

  api.updateCv(params)
}

const updateCvDebounced = debounce(updateCv, 300)

const DropdownCoverLetterFormat = ({ cv }) => {
  const { cvs } = useCvs()

  const { closeDropdown, dropdownOpen, openDropdown, toggleDropdown } = useDropdown()

  const styleHashes = useMemo(() => {
    if (!cv || !cvs) {
      return {}
    }

    return generateStyleHashes(cv, cvs)
  }, [cv, cvs])

  const currentStyleHash = hash(cv.style)

  const currentLabel = styleHashes[currentStyleHash] ? styleHashes[currentStyleHash].cvNames : t('custom')

  const setFormatting = (styleHash) => () => {
    const { style } = styleHashes[styleHash]

    if (style) {
      updateCvDebounced(cv, style)
    }
  }

  return (
    <>
      <Title onClick={toggleDropdown}>{t('format')}</Title>

      <Dropdown>
        <DropdownTrigger
          dropdownOpen={dropdownOpen}
          onClick={openDropdown}>
          <DropdownValue dropdownOpen={dropdownOpen}>{currentLabel}</DropdownValue>

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
          <DropdownNav>
            <DropdownNavTab active={true}>{t('format')}</DropdownNavTab>
          </DropdownNav>

          <DropdownList>
            {Object.keys(styleHashes).map((styleHash) => (
              <DropdownItem
                key={styleHash}
                onClick={setFormatting(styleHash)}
                selected={styleHash === currentStyleHash}>
                {styleHashes[styleHash].cvNames.join(', ')}
              </DropdownItem>
            ))}

            <DropdownItem
              disabled
              selected={!styleHashes[currentStyleHash]}
              value={currentStyleHash}>
              {t('custom')}
            </DropdownItem>
          </DropdownList>
        </DropdownContent>
      </Dropdown>
    </>
  )
}

DropdownCoverLetterFormat.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default DropdownCoverLetterFormat
