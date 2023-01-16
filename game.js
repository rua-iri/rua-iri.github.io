

    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {}
        },
        scene: {SceneTitle}
    };

    var game = new Phaser.Game(config);