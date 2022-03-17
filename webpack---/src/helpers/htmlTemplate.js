import cloneDeep from 'lodash/cloneDeep'
import isPlainObject from 'lodash/isPlainObject'
import merge from 'lodash/merge'

/**
 * This is a DOM based semantic templating engine inspired by Angular and Transparency
 */

/**
 * Cheerio Bugs
 * - self closing tags can mess up .replaceWith, it'll start blowing up it's siblings
 */

/**
 * Simple shim of the jQuery selector syntax
 * - it doesn't support need to support find or collection operations like jQuery, actually an anti pattern in this usecase
 * - it just extends the original react params object with added functionality
 * @param node
 * @returns $node
 */
const $ = (node) => {
    const $node = new Query(node)
    return $node
}

function Query(node) {
    Object.assign(this, node || {})

    this.$parent = null

    return this
}

Query.prototype.findBinding = function(key) {
    const bindKey = this.attr('data-bind') || this.attr('id')

    if (bindKey === key) {
        return this
    }

    const children = this.getChildren()

    for (const $child of children) {
        const result = $child.findBinding && $child.findBinding(key)

        if (result) {
            return result
        }
    }
}

Query.prototype.findClass = function(className) {
    const klass = this.props.className || ''

    if (klass.split(/\s+/).indexOf(className) >= 0) {
        return this
    }

    const children = this.getChildren()

    for (const $child of children) {
        const result = $child.findClass && $child.findClass(className)

        if (result) {
            return result
        }
    }
}

Query.prototype.clone = function() {
    const cloneNode = cloneDeep(this)

    return $(cloneNode)
}

Query.prototype.css = function(style) {
    if (style === undefined) {
        return this.props.style
    }

    this.props.style = style

    return this
}

Query.prototype.attr = function(attribute, newValue) {
    if (attribute === undefined) {
        return this.props
    }

    if (newValue !== undefined) {
        this.props[attribute] = newValue
    }

    return this.props[attribute]
}

Query.prototype.text = function(text) {
    if (text === undefined) {
        return (this.children || []).filter((child) => typeof child === 'string').join('')
    }

    this.children = [text]

    return this
}

Query.prototype.parent = function() {
    return this.$parent || new Query()
}

// NOTE: This can't be named children as it clashes with the VDOM structure
Query.prototype.getChildren = function() {
    let children = this.children || []

    if (!Array.isArray(children)) {
        children = [children]
    }

    return children.map((child) => {
        if (child && child.type) {
            const $child = new Query(child)

            $child.$parent = this

            return $child
        }

        return child
    })
}

Query.prototype.siblings = function() {
    return this.parent().getChildren()
}

// TODO rename to `attachChildren`
Query.prototype.html = function(newNodes) {
    const nodes = Array.isArray(newNodes) ? newNodes : [newNodes]

    // since template building can create nested arrays, we flatten them here
    this.children = nodes.flat()

    // set new $parent for each node, since flattening might change the parent
    this.children.map((child) => {
        if (child && child.type) {
            child.$parent = this
        }

        return child
    })

    return this
}

Query.prototype.replaceWith = function($node) {
    if ($node === undefined) {
        return this
    }

    // TODO allow working with non-Query objects
    if (!($node instanceof Query)) {
        throw new Error('replaceWith can only be used with Query instances')
    }

    const existingParent = this.$parent

    if (existingParent) {
        // this code does *not* seem to be executed/reached :-?

        // replace parent
        $node.$parent = existingParent

        // replace `this` with `$node`
        const thisIndex = existingParent.getChildren().findIndex((child) => child === this)

        existingParent.children.splice(thisIndex, 1, $node)

        return $node
    }

    Object.assign(this, $node)

    return this
}

/**
 * By default the directive is matched if the key is the same, however you can provide custom matcher
 * - the short form is to just pass in a named render function, the function name will be used to match the binding
 * - NOTE: the order in which the directives run matters
 */
