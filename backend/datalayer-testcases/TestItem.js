const entities= require('datalayer/entities');
const managers=require('datalayer/managers');
if(process.argv.length==2)
{
    console.log("You need to pass operation and data:");
    return;
}if (process.argv.length == 2) {
    console.log("You need to pass operation and data:");
    return;
}
var testWhat = process.argv[2];
if (testWhat == "add") {
    var name = "Cocoa";
    var cgst = 18;
    var sgst = 18;
    var igst = 24;

    var unitofMeasurments = [];
    var unitofMeasurment;

    unitofMeasurment = new entities.UnitofMeasurment(1, "Kg"); // Updated
    unitofMeasurments.push(unitofMeasurment);

    unitofMeasurment = new entities.UnitofMeasurment(4, "PKT");
    unitofMeasurments.push(unitofMeasurment);

    unitofMeasurment = new entities.UnitofMeasurment(0, "Gram");
    unitofMeasurments.push(unitofMeasurment);

    unitofMeasurment = new entities.UnitofMeasurment(0, "PCS");
    unitofMeasurments.push(unitofMeasurment);

    var item = new entities.Item(0, name, cgst, sgst, igst, unitofMeasurments);
    var m = new managers.ItemManager();
    m.add(item)
        .then(() => {
            console.log(`Item :${name} added with code ${item.code}`);
        })
        .catch((err) => {
            console.log(err);
        });
}

if (process.argv.length === 2) {
    console.log("You need to pass operation and data:");
    return;
}

var testWhat = process.argv[2];

if (testWhat === "getAll") {
    var m = new managers.ItemManager();

    m.getAll().then((items) => {
        console.log("Items Retrieved:");
        items.forEach((item, index) => {
            console.log(`Item ${index + 1}:`);
            console.log(`  Code: ${item.code}`);
            console.log(`  Name: ${item.name}`);
            console.log(`  CGST: ${item.cgst}`);
            console.log(`  SGST: ${item.sgst}`);
            console.log(`  IGST: ${item.igst}`);
            console.log(`  Unit of Measurements:`);
            item.unitofMeasurments.forEach((uom, uIndex) => {
                console.log(`    UOM ${uIndex + 1}: Code: ${uom.code}, Name: ${uom.name}`);
            });
        });
    }).catch((err) => {
        console.log(err);
    });
}

