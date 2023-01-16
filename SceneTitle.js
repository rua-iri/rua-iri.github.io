

class SceneTitle extends Phaser.Scene {


    constructor() {
        super("bootgame");
    }

    // load assets into the game for title
    preload() {
        this.load.image("labBuilding", "assets/background/lab_pxart.png");
    }

    create() {
        this.labBuilding = this.add.image(400, 300, "labBuilding");
    }

    update() {

    }

}