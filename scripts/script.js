const globalVars = {
    numKrarks: 2,
    thumb: true
}

//TODO add max cast amount

const flipCoin = () => {
    const result = Math.floor(Math.random() * 2);
    return !!result;
}

const checkForLoss = (round) => {
    let lossFound = false;
    round.forEach(result => {
        if(!result){ lossFound = true };
    })
    return lossFound;
}

const calcRound = (numKrarks, thumb) => {
    const round = [];
    while (numKrarks) {
        if(round.length && thumb && checkForLoss(round)){
            //TODO create thumb function
            let firstFlip = flipCoin();
            firstFlip ? round.push(firstFlip) : round.push(flipCoin());
        } else {
            round.push(flipCoin());
        }
        numKrarks--;
    }
    return round;
}

const checkToContinue = (lastRound) => {
    let canContinue = false;
    lastRound.forEach(result => {
        if(!result){
            canContinue = true;
        }
    })
    return canContinue;
}

const calcCopies = (rounds) => {
    let copies = 0;
    rounds.forEach(round => {
        round.forEach(result => {
            if(result){copies++}
        })
    })
    return copies;
}

//TODO Veyran calc

const calcMaxRoundsTotal = () => {
    const rounds = [];
    let canStillCopy = true;
    while(canStillCopy) {
        if(rounds.length){
            if (checkToContinue(rounds[rounds.length - 1])) {
                rounds.push(calcRound(globalVars.numKrarks, globalVars.thumb));
            } else {
                canStillCopy = false;
            }
        } else {
            rounds.push(calcRound(globalVars.numKrarks, globalVars.thumb));
        }
    }
    const finalResult = {
        castTriggers: rounds.length,
        copyTriggers: calcCopies(rounds),
        rounds
    }
    return finalResult
}

console.log(calcMaxRoundsTotal());