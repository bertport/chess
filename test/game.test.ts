import { expect } from 'chai';
import 'mocha';
import { Bishop } from '../src/Bishop';
import { Board } from '../src/Board';
import { Game } from '../src/Game';
import { King } from '../src/King';
import { Knight } from '../src/Knight';
import { Move } from '../src/Move';
import { Pawn } from '../src/Pawn';
import { Queen } from '../src/Queen';
import { Square } from '../src/Square';

// for to.be.true
/* tslint:disable:no-unused-expression */

describe('Game start and move functions', () => {
  before(() => {
    console.log("game.test before Game start function")
    Game.start()
  })
  it('has expected pieces in expected places', () => {
    Board.logPieces()
    const wK = Game.wK
    expect(wK.getColor()).to.equal("White")
    expect(wK.getName()).to.equal("King")
    expect(Game.getMovesLog()).to.equal("")
    expect(Game.whoseMove()).to.equal("White")
    expect(Game.blackKingIsInCheck()).to.be.false
    expect(Game.whiteKingIsInCheck()).to.be.false
    expect(Game.wK.canCastleKingside()).to.be.false
    expect(Game.bK.canCastleKingside()).to.be.false
  })  
  it('moves e2-e4, d7-d5, e4-d5', () => {
    const whiteKP = Game.we
    const blackQP = Game.bd
    const blackcP = Game.bc
    const blackfP = Game.bf
    const whitegP = Game.wg
    const whitebN = Game.wbN
    const bQ = Game.bQ
    const e4 = Board.e4
    const d5 = Board.d5
    const c5 = Board.c5
    const c6 = Board.c6
    const e6 = Board.e6
    Game.move(whiteKP, e4)
    expect(whiteKP.getSquare()).to.equal(e4)
    expect(Board.getPiece(e4)).to.equal(whiteKP)
    expect(Game.whoseMove()).to.equal("Black")
    Game.move(blackQP, d5)
    expect(blackQP.getSquare()).to.equal(d5)
    expect(Board.getPiece(d5)).to.equal(blackQP)
    expect(Game.whoseMove()).to.equal("White")
    Game.move(whiteKP, d5)
    expect(whiteKP.getSquare()).to.equal(d5)
    expect(Board.getPiece(d5)).to.equal(whiteKP)
    expect(blackQP.getSquare()).to.equal(Board.getTable())
    expect(Game.whoseMove()).to.equal("Black")
    let lastMove = Game.getLastMove()
    expect(lastMove.toShortString()).to.equal("e4-d5")
    expect(lastMove.toString()).to.equal("White Pawn e4 - d5")
    expect(Game.getMovesLog()).to.equal("1. e2-e4 d7-d5\n2. e4-d5")
    Game.move(blackcP, c5) // setup for en passant
    expect(blackcP.getSquare()).to.equal(c5)
    expect(Board.getPiece(c5)).to.equal(blackcP)
    lastMove = Game.getLastMove()
    expect(lastMove.toShortString()).to.equal("c7-c5")
    expect(lastMove.toString()).to.equal("Black Pawn c7 - c5")
    expect(Game.getMovesLog()).to.equal("1. e2-e4 d7-d5\n2. e4-d5 c7-c5\n")
      // attempt illegal move. Nothing should happen.
    Game.move(whitebN, Board.a1)
    lastMove = Game.getLastMove()
    expect(lastMove.toShortString()).to.equal("c7-c5")
    expect(lastMove.toString()).to.equal("Black Pawn c7 - c5")
    expect(Game.getMovesLog()).to.equal("1. e2-e4 d7-d5\n2. e4-d5 c7-c5\n")
      // attempt to non-move move, also nothing happens.
    Game.move(whitebN, Board.b1)
    lastMove = Game.getLastMove()
    expect(lastMove.toShortString()).to.equal("c7-c5")
    expect(lastMove.toString()).to.equal("Black Pawn c7 - c5")
    expect(Game.getMovesLog()).to.equal("1. e2-e4 d7-d5\n2. e4-d5 c7-c5\n")

    expect(whiteKP.canMoveTo(c6)).to.be.true //en passant allowed
    expect(whiteKP.canMoveTo(e6)).to.be.false
    let enPassantMove = {
        from: d5,
        targetPiece: blackQP,
        to: e4,
      }
    if (whiteKP instanceof Pawn && whiteKP.getEnPassantMoves()[0] !== undefined) {
        // console.log("enPassant move: " + whiteKP.getEnPassantMove())
        // console.log("from: " + whiteKP.getEnPassantMove().from)
        // console.log("targetPiece: " + whiteKP.getEnPassantMove().targetPiece.toString())
        // console.log("to: " + whiteKP.getEnPassantMove().to)
        enPassantMove = whiteKP.getEnPassantMoves()[0]
      }
    expect(enPassantMove).to.deep.equal({
        from: d5,
        targetPiece: blackcP,
        to: c6,
      })
    Game.move(whiteKP, e6) // illegal, nothing happens, covers a branch of Game.ts logic
    Game.move(whiteKP, c6)
    expect(whiteKP.getSquare()).to.equal(c6)
    expect(Board.getPiece(c6)).to.equal(whiteKP)
    expect(blackcP.getSquare()).to.equal(Board.getTable())
    Game.move(blackfP, Board.f5)
    Game.move(whitebN, Board.c3)
    Game.move(blackfP, Board.f4)
    Game.move(whitegP, Board.g4)
    expect(blackfP.canMoveTo(Board.g3)).to.be.true
    expect(blackfP.canMoveTo(Board.e3)).to.be.false
    if (blackfP instanceof Pawn && blackfP.getEnPassantMoves()[0] !== undefined) {
        enPassantMove = blackfP.getEnPassantMoves()[0]
        // console.log("blackfP enPassant moves: " + blackfP.getEnPassantMoves()[0])
        // console.log("from: " + blackfP.getEnPassantMoves()[0].from)
        // console.log("targetPiece: " + blackfP.getEnPassantMoves()[0].targetPiece.toString())
        // console.log("to: " + blackfP.getEnPassantMoves()[0].to)
      }
    expect(enPassantMove).to.deep.equal({
        from: Board.f4,
        targetPiece: whitegP,
        to: Board.g3,
      })
    Game.move(blackfP, Board.g3)
    Game.move(whiteKP, Board.b7)
    expect(whiteKP.getSquare()).to.equal(Board.b7)
    Game.move(blackfP, Board.h2)
    Game.move(whiteKP, Board.a8)
    expect(whiteKP.getSquare()).to.equal(Board.getTable())
    const ba8 = Board.getPiece(Board.a8)
    expect(ba8 instanceof Queen).to.be.true
    if (ba8) {
        expect(ba8.getColor()).to.equal("White")
      }
    Game.move(blackfP, Board.g1)
    expect(blackfP.getSquare()).to.equal(Board.getTable())
    const bg1 = Board.getPiece(Board.g1)
    expect(bg1 instanceof Queen).to.be.true
    if (bg1) {
        expect(bg1.getColor()).to.equal("Black")
      }
    expect(Game.wouldBeCheck("Black", Board.c6)).to.be.true // white Queen at a8
    expect(Game.wouldBeCheck("White", Board.c6)).to.be.true // black Knight at b8
    expect(Game.wouldBeCheck("Black", Board.e8)).to.be.false
    expect(Game.wouldBeCheck("White", Board.d3)).to.be.true // black Queen at d8
    if (ba8 && bg1) {
        Game.move(ba8, Board.b8)
        Game.move(bg1, Board.f1)
        expect(Game.blackKingIsInCheck()).to.be.false
        expect(Game.whiteKingIsInCheck()).to.be.true
        expect(Game.wouldBeCheck("White", Board.f1)).to.be.false
        expect(Game.whoseMove()).to.equal(Game.wK.getColor())
        expect(Game.wK.canMoveTo(Board.f1)).to.be.true
        Game.move(Game.wK, Board.f1)
        expect(Game.wK.getSquare()).to.equal(Board.f1)
        expect(Game.whiteKingIsInCheck()).to.be.false
        Game.move(Game.bh, Board.h5)
        Game.move(ba8, Board.c8)
        expect(Game.bh.canMoveTo(Board.h4)).to.be.true
        expect(Game.whoseMove()).to.equal(Game.bh.getColor())
        Game.move(Game.bh, Board.h4)
        Game.move(ba8, Board.c8)
        expect(Game.bh.canMoveTo(Board.h3)).to.be.true
        Game.move(Game.bh, Board.h3)
        Game.move(ba8, Board.d8)
        expect(Game.blackKingIsInCheck()).to.be.true
        expect(Game.move(Game.bgN, Board.f6)).to.be.false // cannot make a move that leaves your own King in check
        expect(Game.bgN.getSquare()).to.equal(Board.g8)
      }
    
    Game.logMoves()
  })
  after( () => {
    console.log("game.test after Game start and move functions")
  })
})

