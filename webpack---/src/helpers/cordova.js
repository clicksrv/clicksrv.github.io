/**
 * @returns {function} to be used directly as onClick handler
 */
export const openUrl =
    (url, target = '_blank') =>
    (event) => {
        const InAppBrowser = window.cordova ? .InAppBrowser

        if (!process.env.CORDOVA || !InAppBrowser) {
            return
        }

        event.preventDefault()

        const browserOptions =
            process.env.CORDOVA === 'ios' ?
            'location=no,toolbarcolor=#ffffff,toolbarposition=top,toolbartranslucent=no' :
            'location=yes,zoom=no,'

        return InAppBrowser.open(url, target, browserOptions)
    }