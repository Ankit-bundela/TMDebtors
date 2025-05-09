/*
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { withStyles, LinearProgress, Typography } from "@material-ui/core";
import myStyles from "./styles/styles";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Courses from "./components/course";
import Contact from "./components/contact";
import Items from "./components/TableComponent";
import Detail from "./components/Appsaccordian";
import TraderComponent from "./components/TraderComponent";
import Register from "./components/Register";

const ProgressBar = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 500); // 0.5 sec delay
        return () => clearTimeout(timer);
    }, [location]);

    return loading ? <LinearProgress style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1100 }} /> : null;
};

const App = (props) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [serverReady, setServerReady] = useState(false);

    const toggleDrawer = () => setShowDrawer(!showDrawer);

    // Server Status Check
    useEffect(() => {
        const checkServer = async () => {
            try {
                const response = await fetch("/server-status");
                const data = await response.json();
                if (data.status === "ready") {
                    setServerReady(true);
                }
            } catch (error) {
                console.error("Server not responding:", error);
                setTimeout(checkServer, 3000); // Retry after 3 sec
            }
        };

        checkServer();
    }, []);

    return (
        <Router>
            <ProgressBar />
            <div className={props.classes.mainContainer}>
                {serverReady ? (
                    <>
                        <Navbar openDrawer={toggleDrawer} />
                        <Sidebar showDrawer={showDrawer} toggleDrawer={toggleDrawer} />
                        <div className={props.classes.appBarSpacer} />
                        <div className={props.classes.contentSection}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/courses" element={<Courses />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/items" element={<Items />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/details" element={<Detail />} />
                                <Route path="/trader" element={<TraderComponent />} />
                            </Routes>
                        </div>
                    </>
                ) : (
                    <div style={{
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                    }}>
                        <LinearProgress style={{ width: "100%", position: "absolute", top: 0 }} />
                        <Typography 
                            variant="h2"
                            style={{letterSpacing:"1px",color:"blue"}}
                            >TMDebtors</Typography>
                    </div>
                )}
            </div>
        </Router>
    );
};

export default withStyles(myStyles)(App);
*/
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { withStyles, LinearProgress, Typography } from "@material-ui/core";
import myStyles from "./styles/styles";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Courses from "./components/course";
import Contact from "./components/contact";
import Items from "./components/TableComponent";
import Detail from "./components/Appsaccordian";
import TraderComponent from "./components/TraderComponent";
import Register from "./components/Register";

const ProgressBar = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 500); // 0.5 sec delay
        return () => clearTimeout(timer);
    }, [location]);

    return loading ? <LinearProgress style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1100 }} /> : null;
};

const App = (props) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [serverReady, setServerReady] = useState(false);

    const toggleDrawer = () => setShowDrawer(!showDrawer);

    // Server Status Check
    useEffect(() => {
        const checkServer = async () => {
            try {
                const response = await fetch("/server-status");
                const data = await response.json();
                if (data.status === "ready") {
                    setServerReady(true);
                }
            } catch (error) {
                console.error("Server not responding:", error);
                setTimeout(checkServer, 3000); // Retry after 3 sec
            }
        };

        checkServer();
    }, []);

    return (
        <Router>
            <ProgressBar />
            <div className={props.classes.mainContainer}>
                {serverReady ? (
                    <>
                        <Navbar openDrawer={toggleDrawer} />
                        <Sidebar showDrawer={showDrawer} toggleDrawer={toggleDrawer} />
                        <div className={props.classes.appBarSpacer} />
                        <div className={props.classes.contentSection}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/courses" element={<Courses />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/items" element={<Items />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/details" element={<Detail />} />
                                <Route path="/trader" element={<TraderComponent />} />
                            </Routes>
                        </div>
                    </>
                ) : (
                    <div style={{
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                    }}>
                        <LinearProgress style={{ width: "100%", position: "absolute", top: 0 }} />
                        <Typography 
                            variant="h2"
                            style={{letterSpacing:"1px",color:"blue"}}
                            >TMDebtors</Typography>
                    </div>
                )}
            </div>
        </Router>
    );
};

export default withStyles(myStyles)(App);
