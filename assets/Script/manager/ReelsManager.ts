import {WinData} from "../model/WinData";
import {Paylines, SymbolsPayouts} from "../model/SymbolsMapping";

export default class ReelsManager {
    stopSymbols: [number[], number[], number[], number[], number[]];

    generateStopSymbols(stopSymbols?: [number[], number[], number[], number[], number[]]): [number[], number[], number[], number[], number[]] {
        if (!stopSymbols) {
            this.stopSymbols = [
                [this.generateRandomSymbol(),this.generateRandomSymbol(),this.generateRandomSymbol()],
                [this.generateRandomSymbol(),this.generateRandomSymbol(),this.generateRandomSymbol()],
                [this.generateRandomSymbol(),this.generateRandomSymbol(),this.generateRandomSymbol()],
                [this.generateRandomSymbol(),this.generateRandomSymbol(),this.generateRandomSymbol()],
                [this.generateRandomSymbol(),this.generateRandomSymbol(),this.generateRandomSymbol()]
            ];
        } else {
            this.stopSymbols = stopSymbols;
        }
        return this.stopSymbols;
    }

    calculateWins(): WinData[] {
        const symbolsOnWinlines = [];
        Object.values(Paylines).forEach((payline, index) => {
            const winlineSymbolsList = [];
            payline.forEach((p, i) => {
                const symbol = this.stopSymbols[i][p];
                winlineSymbolsList.push(symbol);
            });
            symbolsOnWinlines.push(winlineSymbolsList);
        });
        console.log(JSON.stringify(symbolsOnWinlines));
        const winDataList: WinData[] = [];
        for (let i = 0; i < symbolsOnWinlines.length; i++) {
            let sameSymbolCount = 1;
            for (let j = 0; j < symbolsOnWinlines[i].length - 1; j++) {
                const first = symbolsOnWinlines[i][0];
                const next = symbolsOnWinlines[i][j + 1];
                if (first === next || next === 9) {
                    sameSymbolCount++;
                    if (sameSymbolCount === 5) {
                        winDataList.push({
                            symbolId: first,
                            winlineId: i,
                            count: sameSymbolCount,
                            winAmount: this.calculateWinAmount(first, sameSymbolCount)
                        });
                    }
                } else {
                    if (sameSymbolCount > 2) {
                        winDataList.push({
                            symbolId: first,
                            winlineId: i,
                            count: sameSymbolCount,
                            winAmount: this.calculateWinAmount(first, sameSymbolCount)
                        });
                    }
                    break;
                }
            }
        }
        console.log(JSON.stringify(winDataList));
        return winDataList;
    }

    private calculateWinAmount( symbolId: number, count: number): number {
        return SymbolsPayouts[symbolId][count - 3];
    }

    private generateRandomSymbol(): number {
        return Math.floor(Math.random() * 10);
    }
}

