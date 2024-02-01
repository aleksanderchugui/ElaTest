// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ReelSymbol from "./symbols/ReelSymbol";
import {SymbolsMapping} from "../model/SymbolsMapping";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Reel extends cc.Component {
    @property()
    id = 0;
    @property({ type: [ReelSymbol] })
    items = [];

    // onLoad () {}

    start () {

    }

    animateSymbol(symbolIndex: number): void {
        (this.items[symbolIndex] as ReelSymbol).startAnimation();
    }

    stopSymbolAnimation(): void {
        this.items.forEach(item => {
            (item as ReelSymbol).stopAnimation();
        });
    }

    startAnimation(stopSymbols: number[]): void {
        const onComplete = cc.tween().call(() => this.onAnimationComplete(stopSymbols));
        cc.tween(this.node)
            .to(1, {y: -500})
            .then(onComplete)
            .start();
    }

    onAnimationComplete(stopSymbols: number[]): void {
        console.log(`reel animation complete, stop symbols: ${stopSymbols}`);
        for (let i = 1; i < 4; i++) {
            this.items[i].id = stopSymbols[i - 1];
            const imageName = `${SymbolsMapping[stopSymbols[i - 1]]}`
            this.items[i].getComponent(cc.Sprite).spriteFrame = cc.assetManager.assets.find(a => a.name === imageName);
        }
        this.node.y = 0;
        if (this.id === 4) {
            this.node.dispatchEvent(new cc.Event.EventCustom('reelsStopped', true));
        }
    }

    // update (dt) {}
}

