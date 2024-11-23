const CostStrategyInterface = require('./CostStrategyInterface');

class PriorityBasedCost extends CostStrategyInterface{
    calculateCost(amount, weight, distance){    
        //Random amount modifier we can readjust
        amount = amount * 1.33;
        return amount;
    }
}

module.exports = PriorityBasedCost;