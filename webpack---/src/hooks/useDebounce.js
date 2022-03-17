import {
    useEffect,
    useState
} from 'react'

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        // Update state after specified delay
        const timeoutId = setTimeout(() => setDebouncedValue(value), delay)

        // clearing the timeout is what makes this hook work; if value changed
        // before delay passed, timeout will be cleared and the value returned by
        // this hook won't change
        return () => {
            clearTimeout(timeoutId)
        }
    }, [delay, value])

    return debouncedValue
}

export default useDebounce