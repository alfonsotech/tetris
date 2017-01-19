//Draws one square; adds func to re-draw square in new shape, drop one row, or keep in the same position
export class Point {
  constructor(row,col) {
    this.row = row;
    this.col = col;
  }
  add(otherPoint) {
    return new Point(this.row -1 + otherPoint.row, this.col - 1 + otherPoint.col);
  }
  fallOne() {
    return new Point(this.row +1, this.col);
  }
  sameAs(p2) {
    return this.row === p2.row && this.col === p2.col;
  }
}

//Draws/Re-draws shape in specific position
export class Shape {
  constructor(name, rotator){
    this.name = name
    this.rotator = rotator
  }
  at(point){
    return new Piece(this, point)
  }
  pointsRotated(rotation){
    return this.rotator(rotation)
  }
}

//Throws tetronimos onto gameboard in initial offset location
export class Piece {
  constructor(shape, offset = new Point(1, 10)) {
    this.shape = shape;
    this.offset = offset;
    this.rotation = 'N';
  }
  points() {
    return this.shape.pointsRotated(this.rotation).map((point, ix) => point.add(this.offset));
  }
  maxRow() {
    return Math.max.apply(null, this.points().map(point => point.row));
  }
  maxCol() {
    return Math.max.apply(null, this.points().map(point => point.col));
  }
  rotate() {
    const rotations = Piece.rotations();
    this.rotation = rotations[(rotations.indexOf(this.rotation) + 1) % 4];
  }
  hasPoint(point) {
    return this.points().some(item => item.sameAs(point));
  }
  static rotations() {
    return ['N', 'E', 'S', 'W'];
  }
}

export class Game {
 constructor() {
   this.startAPiece();
   this.rows = 15;
   this.cols = 20;
   this.rubble = [];
  }
  tick() {
    this.fallingPiece.offset = this.fallingPiece.offset.fallOne();
    if (this.fallingPiece.maxRow() >= this.rows) {
      this.convertToRubble();
    }
    return this;
  }
  convertToRubble() {
   this.rubble = this.rubble.concat(this.fallingPiece.points());
   this.startAPiece();
 }
 startAPiece() {
   this.fallingPiece = new Piece(shapes.selectRandom());
 }
 rotate() {
   this.fallingPiece.rotate();
   return this;
 }
}

export var shapes = {
 'O': new Shape('O', rotation => [new Point(1,1),new Point(1,2), new Point(2,1),new Point(2,2)]),
 'I': new Shape('I', rotation => {
   switch (rotation) {
     case 'N': return [new Point(1,1), new Point(2,1),new Point(3,1), new Point(4,1)];
     case 'E': return [new Point(2,1), new Point(2,2),new Point(2,3), new Point(2,4)];
     case 'S': return [new Point(1,1), new Point(2,1),new Point(3,1), new Point(4,1)];
     case 'W': return [new Point(2,1), new Point(2,2),new Point(2,3), new Point(2,4)];
      }
    }),
  'T': new Shape('T', rotation => {
    switch (rotation) {
      case 'N': return [new Point(1,1), new Point(1,2), new Point(2,2), new Point(1,3)];
      case 'E': return [new Point(1,2), new Point(2,2),new Point(3,2), new Point(2,1)];
      case 'S': return [new Point(1,2), new Point(2,1),new Point(2,2), new Point(2,3)];
      case 'W': return [new Point(1,1), new Point(2,1),new Point(3,1), new Point(2,2)];
     }
   }),
 'L': new Shape('L', rotation => {
   switch (rotation) {
     case 'N': return [new Point(1,1), new Point(2,1), new Point(1,2), new Point(1,3)];
     case 'E': return [new Point(1,1), new Point(1,2), new Point(2,2), new Point(3,2)];
     case 'S': return [new Point(1,3), new Point(2,1), new Point(2,2), new Point(2,3)];
     case 'W': return [new Point(1,1), new Point(2,1), new Point(3,1), new Point(3,2)];
    }
  }),
 'Z': new Shape('Z', rotation => {
   switch (rotation) {
     case 'N': return [new Point(1,1), new Point(1,2), new Point(2,2), new Point(2,3)];
     case 'E': return [new Point(1,2), new Point(2,2),new Point(2,1), new Point(3,1)];
     case 'S': return [new Point(1,1), new Point(1,2), new Point(2,2), new Point(2,3)];
     case 'W': return [new Point(1,2), new Point(2,2),new Point(2,1), new Point(3,1)];
   }
 })
};

shapes.selectRandom = function() {
    var index = Math.floor(Math.random()*1000000%5);
    console.log('random index = ' + index);
    return shapes[Object.keys(shapes)[index]];
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
