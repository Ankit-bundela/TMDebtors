
import React, { useState, useEffect } from "react";
import {
    Container,
    Paper,
    Typography,
    TextField,
    Grid,
    Button,
    CircularProgress,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TMAlert from "./TMAlert";

const TraderComponent = () => {
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [traderLoading, setTraderLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: "", severity: "info" });

    const [formData, setFormData] = useState({
        code: "",
        name: "",
        address: "",
        gstNum: "",
        regTitle1: "",
        regValue1: "",
        contact1: "",
        contact2: "",
        stateCode: "",
        bankName: "",
        accountNo: "",
        branchName: "",
        ifscCode: "",
    });

    useEffect(() => {
        fetch("/getTrader")
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setFormData({
                        code: data.code || "",
                        name: data.name || "",
                        address: data.address || "",
                        gstNum: data.gstNum || "",
                        regTitle1: data.regTitle1 || "",
                        regValue1: data.regValue1 || "",
                        contact1: data.contact1 || "",
                        contact2: data.contact2 || "",
                        stateCode: data.stateCode || "",
                        bankName: data.bankName || "",
                        accountNo: data.accountNo || "",
                        branchName: data.branchName || "",
                        ifscCode: data.ifscCode || "",
                    });
                }
                setTraderLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching trader:", err);
                setTraderLoading(false);
            });
    }, []);

    useEffect(() => {
        fetch("/getStates")
            .then((res) => res.json())
            .then((data) => {
                setStates(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching states:", err);
                setLoading(false);
            });
    }, []);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setUpdating(true);

        try {
            const response = await fetch("/updateTrader", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams(formData).toString(),
            });

            const result = await response.json();
            setTimeout(() => {
                setUpdating(false);
                if (result.success) {
                    setAlert({ open: true, message: "Trader updated successfully!", severity: "success" });
                } else {
                    setAlert({ open: true, message: result.error, severity: "error" });
                }
            }, 2000);
        } catch (error) {
            setTimeout(() => {
                setUpdating(false);
                setAlert({ open: true, message: "Something went wrong!", severity: "error" });
            }, 2000);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: 30, minHeight: 300 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Trader Details
                </Typography>

                {updating ? (
                    <div style={{ display: "flex", justifyContent: "center", height: "250px" }}>
                        <CircularProgress size={50} />
                    </div>
                ) : traderLoading ? (
                    <CircularProgress />
                ) : (
                    <form onSubmit={handleSubmit}>
                        {/* Basic Details */}
                        <fieldset style={{ marginBottom: "20px", padding: "15px", borderRadius: "5px" }}>
                            <legend><Typography variant="h6">Basic Details</Typography></legend>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Code" name="code" value={formData.code} onChange={handleChange} required />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} required />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} required />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth label="GST Number" name="gstNum" value={formData.gstNum} onChange={handleChange} required />
                                </Grid>
                                <Grid item xs={6}>
                                    {loading ? (
                                        <CircularProgress />
                                    ) : (
                                        <Autocomplete
                                            options={states}
                                            getOptionLabel={(state) => state.name}
                                            value={states.find((s) => s.code === formData.stateCode) || null}
                                            onChange={(event, newValue) => {
                                                setFormData({ ...formData, stateCode: newValue ? newValue.code : "" });
                                            }}
                                            renderInput={(params) => <TextField {...params} label="Select State" variant="outlined" required />}
                                        />
                                    )}
                                </Grid>
                            </Grid>
                        </fieldset>

                        {/* Bank Details */}
                        <fieldset style={{ marginBottom: "20px", padding: "15px", borderRadius: "5px" }}>
                            <legend><Typography variant="h6">Bank Details</Typography></legend>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField fullWidth label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} required />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth label="Account Number" name="accountNo" value={formData.accountNo} onChange={handleChange} required />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth label="Branch Name" name="branchName" value={formData.branchName} onChange={handleChange} required />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth label="IFSC Code" name="ifscCode" value={formData.ifscCode} onChange={handleChange} required />
                                </Grid>
                            </Grid>
                        </fieldset>

                        {/* Contact Details */}
                        <fieldset style={{ marginBottom: "20px", padding: "15px", borderRadius: "5px" }}>
                            <legend><Typography variant="h6">Contact Details</Typography></legend>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField fullWidth label="Contact 1" name="contact1" value={formData.contact1} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth label="Contact 2" name="contact2" value={formData.contact2} onChange={handleChange} />
                                </Grid>
                            </Grid>
                        </fieldset>

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                <Typography variant="h6">Update Trader</Typography>
                            </Button>
                        </Grid>
                    </form>
                )}
            </Paper>

            <TMAlert open={alert.open} message={alert.message} severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })} />

        </Container>
        // TraderComponent.js

    );
};

export default TraderComponent;
