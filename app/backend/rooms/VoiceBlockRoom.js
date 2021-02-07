"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceBlockRoom = void 0;
const colyseus_1 = require("colyseus");
const GameState_1 = require("./schema/GameState");
const Position_1 = require("./schema/Position");
const validation_1 = require("./validation/validation");
const mutations_1 = require("./schema/mutations");
const VoiceBlock_1 = require("./schema/VoiceBlock");
const scoring_1 = require("./scoring");
class VoiceBlockRoom extends colyseus_1.Room {
    constructor() {
        super(...arguments);
        this.DEFAULT_ROWS = 20;
        this.DEFAULT_COLS = 10;
        this.DEFAULT_LEVEL = 0;
        this.loopFunction = () => {
            const nextPosition = this.dropVoiceBlock();
            this.moveOrFreezeVoiceBlock(nextPosition);
            const completedLines = this.detectCompletedLines();
            this.updateClearedLines(completedLines);
            this.updateTotalPoints(completedLines);
            this.updateBoard(completedLines);
            this.checkNextLevel();
        };
    }
    dropVoiceBlock() {
        return new Position_1.Position(this.state.currentPosition.row + 1, this.state.currentPosition.col);
    }
    detectCompletedLines() {
        let completedLines = [];
        for (let boardRow = this.state.board.rows - 1; boardRow >= 0; --boardRow) {
            if (validation_1.isRowEmpty(this.state.board, boardRow)) {
                break;
            }
            if (validation_1.isRowCompleted(this.state.board, boardRow)) {
                completedLines.push(boardRow);
            }
        }
        return completedLines;
    }
    updateBoard(completedLines) {
        for (let rowIdx = 0; rowIdx < completedLines.length; ++rowIdx) {
            mutations_1.deleteRowsFromBoard(this.state.board, completedLines[rowIdx] + rowIdx);
            mutations_1.addEmptyRowToBoard(this.state.board);
        }
    }
    dropNewVoiceBlock() {
        this.state.currentPosition = new Position_1.Position(0, 5);
        this.state.currentBlock = this.state.nextBlock.clone();
        this.state.nextBlock = VoiceBlock_1.getRandomBlock();
    }
    checkGameOver() {
        if (validation_1.collidesWithBoard(this.state.board, this.state.currentBlock, this.state.currentPosition)) {
            this.gameLoop.clear();
        }
    }
    moveOrFreezeVoiceBlock(nextPosition) {
        if (!validation_1.isBottomOutOfBounds(this.state.board, this.state.currentBlock, nextPosition) &&
            !validation_1.collidesWithBoard(this.state.board, this.state.currentBlock, nextPosition)) {
            this.state.currentPosition = nextPosition;
        }
        else {
            mutations_1.freezeCurrentVoiceBlock(this.state.board, this.state.currentBlock, this.state.currentPosition);
            this.dropNewVoiceBlock();
            this.checkGameOver();
        }
    }
    determineNextLevel() {
        return Math.floor(this.state.clearedLines / 10);
    }
    checkNextLevel() {
        const nextLevel = this.determineNextLevel();
        if (nextLevel > this.state.level) {
            this.state.level = nextLevel;
            this.gameLoop.clear();
            const loopInterval = 1000 / (this.state.level + 1);
            this.gameLoop = this.clock.setInterval(this.loopFunction, loopInterval);
        }
    }
    updateTotalPoints(completedLines) {
        this.state.totalPoints += scoring_1.computeScoreForClearedLines(completedLines.length, this.state.level);
    }
    updateClearedLines(completedLines) {
        this.state.clearedLines += completedLines.length;
    }
    onCreate(options) {
        this.setState(new GameState_1.GameState(this.DEFAULT_ROWS, this.DEFAULT_COLS, this.DEFAULT_LEVEL));
        const loopInterval = 1000 / (this.state.level + 1);
        this.gameLoop = this.clock.setInterval(this.loopFunction, loopInterval);
        this.onMessage("rotate", (client, _) => {
            const rotatedBlock = this.state.currentBlock.rotate();
            const rotatedPosition = validation_1.keepVoiceBlockInsideBounds(this.state.board, rotatedBlock, this.state.currentPosition);
            if (!validation_1.collidesWithBoard(this.state.board, rotatedBlock, rotatedPosition)) {
                this.state.currentBlock = rotatedBlock;
                this.state.currentPosition = rotatedPosition;
            }
        });
        this.onMessage("move", (client, message) => {
            const nextPosition = new Position_1.Position(this.state.currentPosition.row + message.row, this.state.currentPosition.col + message.col);
            if (!validation_1.isLeftOutOfBounds(this.state.board, this.state.currentBlock, nextPosition) &&
                !validation_1.isRightOutOfBounds(this.state.board, this.state.currentBlock, nextPosition) &&
                !validation_1.isBottomOutOfBounds(this.state.board, this.state.currentBlock, nextPosition) &&
                !validation_1.collidesWithBoard(this.state.board, this.state.currentBlock, nextPosition)) {
                this.state.currentPosition = nextPosition;
            }
        });
    }
    onJoin(client, options) { }
    onLeave(client, consented) { }
    onDispose() { }
}
exports.VoiceBlockRoom = VoiceBlockRoom;
//# sourceMappingURL=VoiceBlockRoom.js.map