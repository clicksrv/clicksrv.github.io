const parseHostname = (link) => {
    try {
        const url = new URL(link)

        return url.hostname
    } catch {
        return ''
    }
}

export default parseHostname