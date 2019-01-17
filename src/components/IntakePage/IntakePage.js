import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IntakePageGeneralInfo from './IntakePageGeneralInfo';
import IntakePageNeoAdjuvant from './IntakePageNeoAdjuvant';
import IntakePageDiagnostic from './IntakePageDiagnostic';


const styles = theme => ({
    gridItem:{
        marginBottom: 0,
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

class IntakePage extends Component {
    state = {
        changesMade: false,
        bmi_auto: '',
        length_m: '',
        weight_kg: '',
        id: '',
        patient_id: '',
        crp: '',
        ca125: '',
        leucocyte: '',
        smoking: '',
        diabetes: '',
        insulin_dependent: '',
        cardiovascular: '',
        hypertension: '',
        stoma_pre_hipec: '',
        stoma_type: '',
        neo_adjuvant_chemo: '',
        neo_adjuvant_chemo_type: '',
        biological: '',
        notes: '',
        diagnostic_scopy: '',
        date_scopy: '',
        scopy_conclusion: '',
        scopy_notes: '',
        syn_metachronous: '',
        date_diagnosis_pc: '',
        assessment_of_pss: '',
        asa_score_date_time_stamp: '',
        date: '',
    }

    setInitialState = () => {
        this.setState ({
            ...this.state,
            changesMade: false,
            bmi_auto: this.props.intake.bmi_auto,
            length_m: this.props.intake.length_m,
            weight_kg: this.props.intake.weight_kg,
            id: this.props.intake.id,
            patient_id: this.props.intake.patient_id,
            crp: this.props.intake.crp,
            ca125: this.props.intake.ca125,
            leucocyte: this.props.intake.leucocyte,
            smoking: this.props.intake.smoking,
            diabetes: this.props.intake.diabetes,
            insulin_dependent: this.props.intake.insulin_dependent,
            cardiovascular: this.props.intake.cardiovascular,
            hypertension: this.props.intake.hypertension,
            stoma_pre_hipec: this.props.intake.stoma_pre_hipec,
            stoma_type: this.props.intake.stoma_type,
            neo_adjuvant_chemo: this.props.intake.neo_adjuvant_chemo,
            neo_adjuvant_chemo_type: this.props.intake.neo_adjuvant_chemo_type,
            biological: this.props.intake.biological,
            notes: this.props.intake.notes,
            diagnostic_scopy: this.props.intake.diagnostic_scopy,
            date_scopy: this.props.intake.date_scopy,
            scopy_conclusion: this.props.intake.scopy_conclusion,
            scopy_notes: this.props.intake.scopy_notes,
            syn_metachronous: this.props.intake.syn_metachronous,
            date_diagnosis_pc: this.props.intake.date_diagnosis_pc,
            assessment_of_pss: this.props.intake.assessment_of_pss,
            asa_score_date_time_stamp: this.props.intake.asa_score_date_time_stamp,
            date: this.props.intake.date,
        }) 
    }

    //Function to calculate the bmi for the patient.
    calculateBMI = () => {
        let bmi;
        let height = Number(this.state.length_m);
        let weight = Number(this.state.weight_kg);
        let squaredHeight = height * height;
        bmi = weight/squaredHeight;
        if (this.state.length_m !== '' && this.state.weight_kg !== '') {
            this.setState({
                bmi_auto: String(parseFloat(bmi).toFixed(2)),
            })
        } else {
            this.setState({
                bmi_auto: '',
            })
        }
    }

    //Function to handle the changes in our inputs and selectors.
    handleChange = (event) => {
        this.setState ({
            [event.target.name]: event.target.value,
            changesMade: true,
        }
        , this.calculateBMI)
        console.log(this.state);
    }
    
    updateEntriesInDB = () => {
        this.props.dispatch({type: 'UPSERT_DATA_FOR_INTAKE', payload: {state: this.state, id: this.props.patient.patient.id}})
    }

    componentDidMount(){
        this.setInitialState();
    }

    componentWillUnmount(){
        this.updateEntriesInDB();
    }

    render() {
        const { classes } = this.props;
        return(
            <>
            <h4>General Information</h4>
            <IntakePageGeneralInfo intake={this.state} 
                handleChange={this.handleChange} calculateBMI={this.calculateBMI}/>
            <h4>Neo Adjuvant Treatment</h4>
            <IntakePageNeoAdjuvant intake={this.state} handleChange={this.handleChange} />
            <h4>Diagnostic Laparoscopy</h4>
            <IntakePageDiagnostic intake={this.state} handleChange={this.handleChange}/>
            <Button variant="contained" color="primary" onClick={this.updateEntriesInDB}>Save</Button>
            </>
        )
    }
  
};

const mapStateToProps = reduxState => ({
    intake: reduxState.intakeReducer,
    patient: reduxState.patientReducer,
    dropdownOptions: reduxState.dropdownOptions,
});


export default connect(mapStateToProps) (withStyles(styles)(IntakePage))
