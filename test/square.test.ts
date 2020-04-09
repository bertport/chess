import { expect } from 'chai';
import 'mocha';
import { Square } from '../src/Square';

const square1: Square = new Square(4, 5);
const square2: Square = new Square(5, 2);
const square3: Square = new Square(1, 8);
const square4: Square = new Square(5, 1);

describe('Square distanceFrom function', () => {
  it('should return (1,3)', () => {
    const result = square1.distanceFrom(square2);
    expect(result).to.deep.equal({file: 1, rank: 3});
  });
  it ('should return (0,1)', () => {
    const result2 = square4.distanceFrom(square2);
    expect(result2).to.deep.equal({file: 0, rank: 1});
  })
});

describe('Square getRank and getFile functions', () => {
  it('should return 8', () => {
    const result = square3.getRank();
    expect(result).to.equal(8);
    expect(square3.getFile()).to.equal(1);
  });
});

describe('Square toString function', () => {
  it('should print nicely', () => {
    const result = square4.toString();
    expect(result).to.equal('file: 5, rank: 1')
  })
})
