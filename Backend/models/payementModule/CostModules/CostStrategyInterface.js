class CostStrategyInterface {
    calculateCost(amount, weight, distance){    
        throw new Error("calculateCost method must be implement");
    }
}

MediaSourceHandle.exports = CostStrategyInterface;