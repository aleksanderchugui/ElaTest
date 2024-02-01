import property = cc._decorator.property;
import Reel from "./Reel";
import ccclass = cc._decorator.ccclass;
import {WinData} from "../model/WinData";
import {Paylines} from "../model/SymbolsMapping";

@ccclass
export default class Reels extends cc.Component {
    @property({ type: [Reel] })
    items = [];
    @property(cc.Node)
    winlinesView: cc.Node = null;

    // onLoad () {
    //     console.log()
    // }
    onShowWinlines(wins: WinData[]): void{
        wins.forEach(win => {
           const lineFramesNode = this.winlinesView.children[win.winlineId];
           lineFramesNode.children.forEach((frame, index) => {
               if (index < win.count) {
                   frame.opacity = 255;
               }
           });
        });
    }

    animateSymbolsOnWin(wins: WinData[]): void {
        wins.forEach(win => {
            const winlineSymbolsList = Paylines[win.winlineId];
            for (let i = 0; i < win.count; i++) {
                (this.items[i] as Reel).animateSymbol(winlineSymbolsList[i] + 1);
            }
        });
    }

    stopSymbolsAnimation(): void {
        this.items.forEach(item => {
            (item as Reel).stopSymbolAnimation();
        });
    }

    onClearWinlines(): void {
        this.winlinesView.children.forEach(line => {
           line.children.forEach(winFrame => {
               winFrame.opacity = 0;
           });
        });
    }

    // start () {
    //
    // }

    // update (dt) {}
}