/*
import React, { useState } from "react";
import { Button, TextField, Snackbar } from "@material-ui/core";
import {LinearProgress} from "@material-ui/core";
import TMAlert from "../components/TMAlert";

const AddItemComponent = ({ closeDialog }) => {
    const [name, setName] = useState("");
    const [cgst, setCgst] = useState("");
    const [sgst, setSgst] = useState("");
    const [igst, setIgst] = useState("");
    const [unitOfMeasurements, setUnitOfMeasurements] = useState("");

    const [itemNameInvalid, setItemNameInvalid] = useState(false);
    const [itemNameHelperText, setItemNameHelperText] = useState("");
    const [cgstInvalid, setCgstInvalid] = useState(false);
    const [sgstInvalid, setSgstInvalid] = useState(false);
    const [igstInvalid, setIgstInvalid] = useState(false);
    const [cgstHelperText, setCgstHelperText] = useState("");
    const [sgstHelperText, setSgstHelperText] = useState("");
    const [igstHelperText, setIgstHelperText] = useState("");

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [loading, setLoading] = useState(false);


    const closeSnackbar = () => {
        setSnackbarOpen(false);
        setSnackbarMessage("");
    };

    const itemNameChanged = (ev) => {
        const val = ev.target.value;
        setName(val);

        const isValid = /^[A-Za-z ]+$/.test(val);
        if (val.trim() === "") {
            setItemNameHelperText("");
            setItemNameInvalid(false);
        } else if (val.length > 25) {
            setItemNameHelperText("Name cannot exceed 25 characters");
            setItemNameInvalid(true);
        } else if (!isValid) {
            setItemNameHelperText("Only letters and spaces allowed");
            setItemNameInvalid(true);
        } else {
            setItemNameHelperText("");
            setItemNameInvalid(false);
        }
    };

    const validateTax = (val, setFunc, setErrorFunc, setHelperFunc) => {
        if (val.trim() === "") {
            setHelperFunc("");
            setErrorFunc(false);
        } else if (isNaN(val) || Number(val) < 0 || Number(val) > 100) {
            setHelperFunc("Enter a valid number between 0 and 100");
            setErrorFunc(true);
        } else {
            setHelperFunc("");
            setErrorFunc(false);
        }
        setFunc(val);
    };

    const addItem = async () => {
        if (!name.trim()) {
            setSnackbarMessage("Item name is required!");
            setSnackbarOpen(true);
            return;
        }
        setLoading(true);

        try {
            const response = await fetch("/addItem", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    cgst: parseFloat(cgst) || 0,
                    sgst: parseFloat(sgst) || 0,
                    igst: parseFloat(igst) || 0,
                    unitofMeasurments: unitOfMeasurements.split(",").map(uom => ({ name: uom.trim() }))
                })
            });

            const data = await response.json();
            setLoading(false);
            if (data.success) {
                setSnackbarMessage("Item added successfully!");
                setName("");
                setCgst("");
                setSgst("");
                setIgst("");
                setUnitOfMeasurements("");
                closeDialog();
            } else {
                setSnackbarMessage(data.error);
            }
        } catch (error) {
            setLoading(false);
            setSnackbarMessage("Error adding item!");
        }
        setSnackbarOpen(true);
    };

    return (
        <div>
             {loading && <LinearProgress />}
            <TextField
                label="Item Name"
                value={name}
                onChange={itemNameChanged}
                fullWidth
                placeholder="Enter Item Name"
                helperText={itemNameHelperText}
                error={itemNameInvalid}
            />

            <TextField
                label="CGST(%)"
                placeholder="Enter CGST"
                type="number"
                value={cgst}
                onChange={(ev) => validateTax(ev.target.value, setCgst, setCgstInvalid, setCgstHelperText)}
                helperText={cgstHelperText}
                error={cgstInvalid}
                fullWidth
            />

            <TextField
                label="SGST(%)"
                placeholder="Enter SGST"
                type="number"
                value={sgst}
                onChange={(ev) => validateTax(ev.target.value, setSgst, setSgstInvalid, setSgstHelperText)}
                helperText={sgstHelperText}
                error={sgstInvalid}
                fullWidth
            />

            <TextField
                label="IGST(%)"
                placeholder="Enter IGST"
                type="number"
                value={igst}
                onChange={(ev) => validateTax(ev.target.value, setIgst, setIgstInvalid, setIgstHelperText)}
                helperText={igstHelperText}
                error={igstInvalid}
                fullWidth
            />

            <TextField
                label="Unit of Measurements"
                placeholder="Enter Unit of Measurements"
                value={unitOfMeasurements}
                onChange={(ev) => setUnitOfMeasurements(ev.target.value)}
                fullWidth
            />
            <Button 
                variant="contained" 
                color="primary"  
                style={{ marginTop: "10px" }} 
                onClick={addItem}
            >
                Add
            </Button>
            

                <TMAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity="success"
                onClose={closeSnackbar}
                duration={5000}
            />
        </div>
    );
};
export default AddItemComponent;
*/
import React, { useState } from "react";
import { Button, TextField, Snackbar } from "@material-ui/core";
import {LinearProgress} from "@material-ui/core";
import TMAlert from "../components/TMAlert";

