package TEMPORARY;

public class Main {
    public static void main(String[] args) {
        QuotationFactory factory = new QuotationFactory();
        Quotation quotation = factory.getQuotation("Express");
        double cost = quotation.calculateCost(10, 20);
        System.out.println("Cost: " + cost);
    }
}

interface Quotation {
    double calculateCost(double weight, double distance);
}

class StandardQuotation implements Quotation {
    @Override
    public double calculateCost(double weight, double distance) {
        return weight * distance * 0.5;
    }
}

class ExpressQuotation implements Quotation {
    @Override
    public double calculateCost(double weight, double distance) {
        return weight * distance * 1.5;
    }
}

class InternationalQuotation implements Quotation {
    @Override
    public double calculateCost(double weight, double distance) {
        return weight * distance * 2.0;
    }
}

class QuotationFactory {
    public Quotation getQuotation(String type) {
        switch (type) {
            case "Standard":
                return new StandardQuotation();
            case "Express":
                return new ExpressQuotation();
            case "International":
                return new InternationalQuotation();
            default:
                throw new IllegalArgumentException("Invalid quotation type: " + type);
        }
    }
}