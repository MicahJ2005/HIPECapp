import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 500,
    },
    formControlSub: {
        minWidth: 100,
        margin: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    radio: {
        display: 'inline-block',
    },
    formLabel: {
        diaplay: 'none',
    },
    button: {
        marginBottom: `${theme.spacing.unit * 3}px`,
        marginTop: `${theme.spacing.unit * 3}px`,
    },
    grid: {
        padding: `${theme.spacing.unit * 3}px`,
      },
  });

class PatientProfileSearchResult extends Component {

    clearState = () => {
        this.props.dispatch({type: 'DROP_PATIENT_RESULT'});
      }

    selectPatient = () => {
        console.log('patientSearch', this.props.patientSearch);
        
    this.props.dispatch({type: 'SET_PATIENT_RESULT', payload: this.props.patientSearch});
    document.cookie = `patientID=${this.props.patientSearch.patient_no}`
    // document.cookie = `patientTOC=${this.props.patientSearch.toc_id}`
    this.props.history.push(`/MainTabsPage`);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container spacing={24}>
                {this.props.patientSearch !== "patient not found" ?
                (<>
                <Grid container xs={3}></Grid>
                <Grid container xs={6}>
                <Grid item xs={12}><Button onClick={this.clearState} className={classes.button} variant="contained" color="primary">X</Button></Grid>
                {(this.props.patientSearch.patient_no) ? (<Grid item xs={6}><Typography><strong>Patient ID: </strong>{this.props.patientSearch.patient_no}</Typography></Grid>) : (<></>)}
                {(this.props.patientSearch.dob) ? (<Grid item xs={6}><Typography><strong>Date of Birth: </strong>{moment(this.props.patientSearch.dob).format('MM-DD-YYYY')}</Typography></Grid>) : (<></>)}
                {(this.props.patientSearch.type_of_cancer) ? (<Grid item xs={6}><Typography><strong>Type of Cancer: </strong>{this.props.patientSearch.type_of_cancer}</Typography></Grid>) : (<></>)}
                {(this.props.patientSearch.gender) ? (<Grid item xs={6}><Typography><strong>Gender: </strong>{this.props.patientSearch.gender}</Typography></Grid>) : (<></>)}
                {(this.props.patientSearch.referal_date) ? (<Grid item xs={6}><Typography><strong>Referral Date: </strong>{moment(this.props.patientSearch.referal_date).format('MM-DD-YYYY')}</Typography></Grid>) : (<></>)}
                {(this.props.patientSearch.hipec_date) ? (<Grid item xs={6}><Typography><strong>HIPEC Date: </strong>{moment(this.props.patientSearch.hipec_date).format('MM-DD-YYYY')}</Typography></Grid>) : (<></>)}
                {(this.props.patientSearch.diagnosis_date) ? (<Grid item xs={6}><Typography><strong>Diagnosis Date: </strong>{moment(this.props.patientSearch.diagnosis_date).format('MM-DD-YYYY')}</Typography></Grid>) : (<></>)}
                {(this.props.patientSearch.sensor) ? (<Grid item xs={6}><Typography><strong>Sensor: Yes</strong></Typography></Grid>) : (<></>)}
                {(this.props.patientSearch.hospital_telephone) ? (<Grid item xs={6}><Typography><strong>Hospital Telephone Number: </strong>{this.props.patientSearch.hospital_telephone}</Typography></Grid>) : (<></>)}
                {(this.props.patientSearch.refering_doctor) ? (<Grid item xs={6}><Typography><strong>Referring Doctor: </strong>{this.props.patientSearch.refering_doctor}</Typography></Grid>) : (<></>)}
                {(this.props.patientSearch.notes) ? (<Grid item xs={6}><Typography><strong>Notes: </strong>{this.props.patientSearch.notes}</Typography></Grid>) : (<></>)}
                {(this.props.patientSearch.current_status) ? (<Grid item xs={6}><Typography><strong>Current Status: </strong>{this.props.patientSearch.current_status}</Typography></Grid>) : (<></>)}
                {(this.props.patientSearch.current_date) ? (<Grid item xs={6}><Typography><strong>Current Date: </strong>{moment(this.props.patientSearch.current_date).format('MM-DD-YYYY')}</Typography></Grid>) : (<></>)}
                {(this.props.patientSearch.current_time) ? (<Grid item xs={6}><Typography><strong>Current Time: </strong>{this.props.patientSearch.current_time}</Typography></Grid>) : (<></>)}
                {(this.props.patientSearch.last_contact_date) ? (<Grid item xs={6}><Typography><strong>Last Contact Date: </strong>{moment(this.props.patientSearch.last_contact_date).format('MM-DD-YYYY')}</Typography></Grid>) : (<></>)}
                {(this.props.patientSearch.date_of_death) ? (<Grid item xs={6}><Typography><strong>Date of Death: </strong>{moment(this.props.patientSearch.date_of_death).format('MM-DD-YYYY')}</Typography></Grid>) : (<></>)}
                {(this.props.patientSearch.alive_on_date) ? (<Grid item xs={6}><Typography><strong>Alive on Date: </strong>{moment(this.props.patientSearch.alive_on_date).format('MM-DD-YYYY')}</Typography></Grid>) : (<></>)}
                {(this.props.patientSearch.interval_prime_surgery) ? (<Grid item xs={6}><Typography><strong>Interval prime surgery HIPEC: </strong>{this.props.patientSearch.interval_prime_surgery}</Typography></Grid>) : (<></>)}
                {(this.props.patientSearch.survival_hipec_death) ? (<Grid item xs={6}><Typography><strong>Survival HIPEC death: </strong>{this.props.patientSearch.survival_hipec_death}</Typography></Grid>) : (<></>)}
                {(this.props.patientSearch.survival_hipec_last_contact) ? (<Grid item xs={6}><Typography><strong>Survival HIPEC last contact: </strong>{this.props.patientSearch.survival_hipec_last_contact}</Typography></Grid>) : (<></>)}
                {(this.props.patientSearch.interval_diagnosis_pc_hipec) ? (<Grid item xs={6}><Typography><strong>Interval diagnosis PC-HIPEC: </strong>{this.props.patientSearch.interval_diagnosis_pc_hipec}</Typography></Grid>) : (<></>)}
                <Grid item xs={12}><Button onClick={this.selectPatient} className={classes.button} variant="contained" color="primary">Select this patient</Button></Grid>
                </Grid><Grid container xs={3}></Grid></>) : (<><h3>Patient Not Found</h3></>)}
                </Grid>
            </div>
        );
    }
}
const mapStateToProps = reduxState => ({
    patientSearch: reduxState.patientReducer.patientSearch,
});


export default withRouter(withStyles(styles)(connect(mapStateToProps)(PatientProfileSearchResult)));
