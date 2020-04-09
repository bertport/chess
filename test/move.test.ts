import { expect } from 'chai';
import 'mocha';
import { Bishop } from '../src/Bishop';
import { Board } from '../src/Board';
import { King } from '../src/King';
import { Knight } from '../src/Knight';
import { Move } from '../src/Move';
import { Pawn } from '../src/Pawn';
import { Queen } from '../src/Queen';
import { Square } from '../src/Square';

describe('Move toString functions', () => {
  const whiteN = new Knight("White", 2, 1)
  const move: Move = new Move(whiteN, Board.getSquare(2, 1), Board.getSquare(3, 3))
  it('is easy to read Knight move', () => {
    expect(move.toString()).to.equal("White Knight b1 - c3")
    expect(move.toShortString()).to.equal("b1-c3")
  })
  const whiteP = new Pawn("White", 6, 7)
  const move2: Move = new Move(whiteP, Board.f7, Board.f8, false, "Q")
  it('is easy to read pawn promotion', () => {
    expect(move2.toString()).to.equal("White Pawn f7 - f8 (Q)")
    expect(move2.toShortString()).to.equal("f7-f8Q")
  })
})
