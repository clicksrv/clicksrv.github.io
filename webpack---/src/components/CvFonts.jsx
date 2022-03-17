import PropTypes from 'prop-types'
import conf from '../conf'

const CvFonts = ({ cv }) => {
  const { fonts, themes } = conf
  const { style, theme } = cv
  const headerFont = style['@header-font'] || themes[theme].styles['@header-font']
  const bodyFont = style['@body-font'] || themes[theme].styles['@body-font']

  /**
   * @param {string} font short font string: rasa, unna, etc.
   */
  const fontLink = (font) =>
    `https://fonts.googleapis.com/css?family=${fonts[font].google_font}&display=swap&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese`

  return (
    <>
      <link
        href="https://fonts.gstatic.com"
        rel="preconnect"
      />

      {headerFont && (
        <link
          href={fontLink(headerFont)}
          key={fontLink(headerFont)}
          rel="stylesheet"
        />
      )}

      {bodyFont && bodyFont !== headerFont && (
        <link
          href={fontLink(bodyFont)}
          key={fontLink(bodyFont)}
          rel="stylesheet"
        />
      )}
    </>
  )
}

CvFonts.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default CvFonts
