import React from "react";  
import {  Button, Dialog, DialogActions,  CircularProgress,DialogContent, DialogTitle, Fab, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { useState } from "react";
import {TextField} from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import TMAlert from "./TMAlert";
import {Box} from "@material-ui/core";


const mystyles = makeStyles(() => ({
    mainContainer: {
        display: "flex"
    },
    leftContainer: {
        marginLeft: "5px",
        paddingRight: "10px",
        borderRight: "1px solid black",
        padding: "2px"
    },
    rightContainer: {
        flexGrow: 1,
        marginLeft: "20px"
    },
    leftCustomer: {
        width: "100%",
        backgroundColor: "#d14c13",
        textAlign: 'center',
        padding: "3px"
    }
}));

const getCustomers = () => {
    var promise=new Promise((resolve, reject) => {
        fetch('/getCustomers').then((response) => {
                if (!response.ok) throw Error("OOPs server is not responding. Please try after some time.");
                return response.json();
            }).then((customer)=>{
                 resolve(customer)
            }).catch((error) =>{
                 reject(error.message)});
    });
    return promise;
};
const addCustomer = (customer) => {
    return new Promise((resolve) => {
        const dataString = `name=${encodeURIComponent(customer.name)}&address=${encodeURIComponent(customer.address)}&stateCode=${customer.stateCode}&regTitle1=${encodeURIComponent(customer.regTitle1 || '')}&regValue1=${encodeURIComponent(customer.regValue1 || '')}&regTitle2=${encodeURIComponent(customer.regTitle2 || '')}&regValue2=${encodeURIComponent(customer.regValue2 || '')}&regTitle3=${encodeURIComponent(customer.regTitle3 || '')}&regValue3=${encodeURIComponent(customer.regValue3 || '')}&contact1=${encodeURIComponent(customer.contact1 || '')}&contact2=${encodeURIComponent(customer.contact2 || '')}&contact3=${encodeURIComponent(customer.contact3 || '')}`;

        fetch("/addCustomer", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: dataString
        })
        .then(response => response.json())
        .then(responseJSON => resolve(responseJSON))
        .catch(error => resolve({ success: false, error: error.toString() }));
    });
};
const updateCustomer = (customer) => {
    return new Promise((resolve) => {
        const dataString = `code=${encodeURIComponent(customer.code)}&name=${encodeURIComponent(customer.name || '')}&address=${encodeURIComponent(customer.address || '')}&stateCode=${encodeURIComponent(customer.stateCode || '')}&regTitle1=${encodeURIComponent(customer.regTitle1 || '')}&regValue1=${encodeURIComponent(customer.regValue1 || '')}&regTitle2=${encodeURIComponent(customer.regTitle2 || '')}&regValue2=${encodeURIComponent(customer.regValue2 || '')}&regTitle3=${encodeURIComponent(customer.regTitle3 || '')}&regValue3=${encodeURIComponent(customer.regValue3 || '')}&contact1=${encodeURIComponent(customer.contact1 || '')}&contact2=${encodeURIComponent(customer.contact2 || '')}&contact3=${encodeURIComponent(customer.contact3 || '')}`;

        fetch("/updateCustomer", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: dataString
        })
        .then(response => response.json())
        .then(responseJSON => resolve(responseJSON))
        .catch(error => resolve({ success: false, error: error.toString() }));
    });
};
const removeCustomer = (customerCode) => {
    return new Promise((resolve) => {
        const dataString = `code=${encodeURIComponent(customerCode)}`;

        fetch("/removeCustomer", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: dataString
        })
        .then(response => response.json())
        .then(responseJSON => resolve(responseJSON))
        .catch(error => resolve({ success: false, error: error.toString() }));
    });
};


const Appsaccordian = () => {
    const [customers, setCustomers] = React.useState([]);
    const [selectedCustomer, setSelectedCustomer] = React.useState(null);
     
    React.useEffect(()=>{
            getCustomers().then((customer)=>{
                setCustomers(customer);
            },(error)=>{
                alert(error);
            });
    },[]);

    const handleCustomerSelect = (customer) => {
        setSelectedCustomer(customer);
    };

    const classes = mystyles();

    return (
        <div>
            <HeaderComponent />
            <div className={classes.mainContainer}>
                <div className={classes.leftContainer}>
                    <Typography variant="h5" className={classes.leftCustomer}>Customer</Typography>
                    <CustomerNameComponenet customers={customers} onSelect={handleCustomerSelect} />
                </div>
                <div className={classes.rightContainer}>
                    <CustomerListComponent selectedCustomer={selectedCustomer} />
                </div>
            </div>
        </div>
    );
};

