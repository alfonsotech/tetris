import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import * as Components from './components'
import * as Model from './model'
import * as Mousetrap from 'mousetrap'
// var Components = require('./components');
// var Model = require('./model');

// let data = [new Model.O(1,1), new Model.L(1,4)]

// function reducer(state = [new Model.O(1,1), new Model.L(1,4)], action) {
//   switch(action.type) {
//     case 'TICK':
//       state.push(new Model.O(action.data * 2, action.data * 2));
//       return state;
//     default: return state;
//   }
//   return [new Model.O(1,1), new Model.L(1,4)];
// }
function reducer(state = new Model.Game(), action) {
  switch (action.type) {
    case 'TICK':
      return state.tick();
    case 'ROTATE':
      return state.rotate();
    default: return state;
  }
}

// let store = createStore(reducer)
// store.subscribe(() => {
//   console.dir(store.getState());
//   ReactDOM.render(
//     <div>
//       {/* TODO: check spacing here before Components; is Babel compiling our ES6 here? */}
//       {store.getState().map(c => <Components.ShapeView shape={c} />) }
//     </div>, document.getElementById('container')
//   )
// })
//
// let counter = 1
// setInterval(() => store.dispatch({type: 'TICK', data: counter++ }), 1000)
let store = createStore(reducer);
store.subscribe(() => {
  ReactDOM.render(<Components.GameView game={store.getState()} />, document.getElementById('container'));
});
var counter = 1;
setInterval(() => store.dispatch({ type: 'TICK' }),500);

Mousetrap.bind('space', function() { store.dispatch({type:'ROTATE'}); });


// //Tetronimo constructors
// const Square = React.createClass({
//     render: () => {
//     		var s = {
//         	left: (this.props.col-1) * 25 + 'px',
//           top: (this.props.row-1) * 25 + 'px'
//         }
//         return <div className="square" style={s}></div>
//     }
// })
//
// const OShape = React.createClass({
// 	render: () => {
//   	return <div>
//     	<Square row={this.props.row} col={this.props.col} />
//   bb		<Square row={this.props.row} col={this.props.col+1} />
//       <Square row={this.props.row+1} col={this.props.col} />
//   		<Square row={this.props.row+1} col={this.props.col+1} />
//     </div>
//   }
// })
//
// const LShape = React.createClass({
// 	render: () => {
//   	return <div>
//     	<Square row={this.props.row} col={this.props.col} />
//   		<Square row={this.props.row+1} col={this.props.col} />
//       <Square row={this.props.row+2} col={this.props.col} />
//   		<Square row={this.props.row+3} col={this.props.col} />
//     </div>
//   }
// });
//
// // var SShape = React.createClass({
// // 	render: () => {
// //   	return <div>
// //     	<Square row={this.props.row} col={this.props.col+1} />
// //   		<Square row={this.props.row} col={this.props.col+2} />
// //       <Square row={this.props.row+1} col={this.props.col} />
// //   		<Square row={this.props.row+1} col={this.props.col+1} />
// //     </div>
// //   }
// // })
// //
// // var IShape = React.createClass({
// // 	render: () => {
// //     return <div>
// //       <Square row={this.props.row} col={this.props.col} />
// //       <Square row={this.props.row} col={this.props.col+1} />
// //       <Square row={this.props.row} col={this.props.col+2} />
// //       <Square row={this.props.row} col={this.props.col+3} />
// //     </div>
// //   }
// // })
// //
// // var TShape = React.createClass({
// //   	render: () => {
// //     return <div>
// //       <Square row={this.props.row} col={this.props.col} />
// //       <Square row={this.props.row} col={this.props.col+1} />
// //       <Square row={this.props.row+1} col={this.props.col+2} />
// //       <Square row={this.props.row+1} col={this.props.col+1} />
// //     </div>
// //   }
// // })

// ReactDOM.render(
//   <div>
//   	{data.map(c => <Components.ShapeView shape={c} />)}
//
//   </div>,
//     document.getElementById('container')
// );
