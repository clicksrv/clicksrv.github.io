import * as Sentry from '@sentry/browser'
import conf from '../conf'

export const initializeErrorTracking = () => {
    // Error logging, original blacklist: https://gist.github.com/impressiver/5092952
    if (process.env.NODE_ENV === 'production') {
        Sentry.init({
            dsn: conf.sentryDSN,
            enabled: process.env.APP_ENV === 'production',
            release: process.env.GIT_COMMIT,
            tags: {
                git_commit: process.env.GIT_COMMIT.substr(0, 7)
            },
            ignoreErrors: ['cross-origin frame', 'canvas.contentDocument', 'fb_xd_fragment', '_avast_submit'],
            ignoreUrls: [
                /graph\.facebook\.com/i,
                /connect\.facebook\.net\/en_US\/all\.js/i,
                /extensions\//i,
                /^chrome:\/\//i,
            ],
        })
    }
}

export const setUserForErrorTracking = (user) => {
    Sentry.configureScope((scope) => {
        scope.setUser({
            id: user.id,
            email: user.email
        })
    })
}