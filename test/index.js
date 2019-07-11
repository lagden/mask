/* eslint no-unused-vars: 0 */
/* eslint import/extensions: 0 */

'use strict'

import test from 'ava'
import simulant from 'simulant'
import Mask from '../src'

test('mask', t => {
	const input = document.querySelector('#placa')
	input.value = Mask.masking('ABC12', 'SSS-9999')
	t.is(input.value, 'ABC-12')
})

test('throws sem input', t => {
	const error = t.throws(() => {
		const mask = new Mask('not a input')
	}, TypeError)
	t.is(error.message, 'The input should be a HTMLInputElement')
})

test('throws sem mask', t => {
	const error = t.throws(() => {
		const input = document.querySelector('#placa')
		const mask = new Mask(input)
	}, Error)
	t.is(error.message, 'The mask can not be empty')
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
