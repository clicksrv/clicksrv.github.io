import {
    useRouteMatch
} from 'react-router-dom'

const useEditor = () => {
    const inEditor = useRouteMatch({
        path: '/cvs/:id'
    })

    return {
        inEditor,
    }
}

export default useEditor