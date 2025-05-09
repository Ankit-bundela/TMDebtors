const connector=require("./connector");
const entities=require("./entities");
const oracledb = require("oracledb");

class UnitofMeasurmentManager
{
    constructor()
    {
    }
    async add(UnitofMeasurment)
    {
        if(!UnitofMeasurment.name)
        {
            throw "Name required";
        }
        if(UnitofMeasurment.name.length>5)
        {
            throw "Name cannot exceed 5 character";
        }
    
        var connection=await connector.getConnection();
        if (connection==null)
        {
            throw "Unable to connect to data base"
        }
        var resultSet=await connection.execute(`select name from ac_uom where lower(name)=lower('${UnitofMeasurment.name}')`);
        if (resultSet.rows.length>0)
        {
            await connection.close();
            throw `${UnitofMeasurment.name} exsists`;
        }
        await connection.execute(`insert into ac_uom (name) values('${UnitofMeasurment.name}')`);
        await connection.commit();
        resultSet=await connection.execute(`select code from ac_uom where lower(name)=lower('${UnitofMeasurment.name}')`);
        UnitofMeasurment.code=resultSet.rows[0][0];
        await connection.close();
    } //function End Add end 
    
    async remove(code)
    {
        if(!code)
        {
            throw "code required";
        }
        if(code<=0)
        {
            throw "Invalid code";
        }
    
        var connection=await connector.getConnection();
        if (connection==null)
        {
            throw "Unable to connect to data base"
        }
        var resultSet=await connection.execute(`select code from ac_uom where code=${code}`); 
        if (resultSet.rows.length==0)
        {
            await connection.close();
            throw `Invalid code:${code} `;
        }
        var resultSet=await connection.execute(`select uom_code from ac_item_uom where uom_code=${code}`);
        if (resultSet.rows.length>0)
        {
            await connection.close();
            throw `Unit of Measurment with code ${code} has been alloted to an item `;
        }
        await connection.execute(`delete from ac_uom where code=${code}`);
        await connection.commit();
        await connection.close();
    }//delete function end

    async update(UnitofMeasurment)
    {
        if(!UnitofMeasurment.code)
        {
            throw "code required";
        }
        if(UnitofMeasurment.code<=0)
        {
            throw "Invalid code";
        }
        if(!UnitofMeasurment.name)
        {
            throw "Name required";
        }
        if(UnitofMeasurment.name.length>5)
        {
            throw "Name cannot exceed 5 character";
        }
        var connection=await connector.getConnection();
        if (connection==null)
        {
            throw "Unable to connect to data base"
        }
        var resultSet=await connection.execute(`select code from ac_uom where code=${UnitofMeasurment.code}`); 
        if (resultSet.rows.length==0)
        {
            await connection.close();
            throw `Invalid code:${UnitofMeasurment.code} `;
        }
        var resultSet=await connection.execute(`select code from ac_uom where lower(name)=lower('${UnitofMeasurment.name}') and code<> ${UnitofMeasurment.code}`);
        if (resultSet.rows.length>0)
        {
            await connection.close();
            throw `${UnitofMeasurment.name} exsists`;
        }
        await connection.execute(`update ac_uom set name='${UnitofMeasurment.name}' where code=${UnitofMeasurment.code}`);
        await connection.commit();
        await connection.close();
    }//update function end

    async getAll()
    {    
        var connection=await connector.getConnection();
        if (connection==null)
        {
            throw "Unable to connect to data base"
        }
        var UnitofMeasurments=[];
        var UnitofMeasurment;
        var resultSet=await connection.execute("select * from ac_uom order by name");
        var x=0;
        var row=0;
        while(x<resultSet.rows.length)
        {
            row=resultSet.rows[x];
            UnitofMeasurment=new entities.UnitofMeasurment(parseInt(row[0]),row[1]. trim());
            UnitofMeasurments.push(UnitofMeasurment);
            x++;
        } 
        await connection.close();
        return UnitofMeasurments;
    } //function End getAll end 

    async getByCode(code)
    {
        if(!code)
        {
            throw "code required";
        }
        if(code<=0)
        {
            throw "Invalid code";
        }
        var connection=await connector.getConnection();
        if (connection==null)
        {
            throw "Unable to connect to data base"
        }
        var resultSet=await connection.execute(`select * from ac_uom where code=${code}`); 
        if (resultSet.rows.length==0)
        {
            await connection.close();
            throw `Invalid code:${code} `;
        }
        var row=resultSet.rows[0];
        var UnitofMeasurment=new entities.UnitofMeasurment(parseInt(row[0]),row[1].trim());
        return UnitofMeasurment;
        await connection.close();
    }//getByCode function end

    async getByName(name)
    {
        if(!name)
        {
            throw "Name required";
        }
        if(name.length<=0 || name.length>5)
        {
            throw "Invalid code";
        }
        var connection=await connector.getConnection();
        if (connection==null)
        {
            throw "Unable to connect to data base"
        }
        var resultSet=await connection.execute(`select * from ac_uom where lower(name)=lower('${name}')`); 
        if (resultSet.rows.length==0)
        {
            await connection.close();
            throw `Invalid code:${name} `;
        }
        var row=resultSet.rows[0];
        var UnitofMeasurment=new entities.UnitofMeasurment(parseInt(row[0]),row[1].trim());
        return UnitofMeasurment;
        await connection.close();
    }//getByName function end
}//class End here

