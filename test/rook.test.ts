import { expect } from 'chai';
import 'mocha';
import { Board } from '../src/Board';
import { King } from '../src/King';
import { Rook } from '../src/Rook';
import { Square } from '../src/Square';

// for to.be.true
/* tslint:disable:no-unused-expression */

describe('Rook canMoveTo function', () => {
  let whiteRook: Rook
  before( () => {
    Board.clear()
    whiteRook = new Rook("White", 7, 5);
    const whiteKing = new King("White", 3, 5);
    const blackKing = new King("Black", 7, 2)
  })
  it('can move vertically but not through another piece', () => {
    expect(whiteRook.canMoveTo(Board.g1)).to.be.false
    expect(whiteRook.canMoveTo(Board.g2)).to.be.true
    expect(whiteRook.canMoveTo(Board.g3)).to.be.true
    expect(whiteRook.canMoveTo(Board.g4)).to.be.true
    expect(whiteRook.canMoveTo(Board.g6)).to.be.true
    expect(whiteRook.canMoveTo(Board.g7)).to.be.true
    expect(whiteRook.canMoveTo(Board.g8)).to.be.true
    
    expect(whiteRook.canCheck(Board.g1)).to.be.false
    expect(whiteRook.canCheck(Board.g2)).to.be.true
    expect(whiteRook.canCheck(Board.g3)).to.be.true
    expect(whiteRook.canCheck(Board.g4)).to.be.true
    expect(whiteRook.canCheck(Board.g6)).to.be.true
    expect(whiteRook.canCheck(Board.g7)).to.be.true
    expect(whiteRook.canCheck(Board.g8)).to.be.true
  })
  it('can move horizontally short of friendly', () => {
    expect(whiteRook.canMoveTo(Board.a5)).to.be.false
    expect(whiteRook.canMoveTo(Board.b5)).to.be.false
    expect(whiteRook.canMoveTo(Board.c5)).to.be.false 
    expect(whiteRook.canMoveTo(Board.d5)).to.be.true
    expect(whiteRook.canMoveTo(Board.e5)).to.be.true
    expect(whiteRook.canMoveTo(Board.f5)).to.be.true
    expect(whiteRook.canMoveTo(Board.h5)).to.be.true
    
    expect(whiteRook.canCheck(Board.a5)).to.be.false
    expect(whiteRook.canCheck(Board.b5)).to.be.false
    expect(whiteRook.canCheck(Board.c5)).to.be.true // occupied by friendly? irrelevant
    expect(whiteRook.canCheck(Board.d5)).to.be.true
    expect(whiteRook.canCheck(Board.e5)).to.be.true
    expect(whiteRook.canCheck(Board.f5)).to.be.true
    expect(whiteRook.canCheck(Board.h5)).to.be.true
  })
  it('cannot move diagonally', () => {
    expect(whiteRook.canMoveTo(Board.getSquare(3, 1))).to.be.false
    expect(whiteRook.canMoveTo(Board.getSquare(4, 2))).to.be.false
    expect(whiteRook.canMoveTo(Board.getSquare(5, 3))).to.be.false
    expect(whiteRook.canMoveTo(Board.getSquare(6, 4))).to.be.false
    expect(whiteRook.canMoveTo(Board.getSquare(8, 6))).to.be.false
    expect(whiteRook.canMoveTo(Board.getSquare(4, 8))).to.be.false
    expect(whiteRook.canMoveTo(Board.getSquare(5, 7))).to.be.false
    expect(whiteRook.canMoveTo(Board.getSquare(6, 6))).to.be.false
    expect(whiteRook.canMoveTo(Board.getSquare(8, 4))).to.be.false
  })
  it('cannot move elsewhere', () => {
    expect(whiteRook.canMoveTo(Board.getSquare(1, 1))).to.be.false
    expect(whiteRook.canMoveTo(Board.getSquare(1, 7))).to.be.false
    expect(whiteRook.canMoveTo(Board.getSquare(2, 8))).to.be.false
    expect(whiteRook.canMoveTo(Board.getSquare(3, 4))).to.be.false
    expect(whiteRook.canMoveTo(Board.getSquare(4, 7))).to.be.false
    expect(whiteRook.canMoveTo(Board.getSquare(5, 4))).to.be.false
    expect(whiteRook.canMoveTo(Board.getSquare(6, 2))).to.be.false
    expect(whiteRook.canMoveTo(Board.getSquare(8, 1))).to.be.false
  })
})
