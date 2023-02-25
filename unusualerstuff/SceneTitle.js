

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

        this.titleGroup = this.add.group();

        this.background = this.add.image(0, 0, "paraMountain");
        this.background.setOrigin(0, 0);
        this.background.setScale(5);
        this.titleGroup.add(this.background);

        this.farMountain = this.add.image(100, 250, "farMountain");
        this.farMountain.setScale(2);
        this.titleGroup.add(this.farMountain);

        this.bigMountain = this.add.image(600, 100, "bigMountain");
        this.bigMountain.setScale(5);
        this.titleGroup.add(this.bigMountain);

        this.bgTrees = this.add.tileSprite(100, 100, config.width, config.height, "bgTrees");
        this.bgTrees.setScale(2);
        this.titleGroup.add(this.bgTrees);

        this.grass = this.add.image(500, 680, "grass");
        this.grass.setScale(9);
        this.titleGroup.add(this.grass);

        this.bgTrees2 = this.add.tileSprite(600, 50, config.width, config.height, "bgTrees")
        this.bgTrees2.setScale(4);
        this.titleGroup.add(this.bgTrees2);


        this.labBuilding = this.add.image(300, 500, "labBuilding");
        this.labBuilding.setScale(0.75);
        this.titleGroup.add(this.labBuilding);


        this.unusStuff = this.add.image(700, 200, "unusStuff");
        this.titleGroup.add(this.unusStuff);

        this.stButton = this.add.sprite(800, 450, "stButton").setInteractive();
        this.stButton.setScale(0.65);
        this.titleGroup.add(this.stButton);

        this.stButtonActive = this.add.sprite(800, 450, "stButtonActive").setInteractive();
        this.stButtonActive.setScale(0.65);
        this.stButtonActive.setVisible(false);
        this.titleGroup.add(this.stButtonActive);

        this.stButton.on("pointerdown", this.hideMe, this);


    }


    update() {

    }



    hideMe() {

        this.stButton.setVisible(false);
        this.stButtonActive.setVisible(true);

        // time delay before clearing screen
        this.time.delayedCall(1000, this.clearScreen, [], this);
    }


    clearScreen() {
        this.titleGroup.clear(true, true);
        this.scene.start("playGame");
    }


}