const defaultDirectives = {
    _array: {
        recursive: true,

        match(value, _key) {
            return value && Array.isArray(value)
        },

        render($target, value, context) {
            // NOTE: this should only support data-bind since id should not be cloned
            // NOTE: a closure won't be created with argument variables, need to create another var
            const key = context.key
            const basePath = context.path

            const cacheKey = compact([basePath, key]).join('.')

            const $elements = value.map((data, i) => {
                const path = compact([basePath, key, i]).join('.')
                const $template = this.memoized(cacheKey, $target)

                return this._render($template, data, path)
            })

            return $elements
        },
    },

    _object: {
        recursive: true,
        match(value, _key) {
            return isPlainObject(value)
        },
        render($target, value, context) {
            // NOTE: doesn't need to be memoized, it's done on the top level already
            return this._render($target, value, compact([context.path, context.key]).join('.'))
        },
    },

    _text: {
        // NOTE if the match conditions don't overlap, then order doesn't really matter
        // refactor the directives as an object so that it's easy to overwrite certain properties
        // This is just the default directive
        match(value, _key) {
            return typeof value !== 'object' || value == null
        },
        render: function text($target, value, _context) {
            return $target.text(value)
        },
    },
}

/**
 * Default meta directives
 * - meta directives runs before normal directives and does not require a $target to bind to
 */
const metaDirectives = {
    _template($node, value) {
        const templateKey = value
        const $root = this.$node
        const $template = $root.findBinding(templateKey)

        if (!$template) {
            console.error('$template not found', templateKey)

            return
        }

        const $content = $template.getChildren()

        // $node.props['className'] = templateKey
        $node.html($content)
    },

    _html($node, value) {
        return $node.html(value)
    },

    _id: function attributes($target, value) {
        $target.props.id = value

        return $target
    },

    // TODO implement & allow all react attributes
    _className: function attributes($target, value, _context) {
        $target.props.className = $target.props.className ? $target.props.className + ' ' + value : value

        return $target
    },
}

/**
 * @param {string} html an html snippet
 * @param {object} directives
 * @param {function} onRender
 * @constructor
 */
function Bind(html, options) {
    if (!options) {
        options = {}
    }

    this.Query = Query
    this.$node = $(html)
    this.directives = merge({}, defaultDirectives, options.directives)
    this.postDirectives = options.postDirectives || {}
    this.data = {}
    this.templates = {}
    this.logging = options.logging

    /**
     * Checks if a directive referenced by the directiveKey should be applied
     * @param directiveKey - the reference to the directive
     * @param value - the data value
     * @param key - the data key
     * @param context - context object
     * @returns {*}
     */
    this.match = function(directiveKey, value, key, context) {
        const directive = normalizeDirective(this.directives[directiveKey], directiveKey)
        const params = [value, key, context]
        let match = directive.match

        if (typeof match !== 'function') {
            match = function(_value, key) {
                return key === directive.bind
            }
        }

        if (match.apply(this, params)) {
            return directive
        }

        return false
    }

    /**
     * NOTE: we purposely don't include binding by class be default, it's good to be explicit
     * - don't use class for styling and template binding
     * @param $context
     * @param key
     * @returns {*}
     */
    this.bindEach = function($template, onMatch) {
        if (!$template || !($template instanceof Query)) {
            return $template
        }

        const bindKey = $template.attr('data-bind') || $template.attr('id')

        if (bindKey !== undefined) {
            this.log('- [BINDING]', bindKey)
            const result = onMatch($template, bindKey)

            $template = result.$rendered

            if (result.next === false) {
                return $template
            }
        }

        // Walk down the DOM tree and render any directives we see
        // ref: https://github.com/angular/angular.js/blob/master/src/ng/compile.js
        const $newChildren = $template.getChildren().map(($child) => this.bindEach($child, onMatch))

        $template.html($newChildren)

        // FIXME on the 2nd iteration, it can return an array because we call
        // $template.html() instead of replaceWith(); this is partially worked around
        // with flattening the children in Query#html()
        return $template
    }

    this.memoized = function(cacheKey, $template) {
        let $memoized

        if (this.templates[cacheKey]) {
            $memoized = this.templates[cacheKey].clone()
        } else {
            $memoized = $template ? $template.clone() : $template
            this.templates[cacheKey] = $memoized
        }

        return $memoized
    }
}

