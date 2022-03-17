// Ref: https://gist.github.com/takien/4077195
export function getYouTubeId(url) {
    if (!url) return

    const urlParts = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)

    if (urlParts[2]) {
        const idParts = urlParts[2].split(/[^0-9a-z_-]/i)

        if (idParts[0].length === 11) {
            return idParts[0]
        }
    }
}

export function getYouTubeUrl(id) {
    if (id) {
        return `https://www.youtube.com/watch?v=${id}`
    }
}

export function getYouTubeEmbedUrl(id) {
    if (id) {
        return `https://www.youtube.com/embed/${id}`
    }
}