// Note that for certain fonts (especially ones with 400,700 weights) wkhtmltopdf
// on MacOS might render *all text* as normal or bold
const GENERIC_FALLBACKS =
    '"Microsoft YaHei New", "Microsoft Yahei", "微软雅黑", 宋体, SimSun, 华文细黑, STXihei, 黑体, SimHei'

const fontCss = (fonts, generic) => `${fonts}, ${GENERIC_FALLBACKS}, ${generic}`

const definitions = {
    // Sans Serifs
    source_sans_pro: {
        name: 'Source Sans Pro',
        type: 'sans_serif',
        google_font: 'Source+Sans+Pro:400,600',
        css: fontCss('"Source Sans Pro", "Open Sans", "Century Gothic", CenturyGothic', 'sans-serif'),
    },
    open_sans: {
        name: 'Open Sans',
        type: 'sans_serif',
        google_font: 'Open+Sans:400,600',
        css: fontCss('"Open Sans", "Century Gothic", CenturyGothic', 'sans-serif'),
    },
    assistant: {
        name: 'Assistant',
        type: 'sans_serif',
        google_font: 'Assistant:400,600',
        css: fontCss('"Assistant"', 'sans-serif'),
    },
    yantramanav: {
        name: 'Yantramanav',
        type: 'sans_serif',
        google_font: 'Yantramanav:400,700',
        css: fontCss('"Yantramanav"', 'sans-serif'),
    },
    lato: {
        name: 'Lato',
        type: 'sans_serif',
        google_font: 'Lato:400,700',
        css: fontCss('"Lato"', 'sans-serif'),
    },
    montserrat: {
        name: 'Montserrat',
        type: 'sans_serif',
        google_font: 'Montserrat:400,600',
        css: fontCss('"Montserrat", "Century Gothic", CenturyGothic', 'sans-serif'),
    },
    roboto: {
        name: 'Roboto',
        type: 'sans_serif',
        google_font: 'Roboto:400,700',
        css: fontCss('"Roboto", "Open Sans", "Century Gothic", CenturyGothic', 'sans-serif'),
    },
    ubuntu: {
        name: 'Ubuntu',
        type: 'sans_serif',
        google_font: 'Ubuntu:400,700',
        css: fontCss('"Ubuntu", "Open Sans", "Century Gothic", CenturyGothic', 'sans-serif'),
    },
    raleway: {
        name: 'Raleway',
        type: 'sans_serif',
        google_font: 'Raleway:400,600',
        css: fontCss('"Raleway", "Didot", "Hoefler Text", Garamond', 'sans-serif'),
    },
    pt_sans: {
        name: 'PT Sans',
        type: 'sans_serif',
        google_font: 'PT+Sans:400,700',
        css: fontCss('"PT Sans"', 'sans-serif'),
    },
    titillium: {
        name: 'Titillium',
        type: 'sans_serif',
        google_font: 'Titillium+Web:400,700',
        css: fontCss('"Titillium Web"', 'sans-serif'),
    },

    // Serifs
    eb_garamond: {
        name: 'EB Garamond',
        type: 'serif',
        google_font: 'EB+Garamond:400,600',
        css: fontCss('"EB Garamond"', 'serif'),
    },
    playfair_display: {
        name: 'Playfair Display',
        type: 'serif',
        google_font: 'Playfair+Display:400,600',
        css: fontCss('"Playfair Display"', 'serif'),
    },
    pt_serif: {
        name: 'PT Serif',
        type: 'serif',
        google_font: 'PT+Serif:400,700',
        css: fontCss('"PT Serif"', 'serif'),
    },
    source_serif_pro: {
        name: 'Source Serif Pro',
        type: 'serif',
        google_font: 'Source+Serif+Pro:400,600',
        css: fontCss('"Source Serif Pro", Georgia, Times, "Times New Roman"', 'serif'),
    },
    rasa: {
        name: 'Rasa',
        type: 'serif',
        google_font: 'Rasa:400,600',
        css: fontCss('"Rasa", "Didot", "Hoefler Text", Garamond', 'serif'),
    },
    unna: {
        name: 'Unna',
        type: 'serif',
        google_font: 'Unna:400,700',
        css: fontCss('"Unna"', 'serif'),
    },

    // Condensed
    fira_condensed: {
        name: 'Fira Condensed',
        type: 'condensed',
        google_font: 'Fira+Sans+Condensed:400,600',
        css: fontCss('"Fira Sans Condensed"', 'sans-serif'),
    },
    oswald: {
        name: 'Oswald',
        type: 'condensed',
        google_font: 'Oswald:400,600',
        css: fontCss('"Oswald"', 'sans-serif'),
    },
    roboto_condensed: {
        name: 'Roboto Condensed',
        type: 'condensed',
        google_font: 'Roboto+Condensed:400,700',
        css: fontCss('"Roboto Condensed"', 'sans-serif'),
    },

    // Slab
    arvo: {
        name: 'Arvo',
        type: 'slab',
        google_font: 'Arvo:400,700',
        css: fontCss('"Arvo"', 'serif'),
    },
    noto_serif: {
        name: 'Noto Serif',
        type: 'slab',
        google_font: 'Noto+Serif:400,700',
        css: fontCss('"Noto Serif"', 'serif'),
    },
    roboto_slab: {
        name: 'Roboto Slab',
        type: 'slab',
        google_font: 'Roboto+Slab:400,600',
        css: fontCss('"Roboto Slab", "Open Sans", "Century Gothic", CenturyGothic', 'sans-serif'),
    },
}

const fonts = {}

// sort by name
Object.keys(definitions)
    .sort()
    .forEach((key) => (fonts[key] = definitions[key]))

export default fonts