"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeScoreForClearedLines = void 0;
const baseScores = new Map([
    [0, 0],
    [1, 40],
    [2, 100],
    [3, 300],
    [4, 1200]
]);
exports.computeScoreForClearedLines = (clearedLines, level) => {
    return baseScores.get(clearedLines) * (level + 1);
};
//# sourceMappingURL=scoring.js.map