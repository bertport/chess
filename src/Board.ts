// the Board knows the positions of the pieces via a map called squares.
import * as chess from "./main"
import { Piece } from "./Piece"
import { Square } from "./Square"

export class Board {

  public static a1: Square = new Square(1, 1)
  public static b1: Square = new Square(2, 1)
  public static c1: Square = new Square(3, 1)
  public static d1: Square = new Square(4, 1)
  public static e1: Square = new Square(5, 1)
  public static f1: Square = new Square(6, 1)
  public static g1: Square = new Square(7, 1)
  public static h1: Square = new Square(8, 1)
  public static a2: Square = new Square(1, 2)
  public static b2: Square = new Square(2, 2)
  public static c2: Square = new Square(3, 2)
  public static d2: Square = new Square(4, 2)
  public static e2: Square = new Square(5, 2)
  public static f2: Square = new Square(6, 2)
  public static g2: Square = new Square(7, 2)
  public static h2: Square = new Square(8, 2)
  public static a3: Square = new Square(1, 3)
  public static b3: Square = new Square(2, 3)
  public static c3: Square = new Square(3, 3)
  public static d3: Square = new Square(4, 3)
  public static e3: Square = new Square(5, 3)
  public static f3: Square = new Square(6, 3)
  public static g3: Square = new Square(7, 3)
  public static h3: Square = new Square(8, 3)
  public static a4: Square = new Square(1, 4)
  public static b4: Square = new Square(2, 4)
  public static c4: Square = new Square(3, 4)
  public static d4: Square = new Square(4, 4)
  public static e4: Square = new Square(5, 4)
  public static f4: Square = new Square(6, 4)
  public static g4: Square = new Square(7, 4)
  public static h4: Square = new Square(8, 4)
  public static a5: Square = new Square(1, 5)
  public static b5: Square = new Square(2, 5)
  public static c5: Square = new Square(3, 5)
  public static d5: Square = new Square(4, 5)
  public static e5: Square = new Square(5, 5)
  public static f5: Square = new Square(6, 5)
  public static g5: Square = new Square(7, 5)
  public static h5: Square = new Square(8, 5)
  public static a6: Square = new Square(1, 6)
  public static b6: Square = new Square(2, 6)
  public static c6: Square = new Square(3, 6)
  public static d6: Square = new Square(4, 6)
  public static e6: Square = new Square(5, 6)
  public static f6: Square = new Square(6, 6)
  public static g6: Square = new Square(7, 6)
  public static h6: Square = new Square(8, 6)
  public static a7: Square = new Square(1, 7)
  public static b7: Square = new Square(2, 7)
  public static c7: Square = new Square(3, 7)
  public static d7: Square = new Square(4, 7)
  public static e7: Square = new Square(5, 7)
  public static f7: Square = new Square(6, 7)
  public static g7: Square = new Square(7, 7)
  public static h7: Square = new Square(8, 7)
  public static a8: Square = new Square(1, 8)
  public static b8: Square = new Square(2, 8)
  public static c8: Square = new Square(3, 8)
  public static d8: Square = new Square(4, 8)
  public static e8: Square = new Square(5, 8)
  public static f8: Square = new Square(6, 8)
  public static g8: Square = new Square(7, 8)
  public static h8: Square = new Square(8, 8)

  public static clear() {
    Board.pieces.forEach((piece: Piece, square: Square) => {
      piece.moveTo(Board.getTable())
      Board.pieces.delete(square)
  });
  }

  public static getSquare(file: chess.BoardFile, rank: chess.BoardRank) {
    let foundIt
    Board.squares.forEach( (square) => {
      if (square.getFile() === file && square.getRank() === rank) {
        foundIt = square
      }
    })
    return foundIt || Board.getTable() //any file and rank not in the squares array is on the table.
  } 

  public static getTable(): Square {
    return Board.table
  }

  public static placePiece(piece: Piece, square: Square) {
    // console.log(`Board.placePiece: ${piece.toString()} on square: ${square.toString()}`)
    if (square !== Board.getTable()) {
      Board.pieces.set(square, piece)
    }    
  }

  public static removePiece(piece: Piece, square: Square) {
    Board.pieces.delete(square)
  }

  public static getPiece(square: Square): Piece | undefined {
    return Board.pieces.get(square)
  }

  public static isUnoccupied(square: Square): boolean {
    return Board.getPiece(square) === undefined
  }
  
