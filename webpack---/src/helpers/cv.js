import _ from 'lodash'
import classNames from 'classnames'
import uid from 'component-uid'

import api from '../services/api'
import conf from '../conf'
import groupBy from '../helpers/groupBy'
import history from '../services/history'
import notify from '../services/notify'
import themes from '../constants/themes'
import {
    isFreeTheme,
    isWebsiteTheme
} from './theme'
import {
    t
} from '../locales'
import {
    trackEvent
} from '../helpers/analytics'

export const isResume = (cv) => themes[cv.theme].type === 'resume'
export const isCoverLetter = (cv) => themes[cv.theme].type === 'cover_letter'
export const isWebsite = (cv) => themes[cv.theme].type === 'website'

/**
 * @returns {boolean} true if CV has been created in the last 5 minutes
 */
export const isRecentlyCreated = (cv) => {
    return Date.now() - new Date(cv.created_at) < 1000 * 60 * 5
}

/**
 * Returns `true` for sections not ending with an `s`
 * i.e. sections which are articles on their own, instead of sections having a
 * collection of articles inside them (dated stories, etc.)
 * @returns {boolean} true for profile / summary / portfolio / text_story / contact_me
 */
export function isArticle(sectionKey) {
    return !getSectionType(sectionKey) ? .match(/s$/)
}

export function isFixedSection(theme, key) {
    const {
        fixedSections
    } = conf.themes[theme]

    return fixedSections.includes(key)
}

/**
 * @returns {string} `portfolio` for `portfolio_j-H_q_hPs5` key
 */
export function getSectionType(sectionKey) {
    if (!sectionKey || !sectionKey.replace) {
        return sectionKey
    }

    const sectionType = conf.supportedSections.filter((sectionType) => {
        return sectionKey.indexOf(sectionType) >= 0
    })[0]

    if (!sectionType) {
        console.warn(`Invalid Section Type (${sectionType}) for key: ${sectionKey}`)
    }

    return sectionType
}

export function getTemplateType(sectionKey) {
    const aliases = {
        summary: 'text_story',
        positions: 'dated_story',
        degrees: 'dated_story',
        dated_stories: 'dated_story',
        references: 'dated_story',
        certifications: 'dated_story',
    }

    const type = getSectionType(sectionKey)

    return aliases[type] || type
}

export function canAccessTheme(user, theme) {
    return isFreeTheme(theme, user) || user.paid_tier
}

export function getSectionPlaceholder(sectionKey) {
    const sectionType = getSectionType(sectionKey)
    const section = {}

    if (!sectionType) {
        return section
    }

    const defaultSchema = _.cloneDeep(conf.formSchema[sectionType]) || {}

    if (isArticle(sectionType)) {
        section.content = defaultSchema
    } else {
        section.contents = [defaultSchema]
    }

    return section
}

export function _sectionOrder(cvSections = {}, sortOrder = [], sidebarOrder = [], theme) {
    const {
        supportedSections
    } = conf

    if (!sortOrder || !sortOrder.slice) sortOrder = []
    if (!sidebarOrder || !sidebarOrder.slice) sidebarOrder = []

    const allSectionKeys = _.uniq(supportedSections.concat(_.keys(cvSections)))

    // Add supported section types in default order
    let supported = allSectionKeys.reduce((sortOrder, type, i) => {
        if (!_.includes(sortOrder, type)) sortOrder.splice(i, 0, type)

        return sortOrder
    }, sortOrder.slice()) // NOTE: sortOrder is frozen

    // Cleanse: ensure uniqueness, remove unsupported sections, exclude 'Contact me' from Resumes
    supported = _.uniq(supported)
        .filter((key) => supportedSections.includes(getSectionType(key)))
        .filter((key) => key !== 'contact_me' || isWebsiteTheme(theme))

    const defaultSidebarSections = conf.themes[theme].sidebarSections

    // Separate the sections
    const {
        sorted = [],
            missing = [],
            sidebar = [],
            sidebarMissing = [],
    } = groupBy(supported, (key) => {
        if (
            _.includes(defaultSidebarSections, key) ||
            (_.includes(sidebarOrder, key) && _.includes(defaultSidebarSections, getSectionType(key)))
        ) {
            return cvSections[key] ? 'sidebar' : 'sidebarMissing'
        }
        return cvSections[key] ? 'sorted' : 'missing'
    })

    function addCustomSections(type, missing) {
        if (missing.filter((key) => getSectionType(key) === type).length === 0) {
            missing.push(`${type}_${uid(10)}`)
        }
    }

    // Ensure custom sections are always included in the missing list
    const customSections = ['text_story', 'portfolio', 'strengths', 'dated_stories']

    customSections.forEach((section) => {
        addCustomSections(section, missing)

        if (defaultSidebarSections.includes(section)) {
            addCustomSections(section, sidebarMissing)
        }
    })

    const {
        fixedSections
    } = conf.themes[theme]

    return {
        all: sorted,
        fixed: sorted.filter((sectionKey) => fixedSections.includes(getSectionType(sectionKey))),
        sorted: sorted.filter((sectionKey) => !fixedSections.includes(getSectionType(sectionKey))), // all sortable cv sections
        missing,
        sidebar: _.sortBy(sidebar, (s) => sidebarOrder.indexOf(s)),
        sidebarMissing: _.uniq(sidebarMissing),
    }
}

