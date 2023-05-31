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
	 * @return {string} Retorna o valor mascarado
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

	/**
	 * @typedef {(input: HTMLInputElement, event?: Event)=>string} DynamicMask
	 * - A function that returns the mask string on the fly.
	 * It runs on each event, to evaluate new mask before applying it.
	 *
	 * The given function receives the associated input as first argument,
	 * and the event triggering the mask as the second,
	 *
	 * _NOTE: no event is sent on **initial** evaluation (if constructor's `opts.init` is set to true)_
	 *
	 *
	 * @typedef {{
	 * 	keyEvent: keyof HTMLElementEventMap,
	 * 	triggerOnBlur: Boolean,
	 * 	triggerOnDelete: Boolean,
	 * 	init: Boolean,
	 * 	mask: string | DynamicMask | undefined
	 * }} Opts
	 *
	 * @type {Opts}
	 */
	opts = {
		keyEvent: 'input',
		triggerOnBlur: false,
		triggerOnDelete: false, // default to false for backward compatibility
		init: false,
		mask: undefined,
	}

	/**
	* @param {HTMLInputElement} input
	* @param {Partial<Opts>} opts
	* */
	constructor(input, opts = {}) {
		// satityze user's opts
		for (const key of Object.keys(opts)) {
			if (opts[key] === null || opts[key] === undefined) {
				delete opts[key]
			}
		}

		/** @type {Opts} */
		this.opts = {
			...this.opts,
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

		this.#evaluateMask()

		// Check if has mask
		if (!this.mask) {
			throw new Error('The mask can not be empty')
		}

		// Initialize
		if (this.opts.init) {
			this.masking()
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

	/**
	* @type {Boolean | undefined}
	*/
	#dynamicMask = undefined

	/**
	 * @param {InputEvent} [event] - event to pass to DynamicMask if it is the masking method used
	 * */
	#evaluateMask(event) {
		if (this.#dynamicMask === false) {
			return
		}

		if (typeof this.opts.mask === 'function') {
			this.mask = this.opts.mask(this.input, event)
			this.#dynamicMask = true
			return
		}
		this.#dynamicMask = false

		this.mask = typeof this.opts.mask === 'string'
			? this.mask = this.opts.mask : this.mask = this.input.dataset.mask
	}

	/**
	 * @param {InputEvent} [event]
	 * */
	masking(event) {
		this.#evaluateMask(event)
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

	/**
	 * @param {InputEvent} event
	 * */
	handleEvent(event) {
		/* istanbul ignore next */
		if (!this.opts.triggerOnDelete && (event.inputType === 'deleteContentBackward' || event.inputType === 'deleteContentForward')) {
			return false
		}

		this.masking(event)
	}
}

export default Mask
