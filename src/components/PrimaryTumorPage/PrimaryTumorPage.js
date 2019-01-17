import React, { Component } from 'react'
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PrimaryTumorDetails from './PrimaryTumorDetails';
import PrimaryTumorTreatment from './PrimaryTumorTreatment';

const styles = theme => ({
    gridItem:{
        marginBottom: 30,
    },
    dropDown:{
        fullWidth: true,
    },
    formControl: {
        margin: theme.spacing.unit * 3,
      },
      group: {
        margin: `${theme.spacing.unit}px 0`,
      },
});

class PrimaryTumorPage extends Component {
    state = {
            changesMade: false,
            adj_chemotherapy: '',
            adj_chemotherapy_type: '',
            biological: '',
            chemo_type_1: '',
            chemo_type_2: '',
            date_primary_diagnosis: '',
            date_prime_surgery: '',
            differentiation: '',
            id: '',
            intervention_type: '',
            m: '',
            m_location: '',
            mucinous: '',
            n: '',
            notes: '',
            patient_id: '',
            primary_location: '',
            prime_tumor_surgery: '',
            reason_acute: '',
            setting:'',
            t: '',
    };

    setValuesForPatient = () => {
        this.setState({
            ...this.state,
            changesMade: false,
            adj_chemotherapy: this.props.primaryTumorReducer.adj_chemotherapy,
            adj_chemotherapy_type: this.props.primaryTumorReducer.adj_chemotherapy_type,
            biological: this.props.primaryTumorReducer.biological,
            chemo_type_1: this.props.primaryTumorReducer.chemo_type_1,
            chemo_type_2: this.props.primaryTumorReducer.chemo_type_2,
            date_primary_diagnosis: this.props.primaryTumorReducer.date_primary_diagnosis,
            date_prime_surgery: this.props.primaryTumorReducer.date_prime_surgery,
            differentiation: this.props.primaryTumorReducer.differentiation,
            id: this.props.primaryTumorReducer.id,
            intervention_type: this.props.primaryTumorReducer.intervention_type,
            m: this.props.primaryTumorReducer.m,
            m_location: this.props.primaryTumorReducer.m_location,
            mucinous: this.props.primaryTumorReducer.mucinous,
            n: this.props.primaryTumorReducer.n,
            notes: this.props.primaryTumorReducer.notes,
            patient_id: this.props.primaryTumorReducer.patient_id,
            primary_location: this.props.primaryTumorReducer.primary_location,
            prime_tumor_surgery: this.props.primaryTumorReducer.prime_tumor_surgery,
            reason_acute: this.props.primaryTumorReducer.reason_acute,
            t: this.props.primaryTumorReducer.t,
            setting: this.props.primaryTumorReducer.setting,
            type: this.props.primaryTumorReducer.type,
        });
    }

    upsertEntriesInDB = () => {
        if (this.state.changesMade) {        
            this.props.dispatch({type: 'UPSERT_DATA_FOR_PRIMARY_TUMOR', payload: {state: this.state, id: this.props.patientReducer.patient.id}});
        }
    }

    handleChange = (event) => {
        this.setState ({
            ...this.state,
            changesMade: true,
            [event.target.name]: event.target.value,
        })
    }

    componentDidMount() {
        this.setValuesForPatient();
    }

    componentWillUnmount () {
        this.upsertEntriesInDB();
    }

    render() {
        const { classes } = this.props;
        return(
            <>
            <h4>Primary Tumor Information</h4>
            <PrimaryTumorDetails primary_tumor={this.state} 
                handleChange={this.handleChange}/>
            <h4>Treatment Information</h4>
            <PrimaryTumorTreatment primary_tumor={this.state} 
                handleChange={this.handleChange}/>
            <Grid item xs={12} className={classes.gridItem} >
              <Button onClick={this.upsertEntriesInDB} className={classes.button}
                  variant="contained" color="primary">
                  Save
              </Button>
          </Grid>
            </>
        )
    }
  
};

const mapStateToProps = reduxState => ({
    dropdownOptions: reduxState.dropdownOptions,
    primaryTumorReducer: reduxState.primaryTumorReducer,
    patientReducer: reduxState.patientReducer,
});

export default connect(mapStateToProps) (withStyles(styles)(PrimaryTumorPage))