export const sectionOrder = _.memoize(_sectionOrder)

export function getPath(sectionKey, index, attr, assetIndex) {
    if (!sectionKey) return null

    if (attr === 'label') {
        return ['sections', sectionKey, 'label']
    }

    const assetIndexStr = isNaN(assetIndex) ? assetIndex : assetIndex.toString()

    if (getSectionType(sectionKey) === 'portfolio' && !isNaN(index)) {
        return ['sections', sectionKey, 'content', 'assets', index || 0, attr]
    }

    if (isArticle(sectionKey)) {
        return _.compact(['sections', sectionKey, 'content', attr, assetIndexStr]).join('.')
    }

    return ['sections', sectionKey, 'contents', index || 0, attr]
        .filter((el) => el !== null && el !== undefined)
        .join('.')
}

export function getContent(cv = {}, sectionKey, index) {
    if (isArticle(sectionKey)) {
        return _.get(cv, ['sections', sectionKey, 'content'])
    }

    if (index !== undefined) {
        return _.get(cv, ['sections', sectionKey, 'contents', index])
    }

    return _.get(cv, ['sections', sectionKey, 'contents'])
}

export function moveElement(array, oldIndex, newIndex) {
    if (!array || !array.splice) {
        return console.warn('Invalid Array')
    }

    const arrayCopy = array.slice()
    const element = arrayCopy.splice(oldIndex, 1)[0]
    arrayCopy.splice(newIndex, 0, element)

    return arrayCopy
}

export function formatURL(url) {
    if (!url || !url.trim) {
        return url
    }

    const host = url.trim()
    if (!/^https?:\/\//.test(host)) {
        return `http://${host}`
    }

    return url
}

export function formatCV(cv, theme, inEditor) {
    const formatSection = (key) => {
        let article = cv.sections[key]

        const sectionType = getSectionType(key)
        const schema = conf.formSchema[sectionType]

        if (!article) {
            return {}
        }

        if (article.content) {
            const portfolioAssets = article.content.assets

            const updates = {
                content: {
                    key,
                    _editArticle: true,
                    _className: classNames({
                        'page-break': !inEditor && article.content.page_break
                    }),
                    ...(key === 'profile' ? {} : {
                        _pageBreakBtn: true
                    }),
                },
            }

            if (portfolioAssets && portfolioAssets.map) {
                updates.content.assets = portfolioAssets.map((asset, index) => Object.assign({
                    key,
                    index
                }, asset))
            }

            article = _.merge({}, schema, article, updates)
        } else if (article.contents) {
            article = Object.assign({}, article)

            // NOTE: automating date-range present value is tough you can't easily edit inline then.
            article.contents = article.contents.map((content) =>
                Object.assign({
                        key,
                        _editArticle: true,
                        _className: classNames({
                            'page-break': !inEditor && content.page_break
                        }),
                        ...(key === 'profile' ? {} : {
                            _pageBreakBtn: true
                        }),
                        ...(sectionType === 'strengths' ? {
                            _skill: true
                        } : {}),
                    },
                    _.merge({}, schema, content)
                )
            )
        }

        const section = Object.assign({
                key, // pass the key through as reference
                _id: key,
                _className: classNames(getTemplateType(key), {
                    'page-break': !inEditor && article.page_break
                }),
                _template: getTemplateType(key),
                _editSection: key,
                label: t(getSectionType(key)),
                ...(key === 'profile' ? {} : {
                    _pageBreakBtn: key
                }),
            },
            article
        )

        // for dated sections / skills add the 'Add entry' button
        if (!isArticle(key)) {
            section._addArticle = key
        }

        return section
    }

    const sortedOrder = sectionOrder(cv.sections, cv.main_order, cv.side_order, theme)
    const sectionKeys = sortedOrder.all
    const sections = sectionKeys.map(formatSection)
    let sidebarSections = sortedOrder.sidebar.map(formatSection)

    const {
        fixed = [], sortable = []
    } = groupBy(sections, (section) => {
        return isFixedSection(theme, section.key) ? 'fixed' : 'sortable'
    })

    sidebarSections = sidebarSections.map((section) => {
        if (section._template === 'portfolio') {
            section._template = 'sidebar_portfolio'
        }

        return section
    })

    const data = {
        cv,
        sidebar_sections: sidebarSections,
        sections: sortable,
        'bar-branding': true,
        'add-section-btn': true,
        'add-sidebar-section-btn': true,
        menu: true,
        logo: cv.style['@logo-url'],
    }

    fixed.forEach((section) => {
        data[section.key] = section

        delete data[section.key]._template
    })

    if (data.profile) {
        data.profile_sidebar = _.merge({
            content: {
                menu: true
            }
        }, data.profile)
    }

    return data
}

