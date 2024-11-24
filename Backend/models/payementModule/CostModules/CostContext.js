class CostContext  {
    constructor(CostStrategyInterface) {
        this.CostStrategyInterface = CostStrategyInterface;
    }

    setPaymentStrategy(CostStrategyInterface) {
        this.CostStrategyInterface = CostStrategyInterface;
    }

    calculateCost(amount, weight, distance){    
        this.CostStrategyInterface.calculateCost(amount,weight,distance);
    }
}

module.exports = CostContext;
