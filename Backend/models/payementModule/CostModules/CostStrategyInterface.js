class CostStrategyInterface {
    calculateCost(amount, weight, distance){    
        throw new Error("calculateCost method must be implement");
    }
}

module.exports = CostStrategyInterface;