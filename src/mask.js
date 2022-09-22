/**
 * Gerador de id aleatório
 * @return {string} Retorna o uuid ou hexadecimal aleatório
 */
function _id() {
	return Number(Math.random()).toString(16).slice(2, 8) + Date.now().toString(16)
}

const map = new Map()
map.set('9', /\d/)
map.set('A', /[\dA-Za-z]/)
map.set('S', /[A-Za-z]/)

const instances = new Map()
const GUID = Symbol('GUID')

/** Class aplica mascara. */
class Mask {
	/**
	 * Pega a instância
	 * @param {HTMLInputElement} input - elemento com Mask aplicada
	 * @return {Mask|boolean} Retorna a instância ou false
	 * @memberof Mask
	 * @static
	 */
	static data(input) {
		return instances.has(input[GUID]) && instances.get(input[GUID])
	}

	/**
	 * Mascara um valor
	 * @param {string|number} _value - valor
	 * @param {string} _mask - formato da máscara
	 * @return {string} Retorna o valor mascaradi
	 * @memberof Mask
	 * @static
	 */
	static masking(_value, _mask) {
		const mask = String(_mask)
		const value = String(_value).replace(/[^\dA-Za-z]/g, '')

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

	constructor(input, opts = {}) {
		this.opts = {
			keyEvent: 'input',
			triggerOnBlur: false,
			init: false,
			mask: '',
			...opts,
		}

		if (input instanceof globalThis.HTMLInputElement === false) {
			throw new TypeError('The input should be a HTMLInputElement')
		}

		// Check if element has an instance
		const instance = Mask.data(input)
		if (instance instanceof Mask) {
			throw new TypeError('The input has already been instanced. Use the static method `Mask.data(input)` to get the instance.')
		}

		this.events = new Set()
		this.input = input
		this.mask = input.dataset?.mask ?? this.opts.mask

		// Check if has mask
		if (this.mask.length === 0) {
			throw new Error('The mask can not be empty')
		}

		// Initialize
		if (this.opts.init) {
			this.input.value = Mask.masking(this.input.value, this.mask)
		}

		// Listener
		this.input.addEventListener(this.opts.keyEvent, this)
		this.events.add(this.opts.keyEvent)

		if (this.opts.triggerOnBlur) {
			this.input.addEventListener('blur', this)
			this.events.add('blur')
		}

		// Storage instance
		this.input[GUID] = _id()
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
		for (const _event of this.events) {
			this.input.removeEventListener(_event, this)
		}

		if (instances.has(this.input[GUID])) {
			instances.delete(this.input[GUID])
		}
	}

	handleEvent(event) {
		this.masking(event)
	}
}

export default Mask
