"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomBlock = exports.VoiceBlock = void 0;
const schema_1 = require("@colyseus/schema");
const Board_1 = require("./Board");
class VoiceBlock extends Board_1.Board {
    constructor() {
        super();
        this.currentOrientation = 0;
    }
    _rotate(orientation) {
        this.currentOrientation = orientation;
        this.values = new schema_1.ArraySchema(...this.orientations[this.currentOrientation]);
    }
}
__decorate([
    schema_1.type("number")
], VoiceBlock.prototype, "color", void 0);
exports.VoiceBlock = VoiceBlock;
const BLOCKS = [
    class O extends VoiceBlock {
        constructor() {
            super();
            this.orientations = [[1, 1, 1, 1]];
            this.rows = 2;
            this.cols = 2;
            this.values = new schema_1.ArraySchema(...this.orientations[this.currentOrientation]);
            this.color = 0xcccc00;
        }
        rotate() {
            const newBlock = new O();
            const nextOrientation = (this.currentOrientation + 1) % this.orientations.length;
            newBlock._rotate(nextOrientation);
            return newBlock;
        }
    },
    class T extends VoiceBlock {
        constructor() {
            super();
            this.orientations = [
                [0, 1, 0, 1, 1, 1, 0, 0, 0],
                [0, 1, 0, 0, 1, 1, 0, 1, 0],
                [0, 0, 0, 1, 1, 1, 0, 1, 0],
                [0, 1, 0, 1, 1, 0, 0, 1, 0],
            ];
            this.rows = 3;
            this.cols = 3;
            this.values = new schema_1.ArraySchema(...this.orientations[this.currentOrientation]);
            this.color = 0xff00ff;
        }
        rotate() {
            const newBlock = new T();
            const nextOrientation = (this.currentOrientation + 1) % this.orientations.length;
            newBlock._rotate(nextOrientation);
            return newBlock;
        }
    },
    class I extends VoiceBlock {
        constructor() {
            super();
            this.orientations = [
                [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
            ];
            this.rows = 4;
            this.cols = 4;
            this.values = new schema_1.ArraySchema(...this.orientations[this.currentOrientation]);
            this.color = 0x00ffff;
        }
        rotate() {
            const newBlock = new I();
            const nextOrientation = (this.currentOrientation + 1) % this.orientations.length;
            newBlock._rotate(nextOrientation);
            return newBlock;
        }
    },
    class Z extends VoiceBlock {
        constructor() {
            super();
            this.orientations = [
                [1, 1, 0, 0, 1, 1, 0, 0, 0],
                [0, 0, 1, 0, 1, 1, 0, 1, 0],
            ];
            this.rows = 3;
            this.cols = 3;
            this.values = new schema_1.ArraySchema(...this.orientations[this.currentOrientation]);
            this.color = 0xff4d4d;
        }
        rotate() {
            const newBlock = new Z();
            const nextOrientation = (this.currentOrientation + 1) % this.orientations.length;
            newBlock._rotate(nextOrientation);
            return newBlock;
        }
    },
    class S extends VoiceBlock {
        constructor() {
            super();
            this.orientations = [
                [0, 1, 1, 1, 1, 0, 0, 0, 0],
                [1, 0, 0, 1, 1, 0, 0, 1, 0],
            ];
            this.rows = 3;
            this.cols = 3;
            this.values = new schema_1.ArraySchema(...this.orientations[this.currentOrientation]);
            this.color = 0xffff00;
        }
        rotate() {
            const newBlock = new S();
            const nextOrientation = (this.currentOrientation + 1) % this.orientations.length;
            newBlock._rotate(nextOrientation);
            return newBlock;
        }
    },
    class L extends VoiceBlock {
        constructor() {
            super();
            this.orientations = [
                [0, 0, 1, 1, 1, 1, 0, 0, 0],
                [0, 1, 0, 0, 1, 0, 0, 1, 1],
                [0, 0, 0, 1, 1, 1, 1, 0, 0],
                [1, 1, 0, 0, 1, 0, 0, 1, 0],
            ];
            this.rows = 3;
            this.cols = 3;
            this.values = new schema_1.ArraySchema(...this.orientations[this.currentOrientation]);
            this.color = 0xffc14d;
        }
        rotate() {
            const newBlock = new L();
            const nextOrientation = (this.currentOrientation + 1) % this.orientations.length;
            newBlock._rotate(nextOrientation);
            return newBlock;
        }
    },
    class J extends VoiceBlock {
        constructor() {
            super();
            this.orientations = [
                [1, 0, 0, 1, 1, 1, 0, 0, 0],
                [0, 1, 1, 0, 1, 0, 0, 1, 0],
                [0, 0, 0, 1, 1, 1, 0, 0, 1],
                [0, 1, 0, 0, 1, 0, 1, 1, 0],
            ];
            this.rows = 3;
            this.cols = 3;
            this.values = new schema_1.ArraySchema(...this.orientations[this.currentOrientation]);
            this.color = 0x8080ff;
        }
        rotate() {
            const newBlock = new J();
            const nextOrientation = (this.currentOrientation + 1) % this.orientations.length;
            newBlock._rotate(nextOrientation);
            return newBlock;
        }
    },
];
exports.getRandomBlock = () => {
    const _getRandomBlock = (type) => {
        return new type();
    };
    const nextBlock = BLOCKS[Math.floor(Math.random() * BLOCKS.length)];
    return _getRandomBlock(nextBlock);
};
//# sourceMappingURL=VoiceBlock.js.map