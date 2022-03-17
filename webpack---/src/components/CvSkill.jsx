import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import api from '../services/api'
import conf from '../conf'

import CvSkillBar from './CvSkillBar'
import CvSkillBox from './CvSkillBox'
import CvSkillDial from './CvSkillDial'
import CvSkillStripes from './CvSkillStripes'

/**
 * @param {integer} value Skill level (0-100 in increments of 10)
 */
const CvSkill = ({ articleIndex, cv, inEditor, pdf, sectionKey, value }) => {
  const [skillValue, setSkillValue] = useState(Math.round(value / 10)) // 0-10
  const [selectedValue, setSelectedValue] = useState(-1) // 1-10

  // keeping local state synced with props fixes issue with new element added
  // via 'Add entry' copying local state from the previous element
  useEffect(() => {
    setSkillValue(Math.round(value / 10))
  }, [value])

  const updateSkill = (level) => {
    const article = cv.sections[sectionKey].contents[articleIndex]

    const updatedCv = {
      ...cv,
      sections: {
        ...cv.sections,
        [sectionKey]: {
          contents: [
            ...cv.sections[sectionKey].contents.slice(0, articleIndex),
            {
              ...article,
              level,
            },
            ...cv.sections[sectionKey].contents.slice(articleIndex + 1),
          ],
        },
      },
    }

    api.updateCv(updatedCv)
  }

  const onClick = (value) => {
    if (!inEditor) {
      return
    }

    setSkillValue(value)

    updateSkill(value * 10)
  }

  const selectValue = (value) => () => inEditor && setSelectedValue(value)
  const deselectValue = () => inEditor && setSelectedValue(-1)

  const elementClasses = (index) => ({
    filled: index <= skillValue,
    selected: index <= selectedValue,
  })

  const { strengths } = conf.themes[cv.theme]

  const bar = strengths.startsWith('bar')
  const box = strengths === 'box'
  const dial = strengths === 'dial'
  const stripes = strengths === 'stripes'

  return (
    <>
      {bar && (
        <CvSkillBar
          cv={cv}
          inEditor={inEditor}
          onClick={onClick}
          skillValue={skillValue}
        />
      )}

      {box && (
        <CvSkillBox
          cv={cv}
          inEditor={inEditor}
          onClick={onClick}
          skillValue={skillValue}
        />
      )}

      {dial && (
        <CvSkillDial
          cv={cv}
          inEditor={inEditor}
          onClick={onClick}
          skillValue={skillValue}
        />
      )}

      {stripes && (
        <CvSkillStripes
          cv={cv}
          deselectValue={deselectValue}
          elementClasses={elementClasses}
          inEditor={inEditor}
          onClick={onClick}
          pdf={pdf}
          selectValue={selectValue}
        />
      )}
    </>
  )
}

CvSkill.propTypes = {
  articleIndex: PropTypes.number.isRequired,
  cv: PropTypes.object.isRequired,
  inEditor: PropTypes.bool,
  pdf: PropTypes.bool,
  sectionKey: PropTypes.string.isRequired,
  value: PropTypes.number,
}

export default CvSkill
