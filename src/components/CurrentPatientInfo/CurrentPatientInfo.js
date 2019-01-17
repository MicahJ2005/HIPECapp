import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import red from '@material-ui/core/colors/red';
import moment from 'moment';


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
    redBold: {
        color: red[500],
        textTransform: 'uppercase',
        fontWeight: '900',
        // useNextVariants: true,
    },
    superCool: {
        backgroundColor: '#FFFFFF',
        border: 'none',
        boxShadow: 'none',
    },
  });

class CurrentPatientInfo extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                {/* <pre>{JSON.stringify(this.props.patient)}</pre> */}
                <ExpansionPanel className={classes.superCool}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
            <Grid container spacing={24}>
                <Grid item xs={2.5}>
                <span className={classes.redBold}>Patient ID: </span>{this.props.patient.patient_no}
                </Grid>
                <Grid item xs={2.5}>
                <span className={classes.redBold}>Date of Birth: </span>{moment(this.props.patient.dob).format('MM-DD-YYYY')}
                </Grid>
                <Grid item xs={2.5}>
                <span className={classes.redBold}>Age: </span>{Math.floor((new Date() - new Date(this.props.patient.dob).getTime()) / 3.15576e+10)}
                </Grid>
                {/* {age = Math.floor((new Date() - new Date(this.props.patient.dob).getTime()) / 3.15576e+10)} */}
                <Grid item xs={2.5}>
                <span className={classes.redBold}>Gender: </span>{this.props.patient.gender}
                </Grid>
                {this.props.patient.hipec_date ? (<Grid item xs={2.5}><span className={classes.redBold}>HIPEC: </span>YES</Grid>) : (<></>)}
                {this.props.patient.hipec_date ? (<Grid item xs={2.5}><span className={classes.redBold}>Date of HIPEC: </span>{moment(this.props.patient.hipec_date).format('MM-DD-YYYY')}</Grid>) : (<></>)}
                {this.props.patient.referal_date ? (<Grid item xs={2.5}><span className={classes.redBold}>Date of Referral: </span>{moment(this.props.patient.referal_date).format('MM-DD-YYYY')}</Grid>) : (<></>)}
                {this.props.patient.type_of_cancer ? (<Grid item xs={2.5}><span className={classes.redBold}>Type of Cancer: </span>{this.props.patient.type_of_cancer}</Grid>) : (<></>)}
            </Grid>
            </Typography>
          </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                <Grid container spacing={24}>
                  {this.props.patient.diagnosis_date ? (<Grid item xs={2.5}><span className={classes.redBold}>Diagnosis Date: </span>{moment(this.props.patient.diagnosis_date).format('MM-DD-YYYY')}</Grid>) : (<></>)}
                  {this.props.patient.alive_on_date ? (<Grid item xs={2.5}><span className={classes.redBold}>Alive on Date: </span>{moment(this.props.patient.alive_on_date).format('MM-DD-YYYY')}</Grid>) : (<></>)}
                  {this.props.patient.sensor ? (<Grid item xs={2.5}><span className={classes.redBold}>Sensor: </span>YES</Grid>) : (<></>)}
                  {this.props.patient.hospital_telephone ? (<Grid item xs={2.5}><span className={classes.redBold}>Hospital Telephone: </span>{this.props.patient.hospital_telephone}</Grid>) : (<></>)}
                  {this.props.patient.referring_doctor ? (<Grid item xs={2.5}><span className={classes.redBold}>Referring Doctor: </span>{this.props.patient.referring_doctor}</Grid>) : (<></>)}
                  {this.props.patient.current_status ? (<Grid item xs={2.5}><span className={classes.redBold}>Current Status: </span>{this.props.patient.current_status}</Grid>) : (<></>)}
                  {this.props.patient.interval_prime_surgery ? (<Grid item xs={2.5}><span className={classes.redBold}>Interval Prime Surgery - HIPEC: </span>{this.props.patient.interval_prime_surgery}</Grid>) : (<></>)}
                  {this.props.patient.survival_hipec_death ? (<Grid item xs={2.5}><span className={classes.redBold}>Survival (HIPEC Death): </span>{this.props.patient.survival_hipec_death}</Grid>) : (<></>)}
                  {this.props.patient.survival_hipec_last_contact ? (<Grid item xs={2.5}><span className={classes.redBold}>Survival (HIPEC Last Contact): </span>{this.props.patient.survival_hipec_last_contact}</Grid>) : (<></>)}
                  {this.props.patient.interval_diagnosis_pc_hipec ? (<Grid item xs={2.5}><span className={classes.redBold}>Interval Diagnosis PC-HIPEC: </span>{this.props.patient.interval_diagnosis_pc_hipec}</Grid>) : (<></>)}
                </Grid>
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
            </div>
        );
    }
}

CurrentPatientInfo.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = reduxState => ({
    patient: reduxState.patientReducer.patient,
});


export default withStyles(styles)(connect(mapStateToProps)(CurrentPatientInfo));