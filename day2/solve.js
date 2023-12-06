"use strict";
exports.__esModule = true;
var input_1 = require("./input");
//part 1
function sumOfValidGameIDs(input) {
    // Define the maximum number of each color of cubes in the bag
    var maxCubes = { red: 12, green: 13, blue: 14 };
    // Split the input into individual games
    var games = input.split('\n');
    var sum = 0;
    for (var _i = 0, games_1 = games; _i < games_1.length; _i++) {
        var game = games_1[_i];
        var parts = game.split(': ');
        var id = parseInt(parts[0].split(' ')[1]);
        var sequences = parts[1].split('; ');
        var isValid = true;
        for (var _a = 0, sequences_1 = sequences; _a < sequences_1.length; _a++) {
            var sequence = sequences_1[_a];
            var colors = sequence.match(/\d+ (red|green|blue)/g) || [];
            for (var _b = 0, colors_1 = colors; _b < colors_1.length; _b++) {
                var color = colors_1[_b];
                var _c = color.split(' '), count = _c[0], type = _c[1];
                if (parseInt(count) > maxCubes[type]) {
                    isValid = false;
                    break;
                }
            }
            if (!isValid)
                break;
        }
        if (isValid) {
            sum += id;
        }
    }
    return sum;
}
console.log(sumOfValidGameIDs(input_1.inputFile));
//part 2
function findProductOfMaxColorCounts(input) {
    var games = input.split('\n');
    var totalSum = 0;
    for (var _i = 0, games_2 = games; _i < games_2.length; _i++) {
        var game = games_2[_i];
        var colorCounts = { red: 0, green: 0, blue: 0 };
        var colors = game.match(/\d+ (red|green|blue)/g) || [];
        for (var _a = 0, colors_2 = colors; _a < colors_2.length; _a++) {
            var color = colors_2[_a];
            var _b = color.split(' '), countStr = _b[0], type = _b[1];
            var count = parseInt(countStr);
            if (count > colorCounts[type]) {
                colorCounts[type] = count;
            }
        }
        ƒ;
        totalSum += colorCounts.red * colorCounts.green * colorCounts.blue;
    }
    return totalSum;
}
console.log(findProductOfMaxColorCounts(input_1.inputFile));
