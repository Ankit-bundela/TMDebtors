import React, { useState } from "react";
import { Button, TextField, Snackbar } from "@material-ui/core";

const AddItemComponent = ({ closeDialog }) => {
    const [name, setName] = useState("");
    const [cgst, setCgst] = useState("");
    const [sgst, setSgst] = useState("");
    const [igst, setIgst] = useState("");
    const [unitOfMeasurements, setUnitOfMeasurements] = useState("");
    
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const closeSnackbar = () => {
        setSnackbarOpen(false);
        setSnackbarMessage("");
    };

    const addItem = async () => {
        if (!name.trim()) {
            setSnackbarMessage("Item name is required!");
            setSnackbarOpen(true);
            return;
        }
        if (name.length > 25) {
            setSnackbarMessage("Item name cannot exceed 25 characters!");
            setSnackbarOpen(true);
            return;
        }

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
            if (data.success) {
                setSnackbarMessage("Item added successfully!");
                setName("");
                setCgst("");
                setSgst("");
                setIgst("");
                setUnitOfMeasurements("");
                closeDialog(); // Dialog close karne ke liye
            } else {
                setSnackbarMessage(data.error);
            }
        } catch (error) {
            setSnackbarMessage("Error adding item!");
        }
        setSnackbarOpen(true);
    };

    return (
        <div>
            <TextField
                label="Item Name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                fullWidth
            />

            <TextField
                label="CGST"
                type="number"
                value={cgst}
                onChange={(ev) => setCgst(ev.target.value)}
                fullWidth
            />

            <TextField
                label="SGST"
                type="number"
                value={sgst}
                onChange={(ev) => setSgst(ev.target.value)}
                fullWidth
            />

            <TextField
                label="IGST"
                type="number"
                value={igst}
                onChange={(ev) => setIgst(ev.target.value)}
                fullWidth
            />

            <TextField
                label="Unit of Measurements (comma-separated)"
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

            <Snackbar
            
                open={snackbarOpen}
                message={snackbarMessage}
                onClose={closeSnackbar}
                autoHideDuration={5000}
            />
        </div>
    );
};

export default AddItemComponent;
