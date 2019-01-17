import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ReOperation from './ReoperationSelector';
import Mortality from './MortalitySelector'
import DischargeStatus from './DischargeStatus';
import SeriousAdverseEvents from './SeriousAdverseEvents';


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    expanded: {
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
    }
});

class PostOpPage extends Component {

    state = {
        changesMade: false,
        patient_id: 0,
        id: 0,
        icu_stays: null,
        mcu_stays: null,
        hospital_stays: null,
        notes: null,
        serious_adverse_event: false,
        score: null,
        reoperation: null,
        hospital_mortality: null,
        status_at_discharge: null,
        discharge_notes: null,
        adverse_events: [],
        reoperation: null,
        labelWidth: 0,
    };

    componentDidMount () {
        this.setState({
            ...this.state,
            changesMade: false,
            id: this.props.postOp.id,
            patient_id: this.props.postOp.patient_id,
            icu_stays: this.props.postOp.icu_stays,
            mcu_stays: this.props.postOp.mcu_stays,
            hospital_stays: this.props.postOp.hospital_stays,
            notes: this.props.postOp.notes,
            serious_adverse_event: this.props.postOp.serious_adverse_event,
            score: this.props.postOp.score,
            reoperation: this.props.postOp.reoperation,
            hospital_mortality: this.props.postOp.hospital_mortality,
            status_at_discharge: this.props.postOp.status_at_discharge,
            discharge_notes: this.props.postOp.discharge_notes,
            adverse_events: this.props.adverseEvents,
        })
    }

    componentWillUnmount () {
        this.savePostOp();
    }

    // Called when the input field changes
    handleChange = (event) => {
        this.setState({
            ...this.state,
            changesMade: true,
            [event.target.name]: event.target.value,
        });
    }

    // Called when the input field changes
    handleChangeCheckbox = (event) => {
        this.setState({
            ...this.state,
            changesMade: true,
            [event.target.name]: event.target.checked,
        });
    }
    
    handleChangeAdverseEvent = (event) => {
        // 1. Make a shallow copy of the items
        let adverse_events = [...this.state.adverse_events];
        // 2. Make a shallow copy of the item you want to mutate
        let item = {...adverse_events[event.target.value - 1]};
        // 3. Replace the property you're intested in
        item.checked = !item.checked;
        // if checked off then remove the clavien score
        if (item.checked == false) {
            item.clavien_score = null;
        }
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        adverse_events[event.target.value - 1] = item;
        // 5. Set the state to our new copy
        this.setState({
            ...this.state,
            changesMade: true,
            adverse_events: adverse_events,
        });
    }

    handleChangeClavienScore = (event) => {
        // 1. Make a shallow copy of the items
        let adverse_events = [...this.state.adverse_events];
        // 2. Make a shallow copy of the item you want to mutate
        let item = {...adverse_events[event.target.name - 1]};
        // 3. Replace the property you're intested in
        item.clavien_score = event.target.value;
        item.patient_id = this.props.patientReducer.patient.id;
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        adverse_events[event.target.name - 1] = item;
        // 5. Set the state to our new copy
        this.setState({
            ...this.state,
            changesMade: true,
            adverse_events: adverse_events,
        });
    }

    savePostOp = () => {
        if (this.state.changesMade) {
            this.props.dispatch({ type: 'UPDATE_POST_OP', payload: this.state});
            this.props.dispatch({ type: 'UPDATE_ADVERSE_EVENT', payload: this.state});
        }
    };

    render() {
        const { classes } = this.props;
 
        return(
            <div>
            <h4>Post Operative Details </h4>
            <Grid container spacing={24}>
                <Grid item xs={3}>
                <TextField
                variant="outlined"
                name="icu_stays"
                label="ICU Stay (days)"
                className={classes.textField}
                value={this.state.icu_stays}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={this.handleChange}
                margin="dense"
                />
                <TextField
                variant="outlined"
                name="hospital_stays"
                label="Hospital Stay (days)"
                className={classes.textField}
                value={this.state.hospital_stays}
                fullWidth
                onChange={this.handleChange}
                margin="dense"
                InputLabelProps={{
                    shrink: true,
                }}
                />  
                </Grid>
                <Grid item xs>
                <TextField
                variant="outlined"
                name="notes"
                label="Notes"
                className={classes.textField}
                value={this.state.notes}
                multiline
                rows="4"
                fullWidth
                onChange={this.handleChange}
                margin="dense"
                InputLabelProps={{
                    shrink: true,
                }}
                />
                </Grid>
            </Grid>
            <FormGroup row>
                <FormControlLabel
                control={
                    <Checkbox
                    name="serious_adverse_event"
                    checked={this.state.serious_adverse_event}
                    onChange={this.handleChangeCheckbox}
                    />
                }
                label="Serious Adverse Event"
                />
            </FormGroup>
            <ExpansionPanel expanded={this.state.serious_adverse_event}>
                <ExpansionPanelSummary >
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Score</FormLabel>
                        <RadioGroup 
                            aria-label="Serious Adverse Event Score"
                            name="score"
                            className={classes.group}
                            value={this.state.score}
                            onChange={this.handleChange}
                        >
                            <FormControlLabel value="0" control={<Radio />} label="0" />
                            <FormControlLabel value="1" control={<Radio />} label="1" />
                            <FormControlLabel value="2" control={<Radio />} label="2" />
                            <FormControlLabel value="3" control={<Radio />} label="3" />
                            <FormControlLabel value="4" control={<Radio />} label="4" />
                            <FormControlLabel value="5" control={<Radio />} label="5" />
                        </RadioGroup>
                    </FormControl>                    
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container spacing={24}>
                        <SeriousAdverseEvents adverse_events={this.state.adverse_events} 
                            handleChangeAdverseEvent={this.handleChangeAdverseEvent}
                            handleChangeClavienScore={this.handleChangeClavienScore}/>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <Grid container spacing={24}>
                <Grid item xs={2}>
                    <ReOperation labelWidth={this.state.labelWidth} reoperation={this.state.reoperation} handleChange={this.handleChange}/>
                </Grid>
                <Grid item xs={2}>
                    <Mortality labelWidth={this.state.labelWidth} hospital_mortality={this.state.hospital_mortality} handleChange={this.handleChange}/>
                </Grid>
                <Grid item xs={2}>
                    <DischargeStatus labelWidth={this.state.labelWidth} status_at_discharge={this.state.status_at_discharge} handleChange={this.handleChange}/>
                </Grid>                
                <Grid item xs>
                <TextField
                variant="outlined"
                name="discharge_notes"
                label="Discharge Notes"
                className={classes.textField}
                value={this.state.discharge_notes}
                multiline
                rows="4"
                fullWidth
                onChange={this.handleChange}
                margin="dense"
                InputLabelProps={{
                    shrink: true,
                }}
                />      
                
            </Grid>
            </Grid>
            <Button onClick={this.savePostOp} className={classes.button}
                variant="contained" color="primary">
                Save
            </Button>      

            </div>

        )
    }
  
};

const mapStateToProps = reduxState => ({
    postOp: reduxState.postOp,
    adverseEvents: reduxState.adverseEvents,
    patientReducer: reduxState.patientReducer,
});

export default connect(mapStateToProps) (withStyles(styles)(PostOpPage));