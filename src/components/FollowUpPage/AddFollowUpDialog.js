import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  expasion: {
    backgroundColor: '#cccccc',
    minHeight: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  group: {
      flexDirection: 'row',
  },
  superCool: {
      backgroundColor: '#eeeeee',
      height: 25,
  }
});

class AddFollowUpDialog extends Component {

  state = {
    open: false,
    id: 0,
    patient_id: 0,
    date: null,
  };

  componentDidMount () {
    this.setState({
        patient_id: this.props.patientReducer.patient.id
    })
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // Called when the input field changes
  handleChange = (event) => {
    this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
    });
  };

  addFollowUpHistory = () => {
    this.props.dispatch({type: 'ADD_FOLLOW_UP_HISTORY', payload: this.state});
    this.props.dispatch({type: 'FETCH_FOLLOW_UP_HISTORY', payload: this.state.patient_id});
    this.setState({ open: false });
    this.setState({ date: null });
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          New Followup
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Follow Up</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the new follow up date to add to the list.
            </DialogContentText>
                <TextField
                    name="date"
                    label="Follow Up Date"
                    className={classes.textField}
                    value={moment(this.state.date).format('YYYY-MM-DD')}
                    // fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    type="date"
                    onChange={this.handleChange}
                    margin="normal"
                    // variant="outlined"
                />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addFollowUpHistory} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = reduxState => ({
  patientReducer: reduxState.patientReducer,
});

export default connect(mapStateToProps) (withStyles(styles)(AddFollowUpDialog));