const AddItemComponent = ({ closeDialog }) => {
    const [name, setName] = useState("");
    const [cgst, setCgst] = useState("");
    const [sgst, setSgst] = useState("");
    const [igst, setIgst] = useState("");
    const [hsnCode, setHsnCode] = useState("");
    const [unitOfMeasurements, setUnitOfMeasurements] = useState("");

    const [itemNameInvalid, setItemNameInvalid] = useState(false);
    const [itemNameHelperText, setItemNameHelperText] = useState("");
    const [cgstInvalid, setCgstInvalid] = useState(false);
    const [sgstInvalid, setSgstInvalid] = useState(false);
    const [igstInvalid, setIgstInvalid] = useState(false);
    const [cgstHelperText, setCgstHelperText] = useState("");
    const [sgstHelperText, setSgstHelperText] = useState("");
    const [igstHelperText, setIgstHelperText] = useState("");

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [loading, setLoading] = useState(false);


    const closeSnackbar = () => {
        setSnackbarOpen(false);
        setSnackbarMessage("");
    };

    const itemNameChanged = (ev) => {
        const val = ev.target.value;
        setName(val);

        const isValid = /^[A-Za-z ]+$/.test(val);
        if (val.trim() === "") {
            setItemNameHelperText("");
            setItemNameInvalid(false);
        } else if (val.length > 25) {
            setItemNameHelperText("Name cannot exceed 25 characters");
            setItemNameInvalid(true);
        } else if (!isValid) {
            setItemNameHelperText("Only letters and spaces allowed");
            setItemNameInvalid(true);
        } else {
            setItemNameHelperText("");
            setItemNameInvalid(false);
        }
    };

    const validateTax = (val, setFunc, setErrorFunc, setHelperFunc) => {
        if (val.trim() === "") {
            setHelperFunc("");
            setErrorFunc(false);
        } else if (isNaN(val) || Number(val) < 0 || Number(val) > 100) {
            setHelperFunc("Enter a valid number between 0 and 100");
            setErrorFunc(true);
        } else {
            setHelperFunc("");
            setErrorFunc(false);
        }
        setFunc(val);
    };

    const addItem = async () => {
        if (!name.trim()) {
            setSnackbarMessage("Item name is required!");
            setSnackbarOpen(true);
            return;
        }
        setLoading(true);

        try {
            const response = await fetch("/addItem", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    cgst: parseFloat(cgst) || 0,
                    sgst: parseFloat(sgst) || 0,
                    igst: parseFloat(igst) || 0,
                    hsnCode:hsnCode.trim(),
                    unitofMeasurments: unitOfMeasurements.split(",").map(uom => ({ name: uom.trim() }))
                })
            });

            const data = await response.json();
            setLoading(false);
            if (data.success) {
                setSnackbarMessage("Item added successfully!");
                setName("");
                setCgst("");
                setSgst("");
                setIgst("");
                setHsnCode("");
                setUnitOfMeasurements("");
                closeDialog();
            } else {
                setSnackbarMessage(data.error);
            }
        } catch (error) {
            setLoading(false);
            setSnackbarMessage("Error adding item!");
        }
        setSnackbarOpen(true);
    };

    return (
        <div>
             {loading && <LinearProgress />}
            <TextField
                label="Item Name"
                value={name}
                onChange={itemNameChanged}
                fullWidth
                placeholder="Enter Item Name"
                helperText={itemNameHelperText}
                error={itemNameInvalid}
            />

            <TextField
                label="CGST(%)"
                placeholder="Enter CGST"
                type="number"
                value={cgst}
                onChange={(ev) => validateTax(ev.target.value, setCgst, setCgstInvalid, setCgstHelperText)}
                helperText={cgstHelperText}
                error={cgstInvalid}
                fullWidth
            />

            <TextField
                label="SGST(%)"
                placeholder="Enter SGST"
                type="number"
                value={sgst}
                onChange={(ev) => validateTax(ev.target.value, setSgst, setSgstInvalid, setSgstHelperText)}
                helperText={sgstHelperText}
                error={sgstInvalid}
                fullWidth
            />

            <TextField
                label="IGST(%)"
                placeholder="Enter IGST"
                type="number"
                value={igst}
                onChange={(ev) => validateTax(ev.target.value, setIgst, setIgstInvalid, setIgstHelperText)}
                helperText={igstHelperText}
                error={igstInvalid}
                fullWidth
            />
            <TextField
            label="HSN Code"
            placeholder="Enter HSN Code"
            type="text"
            value={hsnCode}
            onChange={(ev) => setHsnCode(ev.target.value)}
            fullWidth
            />


            <TextField
                label="Unit of Measurements"
                placeholder="Enter Unit of Measurements"
                value={unitOfMeasurements}
                onChange={(ev) => setUnitOfMeasurements(ev.target.value)}
                fullWidth
            />
            <Button 
                variant="contained" 
                color="primary"  
                style={{ marginTop: "10px" }} 
                onClick={addItem}
            >
                Add
            </Button>
            

                <TMAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity="success"
                onClose={closeSnackbar}
                duration={5000}
            />
        </div>
    );
};
export default AddItemComponent;
