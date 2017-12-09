# Mask
[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]
[![devDependency Status][devDep-img]][devDep]
[![XO code style][xo-img]][xo]

[ci-img]:        https://travis-ci.org/lagden/mask.svg
[ci]:            https://travis-ci.org/lagden/mask
[coveralls-img]: https://coveralls.io/repos/github/lagden/mask/badge.svg?branch=master
[coveralls]:     https://coveralls.io/github/lagden/mask?branch=master
[devDep-img]:    https://david-dm.org/lagden/mask/dev-status.svg
[devDep]:        https://david-dm.org/lagden/mask#info=devDependencies
[xo-img]:        https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:            https://github.com/sindresorhus/xo


The simple and tiny script for input mask


## Install

```
$ npm i -S @tadashi/mask
```


## Usage

```html
<html>
  <head></head>
  <body>
    <input id="telefone" type="text" data-mask="(99) 9-9999-9999">
    <script src="./app.js" type="module"></script>
   </body>
</html>
```

```js
// app.js

import Mask from '@tadashi/mask'

const el = document.getElementById(id)
const mask = new Mask(el)
```

## License

MIT © [Thiago Lagden](http://lagden.in)
