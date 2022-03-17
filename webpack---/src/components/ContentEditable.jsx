/* eslint-disable no-control-regex */
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import usePageBreaks from '../hooks/usePageBreaks'
import { primaryGreyish } from '../colors'

// container element is requried, otherwise page jumps when clicking around
const Container = styled.span`
  cursor: text;

  display: ${({ inEditor }) => (inEditor ? 'inline-block' : 'initial')};
`

const Placeholder = styled.span`
  && {
    display: ${({ show }) => (show ? 'inline-block' : 'none !important')};
  }

  opacity: 0.65;
  outline: 2px dashed transparent;
  outline-offset: 3px;
  transition: outline 0.2s;

  // required so that there is no up/down fields shifting on focus
  vertical-align: top;

  &:hover {
    outline-color: ${primaryGreyish};
  }
`

const Element = styled.span`
  && {
    display: ${({ inEditor, show }) => (show ? (inEditor ? 'inline-block' : 'initial') : 'none !important')};
  }

  outline: ${({ inEditor }) => (inEditor ? 2 : 0)}px dashed transparent;
  outline-offset: 3px;
  transition: outline ${({ empty }) => (empty ? 0 : 0.2)}s;

  min-width: 1em;

  // required so that there is no up/down fields shifting on focus
  ${({ inEditor }) => inEditor && 'vertical-align: top;'}

  &:hover,
  &:focus,
  &:active {
    outline-color: ${primaryGreyish};
  }
`

const sanitizeContent = (content) => {
  if (typeof content !== 'string') {
    return ''
  }

  return content
    .replace(/\u0000/g, '') // NULL characters
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // zero-width spaces
    .replace(/\u00A0/g, ' ') // non-breaking spaces
    .replace(/[\r\n\x0B\x0C\u0085\u2028\u2029]/g, ' ') // line breaking chars
    .replace(/\s+/, ' ') // consecutive whitespace
}

const ContentEditable = ({ content, inEditor, placeholder, onSave }) => {
  // enable debug logging by changing to `true`
  const logging = false

  // eslint-disable-next-line no-console
  const log = (...args) => logging && console.log(...args)

  const element = useRef(null)
  const elementPlaceholder = useRef(null)

  const sanitizedContent = sanitizeContent(content)

  const [empty, setEmpty] = useState(!content)
  const [focused, setFocused] = useState(false)

  const { pageBreaksMode } = usePageBreaks()

  log('ContentEditable [RENDER]', { empty, focused, content, sanitizedContent, placeholder })

  useEffect(() => {
    log('ContentEditable [useEffect]', { empty, focused, content, sanitizedContent, placeholder })

    // required, otherwise element loses focus when being re-rendered
    if (focused) {
      element.current.focus()
    }

    setEmpty(!content)
  })

  const onPlaceholderClick = (e) => {
    log('ContentEditable [onPlaceholderClick]', { e, placeholder })

    if (pageBreaksMode) {
      return
    }

    setFocused(true)
    element.current.focus()

    // there is an issue when clicking on an adjacent placeholder which moved
    // underneath the editable field when it was clicked on (like in date
    // fields: "Start Date" - "End Date"); the blur event for the "Start Date"
    // is registered correctly, but the adjacent placeholder ("End Date") does
    // not receive the click event (even though it should); the workaround for
    // that is to make the editable field the same width as its
    // placeholder when it is being edited *for the first time*
    element.current.style.minWidth = `${elementPlaceholder.current.offsetWidth}px`
  }

  // support for keyboard navigation (TAB); requires tabIndex to be set
  const onPlaceholderFocus = (e) => onPlaceholderClick(e)

  const onBlur = (e) => {
    log('ContentEditable [onBlur]', { e, target: e.target, text: e.target.textContent, content, placeholder })

    element.current.style.width = 'auto'

    const newSanitizedContent = sanitizeContent(e.target.textContent)

    setEmpty(newSanitizedContent === '')
    setFocused(false)

    onSave(newSanitizedContent)
  }

  const onFocus = (e) => {
    if (!inEditor) {
      return
    }

    log('ContentEditable [onFocus]', { e, target: e.target, text: e.target.textContent, content, placeholder })

    setFocused(true)
  }

  const onKeyDown = (e) => {
    // 'Enter' key will execute onBlur() and will move to the next
    // contenteditable field (line breaks are only allowed in description fields)
    if (e.key === 'Enter' || e.keyCode === 13) {
      log('ContentEditable [onKeyDown == Enter]', { e, content, placeholder })

      e.preventDefault()

      const inputs = document.querySelectorAll('[contenteditable]')

      let index = 0

      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i] === e.target) {
          index = i
        }
      }

      const next = (index + 1) % inputs.length
      const nextInput = inputs[next]

      // First show the element to be focused as browsers won't focus `display: none` fields
      // ContentEditable fields need `inline-block`, TinyMCE fields need `block`
      const displayStyle = nextInput.classList.contains('mce-content-body') ? 'block' : 'inline-block'
      nextInput.style.display = displayStyle

      // triggers `onFocus` on both ContentEditable and TinyMCE
      nextInput.focus()

      // clear inline style afterwards (the element will still be shown as
      // focused component styling will kick-in)
      nextInput.style.display = ''
    }
  }

  const showPlaceholder = !focused && empty
  const showElement = focused || !empty
  const editable = inEditor && !pageBreaksMode

  return (
    <Container inEditor={inEditor}>
      {inEditor && (
        <Placeholder
          ref={elementPlaceholder}
          show={showPlaceholder}
          tabIndex={0}
          onClick={onPlaceholderClick}
          onFocus={onPlaceholderFocus}>
          {placeholder}
        </Placeholder>
      )}

      <Element
        empty={empty}
        ref={element}
        show={showElement}
        inEditor={inEditor}
        contentEditable={editable}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        suppressContentEditableWarning={true}>
        {sanitizedContent}
      </Element>
    </Container>
  )
}

ContentEditable.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  inEditor: PropTypes.bool,
  placeholder: PropTypes.string,
  onSave: PropTypes.func,
}

export default ContentEditable
