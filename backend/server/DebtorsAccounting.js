const express=require('express');
const connector=require('../datalayer/connector');
const entities=require('../datalayer/entities');
const managers=require('../datalayer/managers');
const bodyParser=require('body-parser');
const urlEncodedBodyParser=bodyParser.urlencoded({extended:false});
const oracle =require('oracledb');
const app=express();
const port=5050;
const { ItemManager } = require("../datalayer/managers");  
const { Item } = require("../datalayer/entities");
const StateManager= require("../datalayer/managers");
const { TraderManager } = require("../datalayer/managers");
const { Traders } = require("../datalayer/entities");
const { Customer } = require("../datalayer/entities");
const { CustomerManager } = require("../datalayer/managers");

app.use(express.json());

const timePass=(ms)=>{
    var promise=new Promise((resolve)=>{
        setTimeout(resolve,ms)
    });
    return promise;
}


app.get('/getUnitOfMeasurments',async function(request,response){
    try
     {
        await timePass(3000);
        const unitOfMeasurments=new managers.UnitofMeasurmentManager();
        const uom=await unitOfMeasurments.getAll();//call the getAll method of ItemManager
        response.send(uom);

    }catch(err)
    {
        console.error("Error Fetching Items:",err)
    }

});

/*
app.get('/getItems',async function(request,response){
    try
     {
        await timePass(3000);
        const itemManager=new managers.ItemManager();
        const items=await itemManager.getAll();//call the getAll method of ItemManager
        response.send(items);

    }catch(err)
    {
        console.error("Error Fetching Items:",err)
    }
});
*/
app.get('/getItems', async function (request, response) {
    try {
        await timePass(3000);
        const itemManager = new managers.ItemManager();
        const items = await itemManager.getAll(); // Call the getAll method of ItemManager

        response.status(200).json({
            success: true,
            data: items
        });

    } catch (err) {
        console.error("Error Fetching Items:", err);

        response.status(500).json({
            success: false,
            message: "Error fetching items",
            error: err.toString() // To send error details for debugging
        });
    }
});

app.get('/getItemsDetails',async function(request,response){
    try
    {
        await timePass(3000);
        const itemManagerDetail=new managers.ItemManager();
        const itemsDetails=await itemManagerDetail.getAll();
        response.json(itemsDetails);

    }catch(err)
    {
        console.log(err);
    }
})

/*app.post("/addItem", urlEncodedBodyParser, async function (request, response) {
    try {
        const itemManager = new ItemManager();
        const newItem = new Item(null, request.body.name, request.body.cgst, request.body.sgst, request.body.igst, request.body.unitofMeasurments);

        await itemManager.add(newItem);
        response.send({ success: true, message: "Item added successfully" });
    } catch (err) {
        console.error("Error Adding Item:", err);
        response.send({ success: false, error: err.toString() });
    }
});
*/
app.post("/addItem", async function (req, res) {
    try {
        const itemManager = new ItemManager();
        const newItem = {
            name: req.body.name,
            hsnCode: req.body.hsnCode,
            cgst: req.body.cgst,
            sgst: req.body.sgst,
            igst: req.body.igst,
            unitofMeasurments: req.body.unitofMeasurments
        };

        console.log("Received Request:", newItem);

        await itemManager.add(newItem);
        res.status(200).send({ success: true, message: "Item added successfully" });
    } catch (err) {
        console.error("Error Adding Item:", err);
        res.status(400).send({ success: false, error: err.toString() });
    }
});
app.post("/updateItem", async function (req, res) {
    try {
        const itemManager = new ItemManager();
        const updatedItem = {
            code: req.body.code,  // ✅ Required for update
            name: req.body.name,
            hsnCode: req.body.hsnCode,
            cgst: req.body.cgst,
            sgst: req.body.sgst,
            igst: req.body.igst,
            unitofMeasurments: req.body.unitofMeasurments
        };

        console.log("Received Update Request:", updatedItem);

        await itemManager.update(updatedItem);
        res.status(200).send({ success: true, message: "Item updated successfully" });
    } catch (err) {
        console.error("Error Updating Item:", err);
        res.status(400).send({ success: false, error: err.toString() });
    }
});

app.delete("/deleteItem", async function (request, response) { 
    try {
        const itemCode = request.query.itemCode;

        if (!itemCode) {
            return response.status(400).send({ success: false, error: "Item code is required" });
        }

        const itemManager = new managers.ItemManager(); 
        const item = await itemManager.getByCode(itemCode);
        
        if (!item) {
            return response.status(404).send({ success: false, error: `Item with code ${itemCode} does not exist` });
        }

        await itemManager.remove(itemCode);
        response.send({ success: true, message: "Item deleted successfully" });
    } catch (err) {
        console.error("Error Deleting Item:", err);
        response.status(500).send({ success: false, error: err.toString() });
    }
});



