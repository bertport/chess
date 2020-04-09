// This class is for a Piece to know where it is.
import * as chess from "./main"

export class Square {
  constructor(
    private file: chess.BoardFile,
    private rank: chess.BoardRank,
  ) {}
  public distanceFrom(square: Square) {
    return {
      file: Math.abs(square.file - this.file),
      rank: Math.abs(square.rank - this.rank),
    }
  }
  public getRank() {
    return this.rank
  }
  public getFile() {
    return this.file
  }
  public toString = (): string => {
    return `file: ${this.file}, rank: ${this.rank}`;
  }
  public toAlgebraic = (): string => {
    const algebraicFile = chess.BOARD_ALGEBRAIC_FILES[this.file - 1]
    return `${algebraicFile}${this.rank}`
  }

}
