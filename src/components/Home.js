/*import React from "react";
import { Typography, withStyles } from "@material-ui/core";
import myStyles from "../styles/styles";

const Home = () => {
    return (
        <div>
            <Typography variant="h3" style={{color:"black",textAlign:"center",marginTop:"30px"}} >TMDebtors Accounting</Typography>
        </div>
    );
};

export default withStyles(myStyles)(Home);
*/
/*import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, makeStyles, Paper, Typography } from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import ChatIcon from '@material-ui/icons/Chat';
import VideoCamIcom from '@material-ui/icons/Videocam'
import React from "react";

const myStyles=makeStyles((theme)=>{
    return({
        mainContainer:{
            paddingLeft:theme.spacing(2),
            paddingRight:theme.spacing(2),
            paddingTop:theme.spacing(2),
            paddingBottom:theme.spacing(2)
        },
        paper:{
            paddingLeft:theme.spacing(2),
            paddingRight:theme.spacing(2),
            paddingTop:theme.spacing(2),
            paddingBottom:theme.spacing(2)
        },
        card:{
            paddingLeft:theme.spacing(2),
            paddingRight:theme.spacing(2),
            paddingTop:theme.spacing(2),
            paddingBottom:theme.spacing(2),
            width:450
        },
        cardContent:{
            paddingLeft:theme.spacing(2),
            paddingRight:theme.spacing(2),
            paddingTop:theme.spacing(2),
            paddingRight:theme.spacing(2),
            width:500,
            color:'blue'
        },
        cardMedia:{
            width:550,
            height:350
        },
    })
})
const Home=()=>{
    const classes=myStyles();
    return(
        <div className={classes.mainContainer}>
                        <Typography variant="h3" style={{color:"black",textAlign:"center",marginTop:"30px"}} >TMDebtors Accounting</Typography>

            <Paper className={classes.paper}>
            <Card className={classes.card}>
                <CardHeader 
                title="SBI-Manager"
                subheader="Aksh Bundela"
                avatar={
                    <Avatar>
                        <PersonIcon/>
                    </Avatar>
                }
                />
                    <CardContent className={classes.cardContent}>
                        We Teach more thna we promise to Teach
                     </CardContent>
                     <CardActions>
                        <IconButton>
                            <ChatIcon/>
                        </IconButton>
                        <IconButton>
                            <VideoCamIcom/>
                        </IconButton>
                     </CardActions>
            </Card>
            <Card className={classes.card}>
                <CardHeader 
                title="SBI-Manager"
                subheader="Aksh Bundela"
                avatar={
                    <Avatar>
                        <PersonIcon/>
                    </Avatar>
                }
                />
                    <CardContent className={classes.cardContent}>
                        We Teach more thna we promise to Teach
                     </CardContent>
                     <CardActions>
                        <IconButton>
                            <ChatIcon/>
                        </IconButton>
                        <IconButton>
                            <VideoCamIcom/>
                        </IconButton>
                     </CardActions>
            </Card>
            <Card className={classes.card}>
                <CardHeader 
                title="PUNB"
                subheader="Aksh Bundela"
                avatar={
                    <Avatar>
                        <PersonIcon/>
                    </Avatar>
                }
                />
                    <CardContent className={classes.cardContent}>
                        We Teach more thna we promise to Teach
                     </CardContent>
                     <CardActions>
                        <IconButton>
                            <ChatIcon/>
                        </IconButton>
                        <IconButton>
                            <VideoCamIcom/>
                        </IconButton>
                     </CardActions>
            </Card>
            </Paper>
        </div>
    )
}
export default Home;
*/import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from '@material-ui/icons/Person';
import ChatIcon from '@material-ui/icons/Chat';
import VideoCamIcon from '@material-ui/icons/Videocam';
import React from "react";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(3),
        maxWidth: "90%",
        backgroundColor: "#fff",
        borderRadius: 10,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    cardContainer: {
        display: "flex",
        justifyContent: "center",
        gap: theme.spacing(3),
        flexWrap: "wrap",
        marginTop: theme.spacing(3),
    },
    card: {
        width: 300,
        borderRadius: 10,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    cardContent: {
        fontSize: "1rem",
        color: "#333",
        fontWeight: 500,
        textAlign: "center",
    },
    cardActions: {
        display: "flex",
        justifyContent: "center",
        paddingBottom: theme.spacing(2),
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
    },
    title: {
        fontWeight: 700,
        color: "#2c3e50",
    }
}));

