import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import * as Components from './components'
import * as Model from './model'
import * as Mousetrap from 'mousetrap'

function reducer(state = new Model.Game(), action) {
  switch (action.type) {
    case 'TICK':
      const revedState = state.tick();
        //setTimeout(() => store.dispatch({type: 'TICK'}), 500);
      return revedState;
    case 'ROTATE':
      return state.rotate();
    case 'LEFT':
      return state.left();
    case 'RIGHT':
      return state.right();
    default: return state;
  }
}

console.log('button clicked');
let store = createStore(reducer)
store.subscribe(() => {
  ReactDOM.render(<Components.GameView game={store.getState()} />, document.getElementById('container'))
})

var counter = 1
setInterval(() => store.dispatch({ type: 'TICK' }), 500)

Mousetrap.bind('space', () => store.dispatch({type:'ROTATE'}))
Mousetrap.bind('left', () => store.dispatch({type:'LEFT'}))
Mousetrap.bind('right', () => store.dispatch({type:'RIGHT'}))
