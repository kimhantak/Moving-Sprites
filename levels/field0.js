const level = {
    "hero": {
        "scene": 0,
        "x": 50,
        "y": 682,
        "width": 36,
        "height": 42,
        "speed": 6,
        "jumpHeight": -25,
        "gravity": 0,
        "gravitySpeed": 1,
        "direction": 1
    },
    "monsters": [
        {
            "scene": 0, 
            "x": 35, 
            "y": 168, 
            "width": 42, 
            "height": 32, 
            "speed": 1, 
            "direction": 1, 
            "lWall": 5, 
            "rWrall": 245
        },
        {
            "scene": 0, 
            "x": 285, 
            "y": 318, 
            "width": 42, 
            "height": 32, 
            "speed": 2, 
            "direction": 1, 
            "lWall": 5, 
            "rWrall": 245
        },
        {
            "scene": 0, 
            "x": 1255, 
            "y": 168, 
            "width": 42, 
            "height": 32, 
            "speed": 1, 
            "direction": 1, 
            "lWall": 5, 
            "rWrall": 245
        },
        {
            "scene": 0, 
            "x": 1005, 
            "y": 318, 
            "width": 42, 
            "height": 32, 
            "speed": 2, 
            "direction": 1, 
            "lWall": 5, 
            "rWrall": 245
        }
    ],
    "grass": [
        // ground
        {
            "x": 10,
            "y": 700,
            "width": 1515,
            "height": 42
        },
        // center ground
        {
            "x": 600,
            "y": 658,
            "width": 300,
            "height": 42
        },
        // right grass 2
        {
            "x": 1000,
            "y": 350,
            "width": 250,
            "height": 42
        },
        // right grass 1
        {
            "x": 1250,
            "y": 200,
            "width": 250,
            "height": 42
        },
        // left grass 2
        {
            "x": 280,
            "y": 350,
            "width": 250,
            "height": 42
        },
        // left grass 1
        {
            "x": 30,
            "y": 200,
            "width": 250,
            "height": 42
        },
        // center grass
        {
            "x": 625,
            "y": 350,
            "width": 250,
            "height": 42
        },
    ],
    "decor": [
        {
            "scene": 0,
            "x": 10,
            "y": 658,
            "width": 42,
            "height": 42
        },
        {
            "scene": 1,
            "x": 110,
            "y": 658,
            "width": 42,
            "height": 42
        },
        {
            "scene": 2,
            "x": 260,
            "y": 658,
            "width": 42,
            "height": 42
        },
        {
            "scene": 3,
            "x": 440,
            "y": 658,
            "width": 42,
            "height": 42
        },
        {
            "scene": 4,
            "x": 500,
            "y": 658,
            "width": 42,
            "height": 42
        },
        {
            "scene": 1,
            "x": 660,
            "y": 658,
            "width": 42,
            "height": 42
        },
        {
            "scene": 4,
            "x": 800,
            "y": 658,
            "width": 42,
            "height": 42
        },
        {
            "scene": 3,
            "x": 1000,
            "y": 658,
            "width": 42,
            "height": 42
        },
        {
            "scene": 2,
            "x": 1100,
            "y": 658,
            "width": 42,
            "height": 42
        },
        {
            "scene": 0,
            "x": 1300,
            "y": 658,
            "width": 42,
            "height": 42
        },
        {
            "scene": 2,
            "x": 1140,
            "y": 658,
            "width": 42,
            "height": 42
        },
        {
            "scene": 2,
            "x": 620,
            "y": 616,
            "width": 42,
            "height": 42
        },
        {
            "scene": 2,
            "x": 660,
            "y": 616,
            "width": 42,
            "height": 42
        },
        {
            "scene": 0,
            "x": 1280,
            "y": 158,
            "width": 42,
            "height": 42
        },
        {
            "scene": 4,
            "x": 1380,
            "y": 158,
            "width": 42,
            "height": 42
        },
        {
            "scene": 4,
            "x": 1100,
            "y": 308,
            "width": 42,
            "height": 42
        },
        {
            "scene": 3,
            "x": 1210,
            "y": 308,
            "width": 42,
            "height": 42
        },
        {
            "scene": 2,
            "x": 335,
            "y": 308,
            "width": 42,
            "height": 42
        },
        {
            "scene": 0,
            "x": 400,
            "y": 308,
            "width": 42,
            "height": 42
        },
        {
            "scene": 4,
            "x": 300,
            "y": 308,
            "width": 42,
            "height": 42
        },
        {
            "scene": 4,
            "x": 670,
            "y": 308,
            "width": 42,
            "height": 42
        },
        {
            "scene": 2,
            "x": 720,
            "y": 308,
            "width": 42,
            "height": 42
        },
        {
            "scene": 2,
            "x": 70,
            "y": 158,
            "width": 42,
            "height": 42
        },
        {
            "scene": 1,
            "x": 150,
            "y": 158,
            "width": 42,
            "height": 42
        }
    ]
};

export { level as Level };