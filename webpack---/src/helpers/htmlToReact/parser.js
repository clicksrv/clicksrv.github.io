import {
    DomHandler
} from 'domhandler'
import {
    Parser
} from 'htmlparser2'
import _ from 'lodash'
import ProcessNodeDefinitions from './process-node-definitions'

const Html2React = function() {
    const parseHtmlToTree = function(html) {
        const handler = new DomHandler()
        const parser = new Parser(handler)
        parser.parseComplete(html)
        return handler.dom
    }

    const traverseDom = function(node) {
        const processNodeDefinitions = new ProcessNodeDefinitions()

        const children = []
        _.each(node.children, function(child) {
            children.push(traverseDom(child))
        })
        _.compact(children) // Remove invalid nodes
        return processNodeDefinitions.processDefaultNode(node, children)
    }

    const parse = (html) => {
        const domTree = parseHtmlToTree(html)
        // Reject HTML that contains more than one root level node
        if (domTree && domTree.length !== 1) {
            throw new Error(
                'html-to-react currently only supports HTML with one single root element. ' +
                'The HTML provided contains ' +
                domTree.length +
                ' root elements. You can fix that by simply wrapping your HTML ' +
                'in a <div> element.'
            )
        }
        return traverseDom(domTree[0])
    }

    return {
        parse,
    }
}

export default Html2React