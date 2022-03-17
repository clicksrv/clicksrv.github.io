const useBrowser = () => {
    const ua = window.navigator.userAgent

    const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i)
    const iOSSafari = iOS && !!ua.match(/WebKit/i) && !ua.match(/CriOS/i)

    const isSafari =
        /constructor/i.test(window.HTMLElement) ||
        ((p) => {
            return p.toString() === '[object SafariRemoteNotification]'
        })(!window.safari || (typeof safari !== 'undefined' && window.safari.pushNotification)) ||
        iOSSafari

    return {
        isSafari,
    }
}

export default useBrowser