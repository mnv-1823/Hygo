function finalDistance(movements) {
    var x = 0, y = 0;
    var facing = "right"; 
    
    for (var i = 0; i < movements.length; i++) {
        var move = movements[i];
        
        // Move in the current facing direction
        switch (facing) {
            case "right":
                x += move.value;
                break;
            case "down":
                y -= move.value;
                break;
            case "left":
                x -= move.value;
                break;
            case "up":
                y += move.value;
                break;
        }
        
        // Change direction based on the move direction
        if (move.direction === "right") {
            switch (facing) {
                case "right": facing = "down"; break;
                case "down": facing = "left"; break;
                case "left": facing = "up"; break;
                case "up": facing = "right"; break;
            }
        } else if (move.direction === "left") {
            switch (facing) {
                case "right": facing = "up"; break;
                case "up": facing = "left"; break;
                case "left": facing = "down"; break;
                case "down": facing = "right"; break;
            }
        } else if (move.direction === "top" || move.direction === "up") {
            // Add handling for "top" direction
            switch (facing) {
                case "right": facing = "up"; break;
                case "up": facing = "left"; break;
                case "left": facing = "down"; break;
                case "down": facing = "right"; break;
            }
        } else if (move.direction === "bottom" || move.direction === "down") {
            // Add handling for "bottom" direction
            switch (facing) {
                case "right": facing = "down"; break;
                case "down": facing = "left"; break;
                case "left": facing = "up"; break;
                case "up": facing = "right"; break;
            }
        }
    }
    
    return Math.sqrt(x*x + y*y);
}

var movements = [
    { direction: "right", value: 5 }, 
    { direction: "left", value: 5 }, 
    { direction: "top", value: 5 }, 
    { direction: "bottom", value: 5 } 
];

console.log("Final distance from origin:", finalDistance(movements));