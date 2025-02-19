function finalDistance(movements) {
    var x = 0, y = 0;
    for (var i = 0, mov = movements; i < mov.length; i++) {
        var move = mov[i];
        switch (move.direction) {
            case "left":
                x -= move.value;
                break;
            case "right":
                x += move.value;
                break;
            case "top":
                y += move.value;
                break;
            case "bottom":
                y -= move.value;
                break;
        }
    }
    return Math.sqrt(x*x+y*y)   ;
}

var movements = [
    { direction: "right", value: 5 },
    { direction: "top", value: 3 },
    { direction: "left", value: 2 },
    { direction: "bottom", value: 1 }
];
console.log("Final distance from origin:", finalDistance(movements));
