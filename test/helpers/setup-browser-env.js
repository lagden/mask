'use strict'

const jsdom = require('jsdom')

const {JSDOM} = jsdom
const html = [
	'<input id="telefone" type="text" data-mask="(99) 9-9999-9999">',
	'<input id="placa" type="text">'
].join('')

const {window} = new JSDOM(html)
const document = window.document

global.document = document
global.window = window
global.HTMLElement = window.HTMLElement
global.HTMLInputElement = window.HTMLInputElement
