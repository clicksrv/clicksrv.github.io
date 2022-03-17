/* eslint-disable no-control-regex */
import PropTypes from 'prop-types'
import sanitize from 'insane'
import styled, { css } from 'styled-components'
import { Editor } from '@tinymce/tinymce-react'
import { useEffect, useState } from 'react'

import usePageBreaks from '../hooks/usePageBreaks'

import {
  black,
  greenSuccess,
  greyDarker,
  greyLight,
  greyLighter,
  primary,
  primaryFaded,
  primaryGreyish,
  primaryLight,
  primaryLightest,
  white,
} from '../colors'

import { isArticle } from '../helpers/cv'

// CvEdit (modal)
const oldStyling = css`
  background-color: ${primaryLightest};
  border: 1px solid ${primaryLight};
  border-radius: 8px;

  min-height: 120px;
  padding: 15px;
`

const validStyling = css`
  border-color: ${greenSuccess};
`

// JournalEntry
const modernStyling = css`
  background-color: ${white};
  border: 1px solid ${({ focused }) => (focused ? primary : greyLighter)};
  border-radius: 4px;
  box-shadow: 0 2px 4px ${primaryFaded};
  color: ${({ focused }) => (focused ? black : greyDarker)};
  font-size: 16px;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;

  margin-bottom: 25px;
  min-height: 120px;
  padding: 13px 18px;

  &:hover {
    border-color: ${({ focused }) => (focused ? primary : greyLight)};
  }

  &:focus {
    background-color: ${white};
    border-color: ${primary};
    color: ${black};
  }

  ${({ focused, isValid, isPristine }) => !focused && isValid && !isPristine && validStyling}
`

// Default styling is for static rendering (cv-ssr/Preview/pageBreaksMode)
const Container = styled.div`
  cursor: text;
  transition: outline 0.2s;

  ${({ editing, inEditor }) => !inEditor && editing && oldStyling}
  ${({ modern }) => modern && modernStyling}

  .mce-content-body {
    display: ${({ showContent }) => (showContent ? 'block' : 'none')};
  }

  outline: 2px dashed
    ${({ editing, focused, inEditor, pageBreaksMode, showOutline }) =>
      editing && focused && inEditor && !pageBreaksMode && showOutline ? primaryGreyish : 'transparent'};
  outline-offset: 3px;

  &:hover {
    outline-color: ${({ editing, inEditor, pageBreaksMode, showOutline }) =>
      editing && inEditor && !pageBreaksMode && showOutline ? primaryGreyish : 'transparent'};
  }
`

const Placeholder = styled.p`
  display: ${({ showPlaceholder }) => (showPlaceholder ? 'block' : 'none')};

  opacity: 0.65;
`

const configuration = {
  mode: 'exact',
  inline: true,
  fixed_toolbar_container: '#app',
  plugins: 'autolink link lists paste table',
  menubar: false,
  statusbar: false,
  contextmenu: false,
  resize: false,
  toolbar:
    'table | bold italic underline | bullist numlist outdent indent | alignleft aligncenter alignright alignjustify | link removeformat',
  object_resizing: false,
  valid_elements:
    'a[href|target:_blank|rel:nofollow],strong/b,i,div[align],br,ul[style],ol[style],li[style],p[style],span[style],h1,h2,h3,em,table[style|border],tbody,th,tr,td[style]',
  browser_spellcheck: true,
  hidden_input: false,
  rel_list: [{ title: 'default', value: 'nofollow' }],
  default_link_target: '_blank',
  link_assume_external_targets: true,
  table_default_attributes: { border: '0' },
  table_resize_bars: false,
}

// These sanitize options should match what's specified in `configuration` or
// things will appear in the editor and disappear on the public website and PDF
const sanitizeOptions = {
  allowedTags: [
    'a',
    'b',
    'br',
    'div',
    'em',
    'h1',
    'h2',
    'h3',
    'i',
    'li',
    'ol',
    'p',
    'span',
    'strong',
    'table',
    'tbody',
    'td',
    'th',
    'tr',
    'ul',
  ],

  allowedAttributes: {
    a: ['href', 'rel', 'target'],
    div: ['align'],
    li: ['style'],
    ol: ['style'],
    p: ['style'],
    span: ['style'],
    table: ['style', 'border'],
    td: ['style'],
    ul: ['style'],
  },
}

const sanitizeContent = (content) => {
  if (typeof content !== 'string') {
    return ''
  }

  return content
    .replace(/\u0000/g, '') // NULL characters
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // zero-width spaces
}

/**
 * @param {boolean} modern indicates modern styling (matching Input.jsx)
 */
