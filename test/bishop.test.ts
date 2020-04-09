import { expect } from 'chai';
import 'mocha';
import { Bishop } from '../src/Bishop'
import { Board } from '../src/Board';
import { King } from '../src/King';
import { Queen } from '../src/Queen';
import { Square } from '../src/Square';

// for to.be.true
/* tslint:disable:no-unused-expression */

describe('Bishop canMoveTo function', () => {
  let whiteBishop: Bishop
  before( () => {
    Board.clear()
    whiteBishop = new Bishop("White", 7, 5); // g5
    const whiteKing = new King("White", 5, 3);
    const blackKing = new King("Black", 5, 7)
  })
  it('can move diagonally', () => {
    expect(whiteBishop.canMoveTo(Board.c1)).to.be.false // behind occupied square
    expect(whiteBishop.canCheck(Board.c1)).to.be.false 
    expect(whiteBishop.canMoveTo(Board.d2)).to.be.false // behind occupied square
    expect(whiteBishop.canCheck(Board.d2)).to.be.false
    expect(whiteBishop.canMoveTo(Board.e3)).to.be.false // occupied by friend
    expect(whiteBishop.canCheck(Board.e3)).to.be.true // canCheck assumes an enemy King on target square
    expect(whiteBishop.canMoveTo(Board.f4)).to.be.true
    expect(whiteBishop.canCheck(Board.f4)).to.be.true
    expect(whiteBishop.canMoveTo(Board.h6)).to.be.true
    expect(whiteBishop.canCheck(Board.h6)).to.be.true
    expect(whiteBishop.canMoveTo(Board.d8)).to.be.false // behind occupied square
    expect(whiteBishop.canCheck(Board.d8)).to.be.false
    expect(whiteBishop.canMoveTo(Board.e7)).to.be.true // occupied by enemy
    expect(whiteBishop.canCheck(Board.e7)).to.be.true
    expect(whiteBishop.canMoveTo(Board.f6)).to.be.true
    expect(whiteBishop.canCheck(Board.f6)).to.be.true
    expect(whiteBishop.canMoveTo(Board.h4)).to.be.true
    expect(whiteBishop.canCheck(Board.h4)).to.be.true
  })
  it('cannot move elsewhere', () => {
    expect(whiteBishop.canMoveTo(Board.a1)).to.be.false
    expect(whiteBishop.canMoveTo(Board.a7)).to.be.false
    expect(whiteBishop.canMoveTo(Board.b8)).to.be.false
    expect(whiteBishop.canMoveTo(Board.c5)).to.be.false
    expect(whiteBishop.canMoveTo(Board.d7)).to.be.false
    expect(whiteBishop.canMoveTo(Board.e4)).to.be.false
    expect(whiteBishop.canMoveTo(Board.g2)).to.be.false
    expect(whiteBishop.canMoveTo(Board.h1)).to.be.false
    expect(whiteBishop.canCheck(Board.a1)).to.be.false
    expect(whiteBishop.canCheck(Board.a7)).to.be.false
    expect(whiteBishop.canCheck(Board.b8)).to.be.false
    expect(whiteBishop.canCheck(Board.c5)).to.be.false
    expect(whiteBishop.canCheck(Board.d7)).to.be.false
    expect(whiteBishop.canCheck(Board.e4)).to.be.false
    expect(whiteBishop.canCheck(Board.g2)).to.be.false
    expect(whiteBishop.canCheck(Board.h1)).to.be.false
  })
})
