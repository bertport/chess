import { Bishop } from "./Bishop"
import { Board } from "./Board"
import { King } from "./King"
import { Knight } from "./Knight"
import * as chess from "./main"
import { Move } from "./Move"
import { Pawn } from "./Pawn"
import { Piece } from "./Piece"
import { Queen } from "./Queen"
import { Rook } from "./Rook"
import { Square } from "./Square"

export class Game {
  
  public static wK: King
  public static bK: King
  public static wQ: Queen
  public static bQ: Queen
  public static wcB: Bishop
  public static wfB: Bishop
  public static bcB: Bishop
  public static bfB: Bishop
  public static wbN: Knight
  public static wgN: Knight
  public static bbN: Knight
  public static bgN: Knight
  public static waR: Rook
  public static whR: Rook
  public static baR: Rook
  public static bhR: Rook
  public static wa: Pawn
  public static wb: Pawn
  public static wc: Pawn
  public static wd: Pawn
  public static we: Pawn
  public static wf: Pawn
  public static wg: Pawn
  public static wh: Pawn
  public static ba: Pawn
  public static bb: Pawn
  public static bc: Pawn
  public static bd: Pawn
  public static be: Pawn
  public static bf: Pawn
  public static bg: Pawn
  public static bh: Pawn

  public static start() {
    Board.clear()
    Game.waR = new Rook("White", 1, 1)
    Game.wbN = new Knight("White", 2, 1)
    Game.wcB = new Bishop("White", 3, 1)
    Game.wQ = new Queen("White", 4, 1)
    Game.wK = new King("White", 5, 1)
    Game.wfB = new Bishop("White", 6, 1)
    Game.wgN = new Knight("White", 7, 1)
    Game.whR = new Rook("White", 8, 1)
    Game.wa = new Pawn("White", 1, 2)
    Game.wb = new Pawn("White", 2, 2)
    Game.wc = new Pawn("White", 3, 2)
    Game.wd = new Pawn("White", 4, 2)
    Game.we = new Pawn("White", 5, 2)
    Game.wf = new Pawn("White", 6, 2)
    Game.wg = new Pawn("White", 7, 2)
    Game.wh = new Pawn("White", 8, 2)
    Game.baR = new Rook("Black", 1, 8)
    Game.bbN = new Knight("Black", 2, 8)
    Game.bcB = new Bishop("Black", 3, 8)
    Game.bQ = new Queen("Black", 4, 8)
    Game.bK = new King("Black", 5, 8)
    Game.bfB = new Bishop("Black", 6, 8)
    Game.bgN = new Knight("Black", 7, 8)
    Game.bhR = new Rook("Black", 8, 8)
    Game.ba = new Pawn("Black", 1, 7)
    Game.bb = new Pawn("Black", 2, 7)
    Game.bc = new Pawn("Black", 3, 7)
    Game.bd = new Pawn("Black", 4, 7)
    Game.be = new Pawn("Black", 5, 7)
    Game.bf = new Pawn("Black", 6, 7)
    Game.bg = new Pawn("Black", 7, 7)
    Game.bh = new Pawn("Black", 8, 7)
    Game.moves = []
  }
  
