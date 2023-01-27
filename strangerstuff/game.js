

var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 620,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [SceneTitle, GameScene]
};

var game = new Phaser.Game(config);

