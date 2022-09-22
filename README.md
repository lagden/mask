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


The simple and tiny script for input mask


## Install

```
$ npm i -S @tadashi/mask
```


## Usage

Codepen example: https://codepen.io/lagden/pen/XzLYJE

```html
<input id="telefone" type="text" data-mask="(99) 9-9999-9999">

<script type="module">
  import Mask from 'https://unpkg.com/@tadashi/mask@{version}/src/mask.js'

  const mask = new Mask(telefone)
</script>
```


## License

MIT © Thiago Lagden