/*class ItemManager
{
    constructor()
    {

    }
    async add(item)
    {
        if(!item.name || item.name.length==0)
        {
            throw "Item name  required";
        }
        if(item.name.length>25)
        {
            throw "Name Cannot exceeds 25 character";
        }
        if(!item.cgst)
        {
            item.cgst=0;
        }
        if(item.cgst<0)
        {
            throw "CGST cannot be negative";
        }
        if(!item.sgst)
        {
            item.cgst=0;
        }
        if(item.sgst<0)
        {
            throw "SGST cannot be negative";
        }
        if(!item.igst)
        {
            item.igst=0;
        }
        if(item.igst<0)
        {
            throw "IGST cannot be negative";
        }
        if(item.unitofMeasurments.length==0)
        {
            throw "Unit of Measurments required";
        }
        var unitofMeasurment;
        var connection=await connector.getConnection();
        if (connection==null)
        {
            throw "Unable to connect to data base"
        }
        var resultSet=await connection.execute(`select name from ac_item where lower(name)=lower('${item.name}')`);
        if (resultSet.rows.length>0)
        {
            await connection.close();
            throw `${item.name} exsists`;
        }
        var i;
        for(i=0;i<item.unitofMeasurments.length;i++)
        {
            unitofMeasurment=item.unitofMeasurments[i];
            if(!unitofMeasurment.code || unitofMeasurment.code<0)
            {
                unitofMeasurment.code=0;
            }
            if(!unitofMeasurment.name || unitofMeasurment.length==0)
            {
                await connection.close();
                throw "Unit of Measurment name required";
            }
            if(unitofMeasurment.name.length>5)
            {
                await connection.close();
                throw "Unit of Measurment cannot exceeds 5 character";
            }
            resultSet=await connection.execute(`select code from ac_uom where lower(name)=lower('${unitofMeasurment.name}')`);
            if(resultSet.rows.length>0)
            {
                unitofMeasurment.code=resultSet.rows[0][0];
            }
            else
            {
                await connection.execute(`insert into ac_uom (name) values('${unitofMeasurment.name}')`);
                await connection.commit();
                resultSet=await connection.execute(`select code from ac_uom where lower(name)=lower('${unitofMeasurment.name}')`);
                unitofMeasurment.code=resultSet.rows[0][0];
            }
        }
        await connection.execute(`insert into ac_item (name) values('${item.name}')`);
        await connection.commit();
        resultSet=await connection.execute(`select code from ac_item where lower(name)=lower('${item.name}')`);
        item.code=resultSet.rows[0][0];
        await connection.execute(`insert  into ac_item_tax values(${item.code},${item.cgst},${item.sgst},${item.igst})`);
        await connection.commit();
        for(var i=0;i<item.unitofMeasurments.length;i++)
        {
            await connection.execute(`insert into ac_item_uom values(${item.code},${item.unitofMeasurments[i].code})`);
            await connection.commit();
        }
        await connection.close();
        
    }
    async getAll() {
        var connection = await connector.getConnection();
        if (connection == null) {
            throw "Unable to connect to data base";
        }
    
        var items = [];
        var resultSet = await connection.execute("SELECT * FROM ac_item ORDER BY name");
        var item, itemTax, uomResultSet, unitofMeasurments;
    
        for (var x = 0; x < resultSet.rows.length; x++) {
            var row = resultSet.rows[x];
            item = new entities.Item(parseInt(row[0]),row[1].trim());
    
            // Fetch taxes for the item
            var taxResultSet = await connection.execute(`SELECT * FROM ac_item_tax WHERE item_code = ${item.code}`);
            if (taxResultSet.rows.length > 0) {
                itemTax = taxResultSet.rows[0];
                item.cgst = parseFloat(itemTax[1]);
                item.sgst = parseFloat(itemTax[2]);
                item.igst = parseFloat(itemTax[3]);
            }
    
            // Fetch unit of measurements for the item
            uomResultSet = await connection.execute(`SELECT uom.code, uom.name FROM ac_item_uom iu INNER JOIN ac_uom uom ON iu.uom_code = uom.code WHERE iu.item_code = ${item.code}`);
            unitofMeasurments = [];
            for (var y = 0; y < uomResultSet.rows.length; y++) {
                var uomRow = uomResultSet.rows[y];
                unitofMeasurments.push(new entities.UnitofMeasurment(parseInt(uomRow[0]), uomRow[1].trim()));
            }
            item.unitofMeasurments = unitofMeasurments;
    
            items.push(item);
        }
    
        await connection.close();
        return items;
    }
    
    async getByCode(code) {
        if (!code) {
            throw "code required";
        }
        if (code <= 0) {
            throw "Invalid code";
        }
    
        var connection = await connector.getConnection();
        if (connection == null) {
            throw "Unable to connect to database";
        }
    
        var resultSet = await connection.execute(`SELECT * FROM ac_item WHERE code=${code}`);
        if (resultSet.rows.length == 0) {
            await connection.close();
            throw `Invalid code: ${code}`;
        }
    
        var row = resultSet.rows[0];
        var item = new entities.Item(parseInt(row[0]), row[1].trim());
        await connection.close();
        return item;
    }
    async remove(code) {
        if (!code) {
            throw "Code required";
        }
        if (code <= 0) {
            throw "Invalid code";
        }
    
        var connection = await connector.getConnection();
        if (connection == null) {
            throw "Unable to connect to database";
        }
    
        // Check if the item exists
        var resultSet = await connection.execute(`SELECT code FROM ac_item WHERE code=${code}`);
        if (resultSet.rows.length == 0) {
            await connection.close();
            throw `Invalid code: ${code}`;
        }
    
        // Delete from ac_item_uom (removes unit of measurement associations)
        await connection.execute(`DELETE FROM ac_item_uom WHERE item_code=${code}`);
        await connection.commit();
    
        // Delete from ac_item_tax (removes tax references)
        await connection.execute(`DELETE FROM ac_item_tax WHERE item_code=${code}`);
        await connection.commit();
    
        // Now delete the item itself
        await connection.execute(`DELETE FROM ac_item WHERE code=${code}`);
        await connection.commit();
    
        await connection.close();
    }
    async update(item) {
        if (!item.code) {
            throw "Code required";
        }
        if (item.code <= 0) {
            throw "Invalid code";
        }
        if (!item.name || item.name.length == 0) {
            throw "Item name required";
        }
        if (item.name.length > 25) {
            throw "Name cannot exceed 25 characters";
        }
        if (!item.cgst) {
            item.cgst = 0;
        }
        if (item.cgst < 0) {
            throw "CGST cannot be negative";
        }
        if (!item.sgst) {
            item.sgst = 0;
        }
        if (item.sgst < 0) {
            throw "SGST cannot be negative";
        }
        if (!item.igst) {
            item.igst = 0;
        }
        if (item.igst < 0) {
            throw "IGST cannot be negative";
        }
        if (item.unitofMeasurments.length == 0) {
            throw "Unit of Measurements required";
        }
    
        var connection = await connector.getConnection();
        if (connection == null) {
            throw "Unable to connect to database";
        }
    
        // Check if item exists
        var resultSet = await connection.execute(`SELECT code FROM ac_item WHERE code=${item.code}`);
        if (resultSet.rows.length == 0) {
            await connection.close();
            throw `Invalid code: ${item.code}`;
        }
    
        // Check if name already exists for another item
        resultSet = await connection.execute(`SELECT code FROM ac_item WHERE lower(name)=lower('${item.name}') AND code <> ${item.code}`);
        if (resultSet.rows.length > 0) {
            await connection.close();
            throw `${item.name} already exists`;
        }
    
        // Update item name
        await connection.execute(`UPDATE ac_item SET name='${item.name}' WHERE code=${item.code}`);
        await connection.commit();
    
        // Update tax details
        await connection.execute(`UPDATE ac_item_tax SET cgst=${item.cgst}, sgst=${item.sgst}, igst=${item.igst} WHERE item_code=${item.code}`);
        await connection.commit();
    
        // Remove old unit of measurements
        await connection.execute(`DELETE FROM ac_item_uom WHERE item_code=${item.code}`);
        await connection.commit();
    
        // Insert updated unit of measurements
        for (var i = 0; i < item.unitofMeasurments.length; i++) {
            var unitofMeasurment = item.unitofMeasurments[i];
            if (!unitofMeasurment.code || unitofMeasurment.code < 0) {
                unitofMeasurment.code = 0;
            }
            if (!unitofMeasurment.name || unitofMeasurment.length == 0) {
                await connection.close();
                throw "Unit of Measurement name required";
            }
            if (unitofMeasurment.name.length > 5) {
                await connection.close();
                throw "Unit of Measurement cannot exceed 5 characters";
            }
            resultSet = await connection.execute(`SELECT code FROM ac_uom WHERE lower(name)=lower('${unitofMeasurment.name}')`);
            if (resultSet.rows.length > 0) {
                unitofMeasurment.code = resultSet.rows[0][0];
            } else {
                await connection.execute(`INSERT INTO ac_uom (name) VALUES('${unitofMeasurment.name}')`);
                await connection.commit();
                resultSet = await connection.execute(`SELECT code FROM ac_uom WHERE lower(name)=lower('${unitofMeasurment.name}')`);
                unitofMeasurment.code = resultSet.rows[0][0];
            }
            await connection.execute(`INSERT INTO ac_item_uom VALUES(${item.code}, ${unitofMeasurment.code})`);
            await connection.commit();
        }
    
        await connection.close();
    }
}*/

