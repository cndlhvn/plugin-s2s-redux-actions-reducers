import { handleActions } from 'redux-actions'
import * as actions from '../actions'

const initialState = {}

export default handleActions({
   [actions.getPokemonRequest]: (state, action) => ({}),
   getPokemonSuccess
  },
  initialState
)
