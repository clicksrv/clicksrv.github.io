import {
    EventEmitter
} from 'eventemitter3'

const emitter = new EventEmitter({
    wildcard: true
})

export default emitter