import PropTypes from 'prop-types'
import styled from 'styled-components'
import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'

import conf from '../conf'
import { white40, white50 } from '../colors'

const Container = styled.div`
  background-color: rgba(0, 0, 0, ${({ open, visible }) => (open && visible ? 0.75 : 0)});
  transition: background-color ${conf.lightboxFadeInOutTime}ms;

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 30;
`

const Button = styled.a`
  color: ${white40};
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3;

  position: absolute;
  top: 19px;
  right: 20px;

  display: block;

  :hover {
    color: ${white50};
  }
`

const Icon = styled.i``

// Works together with the `useLightbox` hook
// Complex open/visible props juggling to add/remove from DOM with fade in/out effect
const Lightbox = ({ children, open }) => {
  const [visible, setVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)

  useEffect(() => {
    // clear closing timeout if opened again during closing
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    if (open) {
      // lightbox has just been opened
      setVisible(true)
    } else {
      // lightbox has just been closed
      if (visible) {
        setTimeoutId(setTimeout(() => setVisible(false), conf.lightboxFadeInOutTime))
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!open && !visible) {
    return null
  }

  return createPortal(
    <Container
      open={open}
      visible={visible}>
      <Button>
        <Icon
          className="icon-close"
          role="img"
        />
      </Button>

      {children}
    </Container>,
    document.getElementById('modalRoot')
  )
}

Lightbox.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
}

export default Lightbox
