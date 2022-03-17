import queryString from 'query-string'
import {
    useLocation
} from 'react-router-dom'

// returns an object representing the query string
const useQuery = () => queryString.parse(useLocation().search)

export default useQuery