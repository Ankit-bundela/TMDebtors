/*import { Button, CircularProgress, Fab, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add"
import DialogComponent from "./DialogComponent";
import { Delete, DeleteForever, Edit, EditAttributesSharp, EditLocation, EditLocationTwoTone, Remove, Update } from "@material-ui/icons";
const getItems=()=>{
    var promise=new Promise((resolve,reject)=>{
        fetch('/getItems').then((response)=>{
            if(!response.ok) throw Error("OOps wa Can't not fetch Api Please data after some time");
            return response.json();
        }).then((items)=>{
            resolve(items);
        }).catch((error)=>{
            reject(error.message);
        });
    });
    return promise;
}

const getItemsDetails = (code) => {
    return fetch(`/getItemsDetails?code=${code}`).then((res) => res.json());
};




const mystyles=makeStyles((theme)=>{
    return({
        mainContainer:{
            paddingLeft:theme.spacing(3),
            paddingRight:theme.spacing(3),
            
        },
        dataContaier:{
            height:"300px"
        },
        mainPaper:{
            paddingLeft:theme.spacing(4),
            paddingRight:theme.spacing(4),
            paddingTop:theme.spacing(2),
            paddingBottom:theme.spacing(1),
        },
        mainPaper2:{
            paddingLeft:theme.spacing(5),
            paddingRight:theme.spacing(5),
            paddingTop:theme.spacing(2),
            paddingBottom:theme.spacing(2),
            margin:"20px"
        },

        h1:{
            color:"blue",
            fontWeight:'bold',
        },

    });
});
const deleteItem = (code) => {
    return fetch("/deleteItem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
    }).then((response) => {
        if (!response.ok) throw new Error("Failed to delete item");
        return response.json();
    });
};
const TableComponent=()=>{
    const [items,setItems]=React.useState([]);
    const [showProgress,setShowProgress]=React.useState(true);
    const [pageSize,setPageSize]=React.useState(5);
    const [pageNumber,setPageNumber]=React.useState(1);
    const [selectedStudents,setSelectedStudents]=React.useState([]);
    const [areAllselected,setAreAllselected]=React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogType, setDialogType] = React.useState("add");
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemDetails, setSelectedItemDetails] = useState(null);
    const classes=mystyles();     

    const openAddDialog = () => {
        setDialogType("add");
        setDialogOpen(true);
    };

    
    const openDeleteDialog = () => {
        setDialogType("delete");
        setDialogOpen(true);


    };
    const openEditDialog = (item) => {
        setSelectedItem(item);
        setDialogType("edit");
        setDialogOpen(true);
        getItemsDetails(item.code)
        .then((details) => {
            setSelectedItemDetails(details);
        })
        .catch((error) => {
            console.error("Error fetching item details:", error);
            setSelectedItemDetails(null);
        });

    };

    
    const closeDialog = () => {
        setDialogOpen(false);
    };

    React.useEffect(()=>{
        getItems().then((item)=>{
            setShowProgress(false);
            setItems(item)
        },
        (error)=>{
            alert(error)
        })
    },[]);
    const openRegistrationDialog = () => {
        setDialogOpen(true);
    };

    const closeRegistrationDialog = () => {
        setDialogOpen(false);
    };
    
    const onPageSizedChanged=(ev)=>{
        setPageSize(ev.target.value);
        setPageNumber(1);
    }
    const onPageChanged=(ev,pg)=>{
        setPageNumber(pg+1);
    };

    const isStudentSelected=(rollNumber)=>{
        return selectedStudents.indexOf(rollNumber)!=-1;

    }
    const onSelectedClicked=()=>{
        var selections=[];
        if(areAllselected)
        {
            setAreAllselected(true);
        }
        else{
            items.forEach((items)=>{
                selections.push(items.code);
            });
            setAreAllselected(true);
        }
        setSelectedStudents(selections);
    }

    const onTableRowClicked=(rollNumber)=>{
        var selections=[];
        var index=selectedStudents.indexOf(rollNumber);
        if(index==-1)
        {
            selections=selections.concat(selectedStudents,rollNumber);
        }else{
            if(index==0) selections=selections.concat(selectedStudents.slice(1));
            else if(index==selectedStudents.length-1) selections=selections.concat(selectedStudents.slice(0,selectedStudents.length-1));
            else{
                selections=selections.concat(selectedStudents.slice(0,index),selectedStudents.slice(index+1));
            }
        }
        setSelectedStudents(selections);
        if(selections.length==0) setAreAllselected(false);
        if(selections.length==items.length) setAreAllselected(true);

    }
    return(

        <div className={classes.mainContainer}>
            <Paper className={classes.mainPaper} >
                <Typography variant="h5">Debtors Accounting</Typography>&nbsp;
                <Typography variant="h6" >Number of Items Selected:{selectedStudents.length}</Typography>
                &nbsp;<Fab color="secondary" variant="extended" style={{ float: "right",bottom:"2px",margin:"2px" }} onClick={openDeleteDialog}  ><DeleteForever/></Fab>&nbsp;
                    <Fab color="primary" variant="extended" style={{ float: "right",bottom:"2px",margin:"2px" }} onClick={openAddDialog} >Add<AddIcon/></Fab>&nbsp;&nbsp;&nbsp;                   
                    <DialogComponent openDialog={dialogOpen} closeDialog={closeDialog} dialogType={dialogType} selectedItem={selectedItem} />

                    <TableContainer className={classes.dataContaier}  >
                        <Table  stickyHeader >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                <Checkbox
                                inderminate={selectedStudents.length>0 && selectedStudents.length<items.length }
                                checked={areAllselected}
                                onClick={onSelectedClicked}
                                />
                                </TableCell>
                                <TableCell><Typography>S.no</Typography></TableCell>
                                <TableCell><Typography>Code</Typography></TableCell>
                                <TableCell><Typography>Name</Typography></TableCell>
                                <TableCell><Edit/></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                items.slice((pageNumber-1)*pageSize,(pageNumber-1)*pageSize+pageSize).map((item,idx)=>{
                                    const selectionsState=isStudentSelected(item.code);
                                    return(
                                        <TableRow key={item.code} hover onClick={()=>{onTableRowClicked(item.code);}} >
                                            <TableCell><Checkbox checked={selectionsState} /></TableCell>
                                            <TableCell>{(pageNumber-1)*pageSize+(idx+1)}</TableCell>
                                            <TableCell>{item.code}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell> 
                                                <Fab color="default" size="small" onClick={() => openEditDialog(item)}>
                                                <Edit />
                                                </Fab>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                        </Table>
                        {showProgress && ( <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <CircularProgress />
    </div>) }
                    </TableContainer>
                    <TablePagination
                    component="div"
                    rowsPerPageOptions={[5,10,15,20,25]}
                    const ={items.length}
                    rowsPerPage={pageSize}
                    page={pageNumber-1}
                    
                    onChangePage={onPageChanged}
                    onChangeRowsPerPage={onPageSizedChanged}
                    />
            </Paper>
            {selectedItem && selectedItemDetails && <ItemDetailComponent item={selectedItem} details={selectedItemDetails} />}

        </div>
    )
}

const ItemDetailComponent = ({ item, details }) => {
    return (
        <Paper style={{ padding: 20, marginTop: 20 }}>
            <Typography variant="h4">Item Tax</Typography>
            <Typography>Name: {item.name}</Typography>
            <Typography>CGST: {item.cgst}</Typography>
            <Typography>SGST: {item.sgst}</Typography>
            <Typography>IGST: {item.igst}</Typography>
            <Typography>
                Unit of Measurements: {details.unitofMeasurements && details.unitofMeasurements.length > 0 
                    ? details.unitofMeasurements.map(u => u.name).join(", ") 
                    : "N/A"}
            </Typography>
        
        </Paper>
    );
};


export default TableComponent;
*/
import { 
    Button, CircularProgress, Fab, makeStyles, Paper, Table, 
    TableBody, TableCell, TableContainer, TableHead, TablePagination, 
    TableRow, Typography 
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import DialogComponent from "./DialogComponent";
import { DeleteForever, Edit } from "@material-ui/icons";

const getItems = async () => {
    try {
        const response = await fetch('/getItems');
        if (!response.ok) throw new Error("Failed to fetch API data");
        const data = await response.json();
        return data.success ? data.data : [];
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
};

const getItemsDetails = async (code) => {
    try {
        const response = await fetch(`/getItemsDetails?code=${code}`);
        return response.json();
    } catch (error) {
        console.error("Error fetching item details:", error);
        return null;
    }
};

const deleteItem = async (code) => {
    try {
        const response = await fetch("/deleteItem", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
        });
        if (!response.ok) throw new Error("Failed to delete item");
        return response.json();
    } catch (error) {
        console.error("Error deleting item:", error);
    }
};

const useStyles = makeStyles((theme) => ({
    mainContainer: { padding: theme.spacing(3) },
    dataContainer: { height: "300px" },
    mainPaper: { padding: theme.spacing(4) },
    h1: { color: "blue", fontWeight: 'bold' },
}));

const TableComponent = () => {
    const [items, setItems] = useState([]);
    const [showProgress, setShowProgress] = useState(true);
    const [pageSize, setPageSize] = useState(5);
    const [pageNumber, setPageNumber] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [areAllSelected, setAreAllSelected] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState("add");
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemDetails, setSelectedItemDetails] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        getItems().then((data) => {
            setShowProgress(false);
            setItems(data);
        });
    }, []);

    const openAddDialog = () => {
        setDialogType("add");
        setDialogOpen(true);
    };

    const openDeleteDialog = () => {
        setDialogType("delete");
        setDialogOpen(true);
    };

    const openEditDialog = async (item) => {
        setSelectedItem(item);
        setDialogType("edit");
        setDialogOpen(true);
        const details = await getItemsDetails(item.code);
        setSelectedItemDetails(details);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    const onPageSizeChanged = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPageNumber(0);
    };

    const onPageChanged = (event, newPage) => {
        setPageNumber(newPage);
    };

    const isItemSelected = (code) => selectedItems.includes(code);

    const onSelectedClicked = () => {
        if (areAllSelected) {
            setSelectedItems([]);
            setAreAllSelected(false);
        } else {
            setSelectedItems(items.map(item => item.code));
            setAreAllSelected(true);
        }
    };

    const onTableRowClicked = (code) => {
        setSelectedItems((prevSelected) => {
            const isSelected = prevSelected.includes(code);
            if (isSelected) {
                return prevSelected.filter(itemCode => itemCode !== code);
            } else {
                return [...prevSelected, code];
            }
        });
    };

    return (
        <div className={classes.mainContainer}>
            <Paper className={classes.mainPaper}>
                <Typography variant="h5">Debtors Accounting</Typography>
                <Typography variant="h6">Number of Items Selected: {selectedItems.length}</Typography>

                <Fab color="secondary" variant="extended" style={{ float: "right", margin: "2px" }} onClick={openDeleteDialog}>
                    <DeleteForever />
                </Fab>
                <Fab color="primary" variant="extended" style={{ float: "right", margin: "2px" }} onClick={openAddDialog}>
                    Add <AddIcon />
                </Fab>

                <DialogComponent openDialog={dialogOpen} closeDialog={closeDialog} dialogType={dialogType} selectedItem={selectedItem} />

                <TableContainer className={classes.dataContainer}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Checkbox
                                        indeterminate={selectedItems.length > 0 && selectedItems.length < items.length}
                                        checked={areAllSelected}
                                        onClick={onSelectedClicked}
                                    />
                                </TableCell>
                                <TableCell><Typography>S.no</Typography></TableCell>
                                <TableCell><Typography>Code</Typography></TableCell>
                                <TableCell><Typography>Name</Typography></TableCell>
                                <TableCell><Typography>HSN Code</Typography></TableCell>
                                <TableCell><Edit /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {showProgress ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : items.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No data available
                                    </TableCell>
                                </TableRow>
                            ) : (
                                items.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize).map((item, idx) => (
                                    <TableRow key={item.code} hover onClick={() => onTableRowClicked(item.code)}>
                                        <TableCell><Checkbox checked={isItemSelected(item.code)} /></TableCell>
                                        <TableCell>{pageNumber * pageSize + (idx + 1)}</TableCell>
                                        <TableCell>{item.code}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.hsnCode}</TableCell>
                                        <TableCell>
                                            <Fab color="default" size="small" onClick={() => openEditDialog(item)}>
                                                <Edit />
                                            </Fab>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    component="div"
                    rowsPerPageOptions={[5, 10, 15, 20, 25]}
                    count={items.length}
                    rowsPerPage={pageSize}
                    page={pageNumber}
                    onPageChange={onPageChanged}
                    onRowsPerPageChange={onPageSizeChanged}
                />
            </Paper>

            {selectedItem && selectedItemDetails && <ItemDetailComponent item={selectedItem} details={selectedItemDetails} />}
        </div>
    );
};
const ItemDetailComponent = ({ item, details }) => {
    return (
        <Paper style={{ padding: 20, marginTop: 20 }}>
            <Typography variant="h4">Item Tax</Typography>
            <Typography>Name: {item.name}</Typography>
            <Typography>CGST: {item.cgst}</Typography>
            <Typography>SGST: {item.sgst}</Typography>
            <Typography>IGST: {item.igst}</Typography>
            <Typography>
                Unit of Measurements: {details.unitofMeasurements && details.unitofMeasurements.length > 0 
                    ? details.unitofMeasurements.map(u => u.name).join(", ") 
                    : "N/A"}
            </Typography>
        
        </Paper>
    );
};

export default TableComponent;
