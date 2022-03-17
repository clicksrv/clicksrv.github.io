import classNames from 'classnames/dedupe'
import PropTypes from 'prop-types'

import conf from '../../conf'
import events from '../../services/events'
import { formatURL } from '../../helpers/cv'
import { placeholderText } from '../../locales'

import docImage from '../../assets/images/icons/doc-small.png'
import pdfImage from '../../assets/images/icons/pdf-small.png'
import fileImage from '../../assets/images/icons/file-small.png'

import ButtonAddArticle from '../ButtonAddArticle'
import ButtonAddSection from '../ButtonAddSection'
import ButtonPageBreak from '../ButtonPageBreak'
import ContactForm from '../ContactForm'
import ContentEditable from '../ContentEditable'
import CvArticleEditButtons from '../CvArticleEditButtons'
import CvBarBranding from '../CvBarBranding'
import CvMenu from '../CvMenu'
import CvProfileImage from '../CvProfileImage'
import CvSectionEditButtons from '../CvSectionEditButtons'
import CvSkill from '../CvSkill'
import TinyMCE from '../TinyMCE'
import Website from './website'

const createDirectives = (cv, editing, inEditor, pageBreaksMode, pdf) => {
  const theme = cv.theme

  const directives = {
    directives: {
      organization_url: ($target, value) => {
        if (!value) {
          return $target
        }

        $target.type = 'a'

        if (!inEditor) {
          $target.props.href = formatURL(value)
        }

        return $target
      },
      link_url: ($target, value) => {
        if (!value) {
          return $target
        }

        $target.type = 'a'

        if (!inEditor) {
          $target.props.href = formatURL(value)
        }

        return $target
      },
      level: ($target, value) => {
        const percentage = conf.themes[theme].strengths.endsWith('percentage')

        if (percentage) {
          $target.text(`${value}%`)
          $target.props.className = classNames($target.props.className, 'competency-percentage')
        } else {
          $target.text(`${Math.round(value / 10)}`)
          $target.props.className = classNames($target.props.className, 'competency-level')
        }

        return $target
      },
      websites: ($target, value) => {
        if (value && value.map) {
          $target.children = value.map((url) => (
            <Website
              key={url}
              url={url}
              inEditor={inEditor}
            />
          ))
        }
        return $target
      },
      menu($target) {
        $target.children = (
          <CvMenu
            cv={cv}
            sections={this.data.sections}
          />
        )

        return $target
      },
      thumb: ($target, value) => {
        $target.type = CvProfileImage
        $target.props = {
          cv,
          image: value,
          inEditor,
          pdf,
        }

        return $target
      },
      logo: ($target, value) => {
        if (value) {
          $target.props.src = value
        }

        return $target
      },

      // NOTE: the asset object has to have the key file_url for the thumb to render in this configuration
      file_url: ($target, value, context) => {
        const asset = context.data
        const fileUrl = value

        const { file_extension: fileExtension, link_url: linkUrl, thumb } = asset

        if (asset.type === 'youtube' && asset.file_key) {
          $target.props.href = `https://www.youtube.com/watch?v=${asset.file_key}`

          const overlay = $target.findClass('asset-overlay')

          if (overlay) {
            overlay.props.className = classNames(overlay.props.className, 'youtube')
          }

          // Set the asset type through mfp-TYPE css class
          // http://dimsemenov.com/plugins/magnific-popup/documentation.html#content-types
          $target.props.className = classNames($target.props.className, 'mfp-iframe', 'popup')
        } else if (linkUrl) {
          $target.props.href = formatURL(linkUrl)
        } else if (asset.type === 'document') {
          $target.props.href = fileUrl
        } else {
          $target.props.href = fileUrl || thumb
          $target.props.className = classNames($target.props.className, 'popup')
        }

        $target.props.title = asset.title
        $target.props['data-content'] = asset.description

        const imageContainer = $target.findClass('css-crop')

        const fileTypes = {
          doc: docImage,
          docx: docImage,
          pdf: pdfImage,
        }

        const imageUrl = thumb || fileTypes[fileExtension] || fileImage

        if (imageContainer.type === 'img') {
          imageContainer.props.src = imageUrl
        } else {
          imageContainer.css({ backgroundImage: `url(${imageUrl})` })
        }

        return $target
      },
      contact_form: ($target) => {
        $target.children = [
          <ContactForm
            key={cv.id}
            cv={cv}
          />,
        ]
        return $target
      },
      // overwriting the default text directives to use [contenteditable]
      _text: {
        render($target, value, context) {
          const pathIndex = (context.path.match(/contents\.(\d+)/) || [])[1]
          const index = pathIndex ? parseInt(pathIndex, 10) : context.data.index
          const sectionKey = context.data.key
          const placeholder = placeholderText(sectionKey, context.key, index)

          let editableText

          if (context.key === 'description') {
            // TinyMCE editor
            $target.type = TinyMCE
            $target.props = {
              sectionKey,
              index,
              value,
              placeholder,
              editing,
              inEditor,
              setValue: saveContent({ sectionKey, index, attr: context.key }, value),
            }
          } else {
            // ContentEditable editor
            const contentValue = context.key === 'label' ? value || context?.data?.content?.title || placeholder : value

            editableText = {
              type: ContentEditable,
              props: {
                content: contentValue,
                placeholder,
                inEditor,
                onSave: saveContent({ sectionKey, index, attr: context.key }, value),
              },
            }

            $target.children = [editableText]
          }

          // Set "empty" class to hide empty elements when rendering a CV
          if (!inEditor && !value) {
            $target.props.className = classNames($target.props.className, 'empty')

            // Set "empty" class for parent h6 if both dates are empty
            if (
              $target.props['data-bind'] === 'end_date' &&
              $target.$parent.children.every((child) => child.props.className === 'empty')
            ) {
              $target.$parent.props.className = classNames($target.$parent.props.className, 'empty')
            }
          }

          function saveContent(cvParams, origContent) {
            return (content) => {
              if (content !== origContent) {
                events.emit('CV::UPDATE', { data: content, ...cvParams })
              }
            }
          }

          return $target
        },
      },
    },
    postDirectives: {},
  }

  directives.directives['bar-branding'] = function ($target) {
    $target.children = (
      <CvBarBranding
        cv={cv}
        inEditor={inEditor}
      />
    )

    return $target
  }

  if (inEditor) {
    directives.directives['add-section-btn'] = function ($target) {
      $target.children = (
        <ButtonAddSection
          cv={cv}
          pageBreaksMode={pageBreaksMode}
        />
      )

      return $target
    }

    directives.directives['add-sidebar-section-btn'] = function ($target) {
      $target.children = (
        <ButtonAddSection
          cv={cv}
          pageBreaksMode={pageBreaksMode}
          sidebar
        />
      )

      return $target
    }

    directives.postDirectives = {
      _editSection($node, value, context) {
        const sidebar = this.data.sidebar_sections.includes(context.data)

        const button = (
          <CvSectionEditButtons
            cv={cv}
            pageBreaksMode={pageBreaksMode}
            sectionKey={value}
            sidebar={sidebar}
          />
        )

        $node.children.unshift(button)
      },

      _addArticle($node, value, context) {
        const sidebar = this.data.sidebar_sections.includes(context.data)

        const button = (
          <ButtonAddArticle
            cv={cv}
            pageBreaksMode={pageBreaksMode}
            sectionKey={value}
            sidebar={sidebar}
          />
        )

        const $newNode = $node.findBinding('add-article')

        // replace data-bind node with the button; cannot use replaceWith() as
        // the button is not a Query/node
        if ($newNode) {
          const newIndex = $newNode.$parent.children.findIndex(
            ($child) => $child.attr && $child.attr('data-bind') === 'add-article'
          )

          $newNode.$parent.children.splice(newIndex, 1, button)
        }
      },

      _editArticle($node, _value, context) {
        const index = (context.path.match(/contents\.(\d+)/) || [])[1]
        const sectionKey = context.data.key
        const articles = this.data.cv.sections[sectionKey]?.contents || []

        let to = `/cvs/${cv.id}/articles/${sectionKey}${index === undefined ? '' : `/${index}`}`
        to += `?return=/cvs/${cv.id}`

        const button = (
          <CvArticleEditButtons
            articles={articles}
            cv={cv}
            index={parseInt(index, 10)}
            pageBreaksMode={pageBreaksMode}
            sectionKey={sectionKey}
            to={to}
          />
        )

        $node.children.unshift(button)
      },

      _pageBreakBtn($node, value, context) {
        let sectionKey
        let index

        if (value === true) {
          sectionKey = context.data.key
          index = parseInt((context.path.match(/contents\.(\d+)/) || [])[1], 10)
        } else {
          sectionKey = value
          index = null
        }

        const button = (
          <ButtonPageBreak
            cv={cv}
            index={index}
            sectionKey={sectionKey}
            pageBreaksMode={pageBreaksMode}
          />
        )

        $node.children.unshift(button)
      },
    }
  } else {
    directives.directives.email = ($target, value) => {
      if (value) {
        const EmailLink = ({ email }) => <a href={`mailto:${email}`}>{email}</a>

        EmailLink.propTypes = {
          email: PropTypes.string,
        }

        $target.children = <EmailLink email={value} />
      } else {
        $target.props.className = classNames($target.props.className, 'empty')
      }

      return $target
    }
  }

  // skills are done via postDirectives as we need access to 'context'
  directives.postDirectives._skill = ($node, _value, context) => {
    const sectionKey = context.data.key
    const value = context.data.level

    // context.path is like "sections.1.contents.2"
    const articleIndex = parseInt(context.path.match(/contents\.([\d])/)[1])

    const skill = (
      <CvSkill
        articleIndex={articleIndex}
        cv={cv}
        inEditor={inEditor}
        pdf={pdf}
        sectionKey={sectionKey}
        value={value}
      />
    )

    const $skillNode = $node.findBinding('skill')

    // replace data-bind node with the component; cannot use replaceWith() as
    // the component is not a Query/node
    if ($skillNode) {
      const skillNodeIndex = $skillNode.$parent.children.findIndex(($child) => $child.props['data-bind'] === 'skill')

      $skillNode.$parent.children.splice(skillNodeIndex, 1, skill)
    }
  }

  return directives
}

export default createDirectives
