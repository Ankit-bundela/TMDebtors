class UnitofMeasurment
{
    constructor(code,name)
    {
        this.code=code;
        this.name=name;
    }
    getCode()
    {
        return this.code;
    }
    getName()
    {
        return this.name;
    }
}

class Item
{
    constructor(code,name,cgst,sgst,igst,hsnCode,unitofMeasurments)
    {
        this.code=code;
        this.name=name;
        this.cgst=cgst;
        this.sgst=sgst;
        this.igst=igst;
        this.hsnCode = hsnCode;
        this.unitofMeasurments=unitofMeasurments;
    }
    getCode()
    {
        return this.code;
    }
    getHsnCode()
    {
        return this.hsnCode;
    }
    getName()
    {
        return this.name;
    }
    getCGST()
    {
        return this.cgst;
    }
    getSGST()
    {
        return this.sgst;
    }
    getIGST()
    {
        return this.igst;
    }
    getUnitofMeasurment()
    {
        return this.unitofMeasurments;
    }
}
//2nd hsn code

class State {
    constructor(code, name, alphaCode) {
        this.code = code;         
        this.name = name;         
        this.alphaCode = alphaCode;
    }

    getCode() {
        return this.code;
    }

    getName() {
        return this.name;
    }

    getAlphaCode() {
        return this.alphaCode;
    }
}
class Traders {
    constructor(code, name, address, gstNum, regTitle1, regValue1, contact1, contact2, stateCode, bankName, accountNo, branchName, ifscCode) 
    {
        this.code = code;
        this.name = name;
        this.address = address;
        this.gstNum = gstNum;
        this.regTitle1 = regTitle1;
        this.regValue1 = regValue1;
        this.contact1 = contact1;
        this.contact2 = contact2;
        this.stateCode = stateCode;
        this.bankName = bankName;
        this.accountNo = accountNo;
        this.branchName = branchName;
        this.ifscCode = ifscCode;
    }

    getCode() { return this.code; }
    getName() { return this.name; }
    getAddress() { return this.address; }
    getGstNum() { return this.gstNum; }
    getRegTitle1() { return this.regTitle1; }
    getRegValue1() { return this.regValue1; }
    getContact1() { return this.contact1; }
    getContact2() { return this.contact2; }
    getStateCode() { return this.stateCode; }
    getBankName() { return this.bankName; }
    getAccountNo() { return this.accountNo; }
    getBranchName() { return this.branchName; }
    getIfscCode() { return this.ifscCode; }
}


/*class Traders {
    constructor(code, name, address, gstNum, regTitle1, regValue1, regTitle2, regValue2, regTitle3, regValue3, contact1, contact2, contact3, stateCode) {
        this.code = code;
        this.name = name;
        this.address = address;
        this.gstNum = gstNum;
        this.regTitle1 = regTitle1;
        this.regValue1 = regValue1;
        this.regTitle2 = regTitle2;
        this.regValue2 = regValue2;
        this.regTitle3 = regTitle3;
        this.regValue3 = regValue3;
        this.contact1 = contact1;
        this.contact2 = contact2;
        this.contact3 = contact3;
        this.stateCode = stateCode;
    }
    getCode()
    {
        return this.code;
    }
    getName()
    {
        return this.name;
    }
    getAddress()
    {
        return this.address;
    }
    getGstNum()
    {
        return this.gstNum;
    }
    getRegTitle1()
    {
        return this.regTitle1;
    }
    getRegValue1()
    {
        return this.regValue1;
    }
    getRegTitle2()
    {
        return this.regTitle2;
    }
    getRegValue2()
    {
        return this.regValue2;
    }

    getRegTitle3()
    {
        return this.regTitle3;
    }
    getRegValue3()
    {
        return this.regValue3;
    }
    getContact1()
    {
        return this.contact1;
    }
    getContact2()
    {
        return this.contact2;
    }
    getContact3()
    {
        return this.contact3;
    }
    getStateCode()
    {
        return this.stateCode;
    }

}*/
class Customer {
    constructor(code, name, address, regTitle1, regValue1, regTitle2, regValue2, regTitle3, regValue3, contact1, contact2, contact3, stateCode) {
        this.code = code;
        this.name = name;
        this.address = address;
        this.regTitle1 = regTitle1;
        this.regValue1 = regValue1;
        this.regTitle2 = regTitle2;
        this.regValue2 = regValue2;
        this.regTitle3 = regTitle3;
        this.regValue3 = regValue3;
        this.contact1 = contact1;
        this.contact2 = contact2;
        this.contact3 = contact3;
        this.stateCode = stateCode;
    }

    getCode() { return this.code; }
    getName() { return this.name; }
    getAddress() { return this.address; }
    getRegTitle1() { return this.regTitle1; }
    getRegValue1() { return this.regValue1; }
    getRegTitle2() { return this.regTitle2; }
    getRegValue2() { return this.regValue2; }
    getRegTitle3() { return this.regTitle3; }
    getRegValue3() { return this.regValue3; }
    getContact1() { return this.contact1; }
    getContact2() { return this.contact2; }
    getContact3() { return this.contact3; }
    getStateCode() { return this.stateCode; }
}
class BankDetails {
    constructor(code, traderCode, customerCode, bankName, accountNo, ifscCode) {
        this.code = code;
        this.traderCode = traderCode;
        this.customerCode = customerCode;
        this.bankName = bankName;
        this.accountNo = accountNo;
        this.ifscCode = ifscCode;
    }
    getCode() { return this.code; }
    getTraderCode() { return this.traderCode; }
    getCustomerCode() { return this.customerCode; }
    getBankName() { return this.bankName; }
    getAccountNo() { return this.accountNo; }
    getIFSCCode() { return this.ifscCode; }
}

class Invoice {
    constructor(invoiceId, customerCode, traderCode, item, quantity, totalAmount, dateOfInvoice) {
        this.invoiceId = invoiceId;
        this.customerCode = customerCode;
        this.traderCode = traderCode;
        this.item = item;  // This will be an Item object
        this.quantity = quantity;
        this.totalAmount = totalAmount;
        this.dateOfInvoice = dateOfInvoice;
    }

    getInvoiceId() { return this.invoiceId; }
    getCustomerCode() { return this.customerCode; }
    getTraderCode() { return this.traderCode; }
    getItem() { return this.item; }
    getQuantity() { return this.quantity; }
    getTotalAmount() { return this.totalAmount; }
    getDateOfInvoice() { return this.dateOfInvoice; }

    calculateTotal() {
        const baseAmount = this.item.getPrice() * this.quantity;
        const cgstAmount = (baseAmount * this.item.getCGST()) / 100;
        const sgstAmount = (baseAmount * this.item.getSGST()) / 100;
        const igstAmount = (baseAmount * this.item.getIGST()) / 100;

        return baseAmount + cgstAmount + sgstAmount + igstAmount;
    }
}
module.exports={UnitofMeasurment,Item,State,Traders,Customer,}; 
