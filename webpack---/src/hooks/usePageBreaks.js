import {
    useContext
} from 'react'
import {
    ApplicationContext
} from '../contexts/ApplicationContext'

const usePageBreaks = () => {
    const [state, setState] = useContext(ApplicationContext)

    const {
        pageBreaksMode
    } = state

    const disablePageBreaksMode = () =>
        setState((state) => ({
            ...state,
            pageBreaksMode: false,
        }))

    const togglePageBreaksMode = () =>
        setState((state) => ({
            ...state,
            pageBreaksMode: !pageBreaksMode,
        }))

    return {
        pageBreaksMode,
        disablePageBreaksMode,
        togglePageBreaksMode,
    }
}

export default usePageBreaks