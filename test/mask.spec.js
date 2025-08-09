/* eslint-disable no-new */
/* eslint-disable no-undef */

import { setTimeout } from 'node:timers/promises'
// import userEvent from '@testing-library/user-event'
import { JSDOM } from 'jsdom'
import assert from 'node:assert/strict'
import { beforeEach, describe, it } from 'node:test'
import Mask from '../src/mask.js'

let window
let document

const simulant = {}
simulant.fire = (element, eventName) => {
	const event = new window.Event(eventName, { bubbles: true })
	element.dispatchEvent(event)
}

describe('Mask', () => {
	beforeEach(() => {
		const dom = new JSDOM(`
<!DOCTYPE html><html><body>
	<input id="telefone" type="text" data-mask="(99) 9-9999-9999">
	<input id="placa" type="text">
	<input id="doc" type="text">
	<input id="currency" type="text" data-mask="9.999,99">
	<select id="tipo">
		<option selected value="BRL">BRL</option>
		<option value="USD">USD</option>
	</select>
</body></html>`)
		window = dom.window
		document = window.document
		globalThis.HTMLElement = window.HTMLElement
		globalThis.HTMLInputElement = window.HTMLInputElement
		globalThis.MutationObserver = window.MutationObserver
	})

	it('static mask', () => {
		const v = Mask.masking('ABC12', 'SSS-9999')
		assert.strictEqual(v, 'ABC-12')
	})

	it('input', () => {
		const input = document.querySelector('#telefone')
		const mask = new Mask(input)
		for (const char of '11968Z7') {
			input.value += char
			simulant.fire(input, 'input')
		}

		assert.strictEqual(input.value, '(11) 9-687')
		mask.destroy()
	})

	it('input init', () => {
		const input = document.querySelector('#telefone')
		input.value = '11968'
		const mask = new Mask(input, { init: true })
		assert.strictEqual(input.value, '(11) 9-68')
		mask.destroy()
	})

	it('input init empty', () => {
		const input = document.querySelector('#telefone')
		input.value = ''
		const mask = new Mask(input, { init: true })
		assert.strictEqual(input.value, '')
		mask.destroy()
	})

	it('input arr', () => {
		const input = document.querySelector('#doc')
		input.value = ''
		const mask = new Mask(input, {
			mask: ['999.999.999-99', '99.999.999/9999-99'],
			triggerOnDelete: true,
			keyEvent: 'keyup',
		})
		for (const char of '10704') {
			input.value += char
			simulant.fire(input, 'keyup')
		}
		assert.strictEqual(input.value, '107.04')

		for (const char of '218000180') {
			input.value += char
			simulant.fire(input, 'keyup')
		}
		assert.strictEqual(input.value, '10.704.218/0001-80')
		mask.destroy()
	})

	it('input fn', () => {
		const input = document.querySelector('#doc')
		input.value = ''
		const mask = new Mask(input, {
			mask(el) {
				if (el.value.replaceAll(/\D/g, '').length > 11) {
					return '99.999.999/9999-99'
				}
				return '999.999.999-999'
			},
			triggerOnDelete: true,
			keyEvent: 'keyup',
		})
		for (const char of '10704') {
			input.value += char
			simulant.fire(input, 'keyup')
		}
		assert.strictEqual(input.value, '107.04')

		for (const char of '218000180') {
			input.value += char
			simulant.fire(input, 'keyup')
		}
		assert.strictEqual(input.value, '10.704.218/0001-80')
		mask.destroy()
	})

	it('input on the fly', async () => {
		const tipo = document.querySelector('#tipo')
		const input = document.querySelector('#currency')

		tipo.addEventListener('change', () => {
			input.dataset.mask = tipo.value === 'BRL' ? '9.999,99' : '9,999.99'
		})

		input.value = '100099'
		const mask = new Mask(input, {
			dynamicDataMask: true,
			init: true,
		})
		assert.strictEqual(input.value, '1.000,99')

		tipo.value = 'USD'
		simulant.fire(tipo, 'change')
		await setTimeout(1000)

		assert.strictEqual(input.value, '1,000.99')
		mask.destroy()
	})

	it('keyup', () => {
		const input = document.querySelector('#telefone')
		input.value = ''
		const mask = new Mask(input, { keyEvent: 'keyup' })
		for (const char of '11968Z7') {
			input.value += char
			simulant.fire(input, 'keyup')
		}

		assert.strictEqual(input.value, '(11) 9-687')
		mask.destroy()
	})

	it('blur', () => {
		const input = document.querySelector('#telefone')
		input.value = ''

		const mask = new Mask(input, { keyEvent: 'keyup', triggerOnBlur: true })
		input.value = '11968Z76'
		simulant.fire(input, 'blur')

		assert.strictEqual(input.value, '(11) 9-68')
		mask.destroy()
	})

	it('instance diff and destroy', () => {
		const inputA = document.querySelector('#telefone')
		const inputB = document.querySelector('#placa')
		const mask = new Mask(inputA)
		const _mask = new Mask(inputB, { mask: 'SSS-9999' })
		assert.notStrictEqual(mask, _mask)
		mask.destroy()
		_mask.destroy()
	})

	it('instance and destroy', () => {
		const input = document.querySelector('#telefone')
		const mask = new Mask(input)
		const _mask = Mask.data(input)
		assert.deepStrictEqual(mask, _mask)
		mask.destroy()
		_mask.destroy()
	})

	it('instance getUnmasked', () => {
		const input = document.querySelector('#telefone')
		input.value = '11968'
		const mask = new Mask(input, { init: true })
		assert.strictEqual(input.value, '(11) 9-68')
		assert.strictEqual(mask.getUnmasked(), '11968')
		mask.destroy()
	})

	it('throws instanced', () => {
		assert.throws(() => {
			const input = document.querySelector('#telefone')
			new Mask(input)
			new Mask(input)
		}, { message: 'The input has already been instanced. Use the static method `Mask.data(input)` to get the instance.' })
	})

	it('throws sem input', () => {
		assert.throws(() => {
			new Mask('not a input')
		}, { message: 'The input should be a HTMLInputElement' })
	})

	it('throws sem mask', () => {
		assert.throws(() => {
			const input = document.querySelector('#placa')
			new Mask(input)
		}, { message: 'The mask can not be empty' })
	})

	it('mutation observer ignores non data-mask attributes', async () => {
		const input = document.querySelector('#currency')
		const mask = new Mask(input, {
			dynamicDataMask: true,
		})

		// Change a different attribute, not data-mask
		input.setAttribute('title', 'test')
		await setTimeout(50) // Give time for mutation observer

		// The mask should remain the same
		assert.strictEqual(mask.mask, '9.999,99')

		mask.destroy()
	})

	it('crypto fallback when randomUUID not available', () => {
		// Store original crypto
		const originalCrypto = globalThis.crypto

		// Mock crypto to be undefined
		Object.defineProperty(globalThis, 'crypto', {
			value: undefined,
			configurable: true,
		})

		const input = document.querySelector('#telefone')
		const mask = new Mask(input)

		// Just verify the instance was created successfully
		assert.ok(mask instanceof Mask)

		// Restore original crypto
		Object.defineProperty(globalThis, 'crypto', {
			value: originalCrypto,
			configurable: true,
		})
		mask.destroy()
	})

	it('delete events with triggerOnDelete false', () => {
		const input = document.querySelector('#telefone')
		input.value = '11968'

		const mask = new Mask(input, {
			init: true,
			triggerOnDelete: false,
		})

		// Simulate delete event
		const deleteEvent = new window.Event('input', { bubbles: true })
		deleteEvent.inputType = 'deleteContentBackward'

		// The handleEvent should return false and not apply masking
		const result = mask.handleEvent(deleteEvent)
		assert.strictEqual(result, false)

		mask.destroy()
	})
})
