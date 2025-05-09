const entities= require('datalayer/entites');
const managers=require('datalayer/managers');
if(process.argv.length==2)
{
    console.log("You need to pass operation and data:");
    return;
}
var testWhat=process.argv[2];
if(testWhat=="add")
{
    if(process.argv.length<4)
    {
        console.log("Data to add this missing");
        return;
    }
    var name=process.argv[3];
    var k=new entities.UnitofMeasurment(0,name);
    var m=new managers.UnitofMeasurmentManager();
    m.add(k).then(()=>{
        console.log(`Unit of Measurment :${name} added with code ${k.code}`);

    }).catch((err)=>{
        console.log(err);
    });
}//Test what Add end
if(testWhat=="remove")
{
    if(process.argv.length<4)
    {
        console.log("Data to remove this missing");
        return;
    }
    var code=process.argv[3];
    var m=new managers.UnitofMeasurmentManager();
    m.remove(code).then(()=>{
        console.log(`Unit of Measurment : with code ${code} removed `);
        }).catch((err)=>{
        console.log(err);
    });
}//Test what remove end
if(testWhat=="update")
    {
        if(process.argv.length<5)
        {
            console.log("Data to update this missing");
            return;
        }
        var code=process.argv[3];
        var name=process.argv[4];
        var k=new entities.UnitofMeasurment(code,name);
        var m=new managers.UnitofMeasurmentManager();
        m.update(k).then(()=>{
            console.log(`Unit of Measurment :against code ${code} updated with  ${name}`);
    
        }).catch((err)=>{
            console.log(err);
        });
    }//Test what Update end

if(testWhat=="getAll")
{
    var m=new managers.UnitofMeasurmentManager();
    m.getAll().then((UnitofMeasurments)=>{
        if(UnitofMeasurments.length==0)
        {
            console.log("No records");
        }
        else
        {
            var i=0;
            while(i<UnitofMeasurments.length)
            {
                console.log(UnitofMeasurments[i]);
                i++;
            }
        }
    }).catch((err)=>{
        console.log(err);
    });
}//Test getAll end

if(testWhat=="getByCode")
{
    if(process.argv.length<4)
    {
        console.log("Data to getByCode this missing");
        return;
    }
    var code=process.argv[3];
    var m=new managers.UnitofMeasurmentManager();
    m.getByCode(code).then((UnitofMeasurment)=>{
        console.log(UnitofMeasurment);
        }).catch((err)=>{
        console.log(err);
    });
}//Test getByCode end

if(testWhat=="getByName")
{
    if(process.argv.length<4)
    {
        console.log("Data to getByName this missing");
        return;
    }
    var name=process.argv[3];
    var m=new managers.UnitofMeasurmentManager();
    m.getByName(name).then((UnitofMeasurment)=>{
        console.log(UnitofMeasurment);
        }).catch((err)=>{
        console.log(err);
    });
}//Test getByName end
