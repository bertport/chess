import { Board } from "./Board"
import { Game } from "./Game"
import * as chess from "./main"
import { Piece } from "./Piece"
import { Square } from "./Square"

export class King extends Piece {
  private hasMoved: boolean // for castling logic
  constructor(
    color: chess.Color,
    file: chess.BoardFile,
    rank: chess.BoardRank,
  ) {
    super(color, "King", file, rank)
    this.hasMoved = false
  }

  public getHasMoved() {
    return this.hasMoved
  }

  public canCastleKingside() {
    let result: boolean = false
    if (this.color === "White" && !this.hasMoved && !Game.whR.getHasMoved()
      && !Game.wouldBeCheck("White", Board.e1)
      && !Game.wouldBeCheck("White", Board.f1) && Board.isUnoccupied(Board.f1)
      && !Game.wouldBeCheck(this.color, Board.g1) && Board.isUnoccupied(Board.g1)) {
      result = true
    } else if (this.color === "Black" && !this.hasMoved && !Game.bhR.getHasMoved()
      && !Game.wouldBeCheck("Black", Board.e8)
      && !Game.wouldBeCheck("Black", Board.f8) && Board.isUnoccupied(Board.f8)
      && !Game.wouldBeCheck("Black", Board.g8) && Board.isUnoccupied(Board.g8)) {
        result = true
      }
    return result
  }

  public canCastleQueenside() {
    let result: boolean = false
    if (this.color === "White" && !this.hasMoved && !Game.waR.getHasMoved()
    && !Game.wouldBeCheck("White", Board.e1)
    && !Game.wouldBeCheck("White", Board.d1) && Board.isUnoccupied(Board.d1)
    && !Game.wouldBeCheck("White", Board.c1) && Board.isUnoccupied(Board.c1)
    && !Game.wouldBeCheck("White", Board.b1) && Board.isUnoccupied(Board.b1)) {
      result = true
    } else if (this.color === "Black" && !this.hasMoved && !Game.baR.getHasMoved()
    && !Game.wouldBeCheck("Black", Board.e8)
    && !Game.wouldBeCheck("Black", Board.d8) && Board.isUnoccupied(Board.d8)
    && !Game.wouldBeCheck("Black", Board.c8) && Board.isUnoccupied(Board.c8)
    && !Game.wouldBeCheck("Black", Board.b8) && Board.isUnoccupied(Board.b8)) {
      result = true
    }
    return result
  }

  public canCheck(square: Square) {
    const distance = this.square.distanceFrom(square)
    return distance.rank < 2 
    && distance.file < 2 
    && (distance.rank > 0 || distance.file > 0) 
    // && !Game.isCheck(this.color, square)
  }

  public canMoveTo(square: Square) {
     const distance = this.square.distanceFrom(square)
     const occupier = Board.getPiece(square)
     if (occupier !== undefined && occupier.getColor() === this.color) {
       return false
     } else {
      return distance.rank < 2 
      && distance.file < 2 
      && (distance.rank > 0 || distance.file > 0) 
      && !Game.wouldBeCheck(this.color, square)
     }
     
  }

  public distanceTo(square: Square) {
    return this.square.distanceFrom(square)
  }

  public moveTo(square: Square) {
    super.moveTo(square)
    this.hasMoved = true
  }
}
