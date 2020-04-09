import { Board } from "./Board"
import * as chess from "./main"
import { Piece } from "./Piece"
import { Square } from "./Square"

export class Rook extends Piece {
  private hasMoved: boolean // for castling logic
  constructor(
    color: chess.Color,
    file: chess.BoardFile,
    rank: chess.BoardRank,
  ) {
    super(color, "Rook", file, rank)
    this.hasMoved = false
  }

  public getHasMoved() {
    return this.hasMoved
  }

  public canCheck(square: Square) {
    const distance = this.square.distanceFrom(square)
    return (
      Board.pathIsClear(this.getSquare(), square)
      && ((distance.file === 0 && distance.rank > 0) // vertical
        || (distance.file > 0 && distance.rank === 0) // horizontal
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
        )
      )
    }
  } 

  public moveTo(square: Square) {
    super.moveTo(square)
    this.hasMoved = true
  }
}
