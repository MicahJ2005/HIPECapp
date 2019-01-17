import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import PatientProfileSearchPage from '../PatientProfileSearchPage/PatientProfileSearchPage';
// import TreatmentFormPatientData from '../TreatmentFormPatientData/TreatmentFormPatientData';
import PrimaryTumorPage from '../PrimaryTumorPage/PrimaryTumorPage';
import IntakePage from '../IntakePage/IntakePage';
import PSDSSPage from '../PSDSSPage/PSDSSPage';
import InterventionPage from '../InterventionPage/InterventionPage';
import PathologyNotesPage from '../PathologyNotesPage/PathologyNotesPage';
import OperativeNotesPage from '../OperativeNotesPage/OperativeNotesPage';
import PostOpPage from '../PostOpPage/PostOpPage';
import FollowUpPage from '../FollowUpPage/FollowUpPage';
// import ManageUsersPage from '../ManageUsersPage/ManageUsersPage';
import CurrentPatientInfo from '../CurrentPatientInfo/CurrentPatientInfo';
import ColorectalTheme from '../App/ColorectalTheme';
import AppendixTheme from '../App/AppendixTheme';
import GastricTheme from '../App/GastricTheme';
import MesotheliomaTheme from '../App/MesotheliomaTheme';
import OtherTheme from '../App/OtherTheme';
import OvarianTheme from '../App/OvarianTheme';
import PseudomyxomaTheme from '../App/PseudomyxomaTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import appTheme from '../App/AppTheme';

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }

  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };


  const styles = theme => ({
    root: {
      flexGrow: 1,
      width: '100%',
    },
  });
class MainTabsPage extends Component {
state = {
    value: 0,
  };

  componentDidMount () {    
    // console.log('in main tabs page for patient#', this.props.patient);
    // this.getPatientIDFromCookie(patientId)
    // let patientId;
    // if (this.props.patient.id == undefined) {
    //   patientId = document.cookie.replace(/(?:(?:^|.*;\s*)patientID\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    //   this.props.dispatch({type:'GET_PATIENT_ID_FROM_COOKIE', payload: patientId});
    // } else {
    // let patientId = this.props.patient.id;
    // }
    let patientId = document.cookie.replace(/(?:(?:^|.*;\s*)patientID\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // let patientId = this.props.patient.id;
    this.props.dispatch({type: 'GET_PATIENT_ID_FROM_COOKIE', payload: patientId});
    this.props.dispatch({type: 'GET_DROPDOWN_OPTIONS'});
    this.props.dispatch({type: 'GET_INITIAL_VALUES', payload: patientId});
    this.props.dispatch({type: 'GET_INITIAL_DATA_FOR_INTAKE', payload: patientId});
    this.props.dispatch({type: 'GET_INITIAL_DATA_FOR_PSDSS', payload: patientId});
    this.props.dispatch({type: 'GET_PCI_TOTAL', payload: patientId });
    this.props.dispatch({type: 'FETCH_POST_OP', payload: patientId});
    this.props.dispatch({type: 'FETCH_ADVERSE_EVENT', payload: patientId});
    this.props.dispatch({type: 'FETCH_FOLLOW_UP', payload: patientId});
    this.props.dispatch({type: 'FETCH_FOLLOW_UP_HISTORY', payload: patientId});
  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  
  
  // CancerTheme = () => {
  //   console.log('toc', patientTOC);
  //   let patientTOC = document.cookie.replace(/(?:(?:^|.*;\s*)patientTOC\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  //   let theme;
  //   if (patientTOC === 1) {
  //      theme={ColorectalTheme}
  //    }
  //   else if (patientTOC === 2){
  //     theme={AppendixTheme}
  //   }
  //   else if (patientTOC === 3){
  //     theme={GastricTheme}
  //   }
  //   else if (patientTOC === 4){
  //     theme={OvarianTheme}
  //   }
  //   else if (patientTOC === 5){
  //    theme={MesotheliomaTheme}
  //   }
  //   else if (patientTOC === 6){
  //      theme={PseudomyxomaTheme}
  //   }
  //   else if (patientTOC === 7){
  //      theme={OtherTheme}
  //   }
  //   else {
  //      theme={appTheme}
  //   }
  //   return theme
  // }

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        // const cancerThemes = {
        //   1: ColorectalTheme,
        //   2: AppendixTheme,
        // };

        // const themeTest = cancerThemes[this.props.patient.toc_id] || appTheme;

        // let themeOption = this.CancerTheme(this.props.patient.toc_id)
        return(
            <div className={classes.root}>
            {this.props.patient !== null ? (
              <MuiThemeProvider theme={appTheme}>

                {this.props.patient ? (<CurrentPatientInfo/>) : (<></>)}
                <AppBar position="static" color="default">
                    <Tabs
                    value={value}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    scrollable
                    scrollButtons="auto"
                    >
                    <Tab label="Primary Tumor" />
                    <Tab label="Intake" />
                    <Tab label="PSDSS" />
                    <Tab label="Intervention" />
                    <Tab label="Pathology Notes" />
                    <Tab label="Operative Notes" />
                    <Tab label="Post-Op" />
                    <Tab label="Follow Up" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer><PrimaryTumorPage /></TabContainer>}
                {value === 1 && <TabContainer><IntakePage /></TabContainer>}
                {value === 2 && <TabContainer><PSDSSPage /></TabContainer>}
                {value === 3 && <TabContainer><InterventionPage /></TabContainer>}
                {value === 4 && <TabContainer><PathologyNotesPage /></TabContainer>}
                {value === 5 && <TabContainer><OperativeNotesPage /></TabContainer>}
                {value === 6 && <TabContainer><PostOpPage /></TabContainer>}
                {value === 7 && <TabContainer><FollowUpPage /></TabContainer>}
                
                </MuiThemeProvider>
                ):(<MuiThemeProvider theme={appTheme}>
                  {this.props.patient ? (<CurrentPatientInfo/>) : (<></>)}
                <AppBar position="static" color="default">
                    <Tabs
                    value={value}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    scrollable
                    scrollButtons="auto"
                    >
                    <Tab label="Primary Tumor" />
                    <Tab label="Intake" />
                    <Tab label="PSDSS" />
                    <Tab label="Intervention" />
                    <Tab label="Pathology Notes" />
                    <Tab label="Operative Notes" />
                    <Tab label="Post-Op" />
                    <Tab label="Follow Up" />
                    </Tabs>
                </AppBar>
                  {value === 0 && <TabContainer><PrimaryTumorPage /></TabContainer>}
                  {value === 1 && <TabContainer><IntakePage /></TabContainer>}
                  {value === 2 && <TabContainer><PSDSSPage /></TabContainer>}
                  {value === 3 && <TabContainer><InterventionPage /></TabContainer>}
                  {value === 4 && <TabContainer><PathologyNotesPage /></TabContainer>}
                  {value === 5 && <TabContainer><OperativeNotesPage /></TabContainer>}
                  {value === 6 && <TabContainer><PostOpPage /></TabContainer>}
                  {value === 7 && <TabContainer><FollowUpPage /></TabContainer>}
                
                </MuiThemeProvider>
                  
                  )}
            </div>

        )
    }
  
};


const mapStateToProps = reduxState => ({
    patient: reduxState.patientReducer.patient,
});


export default connect(mapStateToProps) (withStyles(styles)(MainTabsPage))