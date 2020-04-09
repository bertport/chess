
import { Piece } from "./Piece"
import { Square } from "./Square"

// a Move is a Piece, the Square it moves from, and the Square it moves to.

export class Move {
  public readonly piece: Piece
  public readonly from: Square
  public readonly to: Square
  public readonly enPassant: boolean
  public readonly promote: string
  public readonly check: boolean
  public readonly castleKingside: boolean
  public readonly castleQueenside: boolean

  constructor(
    piece: Piece,
    from: Square,
    to: Square,
    enPassant?: boolean,
    promote?: string,
    check?: boolean,
    castleKingside?: boolean,
    castleQueenside?: boolean,
  ) {
    this.piece = piece
    this.from = from
    this.to = to
    this.enPassant = enPassant || false
    this.promote = promote || ""
    this.check = check || false
    this.castleKingside = castleKingside || false
    this.castleQueenside = castleQueenside || false
  }

  // TODO: + for check
  public toString() {
    const withoutPromotion = `${this.piece.getColor()} ${this.piece.getName()} ${this.from.toAlgebraic()} - ${this.to.toAlgebraic()}`
    if (this.promote) {
      return withoutPromotion + " (" + this.promote + ")"
    } else if (this.castleKingside) {
      return "0-0"
    } else if (this.castleQueenside) {
      return "0-0-0"
    } else {
      return withoutPromotion
    }
  }

  public toShortString() {
    let basic: string
    if (this.castleKingside) {
      basic = "0-0"
    } else if (this.castleQueenside) {
      basic = "0-0-0"
    } else {
      basic = `${this.from.toAlgebraic()}-${this.to.toAlgebraic()}${this.promote}`
    }
    if (this.check) {
      return basic + "+"
    } else {
      return basic
    }
  }
}
