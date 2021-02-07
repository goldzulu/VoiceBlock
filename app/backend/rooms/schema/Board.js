"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const schema_1 = require("@colyseus/schema");
class Board extends schema_1.Schema {
    constructor(rows = 20, cols = 10) {
        super();
        this.rows = rows;
        this.cols = cols;
        this.values = new schema_1.ArraySchema(...(new Array(rows * cols).fill(0)));
    }
}
__decorate([
    schema_1.type(["number"])
], Board.prototype, "values", void 0);
__decorate([
    schema_1.type("number")
], Board.prototype, "rows", void 0);
__decorate([
    schema_1.type("number")
], Board.prototype, "cols", void 0);
exports.Board = Board;
//# sourceMappingURL=Board.js.map