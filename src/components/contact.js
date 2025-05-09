import { useState } from "react";
import { useEffect } from "react";
import { 
  Paper, Typography, TextField, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, makeStyles, 
  Dialog, DialogActions, DialogContent, DialogTitle, Button 
} from "@material-ui/core";
import { AccountBalance, Add, Delete, Description, ShoppingCart } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  mainContainer: { padding: theme.spacing(3) },
  paper: { padding: theme.spacing(4), marginBottom: theme.spacing(2) },
  title: { color: "#1E3A8A", fontWeight: "bold", fontSize: "1.5rem" },
  inputField: { marginBottom: theme.spacing(2) },
  searchContainer: { display: "flex", justifyContent: "flex-start", alignItems: "center", gap: theme.spacing(2), marginBottom: theme.spacing(2) },
  actionButtons: { display: "flex", gap: theme.spacing(1), marginLeft: "auto" },
  searchInput: { flex: 1 },
}));

const AddItemDialog = ({ open, handleClose, addItem }) => {
  const [itemName, setItemName] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [uom, setUom] = useState("");
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const handleAdd = () => {
    const taxableAmount = rate * quantity;
    const sgst = (taxableAmount * 9) / 100;
    const cgst = (taxableAmount * 9) / 100;
    const igst = (taxableAmount * 18) / 100;
    const totalAmount = taxableAmount + sgst + cgst;

    addItem({ itemName, hsnCode, uom, rate, quantity, taxableAmount, sgst, cgst, igst, totalAmount });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Item</DialogTitle>
      <DialogContent>
        <TextField fullWidth margin="dense" label="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        <TextField fullWidth margin="dense" label="HSN Code" value={hsnCode} onChange={(e) => setHsnCode(e.target.value)} />
        <TextField fullWidth margin="dense" label="UOM" value={uom} onChange={(e) => setUom(e.target.value)} />
        <TextField fullWidth margin="dense" label="Rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
        <TextField fullWidth margin="dense" label="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleAdd} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

const ItemsTable = ({ search, setSearch, items = [], addItem }) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  // ** Calculate Total Amount **
  const totalAmount = items.reduce((sum, item) => sum + (item.totalAmount || 0), 0);

  return (
    <Paper className={classes.paper}>
      <div className={classes.searchContainer}>
        <Typography variant="h5" className={classes.title}>
          <IconButton color="inherit"><ShoppingCart /></IconButton> Items
        </Typography>
        <TextField className={classes.searchInput}  variant="outlined" label="Search Items" value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className={classes.actionButtons}>
          <IconButton color="primary" onClick={() => setOpenDialog(true)}>
            <Add />
          </IconButton>
        </div>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>HSN Code</TableCell>
              <TableCell>UOM</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Taxable Amount</TableCell>
              <TableCell>SGST</TableCell>
              <TableCell>CGST</TableCell>
              <TableCell>IGST</TableCell>
              <TableCell>Total Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(items?.length ?? 0) > 0 ? items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.itemName}</TableCell>
                <TableCell>{item.hsnCode}</TableCell>
                <TableCell>{item.uom}</TableCell>
                <TableCell>{item.rate}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.taxableAmount}</TableCell>
                <TableCell>{item.sgst}</TableCell>
                <TableCell>{item.cgst}</TableCell>
                <TableCell>{item.igst}</TableCell>
                <TableCell>{item.totalAmount}</TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={10} align="center">No data available in table</TableCell>
              </TableRow>
            )}
            {/* Total Row */}
            <TableRow>
              <TableCell colSpan={9} align="right"><b>Total:</b></TableCell>
              <TableCell><b>{totalAmount.toFixed(2)}</b></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <AddItemDialog open={openDialog} handleClose={() => setOpenDialog(false)} addItem={addItem} />
    </Paper>
  );
};

const Contact = () => {
  const classes = useStyles();
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]); // Fix applied
  const [bankDetails, setBankDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/getTrader")
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                const bankInfo = {
                    bankName: data.bankName || "",
                    accountNo: data.accountNo || "",
                    branchName: data.branchName || "",
                    ifscCode: data.ifscCode || "",
                };
                setBankDetails(bankInfo);
            }
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching trader:", err);
            setLoading(false);
        });
}, []);


  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <div className={classes.mainContainer}>
      <InvoiceDetails invoiceNumber={invoiceNumber} setInvoiceNumber={setInvoiceNumber} invoiceDate={invoiceDate} setInvoiceDate={setInvoiceDate} />
      <ItemsTable search={search} setSearch={setSearch} items={items} addItem={addItem} />
      {!loading && bankDetails && <BankDetails bankDetails={bankDetails} />}      
    </div>
  );
};

const InvoiceDetails = ({ invoiceNumber, setInvoiceNumber, invoiceDate, setInvoiceDate }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.title}>
        <IconButton color="inherit"><Description /></IconButton> Invoice To:
      </Typography>
      <TextField className={classes.inputField} style={{width:"200px"}} label="Invoice Number" variant="outlined" fullWidth value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} /><br/>
      <TextField className={classes.inputField} style={{width:"200px"}} label="Invoice Date" type="date" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
    </Paper>
  );
};
/*

const BankDetails = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.title}>
        <IconButton color="inherit"><AccountBalance /></IconButton> Bank Details
      </Typography>
      <Typography><b>Bank Name:</b> State Bank Of India</Typography>
      <Typography><b>Account Number:</b> 32420001</Typography>
      <Typography><b>Branch:</b> Dewas Gate</Typography>
      <Typography><b>IFSC Code:</b> SBIN1309</Typography>
    </Paper>
  );
};*/
const BankDetails = ({ bankDetails }) => {
  return (
    <Paper style={{ padding: "20px", marginTop: "20px" }}>
      <Typography variant="h5">
        <IconButton style={{color:"blue"}}><AccountBalance /></IconButton> Bank Details
      </Typography>
      <Typography variant="h6" ><b style={{color:"blue"}} >Bank Name:</b> {bankDetails.bankName}</Typography>
      <Typography variant="h6" ><b style={{color:"blue"}}  >IFSC Code:</b> {bankDetails.ifscCode}</Typography>  
      <Typography variant="h6" ><b style={{color:"blue"}} >Account Numb:</b> {bankDetails.accountNo}</Typography>
      <Typography variant="h6" ><b style={{color:"blue"}}  >Branch:</b> {bankDetails.branchName}</Typography>
      
    </Paper>
  );
};

export default Contact;
