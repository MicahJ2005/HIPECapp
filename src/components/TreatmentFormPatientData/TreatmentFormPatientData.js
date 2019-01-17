import React, { Component } from 'react'
import { connect } from 'react-redux';

class TreatmentFormPatientData extends Component {


    render() {
        return(
            <div>
                <h1>Treatment Form Patient Data Page</h1>

                <h3>This is the Patient info displayed on all form pages</h3>
                <h3>It will include Patient ID, DOB, Age, Gender, HIPEC(yes or no), and Date of HIPEC</h3>
                <h3>This information can be expanded by clicking the arrow on the right-hand side of the data template</h3>
                
            </div>

        )
    }
  
};

const mapStateToProps = reduxState => ({
    reduxState,
});


export default connect(mapStateToProps) (TreatmentFormPatientData)
