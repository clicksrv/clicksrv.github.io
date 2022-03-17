import PropTypes from 'prop-types'
import styled from 'styled-components'

import events from '../services/events'
import useDropdown from '../hooks/useDropdown'
import { getSectionType, sectionOrder } from '../helpers/cv'
import { primaryFaded } from '../colors'
import { t } from '../locales'

import ButtonAddArticleSection from './ButtonAddArticleSection'
import IconPlus from './IconPlus'
import { Dropdown, DropdownContent, DropdownIcon } from './Dropdown'

const Trigger = styled(ButtonAddArticleSection)`
  margin: 25px 0 60px;
`

const Content = styled.ul`
  background-color: white;
  border-radius: 4px;
  list-style: none;

  margin: 0;
  min-width: 280px;
  padding: 6px 0;
`

const AddNewSection = styled.li`
  color: black;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 110%;
  transition: background-color 0.2s;

  display: flex;
  align-items: center;

  padding: 5px 10px;

  @supports (font-variation-settings: normal) {
    font-family: 'InterVariable', sans-serif;
  }

  &:hover {
    background-color: ${primaryFaded};
  }
`

const ButtonAddSection = ({ cv, pageBreaksMode, sidebar }) => {
  const { closeDropdown, dropdownOpen, openDropdown } = useDropdown()

  const appendSection = (sectionKey) => () => {
    closeDropdown()

    events.emit('CV::APPEND_SECTION', { sectionKey, sidebar })
  }

  const deprecatedSections = ['certifications', 'references']
  const isSectionAvailable = (section) => !deprecatedSections.includes(section)

  const sections = sectionOrder(cv.sections, cv.main_order, cv.side_order, cv.theme)
  const missing = sidebar ? sections.sidebarMissing : sections.missing.filter((key) => key !== 'profile')

  return (
    <Dropdown>
      <Trigger
        className="add-section"
        cv={cv}
        onClick={openDropdown}
        pageBreaksMode={pageBreaksMode}
        sidebar={sidebar}>
        {t('add_section')}

        <DropdownIcon
          dropdownOpen={dropdownOpen}
          className="icon-chevron"
        />
      </Trigger>

      <DropdownContent
        closeDropdown={closeDropdown}
        dropdownOpen={dropdownOpen}>
        <Content>
          {missing.filter(isSectionAvailable).map((sectionKey) => (
            <AddNewSection
              key={sectionKey}
              onClick={appendSection(sectionKey)}>
              <IconPlus className="icon-plus" />

              {t(getSectionType(sectionKey))}
            </AddNewSection>
          ))}
        </Content>
      </DropdownContent>
    </Dropdown>
  )
}

ButtonAddSection.propTypes = {
  cv: PropTypes.object.isRequired,
  pageBreaksMode: PropTypes.bool.isRequired,
  sidebar: PropTypes.bool,
}

export default ButtonAddSection
