import { Board } from "./Board"
import { Game } from "./Game"
import * as chess from "./main"
import { Move } from "./Move"
import { Piece } from "./Piece"
import { Square } from "./Square"

export class Pawn extends Piece {

  private justMovedTwo: boolean
  // tried a single enPassantMove of type shape | undefined, could not make it work.
  private enPassantMoves: Array<{
    from: Square,
    targetPiece: Pawn,
    to: Square,
  }>

  constructor(
    color: chess.Color,
    file: chess.BoardFile,
    rank: chess.BoardRank,
  ) {
    super(color, "Pawn", file, rank)
    this.justMovedTwo = false
    this.enPassantMoves = []
  }

  public getJustMovedTwo() {
    return this.justMovedTwo
  }

  public getEnPassantMoves() {
    return this.enPassantMoves
  }

  // I, the pawn, tell the Board to update its own map of where I am;
  // I update my own properties of square and enPassantMoves.
  public moveTo(square: Square) {
    Board.removePiece(this, this.square)
    this.square = square
    Board.placePiece(this, square)
    this.enPassantMoves = []
  }

  public canCheck(square: Square) {
    const distance = this.square.distanceFrom(square)
    if (this.color === "Black") {
      return (distance.file === 1 && this.square.getRank() - square.getRank() === 1)
    } else {
      return (distance.file === 1 && square.getRank() - this.square.getRank() === 1)
    }
  }

  // TODO: choose between White logic and Black logic
  public canMoveTo(targetSquare: Square) {
    const distance = this.square.distanceFrom(targetSquare)
    const targetPiece = Board.getPiece(targetSquare)
    let targetPieceColor
    if (targetPiece) {
      targetPieceColor = targetPiece.getColor()
      //console.log(`found ${targetPiece.toString()}`)
    }
    if (this.color === "White") { // I am a White Pawn ////////////////////////////////////
      if (targetPieceColor === "White") { // occupied by friend
        return false
      } else if (targetPieceColor === "Black") { // capture diagonally
        return Math.abs(targetSquare.getRank() - this.square.getRank()) === 1 && distance.file === 1
      } else if (distance.file === 0 && this.square.getRank() === 2 && targetSquare.getRank() === 4) {
        // initial two-square advance
        const interveningPiece = Board.getPiece(Board.getSquare(this.square.getFile(), this.square.getRank() + 1))
        if (interveningPiece) {
          return false
        } else {
          return true
        }
      } else if (this.square.getRank() === 5 && distance.file === 1) { // en passant
        const lastMove = Game.getLastMove()
        if (lastMove && lastMove.piece instanceof Pawn && lastMove.piece.toString().startsWith("Black Pawn") 
          && lastMove.from.getRank() === 7 
          && lastMove.to.getRank() === 5 && lastMove.from.getFile() === targetSquare.getFile()) {
            this.enPassantMoves.push({
              from: this.square,
              targetPiece: lastMove.piece,
              to: targetSquare,
            })
            return true
          } else {
            return false
          }
      } else {
        //console.log(`this pawn is on rank ${this.square.getRank()}`)
        //console.log(`target square has rank ${targetSquare.getRank()}`)
        //console.log("condition 1a: " + (this.square.getRank() === 2))
        //console.log("condition 1b: " + (targetSquare.getRank() in [3, 4]))
        //console.log("1 in [3, 4]: " + (1 in [3, 4]))
        //console.log("[3, 4].includes(1): " + ([3, 4].includes(1)))
        //console.log("first condition: " + (this.square.getRank() === 2 && targetSquare.getRank() in [3, 4]))
        //console.log("or second condition: " + (targetSquare.getRank() - this.square.getRank() === 1))
        return distance.file === 0 && (
          (this.square.getRank() === 2 && [3, 4].includes(targetSquare.getRank())) // first advance
          || (targetSquare.getRank() - this.square.getRank() === 1) // subsequent advances can only be 1 square
        )
      }
    } else { // I am a Black Pawn /////////////////////////////////////////////////////////////
      // try a different conceptual approach
      if (this.square.getRank() === 7) { // initial position
        if (distance.file === 1) { // must be diagonal, must be capture
          return (targetSquare.getRank() === 6 && targetPieceColor === "White")
        } else if (distance.file === 0) { // same file
          return (targetSquare.getRank() === 6 && !targetPiece) // advance one rank to empty square
          || (targetSquare.getRank() === 5 && !targetPiece  //advance two ranks to empty square
              && !(Board.getPiece(Board.getSquare(this.square.getFile(), 6)))) //and intervening square is empty
        } else { // anything else
          return false
        }
      } else if (this.square.getRank() === 4 && distance.file === 1 
          && targetSquare.getRank() === 3 && !targetPiece) { // might be en passant
            // console.log("Pawn canMoveTo black enPassant case")
            const lastMove = Game.getLastMove()
            // console.log("lastMove: " + lastMove.piece.getName() + " from " + lastMove.from.getRank()
            //  + " to " + lastMove.to.getRank() + " on file " + lastMove.from.getFile())
            if (lastMove && lastMove.piece instanceof Pawn && lastMove.from.getRank() === 2
              && lastMove.to.getRank() === 4 && lastMove.from.getFile() === targetSquare.getFile()) {
                this.enPassantMoves.push({
                  from: this.square,
                  targetPiece: lastMove.piece,
                  to: targetSquare,
                })
                return true
              } else {
                return false
              }
      } else { //not initial position
        if (distance.file === 1) { // must be diagonal, must be capture
          return (targetSquare.getRank() === this.square.getRank() - 1 && targetPieceColor === "White")
        } else if (distance.file === 0) { // same file
          return (targetSquare.getRank() === this.square.getRank() - 1 && !targetPiece) // advance 1 to empty square
        } else { // anything else
          return false
        }
      }
    }
  } 
}
