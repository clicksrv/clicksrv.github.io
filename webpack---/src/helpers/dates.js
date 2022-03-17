/**
 * @param {date} value Javascript Date
 * @returns {string} ISO8601 date representation using local timezone
 */
export const dateToISOString = (value) => {
    const date = new Date(value)

    const padStart = (number, count = 2) => {
        const string = `${number}`

        if (string.length >= count) {
            return string
        }

        return `0000${string}`.slice(-count)
    }

    const getYear = () => date.getFullYear()
    const getMonth = () => date.getMonth() + 1
    const getDay = () => date.getDate()

    const year = padStart(getYear(), 4)
    const month = padStart(getMonth())
    const day = padStart(getDay())

    return `${year}-${month}-${day}`
}

/**
 * @param {string} string ISO8601 formatted date, i.e. 2021-01-18
 * @returns {date} new Javascript Date
 */
export const dateFromISOString = (string) => {
    if (typeof string !== 'string') {
        throw new Error(`Passed value is not a string: ${string}`)
    }

    const year = string.slice(0, 4)
    const month = string.slice(5, 7)
    const day = string.slice(8, 10)

    return new Date(Number(year), Number(month) - 1, Number(day))
}

/**
 * @param {date} date Date
 * @returns {boolean} true if current year
 */
export const isCurrentYear = (date) => date.getFullYear() === new Date().getFullYear()

/**
 * @param {string} isoString ISO8601 formatted date string
 * @returns {string} formatted date
 */
export const formatDate = (isoString, passedLocale, format) => {
    if (!isoString) {
        return null
    }

    const locale = passedLocale || 'en'

    return dateFromISOString(isoString).toLocaleDateString(locale, format)
}

/**
 * @param {string} isoString ISO8601 formatted date string
 * @returns {string} formatted date + time
 */
export const formatDateTime = (isoString, passedLocale, format) => {
    if (!isoString) {
        return null
    }

    const locale = passedLocale || 'en'

    return new Date(isoString).toLocaleString(locale, format)
}

export const relativeTimeDifference = (from, to, passedLocale) => {
    const fromTime = new Date(from)
    const toTime = new Date(to)

    const elapsedTime = fromTime - toTime

    // in miliseconds
    const units = {
        year: 24 * 60 * 60 * 1000 * 365,
        month: (24 * 60 * 60 * 1000 * 365) / 12,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000,
        second: 1000,
    }

    const locale = passedLocale || 'en'

    // "Math.abs" accounts for both "past" & "future" scenarios
    for (const unit of Object.keys(units)) {
        if (Math.abs(elapsedTime) > units[unit] || unit === 'second') {
            const rtf = new Intl.RelativeTimeFormat(locale, {
                numeric: 'auto',
                style: 'long'
            })

            return rtf.format(Math.round(elapsedTime / units[unit]), unit)
        }
    }
}