import cookies from 'js-cookie'

import useQuery from '../hooks/useQuery'

const useUtm = () => {
    const query = useQuery()
    const {
        utm_source: utmSource,
        utm_medium: utmMedium
    } = query

    const getUtmSource = () => utmSource || cookies.get('utm_source') || ''
    const getUtmMedium = () => utmMedium || cookies.get('utm_medium') || ''

    const storeUtmSource = () => {
        if (utmSource) {
            // utm_source in cookie is required both for OmniAuth signups and to persist
            // during page navigation (i.e. checkout with utm -> login -> signup)
            cookies.set('utm_source', utmSource, {
                expires: 7
            }) // days
        }
    }

    const storeUtmMedium = () => {
        if (utmMedium) {
            // utm_medium in cookie is required both for OmniAuth signups and to persist
            // during page navigation (i.e. checkout with utm -> login -> signup)
            cookies.set('utm_medium', utmMedium, {
                expires: 7
            }) // days
        }
    }

    const clearUtmSource = () => cookies.remove('utm_source')
    const clearUtmMedium = () => cookies.remove('utm_medium')

    return {
        utmSource,
        utmMedium,
        getUtmSource,
        getUtmMedium,
        storeUtmSource,
        storeUtmMedium,
        clearUtmSource,
        clearUtmMedium,
    }
}

export default useUtm