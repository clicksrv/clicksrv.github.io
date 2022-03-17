import {
    Parser
} from '../helpers/htmlToReact'

// eslint-disable-next-line import/no-unresolved
import * as templates from '../themes/templates'

// 1. get all the files in /src/themes/templates/*.html
// 2. for each file, minify then generate react json component

const parser = new Parser()

const themes = {}

Object.keys(templates).forEach((themeKey) => {
    const sourceHtml = templates[themeKey]

    // WARNING: simply strips all whitespaces and newlines, not a perfect minifier!
    const html = sourceHtml.replace(/\r\n|\r|\n|\s+(?=[^[>]*<)/g, '') // /\r\n|\r|\n|\s+(?=[^[>]*<) to remove all whitespaces
    const node = parser.parse(html)

    themes[themeKey] = node
})

export default themes