
import React, { useState } from "react";
import { Button, TextField, DialogActions, LinearProgress, Typography } from "@material-ui/core";
import TMAlert from "../components/TMAlert";

const DeleteItemComponent = ({ closeDialog }) => {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);  
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("info");

    const closeAlert = () => setAlertOpen(false);

    const deleteItem = async () => {
        if (!code.trim()) {
            setAlertMessage(" Item code is required!");
            setAlertSeverity("warning");
            setAlertOpen(true);
            return;
        }

        setLoading(true);  

        setTimeout(async () => {
            setLoading(false); 

            try {
                const response = await fetch(`/deleteItem?itemCode=${encodeURIComponent(code)}`, {
                    method: "DELETE",
                });

                const data = await response.json();
                if (data.success) {
                    setAlertMessage(" Item deleted successfully!");
                    setAlertSeverity("success");
                    setAlertOpen(true);

                    setTimeout(() => {
                        setCode("");
                        closeDialog();
                    }, 1000);
                } else {
                    setAlertMessage(data.error || " Failed to delete item.");
                    setAlertSeverity("error");
                    setAlertOpen(true);
                }
            } catch (error) {
                setAlertMessage("⚠️ Error deleting item!");
                setAlertSeverity("error");
                setAlertOpen(true);
            }

            setTimeout(() => setAlertOpen(false), 5000); 
        }, 5000); 
    };

    return (
        <div>
            {loading && <LinearProgress />}
            <Typography variant="h5" ><TextField
                label="Enter Item Code"
                value={code}
                onChange={(ev) => setCode(ev.target.value)}
                fullWidth
            />
            </Typography>
            
            
            <DialogActions>
                <Button variant="contained" color="secondary" onClick={closeDialog}>
                    No
                </Button>
                <Button variant="contained" color="primary" onClick={deleteItem} disabled={loading}>
                    Yes
                </Button>
            </DialogActions>

            {/* ✅ Snackbar (TMAlert) will show after 5 sec */}
            <TMAlert 
                open={alertOpen} 
                message={alertMessage} 
                severity={alertSeverity} 
                onClose={closeAlert} 
            />
        </div>
    );
};

export default DeleteItemComponent;
