import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import PersonIcon from "@material-ui/icons/Person";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const InvoiceForm = () => {
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [trader, setTrader] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [isInterstate, setIsInterstate] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetch("/getCustomers")
      .then((res) => res.json())
      .then((data) => setCustomers(data.data || []));

    fetch("/getItems")
      .then((res) => res.json())
      .then((data) => setItems(data.data || []));

    fetch("/getTrader")
      .then((res) => res.json())
      .then((data) => setTrader(data.data));
  }, []);

  const handleCustomerChange = (event) => {
    const code = parseInt(event.target.value);
    const customer = customers.find((c) => c.code === code);
    setSelectedCustomer(customer);
    if (customer && trader) {
      setIsInterstate(customer.stateCode !== trader.stateCode);
    }
  };

  const addItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      { itemCode: "", quantity: 1, rate: 0, sgst: 0, cgst: 0, igst: 0 },
    ]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index][field] = value;

    if (field === "itemCode") {
      const selected = items.find((i) => i.code === parseInt(value));
      if (selected) {
        updatedItems[index].rate = selected.rate || 0;
        updatedItems[index].sgst = selected.sgst || 0;
        updatedItems[index].cgst = selected.cgst || 0;
        updatedItems[index].igst = selected.igst || 0;
      }
    }

    setInvoiceItems(updatedItems);
  };

  const calculateRow = (item) => {
    const taxable = item.quantity * item.rate;
    const tax = isInterstate
      ? taxable * (item.igst / 100)
      : taxable * ((item.cgst + item.sgst) / 100);
    const total = taxable + tax;
    return { taxable, total };
  };

  const totalSummary = () => {
    let subtotal = 0;
    let totalTax = 0;
    invoiceItems.forEach((item) => {
      const { taxable, total } = calculateRow(item);
      subtotal += taxable;
      totalTax += total - taxable;
    });
    return { subtotal, totalTax, grandTotal: subtotal + totalTax };
  };

  const handleSubmit = async () => {
    if (!selectedCustomer || !invoiceDate || invoiceItems.length === 0) {
      return setSnackbar({ open: true, message: "Please fill all required fields.", severity: "error" });
    }

    const payload = {
      customerCode: selectedCustomer.code,
      invoiceDate,
      items: invoiceItems.map((i) => {
        const { taxable, total } = calculateRow(i);
        return {
          itemCode: i.itemCode,
          quantity: i.quantity,
          rate: i.rate,
          sgst: isInterstate ? 0 : i.sgst,
          cgst: isInterstate ? 0 : i.cgst,
          igst: isInterstate ? i.igst : 0,
          taxableAmount: taxable,
          totalAmount: total,
        };
      }),
    };

    const res = await fetch("/addInvoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.success) {
      setSnackbar({ open: true, message: "Invoice created successfully!", severity: "success" });
    } else {
      setSnackbar({ open: true, message: "Error creating invoice.", severity: "error" });
    }
  };

  return (
    <Box className="p-6 bg-gray-50 min-h-screen font-['Roboto']">
      <Typography variant="h4" className="text-indigo-700 font-bold mb-6">
        Create Invoice
      </Typography>

      <Box className="flex flex-wrap gap-4 mb-4">
        <TextField
          select
          label="Customer"
          value={selectedCustomer ? selectedCustomer.code : ""}
          onChange={handleCustomerChange}
          className="min-w-[240px]"
        >
          {customers.map((c) => (
            <MenuItem key={c.code} value={c.code}>
              <PersonIcon className="mr-2 text-gray-600" /> {c.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Invoice Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={invoiceDate}
          onChange={(e) => setInvoiceDate(e.target.value)}
        />
      </Box>

      {selectedCustomer && (
        <Paper variant="outlined" className="p-4 bg-white mb-4">
          <Typography variant="subtitle2" className="text-gray-600">
            {isInterstate ? "Interstate" : "Intrastate"} Supply
          </Typography>
          <Typography variant="body2" className="text-sm flex items-center">
            <LocationOnIcon fontSize="small" className="mr-1" />
            Customer State: {selectedCustomer.stateName} ({selectedCustomer.stateCode})
          </Typography>
        </Paper>
      )}

      {trader && (
        <Paper variant="outlined" className="p-4 bg-white mb-4">
          <Typography variant="subtitle2" className="text-gray-600 flex items-center mb-1">
            <AccountBalanceIcon className="mr-2 "  fontSize="medium" color="primary" /> Bank Details
          </Typography>
          <Typography variant="bod2y">Bank: {trader.bankName || "-"}</Typography>
          <Typography variant="body2">Account No: {trader.accountNo || "-"}</Typography>
          <Typography variant="body2">Branch: {trader.branchName || "-"}</Typography>
          <Typography variant="body2">IFSC: {trader.ifscCode || "-"}</Typography>
        </Paper>
      )}

      <Typography variant="h6" className="mb-2 text-gray-800">
        Items
      </Typography>

      <Table size="small" className="mb-3 bg-white shadow-sm">
        <TableHead className="bg-gray-100">
          <TableRow>
            {["Item", "Qty", "Rate", "SGST%", "CGST%", "IGST%", "Taxable", "Total"].map((head) => (
              <TableCell key={head} className="font-semibold text-sm text-gray-700">
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {invoiceItems.map((item, index) => {
            const { taxable, total } = calculateRow(item);
            return (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    select
                    value={item.itemCode}
                    onChange={(e) => handleItemChange(index, "itemCode", e.target.value)}
                    className="min-w-[140px]"
                  >
                    {items.map((i) => (
                      <MenuItem key={i.code} value={i.code}>
                        {i.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", parseFloat(e.target.value))}
                    className="w-[60px]"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, "rate", parseFloat(e.target.value))}
                    className="w-[80px]"
                  />
                </TableCell>
                <TableCell>{isInterstate ? "0" : item.sgst}</TableCell>
                <TableCell>{isInterstate ? "0" : item.cgst}</TableCell>
                <TableCell>{isInterstate ? item.igst : "0"}</TableCell>
                <TableCell>{taxable.toFixed(2)}</TableCell>
                <TableCell>{total.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Button variant="outlined" onClick={addItem} className="mt-1">
        + Add Item
      </Button>

      <Divider className="my-4" />

      <Box className="space-y-1">
        <Typography>Subtotal: ₹{totalSummary().subtotal.toFixed(2)}</Typography>
        <Typography>Tax: ₹{totalSummary().totalTax.toFixed(2)}</Typography>
        <Typography variant="h6" className="font-semibold text-green-700">
          Grand Total: ₹{totalSummary().grandTotal.toFixed(2)}
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        className="mt-6"
      >
        Create Invoice
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default InvoiceForm;