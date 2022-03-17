import { useEffect } from 'react'
import { useLocation, useRouteMatch } from 'react-router-dom'

const ScrollToTop = () => {
  const inEditor = !!useRouteMatch({ path: '/cvs/:id' })
  const { pathname } = useLocation()

  useEffect(() => {
    if (inEditor) {
      return
    }

    // disable in development
    if (process.env.NODE_ENV === 'development') {
      return
    }

    const [main] = document.getElementsByTagName('main')

    const scrollableElement = main || window

    if (typeof scrollableElement?.scrollTo === 'function') {
      scrollableElement.scrollTo(0, 0)
    }
  }, [pathname, inEditor])

  return null
}

export default ScrollToTop