/*app.post("/updateItem", urlEncodedBodyParser, async function (request, response) {
    try {
        const { code, name,hsnCode, cgst, sgst, igst, unitofMeasurments } = request.body;

        if (!code) {
            return response.status(400).send({ success: false, error: "Item code is required" });
        }

        const itemManager = new ItemManager();
        const item = await itemManager.getByCode(code);
        
        if (!item) {
            return response.status(404).send({ success: false, error: `Item with code ${code} does not exist` });
        }

        const updatedItem = new entities.Item(code, name, cgst, sgst, igst, unitofMeasurments);
        await itemManager.update(updatedItem);

        response.send({ success: true, message: "Item updated successfully" });
    } catch (err) {
        console.error("Error Updating Item:", err);
        response.status(500).send({ success: false, error: err.toString() });
    }
});*/


//State Detail
app.get('/getStates', async function (request, response) {
    try {
        const stateManager = new managers.StateManager();
        const states = await stateManager.getAll();
        response.json(states);
    } catch (err) {
        console.error("Error Fetching States:", err);
        response.status(500).send({ success: false, error: err.toString() });
    }
});
app.get('/getStateByCode', async function (request, response) {
    try {
        const { code } = request.query;
        if (!code) {
            return response.status(400).send({ success: false, error: "State code is required" });
        }

        const stateManager = new StateManager();
        const state = await stateManager.getByCode(code);

        if (!state) {
            return response.status(404).send({ success: false, error: `No state found with code ${code}` });
        }

        response.json(state);
    } catch (err) {
        console.error("Error Fetching State by Code:", err);
        response.status(500).send({ success: false, error: err.toString() });
    }
});
app.get('/getStateByAlphaCode', async function (request, response) {
    try {
        const { alphaCode } = request.query;
        if (!alphaCode) {
            return response.status(400).send({ success: false, error: "State alpha code is required" });
        }

        const stateManager = new StateManager();
        const state = await stateManager.getByAlphaCode(alphaCode);

        if (!state) {
            return response.status(404).send({ success: false, error: `No state found with alpha code ${alphaCode}` });
        }

        response.json(state);
    } catch (err) {
        console.error("Error Fetching State by Alpha Code:", err);
        response.status(500).send({ success: false, error: err.toString() });
    }
});
app.get('/getTrader', async function (request, response) {
    try {
        const traderManager = new TraderManager();
        const trader = await traderManager.getAll();
        response.json(trader);
    } catch (err) {
        console.error("Error Fetching Trader:", err);
        response.status(500).send({ success: false, error: err.toString() });
    }
});



// Update Trader (Insert if not exists, Update if exists)
app.post("/updateTrader", urlEncodedBodyParser, async function (request, response) {
    try {
        const {
            code, name, address, gstNum, regTitle1, regValue1,
            contact1, contact2, stateCode,
            bankName, accountNo, branchName, ifscCode // Added bank details
        } = request.body;

        if (!code || !name || !address || !gstNum || !stateCode) {
            return response.status(400).send({ success: false, error: "Missing required trader details" });
        }

        const trader = new Traders(
            parseInt(code), name, address, gstNum,
            regTitle1 || null, regValue1 || null,
            contact1 || null, contact2 || null,
            parseInt(stateCode),
            bankName || null, accountNo || null, branchName || null, ifscCode || null // Added bank details
        );

        const traderManager = new TraderManager();
        await traderManager.update(trader);

        response.send({ success: true, message: "Trader updated successfully" });
    } catch (err) {
        console.error("Error Updating Trader:", err);
        response.status(500).send({ success: false, error: err.toString() });
    }
});

/*app.post("/updateTrader", urlEncodedBodyParser, async function (request, response) {
    try {
        const {
            code, name, address, gstNum, regTitle1, regValue1,
            regTitle2, regValue2, regTitle3, regValue3,
            contact1, contact2, contact3, stateCode
        } = request.body;

        if (!code || !name || !address || !gstNum || !stateCode) {
            return response.status(400).send({ success: false, error: "Missing required trader details" });
        }

        const trader = new Traders(
            parseInt(code), name, address, gstNum,
            regTitle1 || null, regValue1 || null,
            regTitle2 || null, regValue2 || null,
            regTitle3 || null, regValue3 || null,
            contact1 || null, contact2 || null, contact3 || null,
            parseInt(stateCode)
        );

        const traderManager = new TraderManager();
        await traderManager.update(trader);

        response.send({ success: true, message: "Trader updated successfully" });
    } catch (err) {
        console.error("Error Updating Trader:", err);
        response.status(500).send({ success: false, error: err.toString() });
    }
});
*/

