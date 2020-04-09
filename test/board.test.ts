import { expect } from 'chai';
import 'mocha';
import { Board } from '../src/Board';
import { King } from '../src/King';
import { Square } from '../src/Square';

const d5: Square = Board.d5
const e2: Square = Board.e2
const a8: Square = Board.a8
const e1: Square = Board.e1
const f1: Square = Board.f1
const e7: Square = Board.e7
const e8: Square = Board.e8
const g1: Square = Board.g1
const g2: Square = Board.g2
const g5: Square = Board.g5
const g6: Square = Board.g6
const h1: Square = Board.h1
const h8: Square = Board.h8
const a1: Square = Board.a1
const b2: Square = Board.b2
const b7: Square = Board.b7
const d1: Square = Board.d1
const g7: Square = Board.g7

describe('algebraic square names are correct', () => {
  it('should be good all along the a8-h1 diagonal', () => {
    expect(a8.getFile()).to.equal(1);
    expect(a8.getRank()).to.equal(8);
    expect(b7.getFile()).to.equal(2);
    expect(b7.getRank()).to.equal(7);
    expect(Board.c6.getFile()).to.equal(3);
    expect(Board.c6.getRank()).to.equal(6);
    expect(Board.d5.getFile()).to.equal(4);
    expect(Board.d5.getRank()).to.equal(5);
    expect(Board.e4.getFile()).to.equal(5);
    expect(Board.e4.getRank()).to.equal(4);
    expect(Board.f3.getFile()).to.equal(6);
    expect(Board.f3.getRank()).to.equal(3);
    expect(Board.g2.getFile()).to.equal(7);
    expect(Board.g2.getRank()).to.equal(2);
    expect(Board.h1.getFile()).to.equal(8);
    expect(Board.h1.getRank()).to.equal(1);

  })
})

describe('cleared Board is empty', () => {
  it('should return undefined', () => {
    Board.clear()
    // Board.logPieces()
    const result = Board.getPiece(d5);
    expect(result).to.equal(undefined);
  });

});

describe('Board getSquare function', () => {
  const result11: Square = Board.getSquare(1, 1)
  it('should return a defined square', () => {
    const result47: Square = Board.getSquare(4, 7);
    expect(result47).to.not.equal(undefined);
  });
  it('should return a different square', () => {
    const result47: Square = Board.getSquare(4, 7);
    const result34 = Board.getSquare(3, 4);
    expect(result34).to.not.equal(undefined);
    expect(result34).to.not.equal(result47);
  })
  it('should equal previous call', () => {
    const result47: Square = Board.getSquare(4, 7);
    const result47b = Board.getSquare(4, 7);
    expect(result47b).to.deep.equal(result47);
  })
  it('should equal Board.getTable()', () => {
    const result = Board.getSquare(4, 9);
    expect(result).to.equal(Board.getTable());
  })
})

describe('Piece getSquare function', () => {
  it('should be on the correct square', () => {
    // console.log("placing two Kings at 51 and 71")
    const btWK: King = new King("White", 5, 1);
    const btBK: King = new King("Black", 7, 1);
    // Board.logPieces()
    const result = btBK.getSquare()
    // console.log("btBK is at " + result.toString())
    expect(result).to.equal(g1)
    const result2 = btWK.getSquare()
    // console.log("btWK is at " + result2.toString())
    expect(result2).to.equal(e1)
  })
  
})

describe('Board getPiece function', () => {
  it('should find the white king on square51', () => {
    const btWK: King = new King("White", 5, 1);
    const result = Board.getPiece(e1);
    expect(result).to.deep.equal(btWK);
  })
})

describe('Board now has two Kings on it', () => {
  it('should have them on the map of pieces', () => {
    const btWK: King = new King("White", 5, 1);
    const btBK: King = new King("Black", 7, 1);
    // Board.logPieces()
  })
})

describe('horizontal path is clear between Kings', () => {
  before( () => {
    // Board.clear()
    const btWK: King = new King("White", 5, 1);
    const btBK: King = new King("Black", 7, 1);
  })
  it('horizontal right should return true', () => {
    const result = Board.pathIsClear(e1, g1);
    expect(result).to.equal(true);
  })
  it('horizontal right should return false', () => {
    const r2 = Board.pathIsClear(e1, h1);
    expect(r2).to.equal(false);
  })
  it('horizontal left should return true', () => {
    const result = Board.pathIsClear(g1, e1);
    expect(result).to.equal(true);
  })
  it('horizontal left should return false', () => {
    const r2 = Board.pathIsClear(g1, d1);
    expect(r2).to.equal(false);
  })
})

describe('vertical path is clear between Kings', () => {
  before( () => {
    // Board.clear()
    const btWK: King = new King("White", 7, 6);
    const btBK: King = new King("Black", 7, 2);

  })
  it('move up should return false', () => {
    const result = Board.pathIsClear(g2, g7);
    expect(result).to.equal(false)
  })
  it('move up should return true', () => {
    const result = Board.pathIsClear(g2, g6);
    expect(result).to.equal(true)
  })
  it('move down should return false', () => {
    const result = Board.pathIsClear(g6, g1);
    expect(result).to.equal(false)
  })
  it('move down should return true', () => {
    const result = Board.pathIsClear(g6, g2);
    expect(result).to.equal(true)
  })
})

describe('diagonal path is clear between Kings', () => {
  before( () => {
    console.log("board.test before diagonal path is clear between kings")
    // Board.clear()
    const btWK3 = new King("White", 7, 7)
    const btBK3 = new King("Black", 2, 2)
    const btWK4 = new King("White", 7, 2)
    const btBK4 = new King("Black", 2, 7)
    // Board.logPieces()
  })
  it('should return false moving left and down ', () => {
    const result = Board.pathIsClear(g7, a1);
    expect(result).to.equal(false)
  })
  it('should return true moving left and down ', () => {
    const result = Board.pathIsClear(g7, b2);
    expect(result).to.equal(true)
  })
  it('should return false moving right and up', () => {
    const result = Board.pathIsClear(b2, h8)
    expect(result).to.equal(false)
  })
  it('should return true moving right and up', () => {
    const result = Board.pathIsClear(b2, g7)
    expect(result).to.equal(true)
  })
  it('should return false moving left and up from g2 to a8', () => {
    const result = Board.pathIsClear(g2, a8);
    expect(result).to.equal(false)
  })
  it('should return true moving left and up from g2 to b7', () => {
    const result = Board.pathIsClear(g2, b7);
    expect(result).to.equal(true)
  })
  it('should return false moving right and down', () => {
    const result = Board.pathIsClear(b7, h1)
    expect(result).to.equal(false)
  })
  it('should return true moving right and down', () => {
    const result = Board.pathIsClear(b7, g2)
    expect(result).to.equal(true)
  })
  after( () => {
    console.log("board.test after diagonal path is clear between kings")
  })
})
