import { expect } from 'chai';
import 'mocha';
import { Board } from '../src/Board';
import { King } from '../src/King';
import { Queen } from '../src/Queen';
import { Square } from '../src/Square';

// for to.be.true
/* tslint:disable:no-unused-expression */

const e3: Square = Board.e3;
const e2: Square = Board.e2;
const e1: Square = Board.e1
const a1: Square = Board.a1
const d1: Square = Board.d1
const f1: Square = Board.f1
const d2: Square = Board.d2
const f2: Square = Board.f2

describe('King canMoveTo function', () => {
  let ktWK: King
  before( () => {
    Board.clear()
    ktWK = new King("White", 5, 1);
  })
  it('has not moved yet', () => {
    expect(ktWK.getHasMoved()).to.be.false
  })
  it('can move to e2', () => {
    const result = ktWK.canMoveTo(e2);
    expect(result).to.equal(true);
    expect(ktWK.canCheck(e2)).to.be.true
  });
  it('can move to d1', () => {
    expect(ktWK.canMoveTo(d1)).to.equal(true)
    expect(ktWK.canCheck(d1)).to.be.true
  });
  it('can move to f1', () => {
    expect(ktWK.canMoveTo(f1)).to.equal(true)
    expect(ktWK.canCheck(f1)).to.be.true
  })
  it('can move to d2', () => {
    expect(ktWK.canMoveTo(d2)).to.equal(true)
    expect(ktWK.canCheck(d2)).to.be.true
  });
  it('can move to f2', () => {
    expect(ktWK.canMoveTo(f2)).to.equal(true)
    expect(ktWK.canCheck(f2)).to.be.true
  })
  it('should not be able to move further', () => {
    const r2 = ktWK.canMoveTo(e3);
    expect(r2).to.equal(false)
    expect(ktWK.canCheck(e3)).to.be.false
  });
  it('should not be able to move off the board', () => {
    const r2 = ktWK.canMoveTo(Board.getSquare(5, 0));
    expect(r2).to.equal(false)
    expect(ktWK.canCheck(Board.getSquare(5, 0))).to.be.false
  });
  it('should not be able to move into check', () => {
    Board.clear()
    ktWK = new King("White", 5, 6);
    const ktBQ = new Queen("Black", 1, 5); // covers fifth rank
    const ktWQ = new Queen("White", 8, 7); // covers seventh rank, but friendly
    expect(ktWK.canMoveTo(Board.getSquare(4, 7))).to.be.true
    expect(ktWK.canMoveTo(Board.getSquare(5, 7))).to.be.true
    expect(ktWK.canMoveTo(Board.getSquare(6, 7))).to.be.true
    expect(ktWK.canMoveTo(Board.getSquare(4, 6))).to.be.true
    expect(ktWK.canMoveTo(Board.getSquare(6, 6))).to.be.true
    expect(ktWK.canMoveTo(Board.getSquare(4, 5))).to.be.false
    expect(ktWK.canMoveTo(Board.getSquare(5, 5))).to.be.false
    expect(ktWK.canMoveTo(Board.getSquare(6, 5))).to.be.false
  });
  it('should not be able to move onto a square occupied by a friendly', () => {
    Board.clear()
    ktWK = new King("White", 4, 4);
    const ktWQ = new Queen("White", 4, 5);
    expect(ktWK.canMoveTo(Board.getSquare(4, 5))).to.be.false
  })

});

describe('King toString function', () => {
  const ktWK: King = new King("White", 5, 1);
  console.log(ktWK.toString());
  const result = ktWK.toString();
  it('should print out nicely', () => {
    expect(result).to.equal("White King at e1")
  })
})

describe('King distanceTo function', () => {

  it('should return 0,1', () => {
    const ktWK: King = new King("White", 5, 1);
    const result = ktWK.distanceTo(e2);
    expect(result).to.deep.equal({file: 0, rank: 1});
  })
})

describe('Piece moveTo function', () => {
  let ktWK: King
  before( () => {
    ktWK = new King("White", 5, 1);
  })
  it('should first be at e1', () => {
    const r1 = Board.getPiece(e1);
    expect(r1).to.equal(ktWK)
  })
  it('should then be at e2', () => {
    ktWK.moveTo(e2);
    const result = Board.getPiece(e2);
    expect(result).to.equal(ktWK);
    expect(ktWK.getHasMoved()).to.be.true
  })
  it('should have left 51 vacant', () => {
    const result = Board.getPiece(e1);
    expect(result).to.equal(undefined);
  })
})

describe('Piece getColor function', () => {
  it('should be White', () => {
    const ktWK: King = new King("White", 5, 1);
    const result = ktWK.getColor();
    expect(result).to.equal("White")
  })
})
