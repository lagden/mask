/* eslint no-unused-vars: 0 */
/* eslint import/extensions: 0 */

'use strict'

const test = require('ava')
const simulant = require('simulant')
const Mask = require('../src')

test('mask', t => {
	const input = document.querySelector('#placa')
	input.value = Mask.masking('ABC12', 'SSS-9999')
	t.is(input.value, 'ABC-12')
})

test('throws sem input', t => {
	t.throws(() => {
		const mask = new Mask('not a input')
	}, {instanceOf: TypeError, message: 'The input should be a HTMLInputElement'})
})

test('throws sem mask', t => {
	t.throws(() => {
		const input = document.querySelector('#placa')
		const mask = new Mask(input)
	}, {instanceOf: Error, message: 'The mask can not be empty'})
})

test('input', t => {
	const input = document.querySelector('#telefone')
	const mask = new Mask(input)
	for (const char of '11968Z7'.split('')) {
		input.value += char
		simulant.fire(input, 'input')
	}

	// simulant.fire(input, 'input', {inputType: 'deleteContentBackward'})
	t.is(input.value, '(11) 9-687')
	mask.destroy()
})

test('keyup', t => {
	const input = document.querySelector('#telefone')
	input.value = ''
	const mask = new Mask(input, null, 'keyup')
	for (const char of '11968Z7'.split('')) {
		input.value += char
		simulant.fire(input, 'keyup')
	}

	// simulant.fire(input, 'input', {inputType: 'deleteContentBackward'})
	t.is(input.value, '(11) 9-687')
	mask.destroy()
})

test('instance and destroy', t => {
	const input = document.querySelector('#telefone')
	const mask = new Mask(input)
	const _mask = new Mask(input)
	t.true(mask === _mask)
	mask.destroy()
	_mask.destroy()
})

test('instance diff and destroy', t => {
	const inputA = document.querySelector('#telefone')
	const inputB = document.querySelector('#placa')
	const mask = new Mask(inputA)
	const _mask = new Mask(inputB, 'SSS-9999')
	t.false(mask === _mask)
	mask.destroy()
	_mask.destroy()
})
