

class SceneTitle extends Phaser.Scene {


    constructor() {
        super("bootgame");
    }

    // load assets into the game for title
    preload() {
        this.load.image("labBuilding", "assets/background/labpxArt.png");
        this.load.image("paraMountain", "assets/background/parallax-mountain-bg.png")
        this.load.image("bigMountain", "assets/background/parallax-mountain-montain-far.png");
        this.load.image("bgTrees", "assets/background/trees.png");
        this.load.image("farMountain", "assets/background/far-mountains.png");
        this.load.image("unusStuff", "assets/background/UnusualerStuffTransparent.png");
        this.load.image("grass", "assets/background/grass.png");

        this.load.image("stButton", "assets/ui_components/StartButton.png");
        this.load.image("stButtonActive", "assets/ui_components/StartButtonActive.png");
    }

    create() {
        this.background = this.add.image(0, 0, "paraMountain");
        this.background.setOrigin(0, 0);
        this.background.setScale(5);

        this.farMountain = this.add.image(100, 250, "farMountain");
        this.farMountain.setScale(2);

        this.bigMountain = this.add.image(600, 100, "bigMountain");
        this.bigMountain.setScale(5);

        this.bgTrees = this.add.tileSprite(100, 100, config.width, config.height, "bgTrees")
        this.bgTrees.setScale(2);

        this.grass = this.add.image(500, 680, "grass");
        this.grass.setScale(9);

        this.bgTrees2 = this.add.tileSprite(600, 50, config.width, config.height, "bgTrees")
        this.bgTrees2.setScale(4);


        this.labBuilding = this.add.image(300, 500, "labBuilding");
        this.labBuilding.setScale(0.75);


        this.unusStuff = this.add.image(700, 200, "unusStuff");

        this.stButton = this.add.sprite(800, 450, "stButton").setInteractive();
        this.stButton.setScale(0.65);

        this.stButtonActive = this.add.sprite(800, 450, "stButtonActive").setInteractive();
        this.stButtonActive.setScale(0.65);
        this.stButtonActive.setVisible(false);

        // TODO hide normal and show active button when clicked
        this.stButton.on("pointerdown", this.hideMe);
        this.stButtonActive.on("pointerdown", this.setVisible(true));

        


    }


    update() {

    }

    hideMe() {
        this.setVisible(false);
    }

    showMe() {
        this.setVisible(true);
    }


}