import { Board } from "./Board"
import * as chess from "./main"
import { Piece } from "./Piece"
import { Square } from "./Square"

export class Knight extends Piece {
  constructor(
    color: chess.Color,
    file: chess.BoardFile,
    rank: chess.BoardRank,
  ) {
    super(color, "Knight", file, rank)
  }

  public canCheck(square: Square) {
    const distance = this.square.distanceFrom(square)
    return (
        (distance.rank === 1 && distance.file === 2)
        || (distance.rank === 2 && distance.file === 1)
      )
  }

  public canMoveTo(square: Square) {
    const targetPiece = Board.getPiece(square)
    if (targetPiece && targetPiece.getColor() === this.getColor()) {
      return false;
    } else {
      const distance = this.square.distanceFrom(square)
      return (
        (distance.rank === 1 && distance.file === 2)
        || (distance.rank === 2 && distance.file === 1)
      )
    }
  } 
}
