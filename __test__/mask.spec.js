/* eslint-disable no-new */
/* eslint-disable no-undef */

import {setTimeout} from 'node:timers/promises'
import {
	expect,
	test,
	beforeEach,
} from '@jest/globals'
import simulant from 'simulant'
import Mask from '../src/mask.js'

beforeEach(() => {
	document.body.innerHTML = `
		<input id="telefone" type="text" data-mask="(99) 9-9999-9999">
		<input id="placa" type="text">
		<input id="doc" type="text">
		<input id="currency" type="text" data-mask="9.999,99">
		<select id="tipo">
			<option selected value="BRL">BRL</option>
			<option value="USD">USD</option>
		</select>
	`
})

test('static mask', () => {
	const v = Mask.masking('ABC12', 'SSS-9999')
	expect(v).toBe('ABC-12')
})

test('input', () => {
	const input = document.querySelector('#telefone')
	const mask = new Mask(input)
	for (const char of '11968Z7') {
		input.value += char
		simulant.fire(input, 'input')
	}

	expect(input.value).toBe('(11) 9-687')
	mask.destroy()
})

test('input init', () => {
	const input = document.querySelector('#telefone')
	input.value = '11968'
	const mask = new Mask(input, {init: true})
	expect(input.value).toBe('(11) 9-68')
	mask.destroy()
})

test('input init empty', () => {
	const input = document.querySelector('#telefone')
	input.value = ''
	const mask = new Mask(input, {init: true})
	expect(input.value).toBe('')
	mask.destroy()
})

test('input arr', () => {
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
	expect(input.value).toBe('107.04')

	for (const char of '218000180') {
		input.value += char
		simulant.fire(input, 'keyup')
	}
	expect(input.value).toBe('10.704.218/0001-80')
	mask.destroy()
})

test('input fn', () => {
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
	expect(input.value).toBe('107.04')

	for (const char of '218000180') {
		input.value += char
		simulant.fire(input, 'keyup')
	}
	expect(input.value).toBe('10.704.218/0001-80')
	mask.destroy()
})

test('input on the fly', async () => {
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
	expect(input.value).toBe('1.000,99')

	tipo.value = 'USD'
	simulant.fire(tipo, 'change')
	await setTimeout(1000)

	expect(input.value).toBe('1,000.99')
	mask.destroy()
})

test('keyup', () => {
	const input = document.querySelector('#telefone')
	input.value = ''
	const mask = new Mask(input, {keyEvent: 'keyup'})
	for (const char of '11968Z7') {
		input.value += char
		simulant.fire(input, 'keyup')
	}

	expect(input.value).toBe('(11) 9-687')
	mask.destroy()
})

test('blur', () => {
	const input = document.querySelector('#telefone')
	input.value = ''

	const mask = new Mask(input, {keyEvent: 'keyup', triggerOnBlur: true})
	input.value = '11968Z76'
	simulant.fire(input, 'blur')

	expect(input.value).toBe('(11) 9-68')
	mask.destroy()
})

test('instance diff and destroy', () => {
	const inputA = document.querySelector('#telefone')
	const inputB = document.querySelector('#placa')
	const mask = new Mask(inputA)
	const _mask = new Mask(inputB, {mask: 'SSS-9999'})
	expect(mask).not.toBe(_mask)
	mask.destroy()
	_mask.destroy()
})

test('instance and destroy', () => {
	const input = document.querySelector('#telefone')
	const mask = new Mask(input)
	const _mask = Mask.data(input)
	expect(mask).toEqual(_mask)
	mask.destroy()
	_mask.destroy()
})

test('instance getUnmasked', () => {
	const input = document.querySelector('#telefone')
	input.value = '11968'
	const mask = new Mask(input, {init: true})
	expect(input.value).toBe('(11) 9-68')
	expect(mask.getUnmasked()).toBe('11968')
	mask.destroy()
})

test('throws instanced', () => {
	expect(() => {
		const input = document.querySelector('#telefone')
		new Mask(input)
		new Mask(input)
	}).toThrow('The input has already been instanced. Use the static method `Mask.data(input)` to get the instance.')
})

test('throws sem input', () => {
	expect(() => {
		new Mask('not a input')
	}).toThrowError('The input should be a HTMLInputElement')
})

test('throws sem mask', () => {
	expect(() => {
		const input = document.querySelector('#placa')
		new Mask(input)
	}).toThrowError('The mask can not be empty')
})
