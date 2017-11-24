# babel-plugin-s2s-redux-actions-reducers

> generate redux actions reducers

## Install

```
$ yarn add --dev babel-plugin-s2s-redux-actions-reducers
```

## Install babel handler
You need a handler compatible with syntax object rest spread.

```
$ yarn add --dev s2s-handler-babel-object-rest-spread
```
This handler can transform a code containing object rest spread like this.

```js
[action_name]: () => ({
  ...state
})
```

## Create redux-actions-reducers template

You should create babel-plugin-s2s-redux-actions-reducers template. \
In your node project, you create a folder named templates in the same direcotry as the package.json

`mkdir templates`

And create a reducer.js

`touch templates/reducer.js`

Write this code.

```js
import { handleActions } from 'redux-actions'
import * as actions from '../actions'

const initialState = {}

export default handleActions(
  {},
  initialState
)
```

## s2s.config.js

s2s-redux-actions-reducers plugin watch the `src/reducers/*.js` files and uses s2s-handler-babel-object-rest-spread

```js
const handlerBabelSpread = require('s2s-handler-babel-object-rest-spread').default

module.exports = {
  watch: './**/*.js',
  plugins: [
    {
      test: /src\/reducers\/(?!.*index).*\.js/,
      handler: handlerBabelSpread,
      plugin: ['s2s-redux-actions-reducers']
    },
  ],
  templates: [
    {
      test: /src\/reducers\/.*\.js/, input: 'reducer.js'
    }
  ]
}
```
## Start s2s

Start the s2s with yarn command

`yarn run s2s`

## Usage

#### When create a reducer file

When you create a `src/reducers/*.js`, the below code is inserted automatically.

```js
import { handleActions } from 'redux-actions'
import * as actions from '../actions'

const initialState = {}

export default handleActions(
  {},
  initialState
)
```

#### In:

In the reducer file, type action name with camelcase such as `searchPokemon` and save it.

```js
export default handleActions(
  {searchPokemon},
  initialState
)
```

It will be expanded like this.

#### Out:

```js
export default handleActions(
  {
    [actions.searchPokemon]: (state, action) => ({
      ...state
    })
  },
  initialState
)

```

#### Request/Success/Failure pattern

Type action name containing "Request" with camelcase and save it.

```js
getPokemonRequest
```

It will be expanded like this.

#### Out:

```js
export default handleActions({
  [actions.getPokemonRequest]: (state, action) => ({
    ...state
  }),
  [actions.getPokemonSuccess]: (state, action) => ({
    ...state
  }),
  [actions.getPokemonFailure]: (state, action) => ({
    ...state
  })
}, initialState)
```

### Disable autocomplete
The autocomplete function is activated in default. \
If you want to disable autocomplete, pass a `{autocomplete: false}` parameter.

```js

  plugins: [
    {
      test: /src\/reducers\/(?!.*index).*\.js/,
      handler: handlerBabelSpread,
      plugin: ['s2s-redux-actions-reducers',{autocomplete: false}]
    }
  ]

```

# Test

This plugin has two test files. \
First is babel plugin main test file named `test.js` on root directory. \
Next is a `test/index.js` that will be transformed by the plugin.

Run this command.

` npm run test`

Test will run and you can see what happen.

If you modify the target javascript source code, please change the `test/index.js`.