  // the squares between start and end (not including start and end) are unoccupied.
  public static pathIsClear(start: Square, end: Square): boolean {
    let clear = true
    if (start.getRank() === end.getRank()) { // horizontal movement
      // console.log("horizontal movement on rank " + start.getRank())
      if (start.getFile() < end.getFile()) { // move to the right
        // console.log("move to the right")
        for (let i: chess.BoardFile = start.getFile() + 1; i < end.getFile(); i++) {
          // console.log("checking " + i)
          if (Board.getPiece(Board.getSquare(i, start.getRank())) !== undefined) {
            // console.log("not clear")
            clear = false
          }
        }
      } else { // move to the left (or no path movement at all)
        for (let i: chess.BoardFile = start.getFile() - 1; i > end.getFile(); i--) {
          if (Board.getPiece(Board.getSquare(i, start.getRank())) !== undefined) {
            clear = false
          }
        }
      }
    } else if (start.getFile() === end.getFile()) { // vertical movement
      // console.log("vertical movement on file " + start.getFile())
      if (start.getRank() < end.getRank()) { // move up
        for (let i: chess.BoardRank = start.getRank() + 1; i < end.getRank(); i++) {
          if (Board.getPiece(Board.getSquare(start.getFile(), i)) !== undefined) {
            clear = false
          }
        }
      } else { // move down
        // console.log("move down from " + start.getRank() + " to " + end.getRank())
        for (let i: chess.BoardRank = start.getRank() - 1; i > end.getRank(); i--) {
          // console.log("checking rank " + i)
          if (Board.getPiece(Board.getSquare(start.getFile(), i)) !== undefined) {
            clear = false
          }
        }
      }
    } else if (Math.abs(start.getFile() - end.getFile()) === Math.abs(start.getRank() - end.getRank())) {
      // console.log("diagonal movement")
      if (start.getFile() > end.getFile()) { // move diagonal left
        // console.log("to the left from " + start.getFile() + " to " + end.getFile())
        if (start.getRank() > end.getRank()) { // move left and down
          // console.log("and down")
          for (let i: chess.BoardFile = start.getFile() - 1, j: chess.BoardRank = start.getRank() - 1;
              i > end.getFile() && j > end.getRank(); i--, j--) {
            if (Board.getPiece(Board.getSquare(i, j)) !== undefined) {
              clear = false
            }
          }
        } else { //move left and up
          // console.log("and up from " + start.getRank() + " to " + end.getRank())
          for (let i: chess.BoardFile = start.getFile() - 1, j: chess.BoardRank = start.getRank() + 1;
              i > end.getFile() && j < end.getRank(); i--, j++) {
                // console.log("looking for a piece on " + i + ", " + j)
                if (Board.getPiece(Board.getSquare(i, j)) !== undefined) {
              clear = false
            }
          }
        }
      } else { // move diagonal right
        if (start.getRank() > end.getRank()) { // move right and down
          for (let i: chess.BoardFile = start.getFile() + 1, j: chess.BoardRank = start.getRank() - 1;
            i < end.getFile() && j > end.getRank(); i++, j--) {
              if (Board.getPiece(Board.getSquare(i, j)) !== undefined) {
                clear = false
              }
            }
        } else { // move right and up
          for (let i: chess.BoardFile = start.getFile() + 1, j: chess.BoardRank = start.getRank() + 1;
            i < end.getFile() && j < end.getRank(); i++, j++) {
              if (Board.getPiece(Board.getSquare(i, j)) !== undefined) {
                clear = false
              }
            }
        }
      }
    }
    return clear
  }

  public static getPieces() {
    return Board.pieces
  }

  public static logPieces() {
    console.log("squares with pieces on them:")
    Board.pieces.forEach((value: Piece, key: Square) => {
      console.log(value.toString());
  });
  }
  
  // tslint:disable-next-line: member-ordering
  private static squares: Square[] = [
    Board.a1, Board.b1, Board.c1, Board.d1, Board.e1, Board.f1, Board.g1, Board.h1,
    Board.a2, Board.b2, Board.c2, Board.d2, Board.e2, Board.f2, Board.g2, Board.h2,
    Board.a3, Board.b3, Board.c3, Board.d3, Board.e3, Board.f3, Board.g3, Board.h3,
    Board.a4, Board.b4, Board.c4, Board.d4, Board.e4, Board.f4, Board.g4, Board.h4,
    Board.a5, Board.b5, Board.c5, Board.d5, Board.e5, Board.f5, Board.g5, Board.h5,
    Board.a6, Board.b6, Board.c6, Board.d6, Board.e6, Board.f6, Board.g6, Board.h6,
    Board.a7, Board.b7, Board.c7, Board.d7, Board.e7, Board.f7, Board.g7, Board.h7,
    Board.a8, Board.b8, Board.c8, Board.d8, Board.e8, Board.f8, Board.g8, Board.h8,
  ]

  private static pieces: Map<Square, Piece> = new Map<Square, Piece>()

  // where pieces go when they are removed from the board
  private static table: Square = new Square(9, 9)

}
