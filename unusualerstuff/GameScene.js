

class GameScene extends Phaser.Scene {


    constructor() {
        super("playGame");
    }


    preload() {
        this.load.image("labTile", "assets/background/FloorTile2_Lab_Small.png");
        this.load.image("labPanel", "assets/background/LargePanel1_Lab.png");

        this.load.image("mainChar", "assets/sprites/unusualCharacter.png");
        this.load.image("enemyChar", "assets/sprites/demagorgonsprite.png");

        this.load.image("bBall", "assets/sprites/baseball-ball-pixel-art-eight-bit-sports-game-icon.png");
    }


    create() {

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.ballDirection = "r";

        this.titleGroup = this.add.group();
        this.projectiles = this.add.group();


        this.bgTile = this.add.tileSprite(0, 0, config.width * 2, config.height * 2, "labTile");
        this.bgPanelOne = this.physics.add.image(214, 275, "labPanel").setScale(2);
        this.bgPanelOne.setCollideWorldBounds(true);
        this.bgPanelOne.setImmovable(true);
        this.bgPanelTwo = this.physics.add.image(791, 275, "labPanel").setScale(2);
        this.bgPanelTwo.setCollideWorldBounds(true);
        this.bgPanelTwo.setImmovable(true);

        this.mainCharacter = this.physics.add.sprite(400, 300, "mainChar").setScale(0.25);
        this.mainCharacter.setCollideWorldBounds(true);
        this.enemyOne = this.physics.add.sprite(600, 300, "enemyChar").setScale(0.65);
        this.enemyOne.setCollideWorldBounds(true);
        this.enemyOne.setBounce(0);


        // TODO add function to handle if the player and enemy touch
        this.physics.add.collider(this.mainCharacter, this.enemyOne);
        this.physics.add.collider(this.mainCharacter, this.bgPanelOne);
        this.physics.add.collider(this.mainCharacter, this.bgPanelTwo);
        this.physics.add.collider(this.enemyOne, this.bgPanelOne);
        this.physics.add.collider(this.enemyOne, this.bgPanelTwo);





        // score bar for the top
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

        this.movePlayerManager();

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.fireProjectile();
        }

        for (let i = 0; i < this.projectiles.getChildren().length; i++) {
            var pJectile = this.projectiles.getChildren()[i];
            pJectile.update();
        }

    }


    movePlayerManager() {


        this.mainCharacter.setVelocity(0);

        if (this.cursorKeys.left.isDown) {
            this.mainCharacter.setVelocityX(-300);
            this.ballDirection = "l";
        } else if (this.cursorKeys.right.isDown) {
            this.mainCharacter.setVelocityX(300);
            this.ballDirection = "r";
        }

        if (this.cursorKeys.up.isDown) {
            this.mainCharacter.setVelocityY(-300);

            if (this.cursorKeys.right.isDown || this.cursorKeys.left.isDown) {
                this.ballDirection += "u";
            } else {
                this.ballDirection = "u";
            }

        } else if (this.cursorKeys.down.isDown) {
            this.mainCharacter.setVelocityY(300);
            
            if (this.cursorKeys.right.isDown || this.cursorKeys.left.isDown) {
                this.ballDirection += "d";
            } else {
                this.ballDirection = "d";
            }

        }
    }

    fireProjectile() {
        let projectl = new Projectile(this);
    }


    zeroPad(number, size) {
        var stringNumber = String(number);
        while (stringNumber.length < (size || 2)) {
            stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }

}




class Projectile extends Phaser.GameObjects.Sprite {

    constructor(scene) {

        let xPos = scene.mainCharacter.x;
        let yPos = scene.mainCharacter.y;

        super(scene, xPos, yPos, "bBall");

        console.log(scene.ballDirection)

        this.setScale(0.5);


        scene.add.existing(this);
        scene.projectiles.add(this);
        scene.physics.world.enableBody(this);


        // TODO add collision detection so that baseballs will .destroy() when they hit walls
        // also this should obviously occur when an enemy gets hit


        for (let i = 0; i < scene.ballDirection.length; i++) {
            if (scene.ballDirection[i] == "u") {
                this.body.velocity.y = -400;
            } else if (scene.ballDirection[i] == "d") {
                this.body.velocity.y = 400;
            } else if (scene.ballDirection[i] == "l") {
                this.body.velocity.x = -400;
            } else if (scene.ballDirection[i] == "r") {
                this.body.velocity.x = 400;
            }
        }

    }


    update() {

        // destroy the projectiles if they go off screen
        if (this.y < 32 || this.y > config.height) {
            this.destroy();
        }

        if (this.x < 0 || this.x > config.width) {
            this.destroy();
        }
    }



}