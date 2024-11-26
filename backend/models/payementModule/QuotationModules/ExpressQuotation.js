const CostContext = require("../CostModules/CostContext");
const PriorityBasedCost = require("../CostModules/PriorityBasedCost");
const QuotationStrategy = require("./QuotationStrategy");

class ExpressQuotation extends QuotationStrategy{

    calculateCost(amount, weight, distance){  
        console.log("express Quotation")
        console.log("Calculating cost with:", { amount, weight, distance });
        const costContext = new CostContext(new PriorityBasedCost()); 
        console.log("Cost Context:", costContext);
        var price = 0;
        price = costContext.calculateCost(amount, weight, distance);
        console.log("Calculated price:", price);
        return price;
    }
    
    calculateProfitPercentage(amount, weight, distance){
        console.log("Calculating profit percentage with:", { amount, weight, distance });
        var cost = this.calculateCost(amount, weight, distance);

        // Something random for profit idk
        cost *= 1.3;
        console.log("Calculated Profit percentage :", cost);
        return cost;
    }
}

module.exports = ExpressQuotation;