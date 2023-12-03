import {inputFile} from './input'

//part 1
function sumOfValidGameIDs(input: string): number {
  // Define the maximum number of each color of cubes in the bag
  const maxCubes = { red: 12, green: 13, blue: 14 };

  // Split the input into individual games
  const games = input.split('\n');
  let sum = 0;

  for (const game of games) {
      const parts = game.split(': ');
      const id = parseInt(parts[0].split(' ')[1]);
      const sequences = parts[1].split('; ');

      let isValid = true;
      for (const sequence of sequences) {
          const colors = sequence.match(/\d+ (red|green|blue)/g) || [];

          for (const color of colors) {
              const [count, type] = color.split(' ');
              if (parseInt(count) > maxCubes[type]) {
                  isValid = false;
                  break;
              }
          }

          if (!isValid) break;
      }

      if (isValid) {
          sum += id;
      }
  }

  return sum;
}

console.log(sumOfValidGameIDs(inputFile)); 


//part 2

function findProductOfMaxColorCounts(input: string): number {
  const games = input.split('\n');
  let totalSum = 0;

  for (const game of games) {
      const colorCounts = { red: 0, green: 0, blue: 0 };

      const colors = game.match(/\d+ (red|green|blue)/g) || [];
      for (const color of colors) {
          const [countStr, type] = color.split(' ');
          const count = parseInt(countStr);

          if (count > colorCounts[type as keyof typeof colorCounts]) {
              colorCounts[type as keyof typeof colorCounts] = count;
          }
      }
ƒ
      totalSum += colorCounts.red * colorCounts.green * colorCounts.blue;
  }

  return totalSum;
}

console.log(findProductOfMaxColorCounts(inputFile));
