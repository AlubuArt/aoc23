/* 
find the speed
find the travel time
calculate the distance
calculate number of ways to win  each race

speed = number of seconds press
timeTotravel = totaltime - presstime
distance = speed x traveltime
numberOFwaysTowin = distance > record 

*/
//for part one
const races = [
  [54, 302],
  [94, 1476],
  [65, 1029],
  [92, 1404],
];
//for part two
const race = [[54946592, 302147610291404]]

function getTimeToTravel(time: number, buttonPressTime: number): number {
  let timeToTravel = time - buttonPressTime;
  return timeToTravel;
}

function getTraveledDistance(travelTime: number, speed: number): number {
  return travelTime * speed;
}

function isWayToWin(traveledDistance: number, record: number): boolean {
  if (traveledDistance > record) {
    return true;
  } else {
    return false;
  }
}

function calculateWaysToWin(races: number[][]) {
  const waysToWin: number[] = [];
  let sum = 1;

  for (const race of races) {
    let time = race[0];
    let record = race[1];
    let buttonPressTime = 0;
    let wins = 0;

    while (buttonPressTime < time) {
      let travelTime = getTimeToTravel(time, buttonPressTime);

      let traveledDistance = getTraveledDistance(travelTime, buttonPressTime);
      if (isWayToWin(traveledDistance, record)) {
        wins++;
      }
      buttonPressTime++;
    }
    waysToWin.push(wins);
  }

  for(const win of waysToWin) {
    sum *= win
  }
  return sum;
}


//part one
console.log(calculateWaysToWin(races));

//part two
console.log(calculateWaysToWin(race))