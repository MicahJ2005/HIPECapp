import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import EnhancedTableHead from './ManageUsersTable'


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
    button: {
        margin: theme.spacing.unit,
      },
      leftIcon: {
        marginRight: theme.spacing.unit,
      },
      rightIcon: {
        marginLeft: theme.spacing.unit,
      },
      iconSmall: {
        fontSize: 20,
      },
    icon: {
    margin: theme.spacing.unit * 2,
    },
  });



class ManageUsersPage extends Component {
    state = {
        userId:'',
        title: '',
        firstName: '',
        lastName: '',
        accessLevel: '',
        active: true,
        username: '',
        password: '',
        maxWidth: 'lg',
        fullWidth: true,
        labelWidth: 30,
        open: false,

    }

    handleChange = event => {
        console.log('in handle Change for User ID', this.state.userId);
        
        this.setState({
                [event.target.name]: event.target.value,
                
        });
    }

    searchForm = (event) => {
        console.log('in submit form', this.state.userId);
        event.preventDefault();
        this.props.dispatch({ type: 'FIND_USER_PROFILE', 
        payload: {
            userID: this.state.userId
            }
         })
        
    }

    handleClickOpen = () => {
        this.setState({ open: true });
      };

    handleClose = () => {
        this.setState({ open: false });
      };

    handleActiveUserChange = event => {
        this.setState({ active: event.target.checked });
      };

    handleNewUserSubmit = event => {
        console.log('in handleNewUserSubmit form', this.state);
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_NEW_USER', 
        payload: this.state
         })
         /// set some sort of alert
         this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;
        
        return(
            <div>
                <h1>Manage Users or Add New User</h1>
                
                    <TextField
                    id="outlined-name"
                    label="User ID"
                    className={classes.textField}
                    value={this.state.userId}
                    onChange={this.handleChange}
                    name="userId"
                    margin="normal"
                    variant="outlined"
                    />
                    <Button variant="contained" color="primary" className={classes.button} type="submit" onClick={this.searchForm}>
                        Search
                        <SearchIcon className={classes.rightIcon} />
                    </Button>

                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClickOpen}>
                        Add New User
                    
                        <AddIcon />
                    </Button>
                <Dialog
                    fullWidth={this.state.fullWidth}
                    maxWidth={this.state.maxWidth}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="max-width-dialog-title"
                    >
                    <DialogTitle id="max-width-dialog-title">Add New User</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        Please complete all input fields
                        </DialogContentText>

                        <FormControl variant="outlined" margin="normal" className={classes.formControl}>
                            <InputLabel
                                ref={ref => {
                                this.InputLabelRef = ref;
                                }}
                                htmlFor="outlined-age-native-simple"
                            >
                                Title
                            </InputLabel>
                                <Select
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                    input={
                                    <OutlinedInput
                                        name="title"
                                        labelWidth={this.state.labelWidth}
                                        id="outlined-age-native-simple"
                                    />
                                    }
                                >
                                    <MenuItem value="None">None</MenuItem>
                                    <MenuItem value="Dr.">Dr.</MenuItem>
                                    <MenuItem value="Mr.">Mr.</MenuItem>
                                    <MenuItem value="Mrs.">Mrs.</MenuItem>
                                    <MenuItem value="Miss">Miss</MenuItem>
                                </Select>
                            </FormControl>

                        <FormControl className={classes.formControl}>
                            <TextField
                                id="outlined-name"
                                label="First Name"
                                className={classes.textField}
                                value={this.state.firstName}
                                onChange={this.handleChange}
                                name="firstName"
                                margin="normal"
                                variant="outlined"
                                />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="outlined-name"
                                label="Last Name"
                                className={classes.textField}
                                value={this.state.lastName}
                                onChange={this.handleChange}
                                name="lastName"
                                margin="normal"
                                variant="outlined"
                                />
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <TextField
                                id="outlined-name"
                                label="New Username"
                                className={classes.textField}
                                value={this.state.username}
                                onChange={this.handleChange}
                                name="username"
                                margin="normal"
                                variant="outlined"
                                />
                        </FormControl>


                        <FormControl className={classes.formControl}>
                            <TextField
                                id="outlined-name"
                                label="New Password"
                                className={classes.textField}
                                value={this.state.password}
                                onChange={this.handleChange}
                                name="password"
                                margin="normal"
                                variant="outlined"
                                />
                        </FormControl>

                        <FormControl variant="outlined" margin="normal" className={classes.formControl}>
                            <InputLabel
                                ref={ref => {
                                this.InputLabelRef = ref;
                                }}
                                htmlFor="outlined-age-native-simple"
                            >
                                User Role
                            </InputLabel>
                                <Select
                                    value={this.state.accessLevel}
                                    onChange={this.handleChange}
                                    input={
                                    <OutlinedInput
                                        name="accessLevel"
                                        labelWidth={this.state.labelWidth}
                                        id="outlined-age-native-simple"
                                    />
                                    }
                                >
                                    <MenuItem value="3">Admin</MenuItem>
                                    <MenuItem value="2">Surgeon</MenuItem>
                                    <MenuItem value="1">Researcher</MenuItem>
                                </Select>
                        </FormControl> 
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                    </DialogActions>
                    <DialogActions>
                        <Button onClick={this.handleNewUserSubmit} color="primary">
                        Add New User
                        </Button>
                    </DialogActions>
                </Dialog>
                <EnhancedTableHead/>

            </div>

        )
    }
  
};

const mapStateToProps = reduxState => ({
    reduxState,
});

ManageUsersPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default connect(mapStateToProps) (withStyles(styles)(ManageUsersPage))