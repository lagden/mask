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
			import Mask from './node_modules/@tadashi/mask/src/index.js'
			const el = document.getElementById('telefone')
			const mask = new Mask(el)
		</script>
	</body>
</html>
```


## License

MIT © [Thiago Lagden](http://lagden.in)
