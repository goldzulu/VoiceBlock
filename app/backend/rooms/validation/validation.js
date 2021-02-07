"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRowEmpty = exports.isRowCompleted = exports.keepVoiceBlockInsideBounds = exports.collidesWithBoard = exports.isBottomOutOfBounds = exports.isRightOutOfBounds = exports.isLeftOutOfBounds = void 0;
const mutations_1 = require("../schema/mutations");
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
exports.isLeftOutOfBounds = (board, voiceblock, position) => {
    if (position.col >= 0) {
        return false;
    }
    const blockElement = mutations_1.queryByRowAndColumn(voiceblock);
    const offset = -position.col;
    for (let col = 0; col < offset; ++col) {
        for (let row = 0; row < voiceblock.rows; ++row) {
            if (blockElement(row, col) !== 0) {
                return true;
            }
        }
    }
    return false;
};
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
exports.isRightOutOfBounds = (board, voiceblock, position) => {
    if (position.col + voiceblock.cols < board.cols) {
        return false;
    }
    const blockElement = mutations_1.queryByRowAndColumn(voiceblock);
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
};
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
exports.isBottomOutOfBounds = (board, voiceblock, position) => {
    if (position.row + voiceblock.rows < board.rows) {
        return false;
    }
    const blockElement = mutations_1.queryByRowAndColumn(voiceblock);
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
};
exports.collidesWithBoard = (board, voiceblock, position) => {
    const blockElement = mutations_1.queryByRowAndColumn(voiceblock);
    const boardElement = mutations_1.queryByRowAndColumn(board);
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
};
/**
 * After rotating a block it might happen that, given its current position, it moves out of bounds
 * keepVoiceBlockInsideBounds will move a VoiceBlock to the inside of our game board until it is
 * no longer out of bounds on either of left, right or bottom side
 * @private
 */
exports.keepVoiceBlockInsideBounds = (board, voiceblock, position) => {
    const newPosition = position.clone();
    while (exports.isLeftOutOfBounds(board, voiceblock, newPosition)) {
        newPosition.col += 1;
    }
    while (exports.isRightOutOfBounds(board, voiceblock, newPosition)) {
        newPosition.col -= 1;
    }
    while (exports.isBottomOutOfBounds(board, voiceblock, newPosition)) {
        newPosition.row -= 1;
    }
    return newPosition;
};
exports.isRowCompleted = (board, rowIndex) => {
    const boardElement = mutations_1.queryByRowAndColumn(board);
    for (let col = 0; col < board.cols; ++col) {
        if (boardElement(rowIndex, col) === 0) {
            return false;
        }
    }
    return true;
};
exports.isRowEmpty = (board, rowIndex) => {
    const boardElement = mutations_1.queryByRowAndColumn(board);
    for (let col = 0; col < board.cols; ++col) {
        if (boardElement(rowIndex, col) !== 0) {
            return false;
        }
    }
    return true;
};
//# sourceMappingURL=validation.js.map