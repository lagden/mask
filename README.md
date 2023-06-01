# Mask

[![NPM version][npm-img]][npm]
[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]
[![XO code style][xo-img]][xo]


[npm-img]:         https://img.shields.io/npm/v/@tadashi/mask.svg
[npm]:             https://www.npmjs.com/package/@tadashi/mask
[ci-img]:          https://github.com/lagden/mask/actions/workflows/nodejs.yml/badge.svg
[ci]:              https://github.com/lagden/mask/actions/workflows/nodejs.yml
[coveralls-img]:   https://coveralls.io/repos/github/lagden/mask/badge.svg?branch=master
[coveralls]:       https://coveralls.io/github/lagden/mask?branch=master
[xo-img]:          https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:              https://github.com/sindresorhus/xo


The simple and tiny script for input mask.


## Install

```
$ npm i @tadashi/mask
```


## Usage

Codepen example: https://codepen.io/lagden/pen/XzLYJE

```html
<input id="telefone" type="text" data-mask="(99) 9-9999-9999">

<script type="module">
  import Mask from 'https://unpkg.com/@tadashi/mask@{version}/src/mask.js'

  const maskTelefone = new Mask(telefone)
</script>
```


## Team

[<img src="https://avatars.githubusercontent.com/u/130963?s=390" alt="Lagden" width="90">](https://github.com/lagden)
[<img src="https://avatars.githubusercontent.com/u/8677724?s=390" alt="JonatasAmaral" width="90">](https://github.com/JonatasAmaral)


## Donate ❤️

- BTC: bc1q7famhuj5f25n6qvlm3sssnymk2qpxrfwpyq7g4


## License

MIT © [Thiago Lagden](https://github.com/lagden)
