import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useEffect, useState } from 'react'

import { primary } from '../colors'

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 32px);

  position: absolute;
  bottom: 16px;
  left: 16px;
`

const Dot = styled.span`
  background: ${primary};
  border-radius: 50%;
  color: white;
  cursor: pointer;
  font-size: 12px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: 32px;
  width: 32px;
`

const ChevronLeft = styled.i`
  transform: rotate(180deg);
`

const ChevronRight = styled.i``

const ScrollingNav = ({ className, containerRef }) => {
  const [scrollWidth, setScrollWidth] = useState(0)

  useEffect(() => {
    setScrollWidth(containerRef.current?.scrollWidth || 0)
  }, [containerRef])

  // not yet fully rendered
  if (scrollWidth === 0) {
    return null
  }

  const children = containerRef.current.children
  const child1 = children?.[0]
  const child2 = children?.[1]

  const pinsWidth = child1?.clientWidth || 300
  const gapWidth = child1 && child2 ? child2.getBoundingClientRect().left - child1.getBoundingClientRect().right : 15

  const snap = pinsWidth + gapWidth

  const scrollToLeft = () => {
    containerRef.current.scroll({
      top: 0,
      left: containerRef.current.scrollLeft + snap,
      behavior: 'smooth',
    })
  }

  const scrollToRight = () => {
    containerRef.current.scroll({
      top: 0,
      left: containerRef.current.scrollLeft - snap,
      behavior: 'smooth',
    })
  }

  return (
    <Container
      className={className}
      role="navigation">
      <Dot
        onClick={scrollToRight}
        role="button">
        <ChevronLeft className="icon-chevron" />
      </Dot>

      <Dot
        onClick={scrollToLeft}
        role="button">
        <ChevronRight className="icon-chevron" />
      </Dot>
    </Container>
  )
}

ScrollingNav.propTypes = {
  className: PropTypes.string,
  containerRef: PropTypes.object.isRequired,
}

export default ScrollingNav
