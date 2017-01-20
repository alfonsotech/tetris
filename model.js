//Draws one square; adds func to re-draw square in new shape, drop one row, or keep in the same position
export class Point {
  constructor(row,col) {
    this.row = row
    this.col = col
  }
  add(otherPoint) {
    return new Point(this.row -1 + otherPoint.row, this.col - 1 + otherPoint.col)
  }
  // fallOne() {
  //   return new Point(this.row +1, this.col)
  // }
  sameAs(p2) {
    return this.row === p2.row && this.col === p2.col
  }
}

//Draws/Re-draws shape in specific position
export class Tetromino {
  constructor(name, rotator){
    this.name = name
    this.rotator = rotator
  }
  // at(point){
  //   return new Piece(this, point)
  // }
  pointsRotated(rotation){
    return this.rotator(rotation)
  }
}

//Throws tetronimos onto gameboard in initial offset location
// export class Piece {
//   constructor(shape, offset = new Point(1, 20)) {
//     this.shape = shape
//     this.offset = offset
//     this.rotation = 'N'
//   }
export class Piece {
   constructor(shape, rows, cols, offset = new Point(1,20)) {
     this.shape = shape
     this.rows = rows
     this.cols = cols
     this.offset = offset
     this.rotation = 'N'
   }
  points() {
  //   return this.shape.pointsRotated(this.rotation).map((point, ix) => point.add(this.offset))
  // }
  return this.shape.pointsRotated(this.rotation).map(point => point.add(this.offset))
   }
  maxRow() {
    return Math.max.apply(null, this.points().map(point => point.row))
  }
  maxCol() {
    return Math.max.apply(null, this.points().map(point => point.col))
  }
  minCol() {
     return Math.min.apply(null, this.points().map(point => point.col))
   }
   rotate() {
      this.rotation = Piece.rotations()[(Piece.rotations().indexOf(this.rotation)+1) % 4]
    }
    unRotate() {
      this.rotation = Piece.rotations()[(Piece.rotations().indexOf(this.rotation)-1) % 4]
    }
    hasPoint(point) {
      return this.points().some(item => item.sameAs(point))
    }
    fallOne() {
      this.offset = new Point(this.offset.row+1, this.offset.col)
    }
    liftOne() {
      this.offset = new Point(this.offset.row-1, this.offset.col)
    }
    left() {
      this.offset = new Point(this.offset.row, this.offset.col-1)
    }
    right() {
      this.offset = new Point(this.offset.row, this.offset.col+1)
    }
    static rotations() {
      return ['N','E','S','W']
    }
}

export class Game {
 constructor() {
   this.startAPiece()
   this.rows = 15
   this.cols = 20
   this.rubble = []
  }
  tick() {
    this.transactionDo(()=>this.fallingPiece.fallOne(), ()=> this.fallingPiece.liftOne())
     if (this.fallingPiece.maxRow() == this.rows) {
       this.convertToRubble()
       return this
     }
   var nextPos = this.fallingPiece.points().map(p => new Point(p.row+1,p.col))
   if (nextPos.some(p => this.rubble.some(r => r.sameAs(p)))) {
     this.convertToRubble()
   }
   return this
  }
  convertToRubble() {
   this.rubble = this.rubble.concat(this.fallingPiece.points())
   this.startAPiece()
 }
 startAPiece() {
   this.fallingPiece = new Piece(shapes.selectRandom(), this.rows, this.cols);
 }
 rotate() {
   this.transactionDo(
     () => this.fallingPiece.rotate(),
     () => this.fallingPiece.unRotate())
     return this
 }
 // unRotate() {
 //   this.rotation = Piece.rotations()[(Piece.rotations.indexOf(this.rotation)-1) % 4]
 // }
 left() {
   this.transactionDo(
     () => this.fallingPiece.left(),
     () => this.fallingPiece.right())
     return this
 }
 right() {
   this.transactionDo(
     () => this.fallingPiece.right(),
     () => this.fallingPiece.left())
     return this
 }
 transactionDo(thing, compensation) {
   thing()
   if(this.fallingPieceIsOutOfBounds() || this.fallingPieceOverLapsRubble()) {
     compensation()
   }
 }
 fallingPieceIsOutOfBounds() {
   return this.fallingPiece.minCol() < 1 ||
   this.fallingPiece.maxCol() > this.cols ||
   this.fallingPiece.maxRow() > this.rows
 }
 fallingPieceOverLapsRubble() {
   return this.fallingPiece.points().some(p => this.rubble.some(r => r.sameAs(p)))
 }
}

export var shapes = {
 'O': new Tetromino('O', rotation => [new Point(1,1),new Point(1,2), new Point(2,1),new Point(2,2)]),
 'I': new Tetromino('I', rotation => {
   switch (rotation) {
     case 'N': return [new Point(1,1), new Point(2,1),new Point(3,1), new Point(4,1)]
     case 'E': return [new Point(2,1), new Point(2,2),new Point(2,3), new Point(2,4)]
     case 'S': return [new Point(1,1), new Point(2,1),new Point(3,1), new Point(4,1)]
     case 'W': return [new Point(2,1), new Point(2,2),new Point(2,3), new Point(2,4)]
      }
    }),
  'T': new Tetromino('T', rotation => {
    switch (rotation) {
      case 'N': return [new Point(1,1), new Point(1,2), new Point(2,2), new Point(1,3)]
      case 'E': return [new Point(1,2), new Point(2,2),new Point(3,2), new Point(2,1)]
      case 'S': return [new Point(1,2), new Point(2,1),new Point(2,2), new Point(2,3)]
      case 'W': return [new Point(1,1), new Point(2,1),new Point(3,1), new Point(2,2)]
     }
   }),
 'L': new Tetromino('L', rotation => {
   switch (rotation) {
     case 'N': return [new Point(1,1), new Point(2,1), new Point(1,2), new Point(1,3)]
     case 'E': return [new Point(1,1), new Point(1,2), new Point(2,2), new Point(3,2)]
     case 'S': return [new Point(1,3), new Point(2,1), new Point(2,2), new Point(2,3)]
     case 'W': return [new Point(1,1), new Point(2,1), new Point(3,1), new Point(3,2)]
    }
  }),
 'Z': new Tetromino('Z', rotation => {
   switch (rotation) {
     case 'N': return [new Point(1,1), new Point(1,2), new Point(2,2), new Point(2,3)]
     case 'E': return [new Point(1,2), new Point(2,2),new Point(2,1), new Point(3,1)]
     case 'S': return [new Point(1,1), new Point(1,2), new Point(2,2), new Point(2,3)]
     case 'W': return [new Point(1,2), new Point(2,2),new Point(2,1), new Point(3,1)]
   }
 })
}

shapes.selectRandom = function() {
    var index = Math.floor(Math.random()*2000000%5)
    return shapes[Object.keys(shapes)[index]]
 }

// export class Sqr {
//   constructor(row, col) {
//     this.row = row
//     this.col = col
//   }
// }
//
// export class O {
//   constructor(row, col) {
//     this.row = row
//     this.col = col
//   }
//   squares() {
//     return [new Sqr(this.row, this.col), new Sqr(this.row, this.col + 1), new Sqr(this.row + 1, this.col), new Sqr(this.row + 1, this.col + 1)];
//   }
// }
//
// export class L {
//   constructor(row, col) {
//     this.row = row
//     this.col = col
//   }
//   squares() {
//     return [new Sqr(this.row, this.col), new Sqr(this.row + 1, this.col), new Sqr(this.row + 2, this.col), new Sqr(this.row + 2, this.col + 1)];
//   }
// }
