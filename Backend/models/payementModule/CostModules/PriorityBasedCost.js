const CostStrategyInterface = require('./CostStrategyInterface');

class PriorityBasedCost extends CostStrategyInterface{
    calculateCost(amount, weight, distance){    
        //Random amount modifier we can readjust
        console.log("calculate cost inside priority based cost");
        amount = (amount + amount * (1 + (distance * 0.25)/100)) * 1.33;
        console.log("PriorityBased Cost Amount returning:", amount );
        return amount;
    }
}

module.exports = PriorityBasedCost;