const TinyMCE = ({
  editing,
  inEditor,
  index,
  isPristine,
  isValid,
  modern,
  placeholder,
  sectionKey,
  setValue,
  value,
  ...props
}) => {
  // enable debug logging by changing to `true`
  const logging = false

  // eslint-disable-next-line no-console
  const log = (...args) => logging && console.log(...args)

  const [content, setContent] = useState(value ?? '')
  const [editorContainer, setEditorContainer] = useState(null)
  const [editorElement, setEditorElement] = useState(null)
  const [empty, setEmpty] = useState(!value)
  const [focused, setFocused] = useState(false)

  const { pageBreaksMode } = usePageBreaks()

  // for standalone sections (sections being articles) additional outline is unnecessary
  const showOutline = inEditor && !isArticle(sectionKey)

  // setting unique key is required so that React won't "lose" elements when
  // reordering skills or dated section entries
  const key = `TinyMCE.${sectionKey || 'nokey'}.${index || 'noindex'}=${value}`

  log('TinyMCE [RENDER]', { empty, focused, content, value, editing, inEditor, placeholder, key })

  // set focused state
  // required, otherwise element loses focus when being re-rendered
  // happens when clicking on the placeholder to add text
  useEffect(() => {
    log('TinyMCE [useEffect] focus', { empty, focused, content, value, editing, placeholder, key })

    if (focused) {
      editorElement.focus()
    }
  }, [focused, editorElement])

  // css animation helpers
  useEffect(() => {
    log('TinyMCE [useEffect] focus tox helpers', { empty, focused, content, value, editing, placeholder, key })

    if (editorContainer) {
      if (focused) {
        editorContainer.classList.add('tox-visible')
      } else {
        editorContainer.classList.remove('tox-visible')
      }
    }
  }, [focused, editorContainer])

  // required to show or hide editor/placeholder when appropriate
  useEffect(() => {
    log('TinyMCE [useEffect] `content` change', { empty, focused, content, value, editing, placeholder, key })

    if (!focused) {
      setEmpty(!content)
    }
  }, [focused, content])

  // required so that the component maintains its relationship with `value`
  // when reordering skills or dated section entries
  useEffect(() => {
    log('TinyMCE [useEffect] `value` change', { empty, focused, content, value, editing, placeholder, key })

    setContent(value ?? '')
  }, [value])

  // Editor initialization
  const onInit = (e, editorInstance) => {
    const element = editorInstance.getElement()

    setEditorContainer(editorInstance.editorContainer)

    log('TinyMCE [onInit]', { e, editorInstance, element, content, value, editing, inEditor, placeholder })

    if (element) {
      setEditorElement(element)

      element.setAttribute('spellcheck', 'true')
    }
  }

  // handles clicking directly on the placeholder but also on the Container
  // In regular forms (InputTinyMCE) the container is bigger than the
  // placeholder, so handle clicking on the container to focus editing
  // at one point inspired by https://github.com/mohan999/tinymce-placeholder
  const onPlaceholderClick = (e) => {
    e.stopPropagation()

    log('TinyMCE [onPlaceholderClick]', { e, editorElement, editing, inEditor, placeholder })

    if (!editing || pageBreaksMode || focused) {
      return
    }

    setFocused(true)
  }

  // support for keyboard navigation (TAB); requires tabIndex to be set
  const onPlaceholderFocus = (e) => onPlaceholderClick(e)

  const onBlur = () => {
    log('TinyMCE [onBlur]', { content, value, editing, inEditor, placeholder })

    setEmpty(!content)
    setFocused(false)

    if (content === value) {
      return
    }

    setValue(sanitizeContent(content))
  }

  // Handling onFocus is required when <enter> key was pressed in
  // ContentEditable element, and TinyMCE element is "next in line"
  const onFocus = (e) => {
    log('TinyMCE [onFocus]', { e, editorElement, content, value, focused, editing, inEditor, placeholder })

    setFocused(true)
  }

  const onEditorChange = (updatedContent) => {
    log('TinyMCE [onEditorChange]', { content, updatedContent, value, editing, inEditor, placeholder })

    setContent(updatedContent)
  }

  const ssr = typeof window === 'undefined'
  const sanitizedValue = sanitize(value, sanitizeOptions)

  // TinyMCE doesn't work with SSR
  const SSRContent = (
    <div
      className="mce-content-body"
      dangerouslySetInnerHTML={{ __html: sanitizedValue }}></div>
  )

  const containerClassName = empty ? 'empty' : undefined
  const showPlaceholder = placeholder && !focused && empty
  const showContent = !showPlaceholder || !editing

  return (
    <Container
      className={containerClassName}
      editing={editing}
      focused={focused}
      inEditor={inEditor}
      isPristine={isPristine}
      isValid={isValid}
      key={key}
      modern={modern}
      onClick={onPlaceholderClick}
      pageBreaksMode={pageBreaksMode}
      showContent={showContent}
      showOutline={showOutline}>
      {placeholder && editing && (
        <Placeholder
          className="placeholder"
          onClick={onPlaceholderClick}
          onFocus={onPlaceholderFocus}
          showPlaceholder={showPlaceholder}
          tabIndex={0}>
          {placeholder}
        </Placeholder>
      )}

      {!ssr && (
        <Editor
          disabled={pageBreaksMode || !editing}
          init={configuration}
          onBlur={onBlur}
          onEditorChange={onEditorChange}
          onFocus={onFocus}
          onInit={onInit}
          value={content}
          {...props}
        />
      )}

      {ssr && SSRContent}
    </Container>
  )
}

TinyMCE.propTypes = {
  editing: PropTypes.bool,
  inEditor: PropTypes.bool,
  index: PropTypes.number,
  isPristine: PropTypes.bool,
  isValid: PropTypes.bool,
  modern: PropTypes.bool,
  placeholder: PropTypes.string,
  sectionKey: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export default TinyMCE
