/* eslint-disable import/no-unresolved, import/namespace */
import _ from 'lodash'
import queryString from 'query-string'
import {
    isValidElement
} from 'react'
import {
    renderToStaticMarkup
} from 'react-dom/server'

import events from './services/events'
import languages from './constants/languages'
import store from './services/store'
import {
    getSectionType,
    getTemplateType
} from './helpers/cv'
import {
    localStorage
} from './services/localstorage'

import * as locales from './locales'

/**
 * Set the correct current language based on currently signed in user, query
 * params, or the current locale set in localstorage or cookies. defaults to
 * English if none of the former resolve to a locale.
 */
export function updateLocale() {
    const session = store.getState().session || {}
    const query = queryString.parse(location.search) // `window.location`

    if (session.user && session.user.locale) {
        localStorage.setItem('locale', session.user.locale)
    } else if (query.locale) {
        localStorage.setItem('locale', query.locale)
    } else if (!localStorage.getItem('locale')) {
        localStorage.setItem('locale', 'en')
    }

    setLocale(localStorage.getItem('locale'))
}

/**
 * Set the locale for the app. if the provided locale is not supported, will
 * default to English.
 */
export function setLocale(newLocale = 'en') {
    const {
        locale
    } = store.getState().application

    if (newLocale !== locale) {
        events.emit('APPLICATION::SET_LOCALE', languages[newLocale.toLowerCase()] ? newLocale : 'en')
    }
}

/** Get the current language JSON based on store value. */
export function getLang() {
    const {
        locale = 'en'
    } = store.getState().application

    return locales[locale] || locales.en
}

/**
 * Translates an array of keys or a period separated string. includes makeshift
 * string interpolation (for compatability with existing translations that we're
 * syncing from the rails app).
 */
export function translate() {
    const lang = getLang()
    const args = Array.prototype.slice.call(arguments)
    const translated = _.get(lang, args[0])

    if (typeof translated !== 'string') {
        if (process.env.NODE_ENV !== 'production') {
            console.warn('translation missing:', args)
        }

        return args[0]
    }

    return _.reduce(
        args[1] || {},
        (memo, replacement, key) =>
        memo.replace(`%{${key}}`, isValidElement(replacement) ? renderToStaticMarkup(replacement) : replacement),
        translated
    )
}

export const placeholderText = (sectionKey, field, index = 0) => {
    const lang = getLang()
    const sectionType = getSectionType(sectionKey)
    const templateType = getTemplateType(sectionKey)

    if (field === 'label') {
        // section labels; we have labels for all fields
        return lang[sectionType]
    }

    let translated = lang.placeholders[sectionType] ? .[field]

    if (index > 0 && templateType === 'dated_story' && lang.placeholders[sectionType].previous) {
        // previous/subsequent section entry
        translated = lang.placeholders[sectionType].previous[field]
    }

    if (typeof translated !== 'string') {
        // generic placeholders like `start_date` and `end_date`
        translated = lang.placeholders[field]
    }

    return translated || translate(field)
}

/**
 * Will perform case insensitive searching/matching for a single term/string,
 * also will match 'e' for 'é', etc.
 *
 * @returns {boolean} true if 'searchString' is contained within 'string'
 */
export const localeMatch = (string, searchString, locale = 'en') => {
    return localeIndexOf(string, searchString, locale) >= 0
}

/**
 * Will perform case insensitive searching/matching for a single term/string,
 * also will match 'e' for 'é', etc.
 *
 * @returns {integer} >= 0 when search string is found; -1 otherwise
 */
export const localeIndexOf = (string, searchString, locale = 'en') => {
    const searchOpts = {
        ignorePunctuation: true,
        sensitivity: 'base',
        usage: 'search',
    }

    const stringLength = string.length
    const searchStringLength = searchString.length
    const lengthDiff = stringLength - searchStringLength

    for (let i = 0; i <= lengthDiff; i++) {
        if (string.substring(i, i + searchStringLength).localeCompare(searchString, locale, searchOpts) === 0) {
            return i
        }
    }

    return -1
}

export const t = translate