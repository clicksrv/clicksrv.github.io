import {
    useEffect,
    useState
} from 'react'

/**
 * @param {boolean} ignoreOuterClicks will not close dropdown when clicking outside of it
 */
const useDropdown = (opts = {}) => {
    const {
        ignoreOuterClicks
    } = opts

    const [dropdownOpen, setDropdownOpen] = useState(false)

    const openDropdown = () => setDropdownOpen(true)

    const closeDropdown = () => setDropdownOpen(false)

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

    const appElement = document.getElementById('app')
    const modalElement = document.getElementById('modalRoot')

    useEffect(() => {
        if (ignoreOuterClicks) {
            return
        }

        if (dropdownOpen) {
            appElement.addEventListener('click', closeDropdown, false)
            modalElement.addEventListener('click', closeDropdown, false)

            return () => {
                appElement.removeEventListener('click', closeDropdown, false)
                modalElement.removeEventListener('click', closeDropdown, false)
            }
        }
    }, [ignoreOuterClicks, dropdownOpen, appElement, modalElement])

    return {
        dropdownOpen,
        openDropdown,
        closeDropdown,
        toggleDropdown,
    }
}

export default useDropdown