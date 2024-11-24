class CostContext {
    constructor(CostStrategyInterface) {
        this.CostStrategyInterface = CostStrategyInterface;
        // console.log("CostContext setup with:", CostStrategyInterface);
    }

    setPaymentStrategy(CostStrategyInterface) {
        this.CostStrategyInterface = CostStrategyInterface;
    }

    calculateCost(amount, weight, distance) {
        return this.CostStrategyInterface.calculateCost(amount, weight, distance);
    }
}

module.exports = CostContext;

