const CostContext = require("../CostModules/CostContext");
const PriorityBasedCost = require("../CostModules/PriorityBasedCost");
const QuotationStrategy = require("./QuotationStrategy");

class ExpressQuotation extends QuotationStrategy{

    calculateCost(amount, weight, distance){  
        console.log("Calculating cost with:", { amount, weight, distance });
        const costContext = new CostContext(new PriorityBasedCost()); 
        console.log("CostContext setup with:", costContext);
        let price = costContext.calculateCost(amount, weight, distance);
        console.log("Calculated price:", price);
        return price;
    }
    
    calculateProfitPercentage(amount, weight, distance){
        let cost = this.calculateCost(amount, weight, distance);

        // Something random for profit idk
        cost *= 1.3;
        return cost;
    }
}

module.exports = ExpressQuotation;