class ItemManager {
    constructor() {}
    async add(item) {
        if (!item.name || item.name.length === 0) {
            throw "Item name required";
        }
        if (item.name.length > 25) {
            throw "Name cannot exceed 25 characters";
        }
        if (!item.hsnCode || item.hsnCode.length < 4 || item.hsnCode.length > 10) {  // ✅ Fix: HSN Code validation
            throw "HSN Code must be between 4 to 10 characters";
        }
    
        if (!item.cgst) item.cgst = 0;
        if (item.cgst < 0) throw "CGST cannot be negative";
        if (!item.sgst) item.sgst = 0;
        if (item.sgst < 0) throw "SGST cannot be negative";
        if (!item.igst) item.igst = 0;
        if (item.igst < 0) throw "IGST cannot be negative";
    
        let connection = await connector.getConnection();
        if (!connection) {
            throw "Unable to connect to database";
        }
    
        try {
            // ✅ Debugging: Check existing items
            let checkItem = await connection.execute(
                `SELECT code FROM ac_item WHERE LOWER(name) = LOWER(:name)`,
                { name: item.name }
            );
            if (checkItem.rows.length > 0) {
                throw `❌ Error: Item '${item.name}' already exists with code ${checkItem.rows[0][0]}`;
            }
    
            // ✅ Insert into ac_item
            console.log("🟢 Inserting into ac_item...");
            let insertItemResult = await connection.execute(
                `INSERT INTO ac_item (name, hsn_code) VALUES (:name, :hsnCode) RETURNING code INTO :code`,
                { name: item.name, hsnCode: item.hsnCode, code: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } }
            );
            await connection.commit();
    
            // ✅ Get Inserted Item Code
            item.code = insertItemResult.outBinds.code[0];  // ✅ Fix: Directly get generated code
            if (!item.code) {
                throw "❌ Error: Inserted item code not retrieved.";
            }
            console.log("🔍 Inserted Item Code:", item.code);
    
            // ✅ Insert into ac_item_tax
            console.log("🟢 Inserting into ac_item_tax...");
            await connection.execute(
                `INSERT INTO ac_item_tax (item_code, cgst, sgst, igst) VALUES (:code, :cgst, :sgst, :igst)`,
                { code: item.code, cgst: item.cgst, sgst: item.sgst, igst: item.igst }
            );
            await connection.commit();
            console.log("✅ Tax Inserted Successfully");
    
        } catch (error) {
            console.error("❌ Database Error:", error);
            throw error;
        } finally {
            await connection.close();
        }
    }
    async update(item) {
        if (!item.code) {
            throw "Item code is required for update";
        }
        if (!item.name || item.name.length === 0) {
            throw "Item name required";
        }
        if (item.name.length > 25) {
            throw "Name cannot exceed 25 characters";
        }
        if (!item.hsnCode || item.hsnCode.length < 4 || item.hsnCode.length > 10) {
            throw "HSN Code must be between 4 to 10 characters";
        }
    
        if (!item.cgst) item.cgst = 0;
        if (item.cgst < 0) throw "CGST cannot be negative";
        if (!item.sgst) item.sgst = 0;
        if (item.sgst < 0) throw "SGST cannot be negative";
        if (!item.igst) item.igst = 0;
        if (item.igst < 0) throw "IGST cannot be negative";
    
        let connection = await connector.getConnection();
        if (!connection) {
            throw "Unable to connect to database";
        }
    
        try {
            // ✅ Check if item exists
            let checkItem = await connection.execute(
                `SELECT code FROM ac_item WHERE code = :code`,
                { code: item.code }
            );
            if (checkItem.rows.length === 0) {
                throw `❌ Error: Item with code ${item.code} not found`;
            }
    
            // ✅ Update ac_item
            console.log("🟢 Updating ac_item...");
            await connection.execute(
                `UPDATE ac_item SET name = :name, hsn_code = :hsnCode WHERE code = :code`,
                { name: item.name, hsnCode: item.hsnCode, code: item.code }
            );
    
            // ✅ Update ac_item_tax
            console.log("🟢 Updating ac_item_tax...");
            await connection.execute(
                `UPDATE ac_item_tax SET cgst = :cgst, sgst = :sgst, igst = :igst WHERE item_code = :code`,
                { cgst: item.cgst, sgst: item.sgst, igst: item.igst, code: item.code }
            );
    
            await connection.commit();
            console.log("✅ Item & Tax Updated Successfully");
    
        } catch (error) {
            console.error("❌ Database Error:", error);
            throw error;
        } finally {
            await connection.close();
        }
    }
    
         
        
                
        async remove(code) {
            if (!code) {
                throw "Code required";
            }
            if (code <= 0) {
                throw "Invalid code";
            }
        
            var connection = await connector.getConnection();
            if (connection == null) {
                throw "Unable to connect to database";
            }
        
            // Check if the item exists
            var resultSet = await connection.execute(`SELECT code FROM ac_item WHERE code=${code}`);
            if (resultSet.rows.length == 0) {
                await connection.close();
                throw `Invalid code: ${code}`;
            }
        
            // Delete from ac_item_uom (removes unit of measurement associations)
            await connection.execute(`DELETE FROM ac_item_uom WHERE item_code=${code}`);
            await connection.commit();
        
            // Delete from ac_item_tax (removes tax references)
            await connection.execute(`DELETE FROM ac_item_tax WHERE item_code=${code}`);
            await connection.commit();
        
            // Now delete the item itself
            await connection.execute(`DELETE FROM ac_item WHERE code=${code}`);
            await connection.commit();
        
            await connection.close();
        }                        
        async getAll() {
            var connection = await connector.getConnection();
            if (connection == null) {
                throw "Unable to connect to database";
            }
        
            var items = [];
            var resultSet = await connection.execute("SELECT code, name, hsn_code FROM ac_item ORDER BY name");
        
            for (var x = 0; x < resultSet.rows.length; x++) {
                var row = resultSet.rows[x];
        
                var item = new entities.Item(parseInt(row[0]), row[1].trim());
                
                // ✅ HSN Code ko properly assign kar diya
                item.hsnCode = row[2] ? row[2].trim() : ""; // Null handle kiya
        
                // ✅ Fetch Tax Details Correctly
                var taxResultSet = await connection.execute(
                    `SELECT cgst, sgst, igst FROM ac_item_tax WHERE item_code = :code`, 
                    [item.code]
                );
        
                if (taxResultSet.rows.length > 0) {
                    item.cgst = parseFloat(taxResultSet.rows[0][0]);
                    item.sgst = parseFloat(taxResultSet.rows[0][1]);
                    item.igst = parseFloat(taxResultSet.rows[0][2]);
                } else {
                    item.cgst = 0;
                    item.sgst = 0;
                    item.igst = 0;
                }
        
                // ✅ Fetch Unit of Measurements Correctly
                var uomResultSet = await connection.execute(
                    `SELECT uom.code, uom.name FROM ac_item_uom iu 
                    INNER JOIN ac_uom uom ON iu.uom_code = uom.code 
                    WHERE iu.item_code = :code`, 
                    [item.code]
                );
        
                var unitofMeasurments = [];
                for (var y = 0; y < uomResultSet.rows.length; y++) {
                    var uomRow = uomResultSet.rows[y];
                    unitofMeasurments.push(new entities.UnitofMeasurment(parseInt(uomRow[0]), uomRow[1].trim()));
                }
                item.unitofMeasurments = unitofMeasurments;
        
                items.push(item);
            }
        
            await connection.close();
            return items;
        }
                
        
        async getByCode(code) {
            if (!code || code <= 0) {
                throw "Invalid code";
            }
        
            let connection = await connector.getConnection();
            if (!connection) {
                throw "Unable to connect to database";
            }
        
            let item = null;
        
            try {
                // ✅ Fetch item by code including HSN Code
                let resultSet = await connection.execute(
                    `SELECT code, name, hsn_code FROM ac_item WHERE code = :code`,
                    [code]
                );
        
                if (resultSet.rows.length === 0) {
                    throw `Item not found with code: ${code}`;
                }
        
                let row = resultSet.rows[0];
                item = new entities.Item(parseInt(row[0]), row[1].trim(), row[2]?.trim() || "");
        
                // ✅ Fetch tax details
                let taxResultSet = await connection.execute(
                    `SELECT cgst, sgst, igst FROM ac_item_tax WHERE item_code = :code`, 
                    [code]
                );
        
                if (taxResultSet.rows.length > 0) {
                    let taxRow = taxResultSet.rows[0];
                    item.cgst = parseFloat(taxRow[0]);
                    item.sgst = parseFloat(taxRow[1]);
                    item.igst = parseFloat(taxRow[2]);
                }
        
                // ✅ Fetch unit of measurements
                let uomResultSet = await connection.execute(
                    `SELECT uom.code, uom.name 
                     FROM ac_item_uom iu 
                     INNER JOIN ac_uom uom ON iu.uom_code = uom.code 
                     WHERE iu.item_code = :code`,
                    [code]
                );
        
                item.unitofMeasurments = uomResultSet.rows.map(uomRow =>
                    new entities.UnitofMeasurment(parseInt(uomRow[0]), uomRow[1].trim())
                );
        
            } catch (err) {
                console.error("Database Error:", err);
                throw err;
            } finally {
                await connection.close();
            }
        
            return item;
        }
        
    }


