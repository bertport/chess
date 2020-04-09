import { expect } from 'chai';
import 'mocha';
import { Bishop } from '../src/Bishop'
import { Board } from '../src/Board';
import { Knight } from '../src/Knight';
import { Queen } from '../src/Queen';
import { Square } from '../src/Square';

// for to.be.true
/* tslint:disable:no-unused-expression */

describe('Knight canMoveTo function', () => {
  let whiteKnight: Knight
  before( () => {
    Board.clear()
    whiteKnight = new Knight("White", 7, 5);
    const whiteBishop = new Bishop("White", 7, 6) // next square, does not matter
    const blackBishop = new Bishop("Black", 6, 5) // next square, does not matter
    const whiteQueen = new Queen("White", 5, 6) // friend on target square, blocks it
    const blackQueen = new Queen("Black", 5, 4) // enemy on target square, does not block, tasty treat
  })
  it('can move in a knightly fashion', () => {
    expect(whiteKnight.canMoveTo(Board.h7)).to.be.true
    expect(whiteKnight.canMoveTo(Board.h6)).to.be.false // too close
    expect(whiteKnight.canMoveTo(Board.h5)).to.be.false // too close
    expect(whiteKnight.canMoveTo(Board.h4)).to.be.false // too close
    expect(whiteKnight.canMoveTo(Board.h3)).to.be.true
    expect(whiteKnight.canMoveTo(Board.h2)).to.be.false // too far
    expect(whiteKnight.canMoveTo(Board.g7)).to.be.false // straight line
    expect(whiteKnight.canMoveTo(Board.g6)).to.be.false // straight line
    expect(whiteKnight.canMoveTo(Board.g5)).to.be.false // not moving at all
    expect(whiteKnight.canMoveTo(Board.g4)).to.be.false // straight line
    expect(whiteKnight.canMoveTo(Board.g3)).to.be.false // straight line
    expect(whiteKnight.canMoveTo(Board.g2)).to.be.false // straight line
    expect(whiteKnight.canMoveTo(Board.f7)).to.be.true
    expect(whiteKnight.canMoveTo(Board.f6)).to.be.false // diagonal
    expect(whiteKnight.canMoveTo(Board.f5)).to.be.false // too close
    expect(whiteKnight.canMoveTo(Board.f4)).to.be.false // diagonal
    expect(whiteKnight.canMoveTo(Board.f3)).to.be.true
    expect(whiteKnight.canMoveTo(Board.f2)).to.be.false // too far
    expect(whiteKnight.canMoveTo(Board.e7)).to.be.false // too far
    expect(whiteKnight.canMoveTo(Board.e6)).to.be.false // blocked by friend
    expect(whiteKnight.canMoveTo(Board.e5)).to.be.false // straight line
    expect(whiteKnight.canMoveTo(Board.e4)).to.be.true // tasty treat
    expect(whiteKnight.canMoveTo(Board.e3)).to.be.false // too far
    expect(whiteKnight.canMoveTo(Board.e2)).to.be.false // too far
    
    expect(whiteKnight.canCheck(Board.h7)).to.be.true
    expect(whiteKnight.canCheck(Board.h6)).to.be.false // too close
    expect(whiteKnight.canCheck(Board.h5)).to.be.false // too close
    expect(whiteKnight.canCheck(Board.h4)).to.be.false // too close
    expect(whiteKnight.canCheck(Board.h3)).to.be.true
    expect(whiteKnight.canCheck(Board.h2)).to.be.false // too far
    expect(whiteKnight.canCheck(Board.g7)).to.be.false // straight line
    expect(whiteKnight.canCheck(Board.g6)).to.be.false // straight line
    expect(whiteKnight.canCheck(Board.g5)).to.be.false // not moving at all
    expect(whiteKnight.canCheck(Board.g4)).to.be.false // straight line
    expect(whiteKnight.canCheck(Board.g3)).to.be.false // straight line
    expect(whiteKnight.canCheck(Board.g2)).to.be.false // straight line
    expect(whiteKnight.canCheck(Board.f7)).to.be.true
    expect(whiteKnight.canCheck(Board.f6)).to.be.false // diagonal
    expect(whiteKnight.canCheck(Board.f5)).to.be.false // too close
    expect(whiteKnight.canCheck(Board.f4)).to.be.false // diagonal
    expect(whiteKnight.canCheck(Board.f3)).to.be.true
    expect(whiteKnight.canCheck(Board.f2)).to.be.false // too far
    expect(whiteKnight.canCheck(Board.e7)).to.be.false // too far
    expect(whiteKnight.canCheck(Board.e6)).to.be.true // blocked by friend? irrelevant
    expect(whiteKnight.canCheck(Board.e5)).to.be.false // straight line
    expect(whiteKnight.canCheck(Board.e4)).to.be.true // tasty treat
    expect(whiteKnight.canCheck(Board.e3)).to.be.false // too far
    expect(whiteKnight.canCheck(Board.e2)).to.be.false // too far
  })
  it('cannot move elsewhere', () => {
    expect(whiteKnight.canMoveTo(Board.getSquare(1, 1))).to.be.false
    expect(whiteKnight.canMoveTo(Board.getSquare(1, 7))).to.be.false
    expect(whiteKnight.canMoveTo(Board.getSquare(2, 8))).to.be.false
    expect(whiteKnight.canMoveTo(Board.getSquare(3, 5))).to.be.false
    expect(whiteKnight.canMoveTo(Board.getSquare(4, 7))).to.be.false
    expect(whiteKnight.canMoveTo(Board.getSquare(7, 8))).to.be.false
    expect(whiteKnight.canMoveTo(Board.getSquare(8, 1))).to.be.false
  })
})