Bind.prototype = {
    render(data) {
        this.data = data
        // clear the layout
        this.templates = {}

        const $node = this._render(this.$node, data)

        return $node
    },

    // Recursive render function
    _render($template, data, path) {
        this.log('[RENDERING]', path || '', data)

        if (!path) {
            path = ''
        }

        if (!data || typeof data !== 'object') {
            data = {}
        }

        // TODO: this needs to support the case where there are multiple templates for the same bind key?
        // NOTE: if there are two different templates using the same binding key, it'll need to be aliased
        const self = this
        const $node = this.memoized(path || '__LAYOUT', $template)

        // First process all the meta directives
        for (const key in metaDirectives) {
            const directive = normalizeDirective(metaDirectives[key], key)
            const value = data[key]
            const context = {
                key,
                path,
                $node,
                data,
                value
            }

            if (value !== undefined) {
                $node.replaceWith(directive.render.call(this, $node, value, context))
            }
        }

        $node.replaceWith(this.bindEach($node, onMatch))

        // Process any post directives
        for (const key in this.postDirectives) {
            const directive = normalizeDirective(this.postDirectives[key], key)
            const value = data[key]
            const context = {
                key,
                path,
                $node,
                data,
                value
            }

            if (value !== undefined) {
                $node.replaceWith(directive.render.call(this, $node, value, context))
            }
        }

        this.log('[RENDERED] ', path || '')

        return $node

        // TODO move these to static functions
        // TODO need to clone $target?
        function onMatch($target, key) {
            const value = data[key]
            let result = {
                $rendered: $target
            }

            if (value !== undefined) {
                const context = {
                    key,
                    path,
                    $node,
                    data,
                    value
                }
                const directive = matchDirective(key, context)
                const $rendered = directive.render.call(self, $target, context.value, context)
                result = {
                    $rendered
                }

                self.log('- [BOUND]  ', directive.bind)

                // Recursive directives handle rendering of their own children, continue to next tree
                if (directive.recursive) {
                    result.next = false
                }
            }

            return result
        }

        /**
         * Match which directives are loaded first
         * - custom directives defined by the user are always matched first
         * @param key
         * @param context
         * @returns {} - matched directive
         */
        function matchDirective(key, context) {
            const value = context.data[key]

            const defaultDirectiveKeys = Object.keys(self.directives).filter((key) => defaultDirectives[key])

            const userDirectiveKeys = Object.keys(self.directives).filter((key) => defaultDirectives[key] === undefined)

            // Ensure that the user directives are always matched before default directives
            const directiveKeys = userDirectiveKeys.concat(defaultDirectiveKeys)

            for (const directiveKey of directiveKeys) {
                const directive = self.match(directiveKey, value, key, context)

                if (directive && directive.render) {
                    return directive
                }
            }
        }
    },

    log() {
        /* eslint-disable no-console */
        if (console && console.info && this.logging) {
            console.info.apply(this, arguments)
        }
        /* eslint-enable no-console */
    },
}

function compact(array) {
    if (!array || !Array.isArray(array)) {
        return []
    }

    return array.filter((el) => el !== null && el !== undefined && el !== '')
}

/**
 * Normalize directive shorthand declarations to standard syntax
 * @param directive
 * @param directiveKey
 * @returns {} - normalized directive
 */
function normalizeDirective(directive, directiveKey) {
    if (typeof directive === 'function') {
        directive = {
            render: directive
        }
    }

    if (!directive.render) {
        throw new Error('Invalid Directive: ' + directive)
    }

    if (isNaN(directive.priority)) {
        directive.priority = 1
    }

    if (!directive.bind) {
        directive.bind = directiveKey // directive.render.name
    }

    if (!directive.bind) {
        throw new Error('Invalid Directive ' + directive.render)
    }

    return directive
}

export default Bind