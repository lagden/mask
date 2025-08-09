/**
 * Represents a masking utility to format input based on a specified mask.
 */
const map = new Map();
map.set('9', /\d/);
map.set('A', /[\dA-Za-z]/);
map.set('S', /[A-Za-z]/);

/**
 * Represents a collection of Mask instances associated with input elements.
 */
const instances = new Map();

/**
 * A symbol to uniquely identify Mask instances.
 * @type {symbol}
 */
const GUID = Symbol('GUID');

/**
 * The Mask class provides methods for input masking and management.
 */
class Mask {
	/**
	 * Checks if a Mask instance exists for the given input element.
	 * @param {HTMLInputElement} input - The input element to check.
	 * @returns {Mask|null} The Mask instance associated with the input element, or null if not found.
	 */
	static data(input) {
		return instances.has(input[GUID]) && instances.get(input[GUID])
	}

	/**
	 * Mask the input value according to the specified mask pattern.
	 * @param {string} _value - The input value to be masked.
	 * @param {string} _mask - The mask pattern to apply.
	 * @returns {string} The masked input value.
	 */
	static masking(_value, _mask) {
		const mask = String(_mask);
		const value = String(_value).replaceAll(/[^\dA-Za-z]/g, '');

		const res = [];
		let cc = 0;

		for (let i = 0; i < mask.length; i++) {
			const char = mask.charAt(i);
			if (value.length > cc) {
				if (map.has(char)) {
					if (map.get(char).test(value.charAt(cc))) {
						res.push(value.charAt(cc++));
					} else {
						break
					}
				} else {
					res.push(char);
				}
			}
		}

		return res.join('')
	}

	/**
	 * Options object for configuring the Mask class.
	 * @typedef {Object} MaskOptions
	 * @property {string} [keyEvent='input'] - The key event to listen for (e.g., 'input', 'keyup').
	 * @property {boolean} [triggerOnBlur=false] - Whether to trigger masking on the blur event.
	 * @property {boolean} [triggerOnDelete=false] - Whether to trigger masking on delete events (e.g., 'deleteContentBackward', 'deleteContentForward').
	 * @property {boolean} [dynamicDataMask=false] - Whether to dynamically update the mask based on the input's data-mask attribute.
	 * @property {boolean} [init=false] - Whether to apply masking on initialization.
	 * @property {string|function} [mask=undefined] - The mask pattern or a function returning the mask pattern based on the input element.
	 */

	/**
	 * The options object for configuring the Mask class.
	 * @type {MaskOptions}
	 */
	#opts = {
		keyEvent: 'input',
		triggerOnBlur: false,
		triggerOnDelete: false, // default to false for backward compatibility
		dynamicDataMask: false,
		init: false,
		mask: undefined,
	}

	/**
	 * The dynamically generated mask pattern.
	 * @type {boolean|undefined}
	 */
	#dynamicMask

	/**
	 * Constructs a new Mask instance for the given input element.
	 *
	 * @param {HTMLInputElement} input - The input element to apply the mask to.
	 * @param {MaskOptions} [opts] - The options for the Mask instance.
	 * @throws {TypeError} If the input parameter is not an instance of HTMLInputElement.
	 * @throws {TypeError} If the input has already been instanced.
	 * @throws {Error} If the mask is empty.
	 */
	constructor(input, opts = {}) {
		// sanitize opts
		this.opts = {
			...this.#opts,
		};
		for (const key of Object.keys(this.#opts)) {
			if (opts?.[key]) {
				this.opts[key] = opts[key];
			}
		}

		if (input instanceof globalThis.HTMLInputElement === false) {
			throw new TypeError('The input should be a HTMLInputElement')
		}

		// Check if element has an instance
		const instance = Mask.data(input);
		if (instance instanceof Mask) {
			throw new TypeError('The input has already been instanced. Use the static method `Mask.data(input)` to get the instance.')
		}

		this.events = new Set();
		this.input = input;

		this.#evaluateMask();

		// Check if has mask
		if (!this.mask) {
			throw new Error('The mask can not be empty')
		}

		// Initialize
		if (this.opts.init) {
			this.#masking();
		}

		// Listener
		this.input.addEventListener(this.opts.keyEvent, this);
		this.events.add(this.opts.keyEvent);

		if (this.opts.triggerOnBlur) {
			this.input.addEventListener('blur', this);
			this.events.add('blur');
		}

		// observe input's data-mask changes
		if (this.opts.dynamicDataMask === true) {
			this.maskObserver = new globalThis.MutationObserver(([item]) => {
				/* istanbul ignore next */
				if (item.attributeName !== 'data-mask') {
					return
				}

				this.mask = /** @type {HTMLInputElement} */ (item.target).dataset.mask;
				this.#masking();
			});

			this.maskObserver.observe(this.input, {
				attributes: true,
			});
		}

		// Storage instance
		this.input[GUID] = this.#id();
		instances.set(this.input[GUID], this);
	}

	/**
	 * Get the unmasked input value (removes non-digit and non-alphabetic characters).
	 * @returns {string} The unmasked input value.
	 */
	getUnmasked() {
		return String(this.input.value).replaceAll(/[^\dA-Za-z]/g, '')
	}

	/**
	 * Generates a unique ID for the instance.
	 * @returns {string} The generated unique ID.
	 */
	#id() {
		/* istanbul ignore next */
		if (globalThis?.crypto?.randomUUID) {
			return globalThis.crypto.randomUUID().replaceAll('-', '')
		}
		return Number(Math.random()).toString(16).slice(2, 8) + Date.now().toString(16)
	}

	/**
	 * Evaluates the mask based on the provided options.
	 */
	#evaluateMask() {
		if (this.#dynamicMask === false) {
			return
		}

		if (typeof this.opts.mask === 'function') {
			this.mask = this.opts.mask(this.input);
			this.#dynamicMask = true;
			return
		}

		if (Array.isArray(this.opts.mask)) {
			const totalValue = [...String(this.input.value).replaceAll(/[^\dA-Za-z]/g, '')]?.length;
			const total0 = [...String(this.opts.mask[0]).replaceAll(/[^\dA-Za-z]/g, '')]?.length;
			const pos = totalValue > total0 ? 1 : 0;
			this.mask = this.opts.mask[pos];
			this.#dynamicMask = true;
			return
		}

		this.#dynamicMask = false;
		this.mask = typeof this.opts.mask === 'string' ? this.opts.mask : this.input.dataset.mask;
	}

	/**
	 * Applies the mask to the input element's value.
	 */
	#masking() {
		this.#evaluateMask();
		this.input.value = Mask.masking(this.input.value, this.mask);
	}

	/**
	 * Handles events triggered on the input element.
	 *
	 * @param {Event} event - The event object.
	 * @returns {boolean} Whether to continue processing the event.
	 */
	handleEvent(event) {
		const inputEvent = /** @type {InputEvent} */ (event);
		/* istanbul ignore next */
		if (!this.opts.triggerOnDelete && (inputEvent.inputType === 'deleteContentBackward' || inputEvent.inputType === 'deleteContentForward')) {
			return false
		}

		this.#masking();
	}

	/**
	 * Destroys the Mask instance, removing event listeners and cleaning up references.
	 */
	destroy() {
		this.input.value = this.getUnmasked();

		for (const _event of this.events) {
			this.input.removeEventListener(_event, this);
		}

		if (this.maskObserver) {
			this.maskObserver.disconnect();
		}

		if (instances.has(this.input[GUID])) {
			instances.delete(this.input[GUID]);
		}
	}
}

module.exports = Mask;
