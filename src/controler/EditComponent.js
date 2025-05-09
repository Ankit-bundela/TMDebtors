/*
import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import TMAlert from "../components/TMAlert";

const EditItemComponent = ({ closeDialog, selectedItem }) => {
    const [name, setName] = useState("");
    const [cgst, setCgst] = useState("");
    const [sgst, setSgst] = useState("");
    const [igst, setIgst] = useState("");
    const [unitOfMeasurements, setUnitOfMeasurements] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("info");

    useEffect(() => {
        if (selectedItem) {
            setName(selectedItem.name);
            setCgst(selectedItem.cgst);
            setSgst(selectedItem.sgst);
            setIgst(selectedItem.igst);
            setUnitOfMeasurements(selectedItem.unitofMeasurments.map(u => u.name).join(", "));
        }
    }, [selectedItem]);

    const closeAlert = () => setAlertOpen(false);

    const updateItem = async () => {
        if (!name.trim()) {
            setAlertMessage("Item name is required!");
            setAlertSeverity("warning");
            setAlertOpen(true);
            return;
        }

        try {
            const response = await fetch("/updateItem", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    code: selectedItem.code,
                    name,
                    cgst: parseFloat(cgst) || 0,
                    sgst: parseFloat(sgst) || 0,
                    igst: parseFloat(igst) || 0,
                    unitofMeasurments: unitOfMeasurements.split(",").map(uom => ({ name: uom.trim() }))
                })
            });

            const data = await response.json();
            if (data.success) {
                setAlertMessage("Item updated successfully!");
                setAlertSeverity("success");
                setAlertOpen(true);

                setTimeout(() => {
                    closeDialog();
                }, 1000);
            } else {
                setAlertMessage(data.error);
                setAlertSeverity("error");
                setAlertOpen(true);
            }
        } catch (error) {
            setAlertMessage("Error updating item!");
            setAlertSeverity("error");
            setAlertOpen(true);
        }
    };

    return (
        <div>
            <TextField label="Item Name" value={name} onChange={(ev) => setName(ev.target.value)} fullWidth />
            <TextField label="CGST" type="number" value={cgst} onChange={(ev) => setCgst(ev.target.value)} fullWidth />
            <TextField label="SGST" type="number" value={sgst} onChange={(ev) => setSgst(ev.target.value)} fullWidth />
            <TextField label="IGST" type="number" value={igst} onChange={(ev) => setIgst(ev.target.value)} fullWidth />
            <TextField label="Unit of Measurements (comma-separated)" value={unitOfMeasurements} onChange={(ev) => setUnitOfMeasurements(ev.target.value)} fullWidth />

            <Button variant="contained" color="primary" style={{ marginTop: "10px" }} onClick={updateItem}>
                Update
            </Button>

            <TMAlert open={alertOpen} message={alertMessage} severity={alertSeverity} onClose={closeAlert} />
        </div>
    );
};

export default EditItemComponent;
*/
import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import TMAlert from "../components/TMAlert";

const EditItemComponent = ({ closeDialog, selectedItem }) => {
    const [name, setName] = useState("");
    const [cgst, setCgst] = useState("");
    const [sgst, setSgst] = useState("");
    const [igst, setIgst] = useState("");
    const [hsnCode,setHsnCode] = useState("");

    const [unitOfMeasurements, setUnitOfMeasurements] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("info");

    useEffect(() => {
        if (selectedItem) {
            setName(selectedItem.name);
            setCgst(selectedItem.cgst);
            setSgst(selectedItem.sgst);
            setIgst(selectedItem.igst);
            setHsnCode(selectedItem.hsnCode || "");
            setUnitOfMeasurements(selectedItem.unitofMeasurments.map(u => u.name).join(", "));
        }
    }, [selectedItem]);

    const closeAlert = () => setAlertOpen(false);

    const updateItem = async () => {
        if (!name.trim()) {
            setAlertMessage("Item name is required!");
            setAlertSeverity("warning");
            setAlertOpen(true);
            return;
        }

        try {
            const response = await fetch("/updateItem", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    code: selectedItem.code,
                    name,
                    cgst: parseFloat(cgst) || 0,
                    sgst: parseFloat(sgst) || 0,
                    igst: parseFloat(igst) || 0,
                    hsnCode:hsnCode || "",
                    unitofMeasurments: unitOfMeasurements.split(",").map(uom => ({ name: uom.trim() }))
                })
            });

            const data = await response.json();
            if (data.success) {
                setAlertMessage("Item updated successfully!");
                setAlertSeverity("success");
                setAlertOpen(true);

                setTimeout(() => {
                    closeDialog();
                }, 1000);
            } else {
                setAlertMessage(data.error);
                setAlertSeverity("error");
                setAlertOpen(true);
            }
        } catch (error) {
            setAlertMessage("Error updating item!");
            setAlertSeverity("error");
            setAlertOpen(true);
        }
    };

    return (
        <div>
            <TextField label="Item Name" value={name} onChange={(ev) => setName(ev.target.value)} fullWidth />
            <TextField label="CGST" type="number" value={cgst} onChange={(ev) => setCgst(ev.target.value)} fullWidth />
            <TextField label="SGST" type="number" value={sgst} onChange={(ev) => setSgst(ev.target.value)} fullWidth />
            <TextField label="IGST" type="number" value={igst} onChange={(ev) => setIgst(ev.target.value)} fullWidth />
            <TextField label="HSN Code" type="number" value={hsnCode} onChange={(ev) => setHsnCode(ev.target.value)} fullWidth />
            <TextField label="Unit of Measurements (comma-separated)" value={unitOfMeasurements} onChange={(ev) => setUnitOfMeasurements(ev.target.value)} fullWidth />

            <Button variant="contained" color="primary" style={{ marginTop: "10px" }} onClick={updateItem}>
                Update
            </Button>

            <TMAlert open={alertOpen} message={alertMessage} severity={alertSeverity} onClose={closeAlert} />
        </div>
    );
};

export default EditItemComponent;
