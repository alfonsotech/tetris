import * as React from 'react'
import * as ReactDOM from 'react-dom'

// export class ShapeView extends React.Component {
//   render() {
//     return
//   }
// }
let count = 0;

// export var ShapeView = React.createClass({
//  render: function() {
//    return <div>
//      {this.props.shape.squares().map(sq => <Square row={sq.row} col={sq.col} />)}
//    </div>;
//  }
// });
export var GameView = React.createClass({
  render: function () {
    return <div onKeyUp={this.handleKeyUp} className="border" style={{width: this.props.game.cols*20, height: this.props.game.rows*20}}>
      <PieceView piece={this.props.game.fallingPiece} />
      <RubbleView rubble={this.props.game.rubble} />
    </div>;
  },
  handleKeyUp: function (e) {
    console.log('key pressed');
    console.dir(e);
  }
});

export var PieceView = React.createClass({
  render: function () {
    return <div>
      {this.props.piece.points().map(sq => <Square key={count++} row={sq.row} col={sq.col} />)}
    </div>;
  }
});

export var RubbleView = React.createClass({
  render: function () {
    return <span>
      {this.props.rubble.map(sq => <Square key={"row"+sq.row+"col"+sq.col} row={sq.row} col={sq.col} />)}
    </span>;
  }
});

export var Square = React.createClass({
  render: function() {
    var s = {
      left: (this.props.col-1) * 20 + 'px',
      top: (this.props.row-1) * 20 + 'px'
    }
    return <div className="square" style={s}></div>
   }
  });

 //  export var LShape = React.createClass({
 //  	render: function () {
 //    	return <div>
 //        <Square row={this.props.row} col={this.props.col} />
 //   		  <Square row={this.props.row+1} col={this.props.col} />
 //        <Square row={this.props.row+2} col={this.props.col} />
 //   	    <Square row={this.props.row+3} col={this.props.col} />
 //     </div>;
 //   }
 // });
 //
 // export var SShape = React.createClass({
 // 	render: function () {
 //   	return <div>
 //     	<Square row={this.props.row} col={this.props.col+1} />
 //   		<Square row={this.props.row} col={this.props.col+2} />
 //       <Square row={this.props.row+1} col={this.props.col} />
 //   		<Square row={this.props.row+1} col={this.props.col+1} />
 //     </div>;
 //   }
 // });