  public static move(piece: Piece, to: Square) {
    let success: boolean = false
    let enPassant: boolean = false
    const from: Square = piece.getSquare()
    let capturedPiece: Piece | undefined
    //console.log("moving " + piece.getColor() + " " + piece.getName() + " to " + to.toAlgebraic())
    if (Game.whoseMove() === piece.getColor() && piece.canMoveTo(to)) {
      capturedPiece = Board.getPiece(to)
      if (capturedPiece) {
        capturedPiece.moveTo(Board.getTable())
      } else if (piece instanceof Pawn && Math.abs(piece.getSquare().getFile() - to.getFile()) === 1) {
        piece.getEnPassantMoves().forEach( (element) => { // there is really never more than one in this array
          capturedPiece = element.targetPiece
          capturedPiece.moveTo(Board.getTable())
          enPassant = true
        })
      }
      if (piece instanceof Pawn && [1, 8].includes(to.getRank())) {
        // TODO: ask player what to promote it to
        //console.log("moving Pawn to Table and replacing with Queen")
        const q: Queen = new Queen(piece.getColor(), to.getFile(), to.getRank())
        piece.moveTo(Board.getTable())
        // is it check or not?
        if (this.enemyKingIsInCheck(piece.getColor())) {
          Game.moves.push(new Move(piece, from, to, false, "Q", true))
        } else {
          Game.moves.push(new Move(piece, from, to, false, "Q"))
        }
        success = true
      } else {
        piece.moveTo(to)
        // is it check or not?
        if (Game.enemyKingIsInCheck(piece.getColor())) {
          Game.moves.push(new Move(piece, from, to, enPassant, undefined, true))
        } else {
          Game.moves.push(new Move(piece, from, to, enPassant))
        }
        success = true
      }
      // undo move if it results in own King being in check
      if (Game.myKingIsInCheck(piece.getColor())) {
        Game.moves.pop()
        piece.moveTo(from)
        if (capturedPiece) {
          capturedPiece.moveTo(to)
        }
        success = false
      }
    } else if (Game.whoseMove() === piece.getColor() && piece instanceof King
      && piece.canCastleKingside() && to.getFile() === 7 && to.getRank() === piece.getSquare().getRank()) {
        if (piece.getColor() === "Black") {
          piece.moveTo(Board.g8)
          Game.bhR.moveTo(Board.f8)
        } else if (piece.getColor() === "White") {
          piece.moveTo(Board.g1)
          Game.whR.moveTo(Board.f1)
        }
        if (Game.enemyKingIsInCheck(piece.getColor())) {
          Game.moves.push(new Move(piece, from, to, false, undefined, true, true))
        } else {
          Game.moves.push(new Move(piece, from, to, false, undefined, false, true))
        }
        success = true
        // do not need to call Game.myKingIsInCheck because canCastleKingside covered that.
    } else if (Game.whoseMove() === piece.getColor() && piece instanceof King
        && piece.canCastleQueenside() && to.getFile() === 3 && to.getRank() === piece.getSquare().getRank()) {
          if (piece.getColor() === "Black") {
            piece.moveTo(Board.c8)
            Game.baR.moveTo(Board.d8)
          } else if (piece.getColor() === "White") {
            piece.moveTo(Board.c1)
            Game.waR.moveTo(Board.d1)
          }
          if (Game.enemyKingIsInCheck(piece.getColor())) {
            Game.moves.push(new Move(piece, from, to, false, undefined, true, false, true))
          } else {
            Game.moves.push(new Move(piece, from, to, false, undefined, false, false, true))
          }
          success = true
          // do not need to call Game.myKingIsInCheck because canCastleQueenside covered that.
        }
    return success
  }

  // if a King of the given color were to move to the given square, then would he be in check?
  // caution: if the square is already occupied by a piece of the other color,
  // then this will always return false.
  public static wouldBeCheck(color: chess.Color, square: Square) {
    let result = false
    const allPieces = Board.getPieces()
    allPieces.forEach((piece: Piece, key: Square) => {
      if (piece.getColor() !== color && piece.canCheck(square)) {
        // console.log(piece.toString() + " could check an enemy King on " + square.toAlgebraic())
        result = true
      }
    })
    return result
  }

  public static enemyKingIsInCheck(myColor: chess.Color) {
    let kSquare: Square
    if (myColor === "Black") {
      kSquare = Game.wK.getSquare()
    } else {
      kSquare = Game.bK.getSquare()
    }
    const allPieces = Board.getPieces()
    let result = false
    allPieces.forEach((piece: Piece, key: Square) => {
      if (piece.getColor() === myColor && piece.canCheck(kSquare)) {
        result = true
      }
    })
    return result
  }

  public static myKingIsInCheck(color: chess.Color) {
    let kSquare: Square
    if (color === "Black") {
      kSquare = Game.bK.getSquare()
    } else {
      kSquare = Game.wK.getSquare()
    }
    const allPieces = Board.getPieces()
    let result = false
    allPieces.forEach((piece: Piece, key: Square) => {
      if (piece.getColor() !== color && piece.canCheck(kSquare)) {
        result = true
      }
    })
    return result
  }

  public static blackKingIsInCheck() {
    return Game.myKingIsInCheck("Black")
  }

  public static whiteKingIsInCheck() {
    return Game.myKingIsInCheck("White")
  }

  public static getLastMove() {
    return Game.moves[Game.moves.length - 1]
  }

  public static whoseMove() {    
    if (Game.moves.length % 2 === 0) {
      return "White"
    } else {
      return "Black"
    }
  }

  public static getMovesLog() {
    let result = ""
    for (let i = 0; i < Game.moves.length; i++) {
      const move = Game.moves[i]
      if (i % 2 === 0) {
        const moveNumber = (i / 2) + 1
        result += moveNumber + ". " + move.toShortString()
      } else {
        result += " " + move.toShortString() + "\n"
      }
    }
    return result
  }

  public static logMoves() {
    console.log(Game.getMovesLog())
  }

  private static moves: Move[] = []

}
