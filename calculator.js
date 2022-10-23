const calculateProbabilityOfRoll = (expected, diceRolled = 2, takeMax = true) => {
    const diceCounted = 2;
    const min = 1;
    const max = 6;

    //gets 2-die combos that sum to the desired value
    //non-repeating, e.g. will only return one of [5,6] and [6,5]
    const getCombos = (val) => {
        let combos = new Set();
        let startingPoint = Math.min(max, val);
        for(let i = startingPoint; i >= min; i--) {
            let otherDie = val - i;
            if(otherDie <= max && otherDie >= min && otherDie <= i) {
                combos.add([otherDie, i]);
            }
            if(otherDie >= i){
                break;
            }
        }
        return combos;
    }


    let additiveCombos = getCombos(expected);

    let totalCombos = 0;

    console.log(additiveCombos);

    additiveCombos.forEach((value) => {
        let d1 = value[0], //lower value
         d2 = value[1];// higher value
         
        /** Get the range of values that are now permitted
            e.g. if the sum combo is [4, 5] and you're looking for the max,
            the valid range is 1-4, so 4 possible values
        */
        let rng = takeMax ? d1 + 1 - min : max + 1 - d2;

        if(d1 != d2) {
            //step 1: probability that there is exactly one occurrence of the extreme value
            let probA = (1 / max) * Math.pow((max - 1) / max, diceRolled - 1)
             * binomial(diceRolled, 1);

            //step 2: probability that all remaining dice are less than or equal to the secondary value, 
            //given that there is already one  of the extreme
            let probB = Math.pow(rng / max, diceRolled - 1);

            //step 3: probability that given B, at least one is the secondary value
            let probC = 1 - Math.pow((rng - 1) / rng, diceRolled - 1);

            console.log(value);
            console.log(probA);
            console.log(probB);
            console.log(probC);
            console.log(probA * probB * probC);
            totalCombos += probA * probB * probC;
        }
        else {
            //step 1: probability that all are at or below the value
            let probA = Math.pow(rng / max, diceRolled);

            //step 2: given A, probability that there are at least two occurrences of the value
            let probB = 1 -  Math.pow((rng - 1) / rng, diceRolled)
            - ((1 / rng) * Math.pow((rng - 1) / rng, diceRolled - 1)
            * binomial(diceRolled, 2));
            console.log(value);
            console.log(probA * probB);
            totalCombos += probA * probB;
        }
    });

    return totalCombos;
}

const binomial = (n, k) => {
    if ((typeof n !== 'number') || (typeof k !== 'number')) 
 return false; 
   var coeff = 1;
   for (var x = n-k+1; x <= n; x++) coeff *= x;
   for (x = 1; x <= k; x++) coeff /= x;
   return coeff;
}


function runTests() {
    // calculateProbabilityOfRoll(7, 2);
    // calculateProbabilityOfRoll(7, 3);
    // calculateProbabilityOfRoll(7, 4);
    // calculateProbabilityOfRoll(7, 5);
    // calculateProbabilityOfRoll(6, 3, false);
    calculateProbabilityOfRoll(2, 3);
    calculateProbabilityOfRoll(3, 3);
    calculateProbabilityOfRoll(4, 3);
}

runTests();