import {
    useContext
} from 'react'

import history from '../services/history'
import useWindowSize from '../hooks/useWindowSize'
import {
    ApplicationContext
} from '../contexts/ApplicationContext'
import {
    breakpoints
} from '../components/styled/Grid'

const useSidebar = () => {
    const [state, setState] = useContext(ApplicationContext)
    const {
        viewportWidth
    } = useWindowSize()

    const {
        sidebarOpen,
        sidebarItem
    } = state

    const sidebarState = sidebarOpen ? 'open' : 'closed'

    const isMobile = viewportWidth < breakpoints.md

    const activateDefaultSidebarItem = (cv) => {
        if (isMobile) {
            activateSidebarItem(null)

            history.push(`/cvs/${cv.id}`)
        } else {
            activateSidebarItem('appearance')

            // using replace as this is an implicit navigation (in most cases)
            history.replace(`/cvs/${cv.id}/appearance`)
        }
    }

    const activateSidebarItem = (item) =>
        setState((state) => ({
            ...state,
            sidebarItem: item,
        }))

    const closeSidebar = () =>
        setState((state) => ({
            ...state,
            sidebarOpen: false,
        }))

    const handleSidebarItemSelected = (cv) => {
        if (isMobile) {
            closeSidebar()
        }

        activateDefaultSidebarItem(cv)
    }

    const toggleSidebar = () =>
        setState((state) => ({
            ...state,
            sidebarOpen: !sidebarOpen,
        }))

    return {
        activateDefaultSidebarItem,
        activateSidebarItem,
        handleSidebarItemSelected,
        sidebarItem,
        sidebarOpen,
        sidebarState,
        toggleSidebar,
    }
}

export default useSidebar