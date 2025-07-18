/*import React from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Typography,
  Grid,
  Tooltip,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import ChatIcon from "@material-ui/icons/Chat";
import VideoCamIcon from "@material-ui/icons/Videocam";
import GroupIcon from "@material-ui/icons/Group";
import ReceiptIcon from "@material-ui/icons/Receipt";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: theme.spacing(4),
    background: "#f0f2f5",
    minHeight: "100vh",
  },
  sectionTitle: {
    fontWeight: 700,
    color: "#34495e",
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    borderRadius: 12,
    background: "#ffffff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    marginBottom: theme.spacing(4),
  },
  card: {
    borderRadius: 12,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
    },
  },
  cardContent: {
    textAlign: "center",
    color: "#555",
  },
  cardActions: {
    justifyContent: "center",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  widgetCard: {
    borderRadius: 12,
    padding: theme.spacing(2),
    background: "#ffffff",
    boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  widgetIcon: {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
    width: 48,
    height: 48,
  },
  widgetText: {
    display: "flex",
    flexDirection: "column",
  },
}));

const dashboardData = [
  {
    label: "Total Customers",
    value: 48,
    icon: <GroupIcon />,
  },
  {
    label: "Total Invoices",
    value: 124,
    icon: <ReceiptIcon />,
  },
  {
    label: "Pending Dues",
    value: "₹13,200",
    icon: <HourglassFullIcon />,
  },
  {
    label: "Last Invoice Date",
    value: "15 July 2025",
    icon: <CalendarTodayIcon />,
  },
];

const cardData = [
  {
    title: "SBI - Manager",
    subheader: "Aksh Bundela",
    description: "Responsible for managing the SBI branch operations.",
  },
  {
    title: "HDFC - Supervisor",
    subheader: "Aksh Bundela",
    description: "Supervises HDFC bank's daily activities.",
  },
  {
    title: "PNB - Executive",
    subheader: "Aksh Bundela",
    description: "Leading customer engagement at PNB.",
  },
  {
    title: "ICICI - Manager",
    subheader: "Aksh Bundela",
    description: "Ensures compliance and service delivery at ICICI.",
  },
  {
    title: "Axis Bank - Relationship Manager",
    subheader: "Aksh Bundela",
    description: "Building long-term client relations at Axis Bank.",
  },
];

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <Typography variant="h4" className={classes.sectionTitle}>
        TM Debtors Accounting
      </Typography>

      <Grid container spacing={3} style={{ marginBottom: 32 }}>
        {dashboardData.map((widget, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper className={classes.widgetCard}>
              <Avatar className={classes.widgetIcon}>{widget.icon}</Avatar>
              <div className={classes.widgetText}>
                <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                  {widget.label}
                </Typography>
                <Typography variant="h6" color="primary">
                  {widget.value}
                </Typography>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper className={classes.paper} elevation={3}>
        <Grid container spacing={3}>
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar className={classes.avatar}>
                      <PersonIcon />
                    </Avatar>
                  }
                  title={card.title}
                  subheader={card.subheader}
                />
                <CardContent className={classes.cardContent}>
                  <Typography variant="body1">{card.description}</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Tooltip title="Chat">
                    <IconButton color="primary">
                      <ChatIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Video Call">
                    <IconButton color="secondary">
                      <VideoCamIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
};

export default Home;
*/
import React, { useEffect, useState } from "react";
import TMAlert from "./TMAlert";

const Home = () => {
  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ open: false, message: "" });

  const getCustomers = async () => {
    try {
      const response = await fetch("/getCustomers");
      if (!response.ok) throw new Error("Failed to fetch customers");
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (err) {
      setAlert({ open: true, message: "Failed to fetch customers" });
      return [];
    }
  };

  const getAllInvoices = async () => {
    try {
      const response = await fetch("/getAllInvoices");
      if (!response.ok) throw new Error("Failed to fetch invoices");
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (err) {
      setAlert({ open: true, message: "Failed to fetch invoices" });
      return [];
    }
  };

  const getLastInvoiceDate = () => {
    if (invoices.length === 0) return "N/A";
    const dates = invoices.map(inv => new Date(inv.date));
    const lastDate = new Date(Math.max(...dates));
    return lastDate.toLocaleDateString();
  };

  const getPendingDues = () => {
    return invoices.reduce((total, invoice) => {
      const paid = invoice.paidAmount || 0;
      const totalAmount = invoice.totalAmount || 0;
      return total + (totalAmount - paid);
    }, 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const cust = await getCustomers();
      const inv = await getAllInvoices();
      setCustomers(cust);
      setInvoices(inv);
      setLoading(false);
    };
    fetchData();
  }, []);

  const loadingSkeleton = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map(i => (
        <div
          key={i}
          className="rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 p-6 animate-pulse"
        >
          <div className="h-4 w-24 bg-gray-300 rounded mb-4"></div>
          <div className="h-8 w-32 bg-gray-400 rounded"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#f8fbff] to-[#edf4fc]">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">📊 Dashboard</h1>

      {alert.open && (
        <TMAlert message={alert.message} onClose={() => setAlert({ open: false, message: "" })} />
      )}

      {loading ? (
        loadingSkeleton
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card */}
          <div className="rounded-2xl bg-white shadow-xl p-6 border border-transparent hover:border-blue-300 hover:shadow-blue-200 transition-all duration-300">
            <p className="text-sm text-gray-500 mb-1">Total Customers</p>
            <p className="text-4xl font-bold text-blue-600">{customers.length}</p>
          </div>

          <div className="rounded-2xl bg-white shadow-xl p-6 border border-transparent hover:border-green-300 hover:shadow-green-200 transition-all duration-300">
            <p className="text-sm text-gray-500 mb-1">Total Invoices</p>
            <p className="text-4xl font-bold text-green-600">{invoices.length}</p>
          </div>

          <div className="rounded-2xl bg-white shadow-xl p-6 border border-transparent hover:border-red-300 hover:shadow-red-200 transition-all duration-300">
            <p className="text-sm text-gray-500 mb-1">Pending Dues</p>
            <p className="text-4xl font-bold text-red-500">₹{getPendingDues()}</p>
          </div>

          <div className="rounded-2xl bg-white shadow-xl p-6 border border-transparent hover:border-purple-300 hover:shadow-purple-200 transition-all duration-300">
            <p className="text-sm text-gray-500 mb-1">Last Invoice Date</p>
            <p className="text-xl font-bold text-purple-600">{getLastInvoiceDate()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
