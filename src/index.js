'use strict'

const map = new Map()
map.set('9', /[0-9]/)
map.set('A', /[0-9a-zA-Z]/)
map.set('S', /[a-zA-Z]/)

class Mask {
	constructor(input, mask = false) {
		if (input instanceof HTMLInputElement === false) {
			throw new TypeError('The input should be a HTMLInputElement')
		}
		this.input = input
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
