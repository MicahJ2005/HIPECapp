import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import FollowUpDetailRecurrence from './FollowUpDetailRecurrence';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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


class FollowUpDetailDetail extends Component {

    state = {
        id: 0,
        patient_id: 0,
        follow_up_id: null,
        date: null,
        evidence_of_disease: false,
        follow_up_notes: null,
        recurrence: false,
        cea: null,
        rec_modality: null,
        syst_location: false,
        last_contact: null,
        treatment: null,
        date_treatment: null,
        status: null,
        treatment_notes: null,
        location: null
    };

    componentDidMount () {
        let followUpDate = null;
        if (this.props.history.date != null) {
            followUpDate = moment(this.props.history.date).format('YYYY-MM-DD')
        }
        let lastContactDate = null;
        if (this.props.history.last_contact != null) {
            lastContactDate = moment(this.props.history.last_contact).format('YYYY-MM-DD')
        }
        let treatmentDate = null;
        if (this.props.history.date_treatment != null) {
            treatmentDate = moment(this.props.history.date_treatment).format('YYYY-MM-DD')
        }
        this.setState({
            id: this.props.history.id,
            patient_id: this.props.history.patient_id,
            follow_up_id: this.props.history.follow_up_id,
            date: followUpDate,
            evidence_of_disease: this.props.history.evidence_of_disease,
            follow_up_notes: this.props.history.follow_up_notes,
            recurrence: this.props.history.recurrence,
            cea: this.props.history.cea,
            rec_modality: this.props.history.rec_modality,
            syst_location: this.props.history.syst_location,
            last_contact: lastContactDate,
            treatment: this.props.history.treatment,
            date_treatment: treatmentDate,
            status: this.props.history.status,
            treatment_notes: this.props.history.treatment_notes,
            location: this.props.history.location
        })
    }

    // Called when the input field changes
    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        });
    };

    // Called when the input field changes
    handleChangeCheckbox = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.checked,
        });
    };

    updateFollowUpHistory = () => {
        this.props.dispatch({type: 'UPDATE_FOLLOW_UP_HISTORY', payload: this.state});
    };
    
    render() {

        const { classes } = this.props;
        
        return(
            <div>
                <ExpansionPanelDetails>
                <Grid container spacing={24}>
                    <Grid item xs={3}>
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
                        margin="dense"
                        variant="outlined"
                    />
                    </Grid>

                    <Grid item xs={3}>
                        <FormGroup row>
                            <FormControlLabel
                            control={
                                <Checkbox
                                name="evidence_of_disease"
                                checked={this.state.evidence_of_disease}
                                onChange={this.handleChangeCheckbox}
                                value={this.state.evidence_of_disease}
                                />
                            }
                            label="Evidence of Disease"
                            />
                        </FormGroup>
                        <FormGroup row>
                            <FormControlLabel
                            control={
                                <Checkbox
                                name="recurrence"
                                checked={this.state.recurrence}
                                onChange={this.handleChangeCheckbox}
                                value={this.state.recurrence}
                                />
                            }
                            label="Recurrence"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        variant="outlined"
                        name="follow_up_notes"
                        className={classes.textField}
                        value={this.state.follow_up_notes}
                        rows={8}
                        multiline
                        fullWidth
                        onChange={this.handleChange}
                        margin="dense"
                        />
                    </Grid>
                    <Divider variant="middle" />
                    {/* display recurrence information only if evidence of disease */}
                    {this.state.recurrence && 
                    <FollowUpDetailRecurrence recurrence={this.state} 
                        handleChange={this.handleChange}
                        handleChangeCheckbox={this.handleChangeCheckbox}/>
                    }
                </Grid>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
                <Button onClick={this.updateFollowUpHistory} className={classes.button}
                        variant="contained" color="primary">
                    Update
                </Button>      
            </ExpansionPanelActions>
            </div>
        )
    }
};

export default connect() (withStyles(styles)(FollowUpDetailDetail));