const HeaderComponent = () => {
    return <Typography variant="h6" >Customer Information</Typography>
};

const CustomerNameComponenet = ({ customers = [], onSelect }) => {
    return (
        <div>
            <fieldset>
                <legend><Typography variant="h5">Customer Name</Typography></legend>
                {
                    customers.length > 0 ? (
                        customers.map((customer) => (
                            <span key={customer.code} style={{padding:"2px",margin:"2px"}} >
                                <Fab variant="extended" color="primary" >
                                <Button 
                                    onClick={() => onSelect(customer)}
                                >
                                    {customer.name}
                                </Button>
                                
                                </Fab>&nbsp;
                                <br/>

                            </span>
                        ))
                    ) : (
                        <Typography variant="h6">No Customers Available</Typography>
                    )
                }
            </fieldset>
        </div>
    );
};



const CustomerListComponent = ({ selectedCustomer }) => {
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [customerData, setCustomerData] = useState(selectedCustomer || {});

    if (!selectedCustomer) {
        return (
            <Typography variant="h6" style={{ margin: "20px", color: "#666" }}>
                Select a customer to view details
            </Typography>
        );
    }

    const handleEditClick = () => {
        setCustomerData(selectedCustomer);
        setOpenEditDialog(true);
    };

    const handleDeleteClick = () => {
        setCustomerData(selectedCustomer);
        setOpenDeleteDialog(true);
    };

    const handleAddClick = () => {
        setOpenAddDialog(true);
    };

    return (
        <div style={{ position: "relative", padding: "20px" }}>
            <Fab 
                color="primary" 
                style={{ position: "absolute", right: "10px", top: "-40px" }}
                onClick={handleAddClick}
            >
                <Add />
            </Fab>

            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px", background: "#f9f9f9" }}>
                <Typography variant="h5" style={{ marginBottom: "15px", color: "#d14c13" }}>
                    Customer Details
                </Typography>

                <Grid container spacing={2} alignItems="center">
                    {[
                        { label: "Code", value: selectedCustomer?.code },
                        { label: "Name", value: selectedCustomer?.name },
                        { label: "Address", value: selectedCustomer?.address },
                        { label: "Contact 1", value: selectedCustomer?.contact1 || "N/A" },
                        { label: "Contact 2", value: selectedCustomer?.contact2 || "N/A" },
                        { label: "Contact 3", value: selectedCustomer?.contact3 || "N/A" },
                        { label: "State Code", value: selectedCustomer?.stateCode },
                        { label: "Reg Title 1", value: selectedCustomer?.regTitle1 || "N/A" },
                        { label: "Reg Value 1", value: selectedCustomer?.regValue1 || "N/A" },
                        { label: "Reg Title 2", value: selectedCustomer?.regTitle2 || "N/A" },
                        { label: "Reg Value 2", value: selectedCustomer?.regValue2 || "N/A" },
                        { label: "Reg Title 3", value: selectedCustomer?.regTitle3 || "N/A" },
                        { label: "Reg Value 3", value: selectedCustomer?.regValue3 || "N/A" },
                    ].map((item, index) => (
                        <React.Fragment key={index}>
                            <Grid item xs={3}>
                                <Typography variant="subtitle1"><b>{item.label}:</b></Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography>{item.value}</Typography>
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>

                <Grid container spacing={2} style={{ marginTop: "15px", display: "flex", justifyContent: "center" }}>
                    <Grid item>
                        <Button variant="contained" color="secondary" startIcon={<Edit />} onClick={handleEditClick}>
                            Edit
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="default" startIcon={<Delete />} onClick={handleDeleteClick}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <EditDialogComponent 
                open={openEditDialog} 
                handleClose={() => setOpenEditDialog(false)} 
                customerData={customerData} 
                setCustomerData={setCustomerData}
            />



            <DeleteDialogComponent 
                open={openDeleteDialog} 
                handleClose={() => setOpenDeleteDialog(false)} 
                customerData={customerData} 
            />

            <AddDialogComponent 
                open={openAddDialog} 
                handleClose={() => setOpenAddDialog(false)} 
            />
        </div>
    );
};

const DeleteDialogComponent = ({ open, handleClose, customerData }) => {
    const [loading, setLoading] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("info");

    const handleDelete = async () => {
        setLoading(true); // Circular Progress Start

        setTimeout(async () => {
            try {
                const response = await removeCustomer(customerData?.code);
                if (response.success) {
                    setAlertMessage(`${customerData?.name} deleted successfully!`);
                    setAlertSeverity("success");
                } else {
                    setAlertMessage(`Error deleting customer: ${response.error}`);
                    setAlertSeverity("error");
                }
            } catch (error) {
                setAlertMessage(`Error: ${error.message}`);
                setAlertSeverity("error");
            }

            setLoading(false); // Circular Progress Stop
            setAlertOpen(true); // TMAlert Show
            handleClose(); // Dialog Close
        }, 3000); // 3 sec delay
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight={50}>
                            <CircularProgress /> 
                        </Box>
                    ) : (
                        <Typography>
                            Are you sure you want to delete <b>{customerData?.name}</b>?
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default" disabled={loading}>
                        No
                    </Button>
                    <Button onClick={handleDelete} color="secondary" disabled={loading}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            <TMAlert 
                open={alertOpen} 
                message={alertMessage} 
                severity={alertSeverity} 
                onClose={() => setAlertOpen(false)} 
            />
        </>
    );
};

const AddDialogComponent = ({ open, handleClose, onCustomerAdded }) => {
    const [customerData, setCustomerData] = useState({
        name: "",
        address: "",
        stateCode: "",
        regTitle1: "",
        regValue1: "",
        regTitle2: "",
        regValue2: "",
        regTitle3: "",
        regValue3: "",
        contact1: "",
        contact2: "",
        contact3: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAdd = async () => {
        try {
            const response = await addCustomer(customerData);
            if (response.success) {
                alert("Customer added successfully!");
                handleClose();
                onCustomerAdded(); // Refresh the customer list after adding
            } else {
                alert("Error adding customer: " + response.error);
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {[
                        { label: "Customer Name", name: "name" },
                        { label: "Address", name: "address" },
                        { label: "State Code", name: "stateCode" },
                        { label: "Contact 1", name: "contact1" },
                        { label: "Contact 2", name: "contact2" },
                        { label: "Contact 3", name: "contact3" },
                        { label: "Reg Title 1", name: "regTitle1" },
                        { label: "Reg Value 1", name: "regValue1" },
                        { label: "Reg Title 2", name: "regTitle2" },
                        { label: "Reg Value 2", name: "regValue2" },
                        { label: "Reg Title 3", name: "regTitle3" },
                        { label: "Reg Value 3", name: "regValue3" },
                    ].map((field, index) => (
                        <Grid item xs={6} key={index}>
                            <TextField
                                fullWidth
                                margin="dense"
                                label={field.label}
                                name={field.name}
                                value={customerData[field.name]}
                                onChange={handleChange}
                            />
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="default">Cancel</Button>
                <Button onClick={handleAdd} color="primary">Add</Button>
            </DialogActions>
        </Dialog>
    );
};



const EditDialogComponent = ({ open, handleClose, customerData, setCustomerData }) => {
    const [loading, setLoading] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("info");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        setTimeout(async () => {
            try {
                const response = await updateCustomer(customerData);
                if (response.success) {
                    setAlertMessage("Customer updated successfully!");
                    setAlertSeverity("success");
                    handleClose();
                } else {
                    setAlertMessage("Error updating customer: " + response.error);
                    setAlertSeverity("error");
                }
            } catch (error) {
                setAlertMessage("Error: " + error.message);
                setAlertSeverity("error");
            }
            setLoading(false);
            setAlertOpen(true);
        }, 3000);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>Edit Customer Details</DialogTitle>
                <DialogContent>
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight={50}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Grid container spacing={2}>
                            {[{ label: "Customer Code", name: "code" },
                                { label: "Customer Name", name: "name" },
                                { label: "Address", name: "address" },
                                { label: "Contact 1", name: "contact1" },
                                { label: "Contact 2", name: "contact2" },
                                { label: "Contact 3", name: "contact3" },
                                { label: "State Code", name: "stateCode" },
                                { label: "Reg Title 1", name: "regTitle1" },
                                { label: "Reg Value 1", name: "regValue1" },
                                { label: "Reg Title 2", name: "regTitle2" },
                                { label: "Reg Value 2", name: "regValue2" },
                                { label: "Reg Title 3", name: "regTitle3" },
                                { label: "Reg Value 3", name: "regValue3" }
                            ].map((field, index) => (
                                <Grid item xs={6} key={index}>
                                    <TextField 
                                        fullWidth 
                                        margin="dense" 
                                        label={field.label} 
                                        name={field.name} 
                                        value={customerData[field.name] || ""} 
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default" disabled={loading}>Cancel</Button>
                    <Button onClick={handleSave} color="primary" disabled={loading}>Save</Button>
                </DialogActions>
            </Dialog>

            <TMAlert 
                open={alertOpen} 
                message={alertMessage} 
                severity={alertSeverity} 
                onClose={() => setAlertOpen(false)} 
            />
        </>
    );
};

export default Appsaccordian;