export const styleProps = (cv) => {
    const {
        fonts,
        themes
    } = conf
    const {
        style,
        theme
    } = cv

    const cvWidth = isWebsite(cv) || cv.theme === 'onyx' ? '100%' : '1020px'

    const headerFont = style['@header-font'] || themes[theme].styles['@header-font']
    const bodyFont = style['@body-font'] || themes[theme].styles['@body-font']

    const headerFontFamily = fonts[headerFont] ? .css
    const bodyFontFamily = fonts[bodyFont] ? .css
    const bodyFontSize = style['@body-font-size'] || themes[theme].styles['@body-font-size']

    const sectionMargins = style['@section-margins'] || themes[theme].styles['@section-margins']
    const articleMargins = style['@article-margins'] || themes[theme].styles['@article-margins']

    const articleSpacing = themes[theme].fixedStyles['@article-spacing']
    const horizontalSpacing = themes[theme].fixedStyles['@horizontal-spacing']
    const headerHeight = themes[theme].fixedStyles['@header-height']
    const headerSpacing = themes[theme].fixedStyles['@header-spacing']
    const articleHorizontalSpacing = themes[theme].fixedStyles['@article-horizontal-spacing']

    const primaryColor = style['@primary'] || themes[theme].styles['@primary']
    const secondaryColor = style['@secondary'] || themes[theme].styles['@secondary']
    const linkColor = style['@link'] || themes[theme].styles['@link']
    const backgroundColor = style['@background'] || themes[theme].styles['@background']

    const bodyColor = themes[theme].fixedStyles['@body']
    const subtleColor = themes[theme].fixedStyles['@subtle']
    const faintColor = themes[theme].fixedStyles['@faint']

    const bgUrl = style['@bg-url'] || themes[theme].styles['@bg-url']
    const logoUrl = style['@logo-url'] || themes[theme].styles['@logo-url']

    const competencySize = themes[theme].fixedStyles['@competency-size']
    const competencyStyle = themes[theme].fixedStyles['@competency-style']
    const headlineChromaOffsetX = themes[theme].fixedStyles['@headline-chroma-offset-x']
    const headlineChromaOffsetY = themes[theme].fixedStyles['@headline-chroma-offset-y']
    const timelineOffset = themes[theme].fixedStyles['@timeline-offset']

    const articlePikeNoseHeight = themes[theme].fixedStyles['@article-pike-nose-height']
    const articlePikeNoseWidth = themes[theme].fixedStyles['@article-pike-nose-width']

    return {
        cvWidth,
        headerFontFamily,
        bodyFontFamily,
        bodyFontSize,
        sectionMargins,
        articleMargins,
        articleSpacing,
        horizontalSpacing,
        headerHeight,
        headerSpacing,
        articleHorizontalSpacing,
        primaryColor,
        secondaryColor,
        linkColor,
        backgroundColor,
        bodyColor,
        subtleColor,
        faintColor,
        bgUrl,
        logoUrl,
        competencySize,
        competencyStyle,
        headlineChromaOffsetX,
        headlineChromaOffsetY,
        timelineOffset,
        articlePikeNoseHeight,
        articlePikeNoseWidth,
    }
}

/**
 * @param {array} items a collection of resumes / cover letters / websites / journal entries
 * @param {string} type resume / cover_letter / website / journal_entry
 */
export const atLimit = (user, items, type) => {
    if (type === 'journal_entry') {
        return items.length >= user.journal_entries_limit
    }

    return items.length >= user.cv_limit
}

/**
 * @param {array} items a collection of resumes / cover letters / websites / journal entries
 * @param {string} type resume / cover_letter / website / journal_entry
 */
