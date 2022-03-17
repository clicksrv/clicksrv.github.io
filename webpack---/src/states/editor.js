import _ from 'lodash'
import scour from 'scourjs'
import conf from '../conf'
import {
    getContent,
    getPath,
    getSectionPlaceholder,
    getSectionType,
    isFixedSection
} from '../helpers/cv'

// WARNING: Object.assign is not the same as _.merge, _.merge is deep!
// - https://github.com/rstacruz/scour
// - https://facebook.github.io/react/docs/update.html
export default {
    'CV::UPDATE': (state, {
        sectionKey,
        index,
        attr,
        assetIndex,
        data = {}
    }) => {
        const path = getPath(sectionKey, index, attr, assetIndex)

        // NOTE: have to use, lodash.set update seems to have some issue with shared immutability
        // WARNING: scour's set and _.set does not have the same behaviour, it doesn't create arrays
        // let cv = scour(state.cv).set(path, data).value
        // unfreeze and set the cv object
        const cv = _.cloneDeep(state.cv)
        _.set(cv, path, data)

        return {
            cv
        }
    },

    'CV::UPDATE_THEME': (state, theme) => {
        // reset styles to default on theme change
        const updatedCv = _.merge({}, state.cv, {
            theme
        })
        updatedCv.style = conf.themes[theme].styles

        return {
            cv: updatedCv
        }
    },

    'CV::SORT': (state, {
        sectionOrder = [],
        sidebar
    }) => {
        const sortType = sidebar ? 'side_order' : 'main_order'

        const {
            fixedSections
        } = conf.themes[state.cv.theme]

        const sortableOrder = sectionOrder.filter((sectionKey) => !fixedSections.includes(getSectionType(sectionKey)))

        const updates = _.set({}, sortType, sortableOrder)

        return _.merge({}, state, {
            cv: updates
        })
    },

    'CV::SORT_ARTICLES': (state, {
        sectionKey,
        articles
    }) => {
        const path = `sections.${sectionKey}.contents`
        if (!articles) {
            return state
        }

        const cv = scour(state.cv).set(path, articles).value
        return {
            cv
        }
    },

    'CV::TOGGLE_PAGE_BREAK': (state, {
        sectionKey,
        index
    }) => {
        const cv = _.cloneDeep(state.cv)

        const path = index === null ? `sections.${sectionKey}.page_break` : getPath(sectionKey, index, 'page_break')

        return {
            ...state,
            cv: _.set(cv, path, !_.get(cv, path)),
        }
    },

    'CV::PREPEND_ARTICLE': (state, sectionKey) => {
        const articles = getContent(state.cv, sectionKey)

        if (!articles || !articles.unshift) {
            console.warn('Invalid CV Section Path')
            return state
        }

        const defaultSchema = conf.formSchema[getSectionType(sectionKey)] || {}
        const newArticles = [_.cloneDeep(defaultSchema), ...articles]
        const cv = scour(state.cv).set(`sections.${sectionKey}.contents`, newArticles).value

        return {
            cv
        }
    },

    'CV::APPEND_SECTION': (state, {
        sectionKey,
        sidebar
    }) => {
        const {
            cv
        } = state
        const section = getSectionPlaceholder(sectionKey)
        const updates = {}

        if (_.get(state, ['cv', 'sections', sectionKey])) {
            console.warn('sectionKey already taken')
            return state
        }

        if (!isFixedSection(cv.theme, sectionKey)) {
            if (sidebar) {
                updates.side_order = cv.side_order ? [...cv.side_order, ...[sectionKey]] : [sectionKey]
            } else {
                updates.main_order = cv.main_order ? [...cv.main_order, ...[sectionKey]] : [sectionKey]
            }
        }

        _.set(updates, ['sections', sectionKey], section)

        return {
            cv: _.merge({}, state.cv, updates)
        }
    },

    'CV::REMOVE_ARTICLE': (state, {
        sectionKey,
        index
    }) => {
        const clone = _.cloneDeep(state.cv)
        const articles = clone.sections[sectionKey].contents

        if (articles && articles.splice) {
            articles.splice(index, 1)
        }

        return {
            cv: clone
        }
    },

    'CV::REMOVE_SECTION': (state, {
        sectionKey
    }) => {
        const clone = _.cloneDeep(state.cv)

        delete clone.sections[sectionKey]

        // remove section from sort orders
        if (clone.main_order && clone.main_order.filter) {
            clone.main_order = clone.main_order.filter((key) => Object.keys(clone.sections).includes(key))
        }

        if (clone.side_order && clone.side_order.filter) {
            clone.side_order = clone.side_order.filter((key) => Object.keys(clone.sections).includes(key))
        }

        return {
            cv: clone
        }
    },

    'CV::RESET': (state) => {
        return {
            ...state,
            cv: conf.defaults.state.editor.cv,
        }
    },
}