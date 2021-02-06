import { Room, Delayed, Client } from "colyseus";
import { GameState } from "./schema/GameState";
import { Position } from "./schema/Position";
import {
  collidesWithBoard,
  isBottomOutOfBounds,
  isLeftOutOfBounds,
  isRightOutOfBounds,
  isRowCompleted,
  isRowEmpty,
  keepVoiceBlockInsideBounds,
} from "./validation/validation";

import {
  addEmptyRowToBoard,
  deleteRowsFromBoard,
  freezeCurrentVoiceBlock,
} from "./schema/mutations";
import { getRandomBlock } from "./schema/VoiceBlock";
import { computeScoreForClearedLines } from "./scoring";
import { Movement } from "../messages/movement";

export class VoiceBlockRoom extends Room<GameState> {
  private DEFAULT_ROWS = 20;
  private DEFAULT_COLS = 10;
  private DEFAULT_LEVEL = 0;

  private gameLoop!: Delayed;

  private loopFunction = () => {
    const nextPosition = this.dropVoiceBlock();
    this.moveOrFreezeVoiceBlock(nextPosition);

    const completedLines = this.detectCompletedLines();
    this.updateClearedLines(completedLines);
    this.updateTotalPoints(completedLines);
    this.updateBoard(completedLines);
    this.checkNextLevel();
  };

  private dropVoiceBlock() {
    return new Position(
      this.state.currentPosition.row + 1,
      this.state.currentPosition.col
    );
  }

  private detectCompletedLines() {
    let completedLines = [];
    for (let boardRow = this.state.board.rows - 1; boardRow >= 0; --boardRow) {
      if (isRowEmpty(this.state.board, boardRow)) {
        break;
      }

      if (isRowCompleted(this.state.board, boardRow)) {
        completedLines.push(boardRow);
      }
    }
    return completedLines;
  }

  private updateBoard(completedLines: number[]) {
    for (let rowIdx = 0; rowIdx < completedLines.length; ++rowIdx) {
      deleteRowsFromBoard(this.state.board, completedLines[rowIdx] + rowIdx);
      addEmptyRowToBoard(this.state.board);
    }
  }

  private dropNewVoiceBlock() {
    this.state.currentPosition = new Position(0, 5);
    this.state.currentBlock = this.state.nextBlock.clone();
    this.state.nextBlock = getRandomBlock();
  }

  private checkGameOver() {
    if (
      collidesWithBoard(
        this.state.board,
        this.state.currentBlock,
        this.state.currentPosition
      )
    ) {
      this.gameLoop.clear();
    }
  }

  private moveOrFreezeVoiceBlock(nextPosition: Position) {
    if (
      !isBottomOutOfBounds(
        this.state.board,
        this.state.currentBlock,
        nextPosition
      ) &&
      !collidesWithBoard(
        this.state.board,
        this.state.currentBlock,
        nextPosition
      )
    ) {
      this.state.currentPosition = nextPosition;
    } else {
      freezeCurrentVoiceBlock(
        this.state.board,
        this.state.currentBlock,
        this.state.currentPosition
      );
      this.dropNewVoiceBlock();
      this.checkGameOver();
    }
  }

  private determineNextLevel(): number {
    return Math.floor(this.state.clearedLines / 10);
  }

  private checkNextLevel() {
    const nextLevel = this.determineNextLevel();
    if (nextLevel > this.state.level) {
      this.state.level = nextLevel;
      this.gameLoop.clear();
      const loopInterval = 1000 / (this.state.level + 1);
      this.gameLoop = this.clock.setInterval(this.loopFunction, loopInterval);
    }
  }

  private updateTotalPoints(completedLines: any[]) {
    this.state.totalPoints += computeScoreForClearedLines(
      completedLines.length,
      this.state.level
    );
  }

  private updateClearedLines(completedLines: any[]) {
    this.state.clearedLines += completedLines.length;
  }

  onCreate(options: any) {
    this.setState(new GameState(this.DEFAULT_ROWS, this.DEFAULT_COLS, this.DEFAULT_LEVEL));
        const loopInterval = 1000 / (this.state.level + 1);
        this.gameLoop = this.clock.setInterval(this.loopFunction, loopInterval);

        this.onMessage("rotate", (client, _) => {
            const rotatedBlock = this.state.currentBlock.rotate();
            const rotatedPosition = keepVoiceBlockInsideBounds(this.state.board, rotatedBlock, this.state.currentPosition);
            if (!collidesWithBoard(this.state.board, rotatedBlock, rotatedPosition)) {
                this.state.currentBlock = rotatedBlock;
                this.state.currentPosition = rotatedPosition;
            }
        });
        this.onMessage("move", (client, message: Movement) => {
            const nextPosition = new Position(
                this.state.currentPosition.row + message.row,
                this.state.currentPosition.col + message.col
            );
            if (
                !isLeftOutOfBounds(this.state.board, this.state.currentBlock, nextPosition) &&
                !isRightOutOfBounds(this.state.board, this.state.currentBlock, nextPosition) &&
                !isBottomOutOfBounds(this.state.board, this.state.currentBlock, nextPosition) &&
                !collidesWithBoard(this.state.board, this.state.currentBlock, nextPosition)
            ) {
                this.state.currentPosition = nextPosition;
            }
        });
  }

  onJoin(client: Client, options: any) {}

  onLeave(client: Client, consented: boolean) {}

  onDispose() {}
}