class StateManager {
    constructor() 
    {

    }

    //Get all states
    async getAll() {
        var connection = await connector.getConnection();
        if (connection == null) {
            throw "Unable to connect to database";
        }

        var states = [];
        var resultSet = await connection.execute("SELECT * FROM ac_state ORDER BY name");

        for (var i = 0; i < resultSet.rows.length; i++) {
            var row = resultSet.rows[i];
            var state = new entities.State(parseInt(row[0]), row[1].trim(), row[2].trim());
            states.push(state);
        }

        await connection.close();
        return states;
    }

    // Get state by Code
    async getByCode(code) {
        if (!code || code <= 0) {
            throw "Invalid state code";
        }

        var connection = await connector.getConnection();
        if (connection == null) {
            throw "Unable to connect to database";
        }

        var resultSet = await connection.execute(`SELECT * FROM ac_state WHERE code = ${code}`);
        if (resultSet.rows.length == 0) {
            await connection.close();
            throw `State with code ${code} not found`;
        }

        var row = resultSet.rows[0];
        var state = new entities.State(parseInt(row[0]), row[1].trim(), row[2].trim());

        await connection.close();
        return state;
    }

    // Get state by Alpha Code
    async getByAlphaCode(alphaCode) {
        if (!alphaCode || alphaCode.length !== 2) {
            throw "Invalid Alpha Code";
        }

        var connection = await connector.getConnection();
        if (connection == null) {
            throw "Unable to connect to database";
        }

        var resultSet = await connection.execute(`SELECT * FROM ac_state WHERE LOWER(alpha_code) = LOWER('${alphaCode}')`);
        if (resultSet.rows.length == 0) {
            await connection.close();
            throw `State with Alpha Code ${alphaCode} not found`;
        }

        var row = resultSet.rows[0];
        var state = new entities.State(parseInt(row[0]), row[1].trim(), row[2].trim());

        await connection.close();
        return state;
    }
}/*
class TraderManager {
    constructor() {}

    // Get trader (expects only one record in the table)
    async get() {
        var connection = await connector.getConnection();
        if (connection == null) {
            throw "Unable to connect to database";
        }

        var resultSet = await connection.execute("SELECT * FROM ac_trader");
        
        if (resultSet.rows.length === 0) {
            await connection.close();
            return {}; // Return empty object if no record exists
        }

        var row = resultSet.rows[0];
        var trader = new entities.Traders(
            parseInt(row[0]),  // code
            row[1].trim(),     // name
            row[2].trim(),     // address
            row[3].trim(),     // gstNum
            row[4]?.trim() || null,  // regTitle1
            row[5]?.trim() || null,  // regValue1
            row[6]?.trim() || null,  // regTitle2
            row[7]?.trim() || null,  // regValue2
            row[8]?.trim() || null,  // regTitle3
            row[9]?.trim() || null,  // regValue3
            row[10]?.trim() || null, // contact1
            row[11]?.trim() || null, // contact2
            row[12]?.trim() || null, // contact3
            parseInt(row[13]) // stateCode
        );

        await connection.close();
        return trader;
    }

    // Update trader (insert if no record exists, otherwise update)
    async update(trader) {
        if (!trader || !trader.code || !trader.name || !trader.address || !trader.gstNum || !trader.stateCode) {
            throw "Missing required trader details";
        }

        var connection = await connector.getConnection();
        if (connection == null) {
            throw "Unable to connect to database";
        }

        var resultSet = await connection.execute("SELECT COUNT(*) FROM ac_trader");
        var recordExists = resultSet.rows[0][0] > 0; // Check if record exists

        if (recordExists) {
            // Update existing record
            await connection.execute(
                `UPDATE ac_trader SET 
                    name = :name,
                    address = :address,
                    gst_num = :gstNum,
                    reg_title_1 = :regTitle1,
                    reg_value_1 = :regValue1,
                    reg_title_2 = :regTitle2,
                    reg_value_2 = :regValue2,
                    reg_title_3 = :regTitle3,
                    reg_value_3 = :regValue3,
                    contact_1 = :contact1,
                    contact_2 = :contact2,
                    contact_3 = :contact3,
                    state_code = :stateCode
                WHERE code = :code`,
                {
                    code: trader.code,
                    name: trader.name,
                    address: trader.address,
                    gstNum: trader.gstNum,
                    regTitle1: trader.regTitle1 || null,
                    regValue1: trader.regValue1 || null,
                    regTitle2: trader.regTitle2 || null,
                    regValue2: trader.regValue2 || null,
                    regTitle3: trader.regTitle3 || null,
                    regValue3: trader.regValue3 || null,
                    contact1: trader.contact1 || null,
                    contact2: trader.contact2 || null,
                    contact3: trader.contact3 || null,
                    stateCode: trader.stateCode
                }
            );
        } else {
            // Insert new record
            await connection.execute(
                `INSERT INTO ac_trader (
                    code, name, address, gst_num, reg_title_1, reg_value_1, 
                    reg_title_2, reg_value_2, reg_title_3, reg_value_3, 
                    contact_1, contact_2, contact_3, state_code
                ) VALUES (
                    :code, :name, :address, :gstNum, :regTitle1, :regValue1, 
                    :regTitle2, :regValue2, :regTitle3, :regValue3, 
                    :contact1, :contact2, :contact3, :stateCode
                )`,
                {
                    code: trader.code,
                    name: trader.name,
                    address: trader.address,
                    gstNum: trader.gstNum,
                    regTitle1: trader.regTitle1 || null,
                    regValue1: trader.regValue1 || null,
                    regTitle2: trader.regTitle2 || null,
                    regValue2: trader.regValue2 || null,
                    regTitle3: trader.regTitle3 || null,
                    regValue3: trader.regValue3 || null,
                    contact1: trader.contact1 || null,
                    contact2: trader.contact2 || null,
                    contact3: trader.contact3 || null,
                    stateCode: trader.stateCode
                }
            );
        }
        await connection.commit(); 
        await connection.close();
    }
}*/


    class TraderManager {
        constructor() {}
    
        // Get the only trader record
        async getAll() {
            var connection = await connector.getConnection();
            if (connection == null) {
                throw "Unable to connect to database";
            }
    
            // Fetch the first record from ac_trader
            var query = "SELECT CODE, NAME, ADDRESS, GST_NUM, REG_TITLE_1, REG_VALUE_1, CONTACT_1, CONTACT_2, STATE_CODE, BANK_NAME, ACCOUNT_NO, BRANCH_NAME, IFSC_CODE FROM ac_trader FETCH FIRST 1 ROW ONLY";
            var resultSet = await connection.execute(query);
    
            if (resultSet.rows.length === 0) {
                await connection.close();
                return {}; // Return empty object if no record exists
            }
    
            var row = resultSet.rows[0];
    
            var trader = {
                code: parseInt(row[0]),   // CODE
                name: row[1]?.trim() || null,  
                address: row[2]?.trim() || null,  
                gstNum: row[3]?.trim() || null,  
                regTitle1: row[4]?.trim() || null,  
                regValue1: row[5]?.trim() || null,  
                contact1: row[6]?.trim() || null,  
                contact2: row[7]?.trim() || null,  
                stateCode: parseInt(row[8]),  
                bankName: row[9]?.trim() || null,  
                accountNo: row[10]?.trim() || null, 
                branchName: row[11]?.trim() || null, 
                ifscCode: row[12]?.trim() || null  
            };
    
            await connection.close();
            return trader;
        }
        // Update trader (insert if no record exists, otherwise update)
        async update(trader) {
            if (!trader || !trader.code || !trader.name || !trader.address || !trader.gstNum || !trader.stateCode) {
                throw "Missing required trader details";
            }
        
            var connection = await connector.getConnection();
            if (connection == null) {
                throw "Unable to connect to database";
            }
        
            var resultSet = await connection.execute("SELECT COUNT(*) FROM ac_trader");
            var recordExists = resultSet.rows[0][0] > 0; // Check if record exists
        
            if (recordExists) {
                // Update existing record
                await connection.execute(
                    `UPDATE ac_trader SET 
                        name = :name,
                        address = :address,
                        gst_num = :gstNum,
                        reg_title_1 = :regTitle1,
                        reg_value_1 = :regValue1,
                        contact_1 = :contact1,
                        contact_2 = :contact2,
                        state_code = :stateCode,
                        bank_name = :bankName,
                        account_no = :accountNo,
                        branch_name = :branchName,
                        ifsc_code = :ifscCode
                    WHERE code = :code`,
                    {
                        code: trader.code,
                        name: trader.name,
                        address: trader.address,
                        gstNum: trader.gstNum,
                        regTitle1: trader.regTitle1 || null,
                        regValue1: trader.regValue1 || null,
                        contact1: trader.contact1 || null,
                        contact2: trader.contact2 || null,
                        stateCode: trader.stateCode,
                        bankName: trader.bankName || null,
                        accountNo: trader.accountNo || null,
                        branchName: trader.branchName || null,
                        ifscCode: trader.ifscCode || null
                    }
                );
            } else {
                // Insert new record
                await connection.execute(
                    `INSERT INTO ac_trader (
                        code, name, address, gst_num, reg_title_1, reg_value_1, 
                        contact_1, contact_2, state_code, 
                        bank_name, account_no, branch_name, ifsc_code
                    ) VALUES (
                        :code, :name, :address, :gstNum, :regTitle1, :regValue1, 
                        :contact1, :contact2, :stateCode, 
                        :bankName, :accountNo, :branchName, :ifscCode
                    )`,
                    {
                        code: trader.code,
                        name: trader.name,
                        address: trader.address,
                        gstNum: trader.gstNum,
                        regTitle1: trader.regTitle1 || null,
                        regValue1: trader.regValue1 || null,
                        contact1: trader.contact1 || null,
                        contact2: trader.contact2 || null,
                        stateCode: trader.stateCode,
                        bankName: trader.bankName || null,
                        accountNo: trader.accountNo || null,
                        branchName: trader.branchName || null,
                        ifscCode: trader.ifscCode || null
                    }
                );
            }
            
            await connection.commit(); 
            await connection.close();
        }
        
    }
    





