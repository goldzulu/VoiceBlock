"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.freezeCurrentVoiceBlock = exports.deleteRowsFromBoard = exports.addEmptyRowToBoard = exports.setValueAtRowAndColumn = exports.queryByRowAndColumn = void 0;
exports.queryByRowAndColumn = (board) => (row, col) => {
    return board.values[row * board.cols + col];
};
exports.setValueAtRowAndColumn = (board) => (row, col, value) => {
    board.values[row * board.cols + col] = value;
};
exports.addEmptyRowToBoard = (board) => {
    const emptyRow = new Array(board.cols).fill(0);
    addRowToBoard(board, emptyRow);
};
const addRowToBoard = (board, newRow) => {
    board.values.unshift(...newRow);
};
exports.deleteRowsFromBoard = (board, rowToDelete, amountOfRowsToDelete = 1) => {
    board.values.splice(rowToDelete * board.cols, board.cols * amountOfRowsToDelete);
};
exports.freezeCurrentVoiceBlock = (board, voiceblock, position) => {
    const setBoardValue = exports.setValueAtRowAndColumn(board);
    const voiceblockElement = exports.queryByRowAndColumn(voiceblock);
    for (let voiceblockRow = 0; voiceblockRow < voiceblock.rows; ++voiceblockRow) {
        for (let voiceblockCol = 0; voiceblockCol < voiceblock.cols; ++voiceblockCol) {
            if (voiceblockElement(voiceblockRow, voiceblockCol) !== 0) {
                setBoardValue(position.row + voiceblockRow, position.col + voiceblockCol, voiceblock.color);
            }
        }
    }
};
//# sourceMappingURL=mutations.js.map