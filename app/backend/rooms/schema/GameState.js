"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameState = void 0;
const schema_1 = require("@colyseus/schema");
const VoiceBlock_1 = require("./VoiceBlock");
const Position_1 = require("./Position");
const Board_1 = require("./Board");
class GameState extends schema_1.Schema {
    constructor(rows = 20, cols = 10, initialLevel = 0) {
        super();
        this.board = new Board_1.Board(rows, cols);
        this.currentBlock = VoiceBlock_1.getRandomBlock();
        this.currentPosition = new Position_1.Position(0, Math.floor((this.board.cols / 2) - (this.currentBlock.cols / 2)));
        this.nextBlock = VoiceBlock_1.getRandomBlock();
        this.level = initialLevel;
        this.clearedLines = 0;
        this.totalPoints = 0;
        this.running = false;
    }
}
__decorate([
    schema_1.type(Board_1.Board)
], GameState.prototype, "board", void 0);
__decorate([
    schema_1.type(VoiceBlock_1.VoiceBlock)
], GameState.prototype, "currentBlock", void 0);
__decorate([
    schema_1.type(Position_1.Position)
], GameState.prototype, "currentPosition", void 0);
__decorate([
    schema_1.type(VoiceBlock_1.VoiceBlock)
], GameState.prototype, "nextBlock", void 0);
__decorate([
    schema_1.type("number")
], GameState.prototype, "clearedLines", void 0);
__decorate([
    schema_1.type("number")
], GameState.prototype, "level", void 0);
__decorate([
    schema_1.type("number")
], GameState.prototype, "totalPoints", void 0);
__decorate([
    schema_1.type("boolean")
], GameState.prototype, "running", void 0);
exports.GameState = GameState;
//# sourceMappingURL=GameState.js.map