import { expect } from 'chai';
import 'mocha';
import { Bishop } from '../src/Bishop';
import { Board } from '../src/Board';
import { King } from '../src/King';
import { Knight } from '../src/Knight';
import { Pawn } from '../src/Pawn';
import { Queen } from '../src/Queen';
import { Square } from '../src/Square';

// for to.be.true
/* tslint:disable:no-unused-expression */

describe('Pawn canMoveTo function', () => {
  let whitePawn: Pawn
  let whitePawn6: Pawn
  let whitePawn4: Pawn
  let whitePawn5: Pawn
  let whitePawn35: Pawn
  let blackP46: Pawn
  let blackP17: Pawn
  let blackP37: Pawn
  let blackP77: Pawn
  let blackP87: Pawn
  let blackP56: Pawn
  let whitePawn1: Pawn
  before( () => {
    Board.clear()
    whitePawn = new Pawn("White", 2, 2); // no obstacles or enemies in range
    whitePawn6 = new Pawn("White", 6, 2) // capturable enemy
    whitePawn4 = new Pawn("White", 4, 2) // test advance vertically to/through friend one square away
    whitePawn5 = new Pawn("White", 5, 2) // test advance vertically to/through enemy one square away
    const whiteKing = new King("White", 4, 3); // test advance vertically to/through friend one square away
    const blackKing = new King("Black", 7, 3) // capturable enemy
    const blackQ = new Queen("Black", 5, 3) // test advance vertically to/through enemy one square away
    whitePawn35 = new Pawn("White", 3, 5) // not at initial position
    blackP46 = new Pawn("Black", 4, 6) // diagonal with 35, mutual capture opportunity
    blackP17 = new Pawn("Black", 1, 7) // no obstacles or enemies in range
    blackP77 = new Pawn("Black", 7, 7) // has enemy to capture at 86
    const whiteB86 = new Bishop("White", 8, 6) // the enemy for blackP77 to capture
    blackP37 = new Pawn("Black", 3, 7) // obstacles are friendly on diagonal 46 and enemy on vertical 35
    blackP87 = new Pawn("Black", 8, 7) // obstacle immediately in front enemy
    const blackN45 = new Knight("Black", 4, 5) //obstacle immediately in front of 46 friend
    blackP56 = new Pawn("Black", 5, 6) // not on initial rank, no obstacles in file, friendly on diagonal 
    whitePawn1 = new Pawn("White", 1, 2); // two square advance with obstacle on target square
    const blackN14 = new Knight("Black", 1, 4); // enemy piece on target square
    // Board.logPieces()
  })
  // white pawn on second rank ////////////////////////
  it('white advance one or two ranks from initial position', () => {
    expect(whitePawn.canMoveTo(Board.getSquare(2, 1))).to.be.false
    expect(whitePawn.canMoveTo(Board.getSquare(2, 3))).to.be.true
    expect(whitePawn.canMoveTo(Board.getSquare(2, 4))).to.be.true
    expect(whitePawn.canMoveTo(Board.getSquare(2, 5))).to.be.false
    expect(whitePawn.canMoveTo(Board.getSquare(7, 6))).to.be.false
    expect(whitePawn.canMoveTo(Board.getSquare(7, 7))).to.be.false
    expect(whitePawn.canMoveTo(Board.getSquare(7, 8))).to.be.false
    expect(whitePawn1.canMoveTo(Board.a4)).to.be.false
  })
  it('white move diagonally only to capture', () => {
    expect(whitePawn6.canMoveTo(Board.getSquare(7, 3))).to.be.true // blackKing
    expect(whitePawn6.canMoveTo(Board.getSquare(5, 3))).to.be.true // blackQ
    expect(whitePawn.canMoveTo(Board.getSquare(1, 3))).to.be.false
    expect(whitePawn.canMoveTo(Board.getSquare(3, 3))).to.be.false
  })
  it('white cannot move vertically onto or through cccupied square', () => {
    expect(whitePawn4.canMoveTo(Board.getSquare(4, 3))).to.be.false // onto occupied by friend
    expect(whitePawn4.canMoveTo(Board.getSquare(4, 4))).to.be.false // through occupied by friend
    expect(whitePawn5.canMoveTo(Board.getSquare(5, 3))).to.be.false // onto occupied by enemy
    expect(whitePawn5.canMoveTo(Board.getSquare(5, 4))).to.be.false // through occupied by enemy
  })
  // white pawn on another rank ///////////////
  it('white can move one but not two squares if not from starting rank', () => {
    expect(whitePawn35.canMoveTo(Board.getSquare(3, 6))).to.be.true
    expect(whitePawn35.canMoveTo(Board.getSquare(3, 7))).to.be.false
  })
  it('white can move diagonally only to capture', () => {
    expect(whitePawn35.canMoveTo(Board.getSquare(4, 6))).to.be.true
    expect(whitePawn35.canMoveTo(Board.getSquare(2, 6))).to.be.false
  })
  // black pawn on seventh rank //////////////////////
  it('white advance one or two ranks from initial position', () => {
    expect(blackP17.canMoveTo(Board.getSquare(1, 1))).to.be.false
    expect(blackP17.canMoveTo(Board.getSquare(1, 2))).to.be.false
    expect(blackP17.canMoveTo(Board.getSquare(1, 3))).to.be.false
    expect(blackP17.canMoveTo(Board.getSquare(1, 4))).to.be.false
    expect(blackP17.canMoveTo(Board.getSquare(1, 5))).to.be.true
    expect(blackP17.canMoveTo(Board.getSquare(1, 6))).to.be.true
    expect(blackP17.canMoveTo(Board.getSquare(1, 7))).to.be.false
    expect(blackP17.canMoveTo(Board.getSquare(1, 8))).to.be.false
    expect(blackP17.canMoveTo(Board.getSquare(8, 8))).to.be.false // something crazy
  })
  it('black can move diagonally only to capture', () => {
    expect(blackP77.canMoveTo(Board.getSquare(8, 6))).to.be.true // whiteB86
    expect(blackP77.canMoveTo(Board.getSquare(6, 6))).to.be.false // nothing there
    expect(blackP17.canMoveTo(Board.getSquare(2, 6))).to.be.false // nothing there
    expect(blackP37.canMoveTo(Board.getSquare(4, 6))).to.be.false // friendly there
  })
  it('black cannot move vertically onto or through cccupied square', () => {
    expect(blackP37.canMoveTo(Board.getSquare(3, 6))).to.be.true // not occupied
    expect(blackP37.canMoveTo(Board.getSquare(3, 5))).to.be.false // onto second square occupied by enemy
    expect(blackP87.canMoveTo(Board.getSquare(8, 6))).to.be.false // immediate onto enemy
    expect(blackP87.canMoveTo(Board.getSquare(8, 5))).to.be.false // through enemy
    expect(blackP46.canMoveTo(Board.getSquare(4, 5))).to.be.false // onto friend
  })
  // black pawn on another rank //////////////////////
  it('black can move one but not two squares if not from starting rank', () => {
    expect(blackP56.canMoveTo(Board.getSquare(5, 5))).to.be.true
    expect(blackP56.canMoveTo(Board.getSquare(5, 4))).to.be.false
    expect(blackP56.canMoveTo(Board.getSquare(1, 1))).to.be.false // something crazy
  })
  it('black can move diagonally only to capture', () => {
    expect(blackP46.canMoveTo(Board.getSquare(3, 5))).to.be.true
    expect(blackP56.canMoveTo(Board.getSquare(4, 5))).to.be.false // friendly there
    expect(blackP46.canMoveTo(Board.getSquare(5, 5))).to.be.false // nothing there
  })
  //////////// newly constructed Pawns have justMovedTwo = false
  it('newly constructed pawns have not just moved two', () => {
    expect(whitePawn.getJustMovedTwo()).to.be.false
  })
  
})
