export const calculateProbabilityOfRoll = (expected, diceRolled = 2, takeMax = true) => {
    const dieCounted = 2;
    const min = 1;
    const max = 6;

    //gets 2-die combos that sum to the desired value
    //non-repeating, e.g. will only return one of [5,6] and [6,5]
    const getCombos = (val) => {
        let combos = new Set();
        let startingPoint = Math.min(dieMax, val);
        for(let i = startingPoint; i >=min; i--) {
            let otherDie = val - i;
            if(otherDie <= max) {
                combos.add([otherDie, i]);
            }
            if(otherDie == i){
                break;
            }
        }
        return combos;
    }

    const uniquenessDegree = (val = []) => {
        return val.length + 1 - (new Set(val)).size();
    }

    let additiveCombos = getCombos(expected);

    let totalCombos = 0;


    additiveCombos.forEach((value) => {
        let d1 = value[0], d2 = value[1];
        //number of remaining die not in the sum combo
        let remaining = diceRolled - dieCounted;
        /** Get the range of values that are now permitted
            e.g. if the sum combo is [4, 5] and you're looking for the max,
            the valid range is 1-4, so 4 possible values
        */ 
        let rng = takeMax ? d2 + 1 - min : max + 1 - d2;

        if(d1 == d2) {
            //if we need duplicates, then it's the probability that all values are that or lower
            //intersected with the probability that at least two are exactly that value
            let proball = Math.pow((rng / max), diceRolled);
            totalCombos += 0;
            return;
        }

        //this is a really inefficient brute force approach
        for(let i = 0; i < remaining; i++) {
            let res = [];
            for(let j = i + 1; j <= rng; j++) {

            }
        }
        let dgr = uniquenessDegree(value);
        totalCombos += ();
    });

    return totalCombos / Math.pow(max - min + 1, diceRolled);
}



export function runTests() {
    calculateProbabilityOfRoll(7, 2);
    calculateProbabilityOfRoll(7, 3);
    calculateProbabilityOfRoll(7, 4);
    calculateProbabilityOfRoll(7, 5);
    calculateProbabilityOfRoll(6, 3, false);
}