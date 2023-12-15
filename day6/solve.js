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
var races = [
    [54, 302],
    [94, 1476],
    [65, 1029],
    [92, 1404],
];
//for part two
var race = [[54946592, 302147610291404]];
function getTimeToTravel(time, buttonPressTime) {
    var timeToTravel = time - buttonPressTime;
    return timeToTravel;
}
function getTraveledDistance(travelTime, speed) {
    return travelTime * speed;
}
function isWayToWin(traveledDistance, record) {
    if (traveledDistance > record) {
        return true;
    }
    else {
        return false;
    }
}
function calculateWaysToWin(races) {
    var waysToWin = [];
    var sum = 1;
    for (var _i = 0, races_1 = races; _i < races_1.length; _i++) {
        var race_1 = races_1[_i];
        var time = race_1[0];
        var record = race_1[1];
        var buttonPressTime = 0;
        var wins = 0;
        while (buttonPressTime < time) {
            var travelTime = getTimeToTravel(time, buttonPressTime);
            var traveledDistance = getTraveledDistance(travelTime, buttonPressTime);
            if (isWayToWin(traveledDistance, record)) {
                wins++;
            }
            buttonPressTime++;
        }
        waysToWin.push(wins);
    }
    for (var _a = 0, waysToWin_1 = waysToWin; _a < waysToWin_1.length; _a++) {
        var win = waysToWin_1[_a];
        sum *= win;
    }
    return sum;
}
//part one
console.log(calculateWaysToWin(races));
//part two
console.log(calculateWaysToWin(race));