class CustomerManager {
    constructor() 
    {

    }

        async add(customer) {
            let connection;
            try {
                connection = await connector.getConnection();
                if (!connection) throw "Unable to connect to database";
        
                let result = await connection.execute(
                    `INSERT INTO ac_customer 
                    (CODE, NAME, ADDRESS, REG_TITLE_1, REG_VALUE_1, REG_TITLE_2, REG_VALUE_2, REG_TITLE_3, REG_VALUE_3, CONTACT_1, CONTACT_2, CONTACT_3, STATE_CODE) 
                    VALUES (AC_CUSTOMER_SEQ.NEXTVAL, :name, :address, :regTitle1, :regValue1, :regTitle2, :regValue2, :regTitle3, :regValue3, :contact1, :contact2, :contact3, :stateCode)
                    RETURNING CODE INTO :code`,  
                    {
                        name: customer.name,
                        address: customer.address,
                        regTitle1: customer.regTitle1 || null,
                        regValue1: customer.regValue1 || null,
                        regTitle2: customer.regTitle2 || null,
                        regValue2: customer.regValue2 || null,
                        regTitle3: customer.regTitle3 || null,  
                        regValue3: customer.regValue3 || null,  
                        contact1: customer.contact1 || null,    
                        contact2: customer.contact2 || null,    
                        contact3: customer.contact3 || null,   
                        stateCode: customer.stateCode || 1,
                        code: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
                    }
                );
                const customerCode = result.outBinds.code[0];        
                await connection.commit();
                return customerCode;
            } finally {
                if (connection) await connection.close();
            }
        }
        async update(customer) {
            let connection;
            try {
                connection = await connector.getConnection();
                if (!connection) throw new Error("Unable to connect to database");
        
                let result = await connection.execute(
                    `UPDATE ac_customer 
                     SET NAME = :name, 
                         ADDRESS = :address, 
                         REG_TITLE_1 = :regTitle1, 
                         REG_VALUE_1 = :regValue1, 
                         REG_TITLE_2 = :regTitle2, 
                         REG_VALUE_2 = :regValue2, 
                         REG_TITLE_3 = :regTitle3, 
                         REG_VALUE_3 = :regValue3, 
                         CONTACT_1 = :contact1, 
                         CONTACT_2 = :contact2, 
                         CONTACT_3 = :contact3, 
                         STATE_CODE = :stateCode 
                     WHERE CODE = :code`,
                    {
                        code: customer.code,
                        name: customer.name,
                        address: customer.address,
                        regTitle1: customer.regTitle1 || null,
                        regValue1: customer.regValue1 || null,
                        regTitle2: customer.regTitle2 || null,
                        regValue2: customer.regValue2 || null,
                        regTitle3: customer.regTitle3 || null,
                        regValue3: customer.regValue3 || null,
                        contact1: customer.contact1 || null,
                        contact2: customer.contact2 || null,
                        contact3: customer.contact3 || null,
                        stateCode: customer.stateCode || 1
                    }
                );
        
                if (result.rowsAffected === 0) {
                    throw new Error(`No customer found with code: ${customer.code}`);
                }
        
                await connection.commit();
                return { success: true, message: "Customer updated successfully" };
        
            } finally {
                if (connection) await connection.close();
            }
        }
        
        
        async getByCode(code) {
            if (!code || code <= 0) {
                throw "Invalid customer code";
            }
        
            let connection;
            try {
                connection = await connector.getConnection();
                if (!connection) {
                    throw "Unable to connect to database";
                }
        
                let resultSet = await connection.execute(
                    `SELECT CODE, NAME, ADDRESS, REG_TITLE_1, REG_VALUE_1, 
                            REG_TITLE_2, REG_VALUE_2, REG_TITLE_3, REG_VALUE_3, 
                            CONTACT_1, CONTACT_2, CONTACT_3, STATE_CODE
                     FROM ac_customer
                     WHERE CODE = :code`,
                    { code }
                );
        
                if (resultSet.rows.length === 0) {
                    return null;  // Customer not found
                }
        
                let row = resultSet.rows[0];
                return {
                    code: row[0],
                    name: row[1]?.trim(),
                    address: row[2]?.trim(),
                    regTitle1: row[3]?.trim() || null,
                    regValue1: row[4]?.trim() || null,
                    regTitle2: row[5]?.trim() || null,
                    regValue2: row[6]?.trim() || null,
                    regTitle3: row[7]?.trim() || null,
                    regValue3: row[8]?.trim() || null,
                    contact1: row[9]?.trim() || null,
                    contact2: row[10]?.trim() || null,
                    contact3: row[11]?.trim() || null,
                    stateCode: row[12]
                };
        
            } finally {
                if (connection) {
                    await connection.close();
                }
            }
        }
        async remove(code) {
            if (!code || code <= 0) {
                throw new Error("Invalid customer code");
            }
        
            let connection;
            try {
                connection = await connector.getConnection();
                if (!connection) {
                    throw new Error("Unable to connect to database");
                }
        
                let result = await connection.execute(
                    `DELETE FROM ac_customer WHERE CODE = :code`,
                    { code }
                );
        
                if (result.rowsAffected === 0) {
                    throw new Error(`No customer found with code: ${code}`);
                }
        
                await connection.commit();
                return { success: true, message: "Customer removed successfully" };
        
            } finally {
                if (connection) {
                    await connection.close();
                }
            }
        }
        
    
       
