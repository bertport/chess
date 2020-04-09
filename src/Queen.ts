import { Board } from "./Board"
import * as chess from "./main"
import { Piece } from "./Piece"
import { Square } from "./Square"

export class Queen extends Piece {
  constructor(
    color: chess.Color,
    file: chess.BoardFile,
    rank: chess.BoardRank,
  ) {
    super(color, "Queen", file, rank)
  }

  public canCheck(square: Square) {
    const distance = this.square.distanceFrom(square)
    return (
      Board.pathIsClear(this.getSquare(), square)
      && ((distance.file === 0 && distance.rank > 0) // vertical
        || (distance.file > 0 && distance.rank === 0) // horizontal
        || (distance.file === distance.rank && distance.file > 0) // diagonal
      )
    )
  }

  public canMoveTo(square: Square) {
    const distance = this.square.distanceFrom(square)
    const targetPiece = Board.getPiece(square)
    if (targetPiece && targetPiece.getColor() === this.getColor()) {
      return false;
    } else {
      return (
        Board.pathIsClear(this.getSquare(), square)
        && ((distance.file === 0 && distance.rank > 0) // vertical
          || (distance.file > 0 && distance.rank === 0) // horizontal
          || (distance.file === distance.rank && distance.file > 0) // diagonal
        )
      )
    }
  } 
}
