import { Board } from "./Board"
import * as chess from "./main"
import { Square } from "./Square"

export abstract class Piece {
  protected square: Square
  protected color: chess.Color
  protected name: string
  constructor(
    color: chess.Color,
    name: string,
    file: chess.BoardFile,
    rank: chess.BoardRank,
  ) {
    this.color = color
    this.name = name
    this.square = Board.getSquare(file, rank)
    Board.placePiece(this, this.square)
  }

  // I, the piece, tell the Board to updates its own map of where I am;
  // I update my own property of what square I'm on.
  public moveTo(square: Square) {
    Board.removePiece(this, this.square)
    this.square = square
    Board.placePiece(this, square)
  }
  public getColor() {
    return this.color
  }
  public getName() {
    return this.name
  }
  public getSquare() {
    return this.square
  }
  public toString = (): string => {
    return `${this.color} ${this.name} at ${this.square.toAlgebraic()}`;
  }
  // if the enemy King moved to that square, would it be check?
  // differs from canMoveTo because canMove to looks at whether a friendly piece occupies the square
  public abstract canCheck(square: Square): boolean

  public abstract canMoveTo(square: Square): boolean
}
