'use strict'

const map = new Map()
map.set('9', /[\d]/)
map.set('A', /[0-9a-zA-Z]/)
map.set('S', /[a-zA-Z]/)

const instances = new Map()
let GUID = 0

class Mask {
	static data(input) {
		const id = input && input.GUID
		return instances.has(id) && instances.get(id)
	}

	constructor(input, mask = false) {
		if (input instanceof HTMLInputElement === false) {
			throw new TypeError('The input should be a HTMLInputElement')
		}

		// Check if element was initialized and return your instance
		const initialized = Mask.data(input)
		if (initialized instanceof Mask) {
			return initialized
		}

		this.input = input

		// Storage current instance
		const id = ++GUID
		this.input.GUID = id
		instances.set(id, this)

		this.mask = input.dataset.mask || mask
		this.maskArr = this.mask.split('')
		this.event = 'input'
		this.input.addEventListener(this.event, this)
	}

	masking(event) {
		const input = event ? event.target : this.input
		const iArr = input.value.split('')
		const iTotal = iArr.length
		const mTotal = this.maskArr.length

		const res = []
		let cc = 0

		for (let i = 0; i < mTotal; i++) {
			const char = this.maskArr[i]
			if (iTotal > cc) {
				if (map.has(char)) {
					if (map.get(char).test(iArr[cc])) {
						res.push(iArr[cc++])
					} else {
						break
					}
				} else if (char === iArr[cc]) {
					res.push(char)
					cc++
				} else {
					res.push(char)
				}
			}
		}
		input.value = res.join('')
	}

	destroy() {
		this.input.removeEventListener(this.event, this)
	}

	handleEvent(event) {
		this.masking(event)
	}
}

export default Mask
