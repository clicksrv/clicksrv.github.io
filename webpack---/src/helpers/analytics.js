import conf from '../conf'

export const initializeGTM = () => {
    if (typeof window !== 'undefined' && typeof dataLayer === 'undefined') {
        window.dataLayer = []
    }
}

export const initializeGoogleAnalyticsForApps = () => {
    if (typeof window !== 'undefined' && typeof ga === 'undefined') {
        window.ga =
            window.ga ||
            function() {;
                (ga.q = ga.q || []).push(arguments)
            }

        ga.l = Number(new Date())
    }

    // disable cookie storage and set the clientId to device.uuid
    const cookieDomain = {
        storage: 'none',
        clientId: device.uuid
    }

    ga('create', 'UA-3237470-1', cookieDomain)

    // By default, GA aborts if the protocol is not http or https.
    // On Cordova, it's file://. This disables that.
    ga('set', 'checkProtocolTask', null)
}

const timestamp = (attr) => (attr ? Math.round(new Date(attr).getTime() / 1000) : null)

const userAttributes = (user) => {
    // we will send `professional-trial` if the user is on the trial period of
    // his plan; after the trial ends and the user pays, his tier will be just
    // `professional`; valid only for Intercom
    const userTier = user.trial ? `${user.tier}-trial` : user.tier
    const currentSubscription = user.current_subscription
    const name = `${user.first_name || ''} ${user.last_name || ''}`.trim()

    return {
        app_id: conf.intercomAppId,
        name,
        user_id: user.id,
        email: user.email,
        tier: userTier,
        trial: user.trial,

        cvs_count: user.cvs_count,
        resumes_count: user.resumes_count,
        cover_letters_count: user.cover_letters_count,
        websites_count: user.websites_count,

        latest_position: user.latest_position,
        latest_degree: user.latest_degree,

        free_tier: user.free_tier,
        paid_tier: user.paid_tier,
        recurly_account_code: user.recurly_account_code,
        locale: user.locale,
        oauth: user.oauth,
        mobile: user.mobile,

        plan_code: currentSubscription ? .plan_code,
        plan_name: currentSubscription ? .plan_name,
        trial_ends_at: timestamp(currentSubscription ? .trial_ends_at),

        time_zone: user.time_zone,
        total_views: user.total_views,
        total_downloads: user.total_downloads,
        created_at: timestamp(user.created_at),

        company_id: user.company_id,
        company_name: user.company_name,

        subscription_activated_at: timestamp(currentSubscription ? .activated_at),
        subscription_canceled_at: timestamp(currentSubscription ? .canceled_at),
        subscription_expires_at: timestamp(currentSubscription ? .expires_at),
        subscription_state: currentSubscription ? .state,
        subscription_current_period: currentSubscription ? .current_period,
        subscription_current_period_started_at: timestamp(currentSubscription ? .current_period_started_at),
        subscription_current_period_ends_at: timestamp(currentSubscription ? .current_period_ends_at),

        journal_activated_at: timestamp(user.journal_created_at),
        journal_entries_count: user.journal_entries_count,
        journal_reminders: user.journal_reminders,
        latest_journal_entry_created_at: timestamp(user.latest_journal_entry_created_at),

        utm_source: user.utm_source,
        utm_medium: user.utm_medium,

        // Intercom requires a change in attributes to track them in SPAs
        // https://docs.intercom.io/install-on-your-product-or-site/other-ways-to-get-started/integrate-intercom-in-a-single-page-app
        last_request_at: Math.round(new Date().getTime() / 1000),
    }
}

export const trackUser = (user) => {
    if (!user || !user.id) {
        return
    }

    // identifies session with user in GA
    if (process.env.CORDOVA && typeof ga !== 'undefined') {
        // Cordova
        ga('set', 'userId', `${user.id}`)
    }

    if (typeof dataLayer !== 'undefined') {
        // GTM
        dataLayer.push({
            userId: `${user.id}`,
            userEmail: user.email,
            userFullName: `${user.first_name || ''} ${user.last_name || ''}`.trim(),
        })

        // Trigger GTM tags that fire on user identification
        dataLayer.push({
            event: 'identified-user'
        })
    }

    if (typeof Intercom !== 'undefined') {
        Intercom('boot', userAttributes(user))
    }
}

export const stopTrackingUser = () => {
    // identifies session with user in GA
    if (process.env.CORDOVA && typeof ga !== 'undefined') {
        // Cordova
        ga('set', 'userId', 0)
    }

    if (typeof dataLayer !== 'undefined') {
        // GTM
        dataLayer.push({
            userId: undefined,
            userEmail: undefined,
            userFullName: undefined
        })

        // Trigger GTM tags that fire on user anonymization (i.e. logout)
        dataLayer.push({
            event: 'anonymized-user'
        })
    }
}

export const trackPageView = (user, path) => {
    if (process.env.CORDOVA && typeof ga !== 'undefined') {
        // For Cordova we track views in GA manually

        // Cordova paths don't have /app prefixed (they use hash router)
        const fullPath = `/app${path}`

        ga('send', 'pageview', fullPath)

        // The userId custom dimension is hit-level scoped so we must pass it on
        // every page view. When the user is not logged in (signup and signin pages)
        // we pass 0 as hits with no value for a dimension are not included in
        // reports.
        const userId = user ? .id || 0

        ga('set', 'dimension1', userId)
    }

    // https://docs.intercom.io/install-on-your-product-or-site/other-ways-to-get-started/integrate-intercom-in-a-single-page-app
    if (user && typeof Intercom !== 'undefined') {
        Intercom('update', userAttributes(user))
    }
}

// param {object} metadata - (usually: section/service/plan) or (id+revenue+name+sku) [transaction]
export const trackEvent = (eventAction, category, eventValue = 0, metadata = {}) => {
    const eventCategory = `Application ${category}`

    // take the value of first metadata entry
    const eventLabel = Object.values(metadata)[0]

    if (process.env.CORDOVA && typeof ga !== 'undefined') {
        const hitType = 'event'

        // Mobile app sends events via GA
        const event = {
            hitType,
            eventCategory,
            eventAction,
            eventLabel,
            eventValue,
        }

        ga('send', event)
    }

    if (typeof dataLayer !== 'undefined') {
        // GTM
        dataLayer.push({
            event: 'Event',
            eventCategory,
            eventAction,
            eventLabel,
            eventValue,
        })
    }

    if (typeof Intercom !== 'undefined') {
        Intercom('trackEvent', eventAction, metadata)
    }
}

export const trackTransaction = (transactionData) => {
    const {
        id
    } = transactionData
    const revenue = transactionData.total_amount / 100

    // dataLayer transaction data
    const transaction = {
        transactionId: id,
        transactionTotal: revenue,
        transactionProducts: [],
    }

    // regular GTM `Event`
    const eventMetadata = {}

    if (transactionData.line_items.length > 0) {
        const lineItem = transactionData.line_items[0]

        const amount = lineItem.total_amount / 100
        const {
            code,
            description
        } = lineItem

        transaction.transactionProducts.push({
            sku: code,
            name: description,
            price: amount,
            quantity: 1,
        })

        eventMetadata.sku = code
        eventMetadata.name = description
    }

    eventMetadata.revenue = revenue
    eventMetadata.id = id

    if (typeof dataLayer !== 'undefined') {
        dataLayer.push(transaction)
    }

    trackEvent('paid', 'transaction', Math.round(revenue), eventMetadata)
}