// ✅ Get All Customers
app.get("/getCustomers", async function (request, response) {
    try {
        
        const customerManager = new CustomerManager();
        const customers = await customerManager.getAll();
        console.log("Customers Data:", customers); 
        response.json(customers);
    } catch (err) {
        console.error("Error Fetching Customers:", err);
        response.status(500).send({ success: false, error: err.toString() });
    }
});
app.post("/addCustomer", urlEncodedBodyParser, async function (request, response) {
    try {

        const { 
            name, address, stateCode, 
            regTitle1, regValue1, 
            regTitle2, regValue2, 
            regTitle3, regValue3, 
            contact1, contact2, contact3 
        } = request.body;

        if (!name || !address || !stateCode) {
            return response.status(400).send({ success: false, error: "Name, address, and state code are required" });
        }

        const newCustomer = new Customer(
            null, 
            request.body.name, 
            request.body.address, 
            request.body.regTitle1 || null, 
            request.body.regValue1 || null, 
            request.body.regTitle2 || null, 
            request.body.regValue2 || null,
            request.body.regTitle3 || null,
            request.body.regValue3 || null,
            request.body.contact1 || null,
            request.body.contact2 || null,
            request.body.contact3 || null,
            request.body.stateCode   
        );
        const customerManager = new CustomerManager();
        await customerManager.add(newCustomer);

        response.send({ success: true, message: "Customer added successfully", customerCode: newCustomer.code });
    } catch (err) {
        console.error(" Error Adding Customer:", err);
        response.status(500).send({ success: false, error: err.toString() });
    }
});
app.post("/updateCustomer", urlEncodedBodyParser, async function (request, response) {
    try {
        const { 
            code, name, address, stateCode, 
            regTitle1, regValue1, 
            regTitle2, regValue2, 
            regTitle3, regValue3, 
            contact1, contact2, contact3 
        } = request.body;

        if (!code) {
            return response.status(400).send({ success: false, error: "Customer code is required for update" });
        }

        const customerManager = new CustomerManager();
        const existingCustomer = await customerManager.getByCode(code);

        if (!existingCustomer) {
            return response.status(404).send({ success: false, error: "Customer not found" });
        }

        const updatedCustomer = {
            code, 
            name: name || existingCustomer.name, 
            address: address || existingCustomer.address, 
            regTitle1: regTitle1 || existingCustomer.regTitle1, 
            regValue1: regValue1 || existingCustomer.regValue1, 
            regTitle2: regTitle2 || existingCustomer.regTitle2, 
            regValue2: regValue2 || existingCustomer.regValue2,
            regTitle3: regTitle3 || existingCustomer.regTitle3,
            regValue3: regValue3 || existingCustomer.regValue3,
            contact1: contact1 || existingCustomer.contact1,
            contact2: contact2 || existingCustomer.contact2,
            contact3: contact3 || existingCustomer.contact3,
            stateCode: stateCode || existingCustomer.stateCode   
        };

        await customerManager.update(updatedCustomer);

        response.send({ success: true, message: "Customer updated successfully", updatedCustomer });
    } catch (err) {
        console.error("❌ Error Updating Customer:", err);
        response.status(500).send({ success: false, error: err.toString() });
    }
});
app.post("/removeCustomer", urlEncodedBodyParser, async function (request, response) {
    try {
        const { code } = request.body;

        if (!code) {
            return response.status(400).send({ success: false, error: "Customer code is required" });
        }

        const customerManager = new CustomerManager();
        const existingCustomer = await customerManager.getByCode(code);

        if (!existingCustomer) {
            return response.status(404).send({ success: false, error: "Customer not found" });
        }

        await customerManager.remove(code);

        response.send({ success: true, message: "Customer removed successfully" });
    } catch (err) {
        console.error("❌ Error Removing Customer:", err);
        response.status(500).send({ success: false, error: err.toString() });
    }
});

//Invoice 
app.get('/getAllInvoices', async function (request, response) {
    try {
        const invoiceManager = new managers.InvoiceManager();
        const invoices = await invoiceManager.getAll();
        response.json(invoices);
    } catch (err) {
        console.error("Error Fetching Invoices:", err);
        response.status(500).send({ error: "Error fetching invoices" });
    }
});

app.get("/server-status", (req, res) => {
    res.json({ status: "ready" });
});

app.listen(port,function(err){
if(err)
{
console.log(`Some proble ${err}`);
}
console.log(`server is ready and accept ${port}`);
});