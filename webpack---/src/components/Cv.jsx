import PropTypes from 'prop-types'
import styled from 'styled-components'

import Bind from '../helpers/htmlTemplate'
import createDirectives from './cv/directives'
import themes from '../helpers/themes'
import usePageBreaks from '../hooks/usePageBreaks'
import { formatCV } from '../helpers/cv'

import CvFonts from './CvFonts'
import CvTheme from './CvTheme'

function createReactComponents(tree, key) {
  if (!tree || typeof tree === 'string') {
    return tree
  }

  if (tree instanceof Array) {
    return tree.length ? tree.map(createReactComponents) : null
  }

  if (typeof tree === 'object' && tree.type) {
    if (tree.type === 'template') {
      return null
    }

    return (
      <tree.type
        {...tree.props}
        key={key}>
        {createReactComponents(tree.children)}
      </tree.type>
    )
  }

  throw new Error(`React structure objects must have a type: ${tree}`)
}

const CvContainer = styled.div`
  animation-name: fadeInDelayed;
  animation-duration: 0.5s;
`

/**
 * Renders the CV in sorted order
 * @param {boolean} inEditor whether we are in (Visual) Editor
 * @param {boolean} editing whether we are in CV edit mode (Editor/Modal)
 */
const Cv = ({ className, cv, editing, inEditor, pdf }) => {
  const { pageBreaksMode } = usePageBreaks()

  const theme = cv.theme
  const template = themes[theme]

  const renderCV = () => {
    const { directives, postDirectives } = createDirectives(cv, editing, inEditor, pageBreaksMode, pdf)
    const cvTemplate = new Bind(template, { directives, postDirectives })
    const data = formatCV(cv, theme, inEditor)
    const output = cvTemplate.render(data)

    return createReactComponents(output)
  }

  if (!cv || !cv.id) {
    return null
  }

  return (
    <>
      <CvFonts cv={cv} />

      <CvTheme
        className={className}
        cv={cv}
        inEditor={inEditor}>
        <CvContainer className="cv-container">{renderCV()}</CvContainer>
      </CvTheme>
    </>
  )
}

Cv.propTypes = {
  className: PropTypes.string,
  cv: PropTypes.object,
  editing: PropTypes.bool,
  inEditor: PropTypes.bool,
  pdf: PropTypes.bool,
}

export default Cv
