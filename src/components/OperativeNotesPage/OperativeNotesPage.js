import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GridItem from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import OperativeNotesHistory from './OperativeNotesHistory';

const styles = theme => ({
    root: {
      width: '100%',
      flexGrow: 1,
      marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      
    },
    table: {
        minWidth: 700,
      },
      paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
  });


class OperativeNotesPage extends Component {
    state = {
        changesMade: false,
        operativeNotes: '',
        userId: '',
        title: '',
        firstName: '',
        lastName: '',
    }

    handleChange = (event) => {
        this.setState ({
            changesMade: true,
            [event.target.name]: event.target.value,
        })
    }

    saveOperativeNotes = () => {
        if (this.state.changesMade){ 
        this.props.dispatch({ type: 'UPDATE_OPERATIVE_NOTE', 
        payload: {
            operativeNotes: this.state.operativeNotes,
            userId: this.props.patientReducer.patient.id,
            title: this.props.user.title,
            firstName: this.props.user.first_name,
            lastName: this.props.user.last_name,
        }
         })
         this.setState ({
            changesMade: false,
            operativeNotes: '',
        })
        }
    }

    componentWillUnmount () {
        this.saveOperativeNotes();
    }

    render() {
        return(
            <div>
                <h4>Operative Notes </h4>
                <Grid container spacing={24} >
                    <GridItem item xs={12}>
                            <DialogContent >
                                <TextField
                                    onChange={this.handleChange}
                                    value={this.state.operativeNotes}
                                    name="operativeNotes"
                                    margin="dense"
                                    id="operativeNotes"
                                    label="Notes"
                                    type="text"
                                    fullWidth={true}
                                    multiline
                                    rows="10"
                                    variant="outlined"
                                    />
                            </DialogContent> 
                    </GridItem>
                </Grid> 
                <Button variant="contained" color="primary" onClick={this.saveOperativeNotes}>Save</Button>
            <OperativeNotesHistory/>
            </div>
        )
    }
};

OperativeNotesPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = reduxState => ({
    patientReducer: reduxState.patientReducer,
    user: reduxState.user,
});

export default connect(mapStateToProps) (withStyles(styles)(OperativeNotesPage))
