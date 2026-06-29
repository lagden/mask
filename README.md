# Mask

[![NPM version][npm-img]][npm] [![Build Status][ci-img]][ci] [![Coverage Status][coveralls-img]][coveralls]

[npm-img]: https://img.shields.io/npm/v/@tadashi/mask.svg
[npm]: https://www.npmjs.com/package/@tadashi/mask
[ci-img]: https://github.com/lagden/mask/actions/workflows/ci.yml/badge.svg
[ci]: https://github.com/lagden/mask/actions/workflows/ci.yml
[coveralls-img]: https://coveralls.io/repos/github/lagden/mask/badge.svg?branch=main
[coveralls]: https://coveralls.io/github/lagden/mask?branch=main

The simple and tiny script for input mask.

## Install

```
$ npm i @tadashi/mask
```

## Mask pattern

| Token | Accepts                  |
| ----- | ------------------------ |
| `9`   | Digit (0-9)              |
| `A`   | Letter or digit          |
| `S`   | Letter (a-z, A-Z)        |
| other | Literal (kept as masked) |

## Usage

The mask can be set via the `data-mask` attribute:

```html
<input id="telefone" type="text" data-mask="(99) 9-9999-9999">

<script type="module">
	import Mask from 'https://unpkg.com/@tadashi/mask@{version}/src/mask.js'

	const maskTelefone = new Mask(document.querySelector('#telefone'))
</script>
```

Or via the `mask` option, using npm:

```js
import Mask from '@tadashi/mask'

const mask = new Mask(input, { mask: 'SSS-9999', init: true })
```

The `mask` option also accepts an array of patterns — it switches to the second pattern when the value outgrows the first (e.g. CPF → CNPJ):

```js
const mask = new Mask(input, {
	mask: ['999.999.999-99', '99.999.999/9999-99'],
})
```

Or a function that receives the input element and returns the pattern:

```js
const mask = new Mask(input, {
	mask: (el) => (el.value.replaceAll(/\D/g, '').length > 11 ? '99.999.999/9999-99' : '999.999.999-99'),
})
```

See more examples here: https://codepen.io/lagden/pen/XzLYJE?editors=1010

## Options

| Option            | Type                    | Default     | Description                                                     |
| ----------------- | ----------------------- | ----------- | --------------------------------------------------------------- |
| `mask`            | `string \| array \| fn` | `undefined` | The mask pattern — falls back to the `data-mask` attribute      |
| `keyEvent`        | `string`                | `'input'`   | The event that triggers masking (e.g. `'input'`, `'keyup'`)     |
| `init`            | `boolean`               | `false`     | Apply the mask to the current value on instantiation            |
| `triggerOnBlur`   | `boolean`               | `false`     | Also apply the mask on `blur`                                   |
| `triggerOnDelete` | `boolean`               | `false`     | Also apply the mask on delete (backspace/delete)                |
| `dynamicDataMask` | `boolean`               | `false`     | Watch the `data-mask` attribute and re-apply the mask on change |

## API

### Static

- `Mask.core(value, mask)` — masks a string and returns the result. Works without the DOM (Node.js included).
- `Mask.data(input)` — returns the `Mask` instance bound to the input, or `null`.
- `Mask.masking(value, mask)` — deprecated alias of `Mask.core`.

```js
Mask.core('ABC12', 'SSS-9999') // => 'ABC-12'
```

### Instance

- `getUnmasked()` — returns the input value without the mask literals.
- `destroy()` — removes listeners, unbinds the instance and restores the unmasked value.

## Development

Requires [Deno](https://deno.land/).

```
deno task test      # fmt check → lint → tsc → test → rollup
deno task format    # auto-format
deno task lint      # lint
deno task tsc       # type-check and emit types/mask.d.ts
deno task rollup    # build dist/mask.cjs
```

## Team

[<img src="https://avatars.githubusercontent.com/u/130963?s=390" alt="Lagden" width="90">](https://github.com/lagden)
[<img src="https://avatars.githubusercontent.com/u/8677724?s=390" alt="JonatasAmaral" width="90">](https://github.com/JonatasAmaral)

## Donate ❤️

- BTC: bc1q7famhuj5f25n6qvlm3sssnymk2qpxrfwpyq7g4

## License

MIT © [Thiago Lagden](https://github.com/lagden)
