"use strict";
exports.__esModule = true;
var input_1 = require("./input");
function splitAndParseNumbers(input) {
    var _a = input.split(' | '), leftPart = _a[0], rightPart = _a[1];
    var arr1 = leftPart
        .split(/\s+/)
        .map(Number)
        .filter(function (n) { return !isNaN(n); });
    var arr2 = rightPart
        .split(/\s+/)
        .map(Number)
        .filter(function (n) { return !isNaN(n); });
    return [arr1, arr2];
}
function checkWinners(winningNumbers, myNumbers) {
    var setArr1 = new Set(winningNumbers);
    var count = 0;
    for (var _i = 0, myNumbers_1 = myNumbers; _i < myNumbers_1.length; _i++) {
        var num = myNumbers_1[_i];
        if (setArr1.has(num)) {
            count++;
        }
    }
    return count;
}
function calculatePoints(count) {
    if (count === 0) {
        return 0;
    }
    if (count === 1) {
        return 1;
    }
    if (count === 2) {
        return 2;
    }
    else {
        var result = Math.pow(2, count - 1);
        return result;
    }
}
function calculateSum(input) {
    var games = input.split('\n');
    var totalSum = 0;
    for (var _i = 0, games_1 = games; _i < games_1.length; _i++) {
        var game = games_1[_i];
        var _a = splitAndParseNumbers(game), arr1 = _a[0], arr2 = _a[1];
        var count = checkWinners(arr1, arr2);
        totalSum += calculatePoints(count);
    }
    console.log(totalSum);
}
calculateSum(input_1.inputFile1);
function parseInput(input) {
    return input.split('\n').map(function (line) {
        var _a = line.split('|').map(function (part) { return part.trim(); }), leftPart = _a[0], rightPart = _a[1];
        return {
            leftNumbers: leftPart.split(/\s+/).map(Number),
            rightNumbers: rightPart.split(/\s+/).map(Number)
        };
    });
}
function processScratchCards(cards) {
    var cardCounts = new Array(cards.length).fill(1); // Start with 1 copy of each card
    for (var i = 0; i < cards.length; i++) {
        var matchCount = countMatches(cards[i]);
        // Distribute wins to subsequent cards
        for (var j = 1; j <= matchCount && i + j < cards.length; j++) {
            cardCounts[i + j] += cardCounts[i];
        }
    }
    // Sum the total number of cards
    return cardCounts.reduce(function (acc, count) { return acc + count; }, 0);
}
function countMatches(card) {
    var setLeftNumbers = new Set(card.leftNumbers);
    return card.rightNumbers.filter(function (num) { return setLeftNumbers.has(num); }).length;
}
// Example usage
var input = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\nCard 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\nCard 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\nCard 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\nCard 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11";
var cards = parseInput(input_1.inputFile1);
var totalScratchcards = processScratchCards(cards);
console.log('Total scratchcards:', totalScratchcards);
