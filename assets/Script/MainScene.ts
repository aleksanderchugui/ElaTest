// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import {SymbolsMapping} from "./model/SymbolsMapping";
import Reels from "./reels/Reels";
import Reel from "./reels/Reel";
import ReelsManager from "./manager/ReelsManager";
import {WinData} from "./model/WinData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainScene extends cc.Component {

    @property(cc.Button)
    spinButton: cc.Button = null;
    @property(cc.Label)
    winLabelAmount: cc.Label = null;
    @property(cc.Component)
    reels: Reels = null;
    reelsManager: ReelsManager = new ReelsManager();

    onLoad (): void {
        this.spinButton.node.on('click', this.onSpinButtonClick, this);
        this.node.on('reelsStopped', (event) => {
            this.onReelsStopped(event);
        });
    }

    onReelsStopped(event): void {
        console.log('reels stopped event handled');
        event.stopPropagation();
        const wins = this.reelsManager.calculateWins();
        if (wins.length) {
            this.winLabelAmount.string = this.calculateTotalWin(wins);
            this.reels.onShowWinlines(wins);
            this.reels.animateSymbolsOnWin(wins);
        }
    }

    private calculateTotalWin(wins: WinData[]): string {
        let totalWin = 0;
        wins.forEach(w => {
           totalWin += w.winAmount;
        });
        return `\$${totalWin}`;
    }

    onSpinButtonClick(): void {
        console.log(`on spin button clicked`);
        const stopSymbols = this.reelsManager.generateStopSymbols();
        console.log(`${JSON.stringify(stopSymbols)}`);
        this.winLabelAmount.string = '';
        this.reels.onClearWinlines();
        this.reels.stopSymbolsAnimation();
        this.reels.items.forEach((reel, i) => {
            setTimeout(() => {
                reel.startAnimation(stopSymbols[i]);
            }, i * 300);
        });
    }

    start (): void {

    }

    // update (dt) {}
}
