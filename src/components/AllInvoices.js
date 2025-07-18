/*import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import dayjs from "dayjs"; // For better date formatting

const AllInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState({});

  useEffect(() => {
    fetch("/getAllInvoices")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setInvoices(data.data);
        } else {
          alert("Error fetching invoices.");
        }
      });
  }, []);

  const handleChange = (code) => async (event, isExpanded) => {
    if (isExpanded) {
      setExpanded(code);
      if (!invoiceDetails[code]) {
        setLoading(true);
        const res = await fetch(`/getInvoiceDetails?invoiceCode=${code}`);
        const data = await res.json();
        if (data.success) {
          setInvoiceDetails((prev) => ({
            ...prev,
            [code]: data.data
          }));
        } else {
          alert("Error loading invoice details.");
        }
        setLoading(false);
      }
    } else {
      setExpanded(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom style={{ fontWeight: 600, color: "#1976d2",fontFamily:"Lato" }}>
        All Invoices
      </Typography>

      {invoices.length === 0 && (
        <Typography color="textSecondary" variant="body2">
          No invoices found.
        </Typography>
      )}

      {invoices.map((inv) => (
        <Accordion
          key={inv.code}
          expanded={expanded === inv.code}
          onChange={handleChange(inv.code)}
          style={{
            marginBottom: 8,
            borderRadius: 8,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            transition: "background-color 0.2s",
            backgroundColor: expanded === inv.code ? "#f9f9f9" : "#fff",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            style={{
              padding: "8px 16px",
              cursor: "pointer"
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Typography style={{ fontWeight: 600, color: "#333" }}>
                #{inv.code} • {inv.customerName || "N/A"}
              </Typography>
              <Typography style={{ fontWeight: 500, color: "#555" }}>
                ₹{inv.totalAmount} • {dayjs(inv.invoiceDate).format("DD MMM YYYY")}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {loading && expanded === inv.code ? (
              <CircularProgress style={{ margin: "0 auto" }} />
            ) : (
              <>
                {invoiceDetails[inv.code] ? (
                  <Box width="100%">
                    <Typography variant="subtitle1">
                      Invoice Date: {dayjs(invoiceDetails[inv.code].invoiceDate).format("DD MMM YYYY")}
                    </Typography>
                    <Typography variant="subtitle2">
                      Created On: {invoiceDetails[inv.code].createdOn
                        ? dayjs(invoiceDetails[inv.code].createdOn).format("DD MMM YYYY")
                        : "N/A"}
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{ color: "#388e3c", marginTop: 8 }}
                    >
                      Grand Total: ₹{invoiceDetails[inv.code].totalAmount}
                    </Typography>

                    <Divider style={{ margin: "12px 0" }} />

                    <Table size="small">
                      <TableHead style={{ backgroundColor: "#f0f0f0" }}>
                        <TableRow>
                          <TableCell style={{ fontWeight: 600 }}>Item</TableCell>
                          <TableCell style={{ fontWeight: 600 }}>Qty</TableCell>
                          <TableCell style={{ fontWeight: 600 }}>Rate</TableCell>
                          <TableCell style={{ fontWeight: 600 }}>SGST%</TableCell>
                          <TableCell style={{ fontWeight: 600 }}>CGST%</TableCell>
                          <TableCell style={{ fontWeight: 600 }}>IGST%</TableCell>
                          <TableCell style={{ fontWeight: 600 }}>Taxable</TableCell>
                          <TableCell style={{ fontWeight: 600 }}>Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {invoiceDetails[inv.code].items.map((item, idx) => (
                          <TableRow key={idx} style={{ borderBottom: "1px solid #eee" }}>
                            <TableCell>{item.itemName}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.rate}</TableCell>
                            <TableCell>{item.sgst}</TableCell>
                            <TableCell>{item.cgst}</TableCell>
                            <TableCell>{item.igst}</TableCell>
                            <TableCell>{item.taxableAmount.toFixed(2)}</TableCell>
                            <TableCell>{item.totalAmount.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                ) : (
                  <Typography>No details found.</Typography>
                )}
              </>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default AllInvoices;
*/
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import dayjs from "dayjs";

const AllInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState({});

  useEffect(() => {
    fetch("/getAllInvoices")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setInvoices(data.data);
        } else {
          alert("Error fetching invoices.");
        }
      });
  }, []);

  const handleChange = (code) => async (event, isExpanded) => {
    if (isExpanded) {
      setExpanded(code);
      if (!invoiceDetails[code]) {
        setLoading(true);
        const res = await fetch(`/getInvoiceDetails?invoiceCode=${code}`);
        const data = await res.json();
        if (data.success) {
          setInvoiceDetails((prev) => ({
            ...prev,
            [code]: data.data,
          }));
        } else {
          alert("Error loading invoice details.");
        }
        setLoading(false);
      }
    } else {
      setExpanded(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 font-[Roboto]">
      <h1 className="text-2xl font-semibold text-indigo-700 mb-4">
        All Invoices
      </h1>

      {invoices.length === 0 && (
        <p className="text-gray-500 text-sm">No invoices found.</p>
      )}

      {invoices.map((inv) => (
        <Accordion
          key={inv.code}
          expanded={expanded === inv.code}
          onChange={handleChange(inv.code)}
          className={`mb-4 rounded-xl shadow-sm transition-all duration-300 ${
            expanded === inv.code ? "bg-white" : "bg-gray-100"
          }`}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className="flex justify-between items-center w-full px-2">
              <p className="text-gray-800 font-medium">
                #{inv.code} • {inv.customerName || "N/A"}
              </p>
              <p className="text-gray-600 font-medium">
                ₹{inv.totalAmount} • {dayjs(inv.invoiceDate).format("DD MMM YYYY")}
              </p>
            </div>
          </AccordionSummary>

          <AccordionDetails>
            {loading && expanded === inv.code ? (
              <div className="flex justify-center w-full py-4">
                <CircularProgress />
              </div>
            ) : (
              <>
                {invoiceDetails[inv.code] ? (
                  <div className="w-full">
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-semibold">Invoice Date:</span>{" "}
                      {dayjs(invoiceDetails[inv.code].invoiceDate).format("DD MMM YYYY")}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-semibold">Created On:</span>{" "}
                      {invoiceDetails[inv.code].createdOn
                        ? dayjs(invoiceDetails[inv.code].createdOn).format("DD MMM YYYY")
                        : "N/A"}
                    </p>
                    <p className="text-lg font-bold text-green-600 mb-3">
                      Grand Total: ₹{invoiceDetails[inv.code].totalAmount}
                    </p>

                    <Divider className="my-4" />

                    <div className="overflow-x-auto">
                      <Table size="small">
                        <TableHead className="bg-gray-100">
                          <TableRow>
                            {[
                              "Item",
                              "Qty",
                              "Rate",
                              "SGST%",
                              "CGST%",
                              "IGST%",
                              "Taxable",
                              "Total",
                            ].map((head, i) => (
                              <TableCell
                                key={i}
                                className="text-sm font-semibold text-gray-700"
                              >
                                {head}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {invoiceDetails[inv.code].items.map((item, idx) => (
                            <TableRow
                              key={idx}
                              className="border-b border-gray-200"
                            >
                              <TableCell>{item.itemName}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.rate}</TableCell>
                              <TableCell>{item.sgst}</TableCell>
                              <TableCell>{item.cgst}</TableCell>
                              <TableCell>{item.igst}</TableCell>
                              <TableCell>{item.taxableAmount.toFixed(2)}</TableCell>
                              <TableCell>{item.totalAmount.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No details found.</p>
                )}
              </>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default AllInvoices;
