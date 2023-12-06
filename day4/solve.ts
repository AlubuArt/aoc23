import { inputFile1 } from './input';

function splitAndParseNumbers(input: string): [number[], number[]] {
	const [leftPart, rightPart] = input.split(' | ');

	const arr1 = leftPart
		.split(/\s+/)
		.map(Number)
		.filter((n) => !isNaN(n));

	const arr2 = rightPart
		.split(/\s+/)
		.map(Number)
		.filter((n) => !isNaN(n));

	return [arr1, arr2];
}

function checkWinners(winningNumbers: number[], myNumbers: number[]): number {
	const setArr1 = new Set(winningNumbers);
	let count = 0;

	for (const num of myNumbers) {
		if (setArr1.has(num)) {
			count++;
		}
	}

	return count;
}

function calculatePoints(count: number): number {
  if (count === 0) {
    return 0
  }
	if (count === 1) {
		return 1;
	}
	if (count === 2) {
		return 2;
	} else {
		const result = Math.pow(2, count - 1);
		return result;
	}
}

function calculateSum(input: string) {
	const games = input.split('\n');
	let totalSum = 0;

	for (const game of games) {
		const [arr1, arr2] = splitAndParseNumbers(game);
		const count = checkWinners(arr1, arr2);
		totalSum += calculatePoints(count);
	}
	console.log(totalSum);
}

calculateSum(inputFile1);


// parts two

type ScratchCard = {
  leftNumbers: number[];
  rightNumbers: number[];
};

function parseInput(input: string): ScratchCard[] {
  return input.split('\n').map(line => {
      const [leftPart, rightPart] = line.split('|').map(part => part.trim());
      return {
          leftNumbers: leftPart.split(/\s+/).map(Number),
          rightNumbers: rightPart.split(/\s+/).map(Number),
      };
  });
}
function processScratchCards(cards: ScratchCard[]): number {
  let cardCounts = new Array(cards.length).fill(1); // Start with 1 copy of each card

  for (let i = 0; i < cards.length; i++) {
      let matchCount = countMatches(cards[i]);

      // Distribute wins to subsequent cards
      for (let j = 1; j <= matchCount && i + j < cards.length; j++) {
          cardCounts[i + j] += cardCounts[i];
      }
  }

  // Sum the total number of cards
  return cardCounts.reduce((acc, count) => acc + count, 0);
}

function countMatches(card: ScratchCard): number {
  const setLeftNumbers = new Set(card.leftNumbers);
  return card.rightNumbers.filter(num => setLeftNumbers.has(num)).length;
}

// Example usage
const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const cards = parseInput(inputFile1);
const totalScratchcards = processScratchCards(cards);
console.log('Total scratchcards:', totalScratchcards);
