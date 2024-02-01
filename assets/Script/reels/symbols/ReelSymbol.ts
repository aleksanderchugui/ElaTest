import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;

@ccclass
export default class ReelSymbol extends cc.Sprite {
    @property()
    id = 0;
    symbolAnimation: cc.Tween = null;
    protected onLoad() {
        this.symbolAnimation = cc.tween(this.node)
            .repeatForever(cc.tween()
                .to(0.6, { scale: 0.6 })
                .to(0.6, { scale: 0.45 }));
    }

    startAnimation(): void {
        this.symbolAnimation.start();
    }

    stopAnimation(): void {
        this.symbolAnimation.stop();
        this.node.scale = 0.45;
    }
}