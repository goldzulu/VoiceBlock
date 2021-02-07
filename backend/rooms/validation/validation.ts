import {Position} from "../schema/Position";
import {queryByRowAndColumn} from "../schema/mutations";
import {Board} from "../schema/Board";
import {VoiceBlock} from "../schema/VoiceBlock";

/**
 * isLeftOutOfBounds checks whether a given VoiceBlock is out of bounds of a board at its current (top-left) position
 * We determine how many columns are out of bounds (position.col < 0) and afterwards check each VoiceBlock column which sits outside the
 * board whether it is a "valid" VoiceBlock part (has a non-zero value)
 *
 * If so, we're out of bounds
 *
 * @param board The game board we don't want to exceed
 * @param voiceblock The VoiceBlock which might be out of bounds
 * @param position The current top-left position of our VoiceBlock
 */
export const isLeftOutOfBounds = (board: Board, voiceblock: VoiceBlock, position: Position): boolean => {
    if (position.col >= 0) {
        return false;
    }

    const blockElement = queryByRowAndColumn(voiceblock);

    const offset = -position.col;
    for (let col = 0; col < offset; ++col) {
        for (let row = 0; row < voiceblock.rows; ++row) {
            if (blockElement(row, col) !== 0) {
                return true;
            }
        }
    }
    return false;
}

/**
 * isRightOutOfBounds checks whether a given VoiceBlock is out of bounds of a board at its current (top-left) position
 * We determine how many columns are out of bounds (position.col + voiceblock.cols - board.cols) and afterwards check each VoiceBlock column which sits outside the
 * board whether it is a "valid" VoiceBlock part (has a non-zero value)
 *
 * If so, we're out of bounds
 *
 * @param board The game board we don't want to exceed
 * @param voiceblock The VoiceBlock which might be out of bounds
 * @param position The current top-left position of our VoiceBlock
 */
export const isRightOutOfBounds = (board: Board, voiceblock: VoiceBlock, position: Position): boolean => {
    if (position.col + voiceblock.cols < board.cols) {
        return false;
    }

    const blockElement = queryByRowAndColumn(voiceblock);
    const offsetFromBoard = position.col + voiceblock.cols - board.cols;
    const offset = voiceblock.cols - 1 - offsetFromBoard;

    for (let col = voiceblock.cols - 1; col > offset; --col) {
        for (let row = 0; row < voiceblock.rows; ++row) {
            if (blockElement(row, col) !== 0) {
                return true;
            }
        }
    }
    return false;
}

/**
 * isBottomOutOfBounds checks whether a given VoiceBlock is out of bounds of a board at its current (top-left) position
 * We determine how many rows are out of bounds (position.row + voiceblock.rows - board.rows) and afterwards check each VoiceBlock row which sits outside the
 * board whether it is a "valid" VoiceBlock part (has a non-zero value)
 *
 * If so, we're out of bounds
 *
 * @param board The game board we don't want to exceed
 * @param voiceblock The VoiceBlock which might be out of bounds
 * @param position The current top-left position of our VoiceBlock
 */
export const isBottomOutOfBounds = (board: Board, voiceblock: VoiceBlock, position: Position): boolean => {
    if (position.row + voiceblock.rows < board.rows) {
        return false;
    }

    const blockElement = queryByRowAndColumn(voiceblock);

    const offsetFromBoard = position.row + voiceblock.rows - board.rows;
    const offset = voiceblock.rows - 1 - offsetFromBoard;

    for (let row = voiceblock.rows - 1; row > offset; --row) {
        for (let col = 0; col < voiceblock.cols; ++col) {
            if (blockElement(row, col) !== 0) {
                return true;
            }
        }
    }
    return false;
}

export const collidesWithBoard = (board: Board, voiceblock: VoiceBlock, position: Position): boolean => {
    const blockElement = queryByRowAndColumn(voiceblock);
    const boardElement = queryByRowAndColumn(board);

    for (let boardRow = position.row; boardRow < position.row + voiceblock.rows; ++boardRow) {
        for (let boardCol = position.col; boardCol < position.col + voiceblock.cols; ++boardCol) {
            const blockRow = boardRow - position.row;
            const blockCol = boardCol - position.col;
            if (blockElement(blockRow, blockCol) !== 0 && boardElement(boardRow, boardCol) !== 0) {
                return true;
            }
        }
    }
    return false;
}

/**
 * After rotating a block it might happen that, given its current position, it moves out of bounds
 * keepVoiceBlockInsideBounds will move a VoiceBlock to the inside of our game board until it is
 * no longer out of bounds on either of left, right or bottom side
 * @private
 */
export const keepVoiceBlockInsideBounds = (board: Board, voiceblock: VoiceBlock, position: Position): Position => {
    const newPosition = position.clone();
    while (isLeftOutOfBounds(board, voiceblock, newPosition)) {
        newPosition.col += 1;
    }
    while (isRightOutOfBounds(board, voiceblock, newPosition)) {
        newPosition.col -= 1;
    }
    while (isBottomOutOfBounds(board, voiceblock, newPosition)) {
        newPosition.row -= 1;
    }
    return newPosition;
}

export const isRowCompleted = (board: Board, rowIndex: number) => {
    const boardElement = queryByRowAndColumn(board);

    for (let col = 0; col < board.cols; ++col) {
        if (boardElement(rowIndex, col) === 0) {
            return false;
        }
    }
    return true;
}

export const isRowEmpty = (board: Board, rowIndex: number) => {
    const boardElement = queryByRowAndColumn(board);

    for (let col = 0; col < board.cols; ++col) {
        if (boardElement(rowIndex, col) !== 0) {
            return false;
        }
    }
    return true;
}
