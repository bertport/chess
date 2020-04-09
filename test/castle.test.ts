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

describe('canCastleKingside function happy path', () => {
  before(() => {
    console.log("castle.test before canCastleKingside function happy path")
    Game.start()
  })
  it('recognizes when the castle is allowed', () => {
    expect(Game.wK.canCastleKingside()).to.be.false
    expect(Game.bK.canCastleKingside()).to.be.false
    Game.move(Game.we, Board.e4)
    Game.move(Game.be, Board.e5)
    expect(Game.wK.canCastleKingside()).to.be.false
    expect(Game.bK.canCastleKingside()).to.be.false
    Game.move(Game.wgN, Board.f3)
    Game.move(Game.bbN, Board.c6)
    expect(Game.wK.canCastleKingside()).to.be.false
    expect(Game.bK.canCastleKingside()).to.be.false
    Game.move(Game.wfB, Board.c4)
    Game.move(Game.bfB, Board.c5)
    Game.logMoves()
    expect(Game.wK.canCastleKingside()).to.be.true
    expect(Game.bK.canCastleKingside()).to.be.false
    Game.move(Game.wd, Board.d3)
    Game.move(Game.bgN, Board.f6)
    expect(Game.wK.canCastleKingside()).to.be.true
    expect(Game.bK.canCastleKingside()).to.be.true
    Game.move(Game.wK, Board.g1)
    expect(Game.getLastMove().toShortString()).to.equal("0-0")
    expect(Game.getLastMove().toString()).to.equal("0-0")
    Game.move(Game.bK, Board.g8)
    expect(Game.getLastMove().toShortString()).to.equal("0-0")
    expect(Game.getLastMove().toString()).to.equal("0-0")
    expect(Game.wK.canCastleKingside()).to.be.false
    expect(Game.bK.canCastleKingside()).to.be.false
    Game.logMoves()
  })

});

describe('canCastleQueenside function happy path', () => {
  before(() => {
    console.log("castle.test before canCastleQueenside function happy path")
    Game.start()
  })
  it('recognizes when Q-side castle is allowed', () => {
    expect(Game.wK.canCastleQueenside()).to.be.false
    expect(Game.bK.canCastleQueenside()).to.be.false
    Game.move(Game.we, Board.e4)
    Game.move(Game.bd, Board.d5)
    expect(Game.wK.canCastleQueenside()).to.be.false
    expect(Game.bK.canCastleQueenside()).to.be.false
    Game.move(Game.we, Board.d5)
    Game.move(Game.bQ, Board.d5)
    expect(Game.wK.canCastleQueenside()).to.be.false
    expect(Game.bK.canCastleQueenside()).to.be.false
    Game.move(Game.wd, Board.d4)
    Game.move(Game.bbN, Board.c6)
    expect(Game.wK.canCastleQueenside()).to.be.false
    expect(Game.bK.canCastleQueenside()).to.be.false
    Game.move(Game.wgN, Board.f3)
    Game.move(Game.bcB, Board.f5)
    expect(Game.wK.canCastleQueenside()).to.be.false
    expect(Game.bK.canCastleQueenside()).to.be.true
    Game.move(Game.wQ, Board.d3)
    Game.move(Game.bK, Board.c8)
    expect(Game.getLastMove().toShortString()).to.equal("0-0-0")
    expect(Game.getLastMove().toString()).to.equal("0-0-0")
    expect(Game.wK.canCastleQueenside()).to.be.false
    expect(Game.bK.canCastleQueenside()).to.be.false
    Game.move(Game.wbN, Board.c3)
    Game.move(Game.be, Board.e6)
    expect(Game.wK.canCastleQueenside()).to.be.false
    expect(Game.bK.canCastleQueenside()).to.be.false
    Game.move(Game.wcB, Board.f4)
    Game.move(Game.bgN, Board.f6)
    expect(Game.wK.canCastleQueenside()).to.be.true
    expect(Game.bK.canCastleQueenside()).to.be.false
    Game.move(Game.wK, Board.c1)
    expect(Game.getLastMove().toShortString()).to.equal("0-0-0")
    expect(Game.getLastMove().toString()).to.equal("0-0-0")
    expect(Game.wK.canCastleQueenside()).to.be.false
    expect(Game.bK.canCastleQueenside()).to.be.false
    Game.logMoves()

  })
})
