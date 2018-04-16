'use strict'

import test from 'ava'
import simulant from 'simulant'
import Mask from '../src'

test('mask', t => {
	const input = document.querySelector('#placa')
	input.value = 'ABC12'
	const mask = new Mask(input, 'SSS-9999')
	mask.masking()
	t.is(input.value, 'ABC-12')
	mask.destroy()
})

test('throws', t => {
	const error = t.throws(() => {
		const mask = new Mask('not a input')
		mask.masking()
	}, TypeError)
	t.is(error.message, 'The input should be a HTMLInputElement')
})

test('input', t => {
	const input = document.querySelector('#telefone')
	const mask = new Mask(input)
	for (const char of '11968Z7'.split('')) {
		input.value += char
		simulant.fire(input, 'input')
	}
	t.is(input.value, '(11) 9-687')
	mask.destroy()
})

test('instance and destroy', t => {
	const input = document.querySelector('#telefone')
	const mask = new Mask(input)
	const _mask = Mask.data(input)
	t.true(mask === _mask)
	mask.destroy()
})