export const newPath = (user, items, type) => {
    const {
        show_journal_onboarding: journalOnboarding,
        paid_tier: paidTier
    } = user
    const normalizedType = type.replace('_', '-') // cover_letter => cover-letter

    const journalPath = journalOnboarding ? '/journal' : '/journal/entries/new'

    const paths = {
        cover_letter: '/cover-letters/new',
        journal_entry: journalPath,
        resume: '/resumes/new',
        website: '/websites/new',
    }

    if (atLimit(user, items, type)) {
        if (paidTier) {
            return '?modal=upgrade&reason=cv-limit'
        }

        return `?modal=upgrade&reason=${normalizedType}-limit`
    }

    return paths[type]
}

/**
 * @param {string} type resume / cover_letter / website / journal_entry
 * @returns {function} to be directly attached to the onClick JSX attribute
 */
export const trackNewClick = (type, cta) => () => {
    const normalizedType = type.replace('_', '-') // cove_letter => cover-letter

    if (cta) {
        const section = `create-${normalizedType}`

        return trackEvent('clicked-upgrade', 'click', 0, {
            section
        })
    }

    return trackEvent(`clicked-create-${normalizedType}`, 'click')
}

const mergeContent = (cv, content, onError, {
    overwriteProfile,
    overwriteTheme
}) => {
    // reloads the CV
    const onContentMerged = () => {
        history.push(`/cvs/${cv.id}`)

        notify.success(t('content_imported_successfully'))
    }

    // use provided or existing profile
    const profile = overwriteProfile ? content.sections ? .profile : cv.sections ? .profile

    const {
        sections: existingSections
    } = cv

    // merge all sections
    const sections = {
        ...existingSections,
        ...content.sections,
        profile,
    }

    const updatedCv = {
        ...cv,
        sections,
        main_order: content.main_order,
        side_order: content.side_order,
    }

    if (overwriteTheme && content.theme) {
        updatedCv.theme = content.theme
    }

    api.updateCv(updatedCv).then(onContentMerged).catch(onError)
}

export const importCvContentFromUpload = (cv, content, onError) => {
    mergeContent(cv, content, onError, {
        overwriteProfile: true
    })
}

export const importCvContentFromSample = (cv, slug, {
    overwriteTheme
}) => {
    const onSampleImportError = () => {
        notify.error(t('cv_sample_error'))

        history.push(`/cvs/${cv.id}`)
    }

    const onSampleLoaded = (content) => mergeContent(cv, content, onSampleImportError, {
        overwriteTheme
    })

    api.getSample(slug).then(onSampleLoaded).catch(onSampleImportError)
}

/**
 * Copies CV content into a new CV, redirecting user to choose new theme
 * @param {string} type resume / cover_letter / website
 */
export const copyCv = (type, originalCv) => {
    const params = {
        type,
        name: `${originalCv.name} (${t('copy').toLocaleLowerCase()})`,
        copy_id: originalCv.id,
    }

    return createCv('copy', params)
}

/**
 * Duplicates a CV redirecting directly into the editor
 * @param {string} type resume / cover_letter / website
 */
export const duplicateCv = (type, originalCv) => {
    const params = {
        type,
        name: `${originalCv.name} (${t('copy').toLocaleLowerCase()})`,
        copy_id: originalCv.id,
        theme: originalCv.theme,
    }

    return createCv('duplicate', params)
}

/**
 * @param {string} method creation method (blank, cover-letter, copy, duplicate, import, onboarding, sample, samples)
 * @param {object} params type: resume / cover_letter / website
 */
export const createCv = (method, params) => {
    const {
        slug,
        type,
        ...cvParams
    } = params

    const coverLetter = type === 'cover_letter'

    const name = coverLetter ? conf.defaults[type].name : t('my_vcv')

    const creationParams = {
        name,
        theme: conf.defaults[type].theme,
        ...cvParams,
    }

    const nextCvPath = () => {
        switch (method) {
            case 'import':
            case 'linkedin':
                return '/import'
            case 'samples':
                return '/samples'
            case 'cover-letter':
            case 'duplicate':
            case 'onboarding':
                return ''
            default:
                return coverLetter ? '' : '/templates'
        }
    }

    const onError = (error) => {
        if (error ? .response ? .status === 402) {
            // Payment required
            history.push('/cvs?modal=upgrade&reason=cv-limit')
        } else {
            notify.error(t('cv_creation_error'))

            history.push('/cvs')
        }
    }

    const onCreated = (cv) => {
        const cvPath = `/cvs/${cv.id}${nextCvPath()}`

        if (method === 'sample') {
            const overwriteTheme = true

            importCvContentFromSample(cv, slug, {
                overwriteTheme
            })
        } else if (coverLetter) {
            history.replace(cvPath)
        } else {
            history.push(cvPath)
        }
    }

    return api.createCv(creationParams).then(onCreated).catch(onError)
}