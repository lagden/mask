# Mask

[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]
[![XO code style][xo-img]][xo]

[ci-img]:        https://github.com/lagden/mask/workflows/Node.js%20CI/badge.svg
[ci]:            https://github.com/lagden/mask/actions?query=workflow%3A%22Node.js+CI%22
[coveralls-img]: https://coveralls.io/repos/github/lagden/mask/badge.svg?branch=master
[coveralls]:     https://coveralls.io/github/lagden/mask?branch=master
[xo-img]:        https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:            https://github.com/sindresorhus/xo


The simple and tiny script for input mask


## Install

```
$ npm i -S @tadashi/mask
```


## Usage

Codepen example: https://codepen.io/lagden/pen/XzLYJE

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <title>Example</title>
  </head>
  <body>
    <input id="telefone" type="text" data-mask="(99) 9-9999-9999">
    <script type="module">
      import Mask from './node_modules/@tadashi/mask/dist/index.js'
      const mask = new Mask(telefone)
    </script>
  </body>
</html>
```


## License

MIT © Thiago Lagden