describe('Cannot make a move that leaves your King in check', () => {
  before(() => {
    console.log("game.test before Cannot make a move")
    Game.start()
  })
  it('will not accept an otherwise legal move that exposes the King', () => {
    Game.move(Game.we, Board.e4)
    Game.move(Game.be, Board.e5)
    Game.move(Game.wgN, Board.f3)
    Game.move(Game.bgN, Board.f6)
    Game.move(Game.wgN, Board.e5)
    Game.move(Game.bd, Board.d6)
    Game.move(Game.wgN, Board.f3)
    Game.move(Game.bgN, Board.e4)
    Game.move(Game.wQ, Board.e2)
    const canMove = Game.move(Game.bgN, Board.f6)
    expect(canMove).to.be.false
    expect(Game.getLastMove().toShortString()).to.equal("d1-e2")
  })
})

describe('Correctly log a promotion that puts enemy King in check', () => {
  before(() => {
    console.log("game.test before Correctly log a promotion")
    Game.start()
  })
  it('will write the +', () => {
    Game.move(Game.we, Board.e4)
    Game.move(Game.bd, Board.d5)
    Game.move(Game.we, Board.d5)
    Game.move(Game.bc, Board.c6)
    Game.move(Game.we, Board.c6)
    Game.move(Game.bQ, Board.d6)
    Game.move(Game.we, Board.b7)
    Game.move(Game.bcB, Board.e6)
    Game.move(Game.wa, Board.a4)
    Game.move(Game.bbN, Board.c6)
    Game.move(Game.we, Board.b8)
    expect(Game.getLastMove().toShortString()).to.equal("b7-b8Q+")
  })
  it('will restore capturedPiece if capture is rolled back due to King in check', () => {
    Game.move(Game.bQ, Board.d8)
    Game.move(Game.wa, Board.a5)
    const movedQ = Game.move(Game.bQ, Board.d2)
    expect(movedQ).to.be.false
    expect(Board.getPiece(Board.d2)).to.equal(Game.wd)
    expect(Game.bQ.getSquare()).to.equal(Board.d8)
  })
})
