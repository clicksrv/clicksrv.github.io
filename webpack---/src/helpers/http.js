import NProgress from 'nprogress'
import agent from 'superagent'
import conf from '../conf'
import events from '../services/events'
import history from '../services/history'
import notify from '../services/notify'
import store from '../services/store'

const networkError = () => {
    const handleClick = () => typeof window !== 'undefined' && window.location.reload()

    const Message = () => ( <
        >
        Could not reach the network, please check your internet connection and then {
            ' '
        } <
        a onClick = {
            handleClick
        } > reload the page < /a>. <
        />
    )

    notify.error( < Message / > , {
        autoClose: false
    })
}

const http = {
    /**
     * AJAX wrapper that sets default configurations like user credentials, url host, lifecycle hooks, default error handling
     * - allows the request to be still fully customizable
     * - usage: http.get('/url').set().send().then()
     */
    request: (reqType, url, body, onEnd) => {
        NProgress.start()

        const isRelative = !/^https?:\/\//.test(url)
        const endpoint = isRelative ? conf.endpoint(url) : url

        let request = agent(reqType, endpoint)

        if (isRelative) {
            request = request.auth('token', store.getState().session.token)
        }

        request.send(body).end((err, resp) => {
            let pathname = history.location.pathname

            if (!/cvs/.test(pathname)) {
                pathname = '/cvs'
            }

            NProgress.done()

            // Global Error handling
            if (err) {
                switch (err.status) {
                    case 502:
                        networkError()
                        return
                    case 401:
                    case 403:
                        events.emit('SESSION::RESET')
                        history.push('/login')
                        return
                    case 402:
                        history.push(`${pathname}?modal=upgrade&reason=cv-limit`)
                        return
                    default:
                        break
                }

                // in Cordova, it's has a custom error type
                if (/terminated/i.test(err.toString())) {
                    networkError()
                }
            }

            if (onEnd) {
                onEnd(err, resp)
            }
        })
    },

    get: (url, callback) => {
        return http.request('GET', url, null, callback)
    },

    post: (url, body, callback) => {
        return http.request('POST', url, body, callback)
    },

    patch: (url, body, callback) => {
        return http.request('PATCH', url, body, callback)
    },

    destroy: (url, body, callback) => {
        return http.request('DELETE', url, body, callback)
    },

    errHandler: (err) => {
        // TODO general error handler
        console.error(err)
    },
}

export default http