        async getAll() {
        let connection;
        try {
            connection = await connector.getConnection();
            if (!connection) {
                throw "Unable to connect to database";
            }
    
            let resultSet = await connection.execute(
                `SELECT CODE, NAME, ADDRESS, REG_TITLE_1, REG_VALUE_1, 
                        REG_TITLE_2, REG_VALUE_2, REG_TITLE_3, REG_VALUE_3, 
                        CONTACT_1, CONTACT_2, CONTACT_3, STATE_CODE
                 FROM ac_customer
                 ORDER BY NAME`
            );
    
            let customers = resultSet.rows.map(row => ({
                code: row[0],
                name: row[1]?.trim(),
                address: row[2]?.trim(),
                regTitle1: row[3]?.trim() || null,
                regValue1: row[4]?.trim() || null,
                regTitle2: row[5]?.trim() || null,
                regValue2: row[6]?.trim() || null,
                regTitle3: row[7]?.trim() || null,
                regValue3: row[8]?.trim() || null,
                contact1: row[9]?.trim() || null,
                contact2: row[10]?.trim() || null,
                contact3: row[11]?.trim() || null,
                stateCode: row[12]
            }));
    
            console.log("Fetched Customers:", customers);
            return customers;
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }
    
}



module.exports={UnitofMeasurmentManager,ItemManager,StateManager,TraderManager,CustomerManager};