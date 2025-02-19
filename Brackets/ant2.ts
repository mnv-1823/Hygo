type Direction = "left" | "right" | "top" | "bottom";

interface Movement {
  direction: Direction;
  value: number;
}

function finalDistance(movements: Movement[]): number {
  let x = 0, y = 0;

  for (const move of movements) {
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

  return Math.sqrt(x * x + y * y);
}

// Example usage
const movements: Movement[] = [
  {left: 1, right: 2, top: 3, bottom: 4},
];

console.log("Final distance from origin:", finalDistance(movements));
