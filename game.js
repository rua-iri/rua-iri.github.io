

    var config = {
        type: Phaser.AUTO,
        width: 1000,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                debug: true
            }
        },
        scene: [SceneTitle]
    };

    var game = new Phaser.Game(config);