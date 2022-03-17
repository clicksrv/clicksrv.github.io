import {
    useContext,
    useEffect
} from 'react'

import debounce from '../helpers/debounce'

import {
    ApplicationContext
} from '../contexts/ApplicationContext'

const useWindowSize = () => {
    const [state, setState] = useContext(ApplicationContext)

    const {
        viewportWidth
    } = state

    useEffect(() => {
        const handleResize = () => {
            const width = typeof window !== 'undefined' && (window.innerWidth || document.body.clientWidth)

            if (width) {
                setState((state) => ({ ...state,
                    viewportWidth: width
                }))
            }
        }

        const handleResizeDebounced = debounce(handleResize, 100)

        // initial run
        handleResize()

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResizeDebounced)
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResizeDebounced)
            }
        }
    }, [])

    return {
        viewportWidth,
    }
}

export default useWindowSize