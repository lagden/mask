'use strict'

const map = new Map()
map.set('9', /[\d]/)
map.set('A', /[0-9a-zA-Z]/)
map.set('S', /[a-zA-Z]/)

const instances = new Map()

const GUID = Symbol('GUID')
const EVENT = Symbol('EVENT')

class Mask {
	static data(input) {
		return instances.has(input[GUID]) && instances.get(input[GUID])
	}

	static masking(_value, _mask) {
		const value = String(_value).replace(/[^0-9a-zA-Z]/g, '')
		const mask = String(_mask)

		const res = []
		let cc = 0

		for (let i = 0; i < mask.length; i++) {
			const char = mask.charAt(i)
			if (value.length > cc) {
				if (map.has(char)) {
					if (map.get(char).test(value.charAt(cc))) {
						res.push(value.charAt(cc++))
					} else {
						break
					}
				} else {
					res.push(char)
				}
			}
		}

		return res.join('')
	}

	constructor(input, mask = '') {
		if (input instanceof HTMLInputElement === false) {
			throw new TypeError('The input should be a HTMLInputElement')
		}

		// Check if element has an instance
		const instance = Mask.data(input)
		if (instance instanceof Mask) {
			return instance
		}

		this.input = input
		this.mask = input.dataset.mask || mask

		// Check if has mask
		if (this.mask.length === 0) {
			throw new Error('The mask can not be empty')
		}

		// Listener
		this[EVENT] = 'input'
		this.input.addEventListener(this[EVENT], this)

		// Storage instance
		this.input[GUID] = `${Math.random()}_${Date.now()}`
		instances.set(this.input[GUID], this)
	}

	masking(event) {
		/* istanbul ignore next */
		if (event && event.inputType === 'deleteContentBackward') {
			return false
		}

		this.input.value = Mask.masking(this.input.value, this.mask)
	}

	destroy() {
		this.input.removeEventListener(this[EVENT], this)
		if (instances.has(this.input[GUID])) {
			instances.delete(this.input[GUID])
		}
	}

	handleEvent(event) {
		this.masking(event)
	}
}

export default Mask
