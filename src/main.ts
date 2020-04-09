
export type Color = "Black" | "White"
// had to make these 'number' to be able to iterate over them in Board.pathIsClear
export type BoardRank = number // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type BoardFile = BoardRank
export const BOARD_RANKS: BoardRank[] = [1, 2, 3, 4, 5, 6, 7, 8]
export const BOARD_FILES: BoardFile[] = [1, 2, 3, 4, 5, 6, 7, 8]
export const BOARD_ALGEBRAIC_FILES: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
