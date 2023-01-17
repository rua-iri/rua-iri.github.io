

class GameScene extends Phaser.Scene{


    constructor() {
        super("playGame");
    }


    preload() {

    }


    create() {

        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(config.width, 0);
        graphics.lineTo(config.width, 20);
        graphics.lineTo(0, 20);
        graphics.lineTo(0, 0);
        graphics.closePath();
        graphics.fillPath();

        this.score = 0;
        this.scoreLabel = this.add.text(10, 5, ("SCORE: " + this.zeroPad(this.score, 6)));


    }


    update() {

    }



    zeroPad(number, size) {
        var stringNumber = String(number);
        while(stringNumber.length < (size || 2)) {
            stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }

}