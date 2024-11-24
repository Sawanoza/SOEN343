const CostStrategyInterface = require('./CostStrategyInterface');

class DistanceBasedCost extends CostStrategyInterface{
    calculateCost(amount, weight, distance){    
        //Random amount modifier we can readjust
        console.log("calculate cost inside distance based cost");

        amount = amount + amount * (1 + (distance * 0.25)/100);

        console.log("Distance Based Cost Amount returning:", amount );

        return amount;
    }
}

module.exports = DistanceBasedCost;