const Home = () => {
    const classes = useStyles();

    return (
        <div className={classes.mainContainer}>
            <Typography variant="h4" >TMDebtors Accounting</Typography>
            
            <Paper className={classes.paper} elevation={3}>
                <div className={classes.cardContainer}>
                    <Card className={classes.card}>
                        <CardHeader
                            title="SBI-Manager"
                            subheader="Aksh Bundela"
                            avatar={<Avatar className={classes.avatar}><PersonIcon /></Avatar>}
                        />
                        <CardContent className={classes.cardContent}>
                            It is a manager of SBI.
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                            <IconButton color="primary"><ChatIcon /></IconButton>
                            <IconButton color="secondary"><VideoCamIcon /></IconButton>
                        </CardActions>
                    </Card>

                    <Card className={classes.card}>
                        <CardHeader
                            title="SBI-Manager"
                            subheader="Aksh Bundela"
                            avatar={<Avatar className={classes.avatar}><PersonIcon /></Avatar>}
                        />
                        <CardContent className={classes.cardContent}>
                            Is is Manager pub
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                            <IconButton color="primary"><ChatIcon /></IconButton>
                            <IconButton color="secondary"><VideoCamIcon /></IconButton>
                        </CardActions>
                    </Card>

                    <Card className={classes.card}>
                        <CardHeader
                            title="PUNB"
                            subheader="Aksh Bundela"
                            avatar={<Avatar className={classes.avatar}><PersonIcon /></Avatar>}
                        />
                        <CardContent className={classes.cardContent}>
                            "We Teach More Than We Promise to Teach."
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                            <IconButton color="primary"><ChatIcon /></IconButton>
                            <IconButton color="secondary"><VideoCamIcon /></IconButton>
                        </CardActions>
                    </Card>
                </div>
            </Paper>
            <Paper className={classes.paper} elevation={3}>
                <div className={classes.cardContainer}>
                    <Card className={classes.card}>
                        <CardHeader
                            title="SBI-Manager"
                            subheader="Aksh Bundela"
                            avatar={<Avatar className={classes.avatar}><PersonIcon /></Avatar>}
                        />
                        <CardContent className={classes.cardContent}>
                            It is a manager of SBI.
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                            <IconButton color="primary"><ChatIcon /></IconButton>
                            <IconButton color="secondary"><VideoCamIcon /></IconButton>
                        </CardActions>
                    </Card>

                    <Card className={classes.card}>
                        <CardHeader
                            title="SBI-Manager"
                            subheader="Aksh Bundela"
                            avatar={<Avatar className={classes.avatar}><PersonIcon /></Avatar>}
                        />
                        <CardContent className={classes.cardContent}>
                            "We Teach More Than We Promise to Teach."
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                            <IconButton color="primary"><ChatIcon /></IconButton>
                            <IconButton color="secondary"><VideoCamIcon /></IconButton>
                        </CardActions>
                    </Card>

                    <Card className={classes.card}>
                        <CardHeader
                            title="PUNB"
                            subheader="Aksh Bundela"
                            avatar={<Avatar className={classes.avatar}><PersonIcon /></Avatar>}
                        />
                        <CardContent className={classes.cardContent}>
                            "We Teach More Than We Promise to Teach."
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                            <IconButton color="primary"><ChatIcon /></IconButton>
                            <IconButton color="secondary"><VideoCamIcon /></IconButton>
                        </CardActions>
                    </Card>
                </div>
            </Paper>
        </div>
    );
};

export default Home;
