import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Model from './model'

let count = 0;

// interface GameViewProps {
//   game: Model.Game;
// }

export var GameView = React.createClass({
  render: function () {
    return <div className="border" style={{width: this.props.game.cols*25, height: this.props.game.rows*25}}>
      { this.props.game.isGameOver() ?
        <span>GAME OVER</span> : <span>
        <PieceView piece={this.props.game.fallingPiece} />
        <RubbleView rubble={this.props.game.rubble} />
        <ScoreView score={this.props.game.score} />
        </span>
      }
    </div>
  }
})

// export var GameView = React.createClass({
//   render: function () {
//     return <div onKeyUp={this.handleKeyUp} className="border" style={{width: this.props.game.cols*25, height: this.props.game.rows*25}}>
//       <PieceView piece={this.props.game.fallingPiece} />
//       <RubbleView rubble={this.props.game.rubble} />
//     </div>;
//   },
//   handleKeyUp: function (e) {
//     console.log('key pressed');
//     console.dir(e);
//   }
// });

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

//interface ScoreViewProps { score:number; }
export var ScoreView = React.createClass({
  render: function () {
    return <div className="score-display">{this.props.score}</div>;
  }
})


export var Square = React.createClass({
  render: function() {
    var s = {
      left: (this.props.col-1) * 25 + 'px',
      top: (this.props.row-1) * 25 + 'px'
    }
    return <div className="square" style={s}></div>
   }
  });
