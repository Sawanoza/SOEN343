const CostStrategyInterface = require('./CostStrategyInterface');

class SpeedBasedCost extends CostStrategyInterface{
    calculateCost(amount, weight, distance){    
        //Random amount modifier we can readjust
        amount = amount * (1 + (distance * 2)/100);
        console.log("calculate cost inside speed based cost");


        console.log("SpeedBased Cost Amount returning:", amount );
        return amount;
    }
}

module.exports = SpeedBasedCost;