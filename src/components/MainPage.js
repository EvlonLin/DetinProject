import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Chart from './Chart.js';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import StarIcon from '@material-ui/icons/Star';


const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    flex: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    list: {
        width: 250,
      },
      fullList: {
        width: 'auto',
    },
    navigation: {
        background: 'linear-gradient(to left top, #3CECB0, #009FC5)',
        
    },
    font: {
        color: 'white',
        fontSize: '18pt'
    },
    fontSection: {
        // marginLeft: 'auto',
        paddingLeft: '28px',
        paddingTop: '30px',
        fontSize: '18pt',
        width: '130px',
        color: '#3c3c3c'
    }
});

class MainPage extends Component {
    state = {
        error: false,
        data: {},
        visa: {},
        citizenship: {},
        right: false,

    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    
    render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                    <List component="nav">
                        <ListItem button>
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText primary="Performance" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List component="nav">
                        <ListItem button>
                            <ListItemText primary="BarChart" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="PieChart" />
                        </ListItem>
                    </List>
            </div>
          );
        return (
        <div className="App">
            <AppBar position="static" className={classes.navigation}>
                <Toolbar>
                    <IconButton color="inherit" className={classes.menuButton} onClick={this.toggleDrawer('left', true)} aria-label="Menu">
                        <MenuIcon/>
                    </IconButton>
                    <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={this.toggleDrawer('left', false)}
                            onKeyDown={this.toggleDrawer('left', false)}
                        >
                            {sideList}
                        </div>
                    </Drawer>
                    <Typography variant="title" className={classes.font} >
                    Destin AI
                    </Typography>
                </Toolbar>
            </AppBar>
            <Typography variant="title" className={classes.fontSection}>
                    Performance:
            </Typography>
            <Chart/>
        </div>
        );
    }
}

MainPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainPage);