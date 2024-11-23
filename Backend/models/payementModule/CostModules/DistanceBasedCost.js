const CostStrategyInterface = require('./CostStrategyInterface');

class DistanceBasedCost extends CostStrategyInterface{
    calculateCost(amount, weight, distance){    
        //Random amount modifier we can readjust
        amount = amount + amount * (1 + (distance * 0.25)/100);
        return amount;
    }
}

module.exports = DistanceBasedCost;