import PropTypes from 'prop-types'
import styled from 'styled-components'
import { getLuminance } from 'polished'
import { useEffect, useState } from 'react'

import conf from '../conf'
import useDropdown from '../hooks/useDropdown'
import { grey, greyLightest, primary, transparent } from '../colors'
import { media } from './styled/Grid'
import { t } from '../locales'

import StylingColors from './StylingColors'
import Tooltip from './Tooltip'
import { Dropdown, DropdownContent } from './Dropdown'

const Icon = styled.i`
  color: ${primary};
  cursor: pointer;
  font-family: 'Icons';
  font-size: 24px;

  margin-right: 3px;
`

const Title = styled.p`
  color: ${grey};
  cursor: pointer;
  font-size: 15px;

  margin: 3px 8px 3px 0;

  ${media.md`
    display: none;
  `}

  ${media.xl`
    display: inline-block;
  `}
`

const Color = styled.section`
  white-space: pre;

  display: none;
  margin: 3px 8px 3px 12px;

  ${media.md`
    display: flex;
    align-items: center;
  `}

  ${media.lg`
    display: none;
  `}
`

const Colors = styled(Color)`
  white-space: pre;

  display: block;
  margin: 0;

  ${media.md`
    display: none;
  `}

  ${media.lg`
    display: block;
  `}
`

const DropdownTrigger = styled.span`
  border: 1px solid ${({ active }) => (active ? primary : transparent)};
  border-radius: 50%;
  cursor: pointer;
  transition: border 0.2s;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: 30px;
  margin: 1px;
  width: 30px;
`

const SingleColorTooltip = styled(Tooltip)``

const SingleColor = styled.span`
  background-color: ${(props) => props.backgroundColor};
  border: 1px solid ${(props) => (getLuminance(props.backgroundColor) > 0.95 ? greyLightest : transparent)};
  border-radius: 50%;
  transition: all 0.3s;

  display: inline-block;
  position: relative;
  height: 24px;
  width: 24px;

  &:hover {
    ${SingleColorTooltip} {
      opacity: ${(props) => (props.dropdownOpen ? 0 : 1)};
      transform: translate3d(0, 0, 0);
    }
  }
`

const SingleColorGradient = styled(SingleColor)`
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.7) 0%, transparent 50%, white 95%);
  background-color: ${(props) => props.backgroundColor};
  border: none;
`

const DropdownStylingColors = ({ cv }) => {
  const cvStyleValue = (element) => cv.style[element]

  const [currentElement, setCurrentElement] = useState(null)
  const [currentValue, setCurrentValue] = useState(cvStyleValue[currentElement])
  const { closeDropdown, dropdownOpen, openDropdown } = useDropdown()

  useEffect(() => {
    // handles editing finish, deselecting the color
    if (!dropdownOpen) {
      setCurrentElement(null)
    }
  }, [dropdownOpen])

  const defaultStyles = conf.themes[cv.theme].styles
  const defaultValue = (element) => defaultStyles[element]
  const currentOrDefaultValue = (element) => cvStyleValue(element) || defaultValue(element)

  const allElements = ['@primary', '@secondary', '@link', '@background']
  const elements = allElements.filter((element) => defaultStyles[element])

  const editElement = (event, element) => {
    if (!dropdownOpen) {
      openDropdown()
    }

    setCurrentElement(element)

    // `setTimeout` is required so that the dropdown is not immediately closed
    // upon opening (happens when displayed in react-modal)
    setTimeout(() => setCurrentValue(cvStyleValue(element)), 0)

    // allow selecting different color without closing the dropdown
    if (dropdownOpen && currentElement !== element) {
      event.nativeEvent.stopImmediatePropagation()
    }
  }

  return (
    <>
      <Title onClick={(event) => editElement(event, '@primary')}>{t('colors')}</Title>

      <Dropdown>
        <Color>
          <Icon
            onClick={(event) => editElement(event, '@primary')}
            className="icon-color-picker-alt"
          />

          <DropdownTrigger
            active={!!currentElement}
            onClick={(event) => editElement(event, '@primary')}>
            <SingleColorGradient backgroundColor={primary} />
          </DropdownTrigger>
        </Color>

        <Colors>
          {elements.map((element) => (
            <DropdownTrigger
              key={element}
              active={currentElement === element}
              onClick={(event) => editElement(event, element)}>
              <SingleColor
                dropdownOpen={dropdownOpen}
                backgroundColor={currentOrDefaultValue(element)}>
                <SingleColorTooltip
                  bottom
                  title={t(element.replace('@', ''))}
                />
              </SingleColor>
            </DropdownTrigger>
          ))}
        </Colors>

        <DropdownContent
          ignoreInnerClicks
          separated
          closeDropdown={closeDropdown}
          dropdownOpen={dropdownOpen}>
          <StylingColors
            cv={cv}
            currentValue={currentValue}
            setCurrentValue={setCurrentValue}
            currentElement={currentElement}
            setCurrentElement={setCurrentElement}
          />
        </DropdownContent>
      </Dropdown>
    </>
  )
}

DropdownStylingColors.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default DropdownStylingColors
