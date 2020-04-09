import { expect } from 'chai';
import 'mocha';
import { Board } from '../src/Board';
import { King } from '../src/King';
import { Knight } from '../src/Knight';
import { Queen } from '../src/Queen';
import { Square } from '../src/Square';

// for to.be.true
/* tslint:disable:no-unused-expression */

describe('Queen canMoveTo function from f3', () => {
  it('can move diagonally but not through another piece', () => {
    Board.clear()
    const blackQ = new Queen("Black", 6, 3); // f3
    const wN = new Knight("White", 2, 7); // b7
    expect(blackQ.canMoveTo(Board.g2)).to.be.true
    expect(blackQ.canMoveTo(Board.h1)).to.be.true
    expect(blackQ.canMoveTo(Board.e4)).to.be.true
    expect(blackQ.canMoveTo(Board.d5)).to.be.true
    expect(blackQ.canMoveTo(Board.c6)).to.be.true
    expect(blackQ.canMoveTo(Board.b7)).to.be.true
    expect(blackQ.canMoveTo(Board.a8)).to.be.false
  })
})

describe('Queen canMoveTo function from g5', () => {
  let whiteQueen: Queen
  before( () => {
    Board.clear()
    whiteQueen = new Queen("White", 7, 5);
    const whiteKing = new King("White", 3, 5);
    const blackKing = new King("Black", 7, 2)
  })
  it('can move vertically but not through another piece', () => {
    expect(whiteQueen.canMoveTo(Board.getSquare(7, 1))).to.be.false
    expect(whiteQueen.canMoveTo(Board.getSquare(7, 2))).to.be.true
    expect(whiteQueen.canMoveTo(Board.getSquare(7, 3))).to.be.true
    expect(whiteQueen.canMoveTo(Board.getSquare(7, 4))).to.be.true
    expect(whiteQueen.canMoveTo(Board.getSquare(7, 6))).to.be.true
    expect(whiteQueen.canMoveTo(Board.getSquare(7, 7))).to.be.true
    expect(whiteQueen.canMoveTo(Board.getSquare(7, 8))).to.be.true
  })
  it('can move horizontally short of friendly', () => {
    expect(whiteQueen.canMoveTo(Board.getSquare(1, 5))).to.be.false
    expect(whiteQueen.canMoveTo(Board.getSquare(2, 5))).to.be.false
    expect(whiteQueen.canMoveTo(Board.getSquare(3, 5))).to.be.false
    expect(whiteQueen.canMoveTo(Board.getSquare(4, 5))).to.be.true
    expect(whiteQueen.canMoveTo(Board.getSquare(5, 5))).to.be.true
    expect(whiteQueen.canMoveTo(Board.getSquare(6, 5))).to.be.true
    expect(whiteQueen.canMoveTo(Board.getSquare(8, 5))).to.be.true
  })
  it('can move diagonally', () => {
    expect(whiteQueen.canMoveTo(Board.getSquare(3, 1))).to.be.true
    expect(whiteQueen.canMoveTo(Board.getSquare(4, 2))).to.be.true
    expect(whiteQueen.canMoveTo(Board.getSquare(5, 3))).to.be.true
    expect(whiteQueen.canMoveTo(Board.getSquare(6, 4))).to.be.true
    expect(whiteQueen.canMoveTo(Board.getSquare(8, 6))).to.be.true
    expect(whiteQueen.canMoveTo(Board.getSquare(4, 8))).to.be.true
    expect(whiteQueen.canMoveTo(Board.getSquare(5, 7))).to.be.true
    expect(whiteQueen.canMoveTo(Board.getSquare(6, 6))).to.be.true
    expect(whiteQueen.canMoveTo(Board.getSquare(8, 4))).to.be.true
  })
  it('cannot move elsewhere', () => {
    expect(whiteQueen.canMoveTo(Board.getSquare(1, 1))).to.be.false
    expect(whiteQueen.canMoveTo(Board.getSquare(1, 7))).to.be.false
    expect(whiteQueen.canMoveTo(Board.getSquare(2, 8))).to.be.false
    expect(whiteQueen.canMoveTo(Board.getSquare(3, 4))).to.be.false
    expect(whiteQueen.canMoveTo(Board.getSquare(4, 7))).to.be.false
    expect(whiteQueen.canMoveTo(Board.getSquare(5, 4))).to.be.false
    expect(whiteQueen.canMoveTo(Board.getSquare(6, 2))).to.be.false
    expect(whiteQueen.canMoveTo(Board.getSquare(8, 1))).to.be.false
  })
})
