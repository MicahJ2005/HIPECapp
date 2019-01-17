import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridItem from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PathologyNotesHistory from './PathologyNotesHistory';

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


class PathologyNotesPage extends Component {

    state = {
        changesMade: false,
        pathologyNotes: '',
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

    savePathologyNotes = () => {
        if (this.state.changesMade){ 
        this.props.dispatch({ type: 'UPDATE_PATHOLOGY_NOTE', 
        payload: {
            pathologyNotes: this.state.pathologyNotes,
            userId: this.props.patientReducer.patient.id,
            title: this.props.user.title,
            firstName: this.props.user.first_name,
            lastName: this.props.user.last_name,
        }
         })
         this.setState ({
            changesMade: false,
            pathologyNotes: '',
        })
        }
    }

    componentWillUnmount () {
        this.savePathologyNotes();
    }
    

    render() {
        return(
            <div>
                <h4>Pathology Notes </h4>
                <Grid container spacing={24} >
                    <GridItem item xs={12}>
                            <DialogContent >
                                <TextField
                                    onChange={this.handleChange}
                                    value={this.state.pathologyNotes}
                                    name="pathologyNotes"
                                    margin="dense"
                                    id="pathologyNotes"
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
                <Button variant="contained" color="primary" onClick={this.savePathologyNotes}>Save</Button>
                <br/>
                <PathologyNotesHistory pathState={this.state}/>
            </div>
        )
    }
};

PathologyNotesPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = reduxState => ({
    patientReducer: reduxState.patientReducer,
    user: reduxState.user,
});

export default connect(mapStateToProps) (withStyles(styles)(PathologyNotesPage))
