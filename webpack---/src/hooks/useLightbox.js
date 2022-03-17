import {
    useEffect,
    useState
} from 'react'

const useLightbox = () => {
    const [lightboxOpen, setLightboxOpen] = useState(false)

    const openLightbox = () => setLightboxOpen(true)
    const closeLightbox = () => setLightboxOpen(false)

    const lightboxContainer = document.getElementById('modalRoot')

    useEffect(() => {
        if (lightboxOpen) {
            lightboxContainer.addEventListener('click', closeLightbox, false)

            return () => {
                lightboxContainer.removeEventListener('click', closeLightbox, false)
            }
        }
    }, [lightboxOpen, lightboxContainer])

    return {
        closeLightbox,
        lightboxOpen,
        openLightbox,
    }
}

export default useLightbox