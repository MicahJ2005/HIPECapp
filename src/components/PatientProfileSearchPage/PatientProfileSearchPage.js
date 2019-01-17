import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import PropTypes from 'prop-types';
import PatientProfileSearchResult from '../PatientProfileSearchResult/PatientProfileSearchResult';
import InputBase from '@material-ui/core/InputBase';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 500,
        verticalAlign: 'unset',
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
        verticalAlign: 'bottom',
    }
  });

class PatientProfileSearchPage extends Component {

    state = {
        variables: {
        open: false,
        labelWidth: 0,
        name: '',
        },
        patient: {
            currentStatus: 0,
            gender: '',
        },
      };

    componentDidMount(){
        this.props.dispatch({type: 'LAST_PATIENT_ID_PLUS_ONE'});
    }
    
    handleNewPatientChange = (name) => (event) => {
        this.setState({patient: {...this.state.patient, [name]: (event.target.value)} });
    };

    calculateAge = (dob) => (event) => {
        let age = Math.floor((new Date() - new Date(event.target.value).getTime()) / 3.15576e+10);
        this.setState({patient: {...this.state.patient, age: age} });
    };
      
    handleSearchChange = (name) => (event) => {
        this.setState({ [name]: (event.target.value) });
    };
    
    handleClickOpen = () => {
        this.setState({ variables: {open: true}, patient: {patient_no: this.props.newPatientId} });
    };
    
    handleClose = () => {
        this.setState({ variables: {open: false}, patient: {} });
    };

    addPatient = () => {
        this.props.dispatch({type: 'ADD_PATIENT', 
            payload: {
                patientObject: this.state.patient,
                history: this.props.history,
            }
    });
        this.setState({ variables: {open: false}});
        document.cookie = `patientID=${this.state.patient.patient_no}`
        this.props.history.push(`/MainTabsPage`);
    }

    searchPatient = () => {
        if(this.state.patientSearch){
        this.setState({ patientSearch: '' });
        this.props.dispatch({type: 'FIND_PATIENT', payload: this.state.patientSearch});} else {
            alert('Please enter a Patient ID Number!');
        }
    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <Grid container spacing={24}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                    {/* Patient Profile Search Field */}
                        <TextField
                        className={classes.formControl}
                        required
                        id="outlined-required"
                        label="Search for a Patient"
                        placeholder="Patient ID e.x. 1234567890"
                        margin="normal"
                        variant="outlined"
                        value={this.state.patientSearch}
                        onChange={this.handleSearchChange('patientSearch')}
                        />
                        {/* Patient Profile Search Button */}
                            <Button  onClick={this.searchPatient} className={classes.button} variant="contained" color="primary">
                            Search <SearchIcon/>
                            </Button>
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={12}>
                    {/* Patient Profile Search Result */}
                        {this.props.patientSearch ? (<PatientProfileSearchResult/>) : (<></>)}
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6}>
                    {/* Add New Patient Button */}
                        <Button className={classes.formControl} onClick={this.handleClickOpen} variant="contained" color="primary">
                        Add New Patient<AddIcon/>
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                    {/* Add New Patient Pop Up Form */}
                        <Dialog
                            fullWidth
                            disableBackdropClick
                            open={this.state.variables.open}
                            onClose={this.handleClose}>
                            <DialogContent>
                        {/* Patient ID [auto-generated based on last patient in database] Input */}
                        <FormControl className={classes.formControl}>
                            <InputBase disabled value="New Patient ID: ">{"New Patient ID: " + this.props.newPatientId}</InputBase>
                            <InputBase
                            required
                            id="outlined-required"
                            label="New Patient ID"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                readOnly: true,
                              }}
                            placeholder={"New Patient ID: " + this.props.newPatientId}
                            value={this.props.newPatientId}
                            margin="normal"
                            fullWidth={true}
                            type="number"
                            onChange={this.handleNewPatientChange('patientId', 'value')}
                            />
                        </FormControl>
                        {/* Date of Birth Input */}
                        <FormControl className={classes.formControl}>
                        <TextField
                        required
                        id="outlined-required"
                        label="Date of Birth"
                        InputLabelProps={{
                            shrink: true,
                          }}
                        margin="normal"
                        type="date"
                        variant="outlined"
                        fullWidth={true}
                        onChange={this.handleNewPatientChange('dob')}
                        onBlur={this.calculateAge('age', this.state.patient.dob)}
                        /></FormControl>
                        {/* Age Input [auto-calculated via Date of Birth Input] */}
                        <FormControl className={classes.formControlAge}>
                        <TextField
                        id="outlined-required"
                        label="Age"
                        InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            readOnly: true,
                          }}
                          value={this.state.patient.age}
                        margin="normal"
                        variant="outlined"
                        /></FormControl>
                        {/* Gender Input */}
                        <FormControl  className={classes.formControl}>
                            <InputLabel shrink
                                htmlFor="gender-label-placeholder"                                
                            >
                                Gender
                            </InputLabel>
                            <Select
                                value={this.state.patient.gender}
                                onChange={this.handleNewPatientChange('gender', 'value')}
                                displayEmpty
                                name="gender"
                                className={classes.selectEmpty}
                                >
                                <MenuItem value='Female'>Female</MenuItem>
                                <MenuItem value='Male'>Male</MenuItem>
                                <MenuItem value='Other'>Other</MenuItem>
                            </Select>
                        </FormControl>
                        {/* Type of Cancer Input */}
                        <FormControl className={classes.formControl} variant="outlined">
                            <InputLabel shrink
                                htmlFor="outlined-toc-simple"                                
                            >
                                Type of Cancer
                            </InputLabel>
                            <Select
                                value={this.state.patient.toc}
                                onChange={this.handleNewPatientChange('toc', 'value')}
                                input={
                                <OutlinedInput
                                    name="Type of Cancer"
                                    id="outlined-toc-simple"
                                    labelWidth={this.state.labelWidth}
                                />
                                }
                            >
                                <MenuItem value={1}>CRC</MenuItem>
                                <MenuItem value={2}>Appendiceal</MenuItem>
                                <MenuItem value={3}>Gastric</MenuItem>
                                <MenuItem value={4}>Ovarian</MenuItem>
                                <MenuItem value={5}>Other</MenuItem>
                            </Select>
                        </FormControl>
                        {/* HIPEC Input */}
                        <FormControl component="fieldset" className={classes.formControlSub}>
                            <FormLabel component="legend" style={{display: 'inline-block'}}>HIPEC</FormLabel>
                            <RadioGroup
                                aria-label="HIPEC"
                                name="hipec"
                                value={this.state.patient.hipec}
                                onChange={this.handleNewPatientChange('hipec', 'value')}
                                style={{display: 'flex', flexDirection: 'row'}}
                            >
                                <FormControlLabel value="yes" control={<Radio className={classes.radio}/>} label="Yes" />
                                <FormControlLabel value="no" control={<Radio className={classes.radio}/>} label="No" />
                            </RadioGroup>
                        </FormControl>
                        {/* If HIPEC is yes, show additional inputs */}
                        {this.state.patient.hipec === 'yes' ? (<><FormControl className={classes.formControl}>
                        <TextField
                        required
                        id="outlined-required"
                        label="Date of HIPEC"
                        InputLabelProps={{
                            shrink: true,
                          }}
                        margin="normal"
                        type="date"
                        variant="outlined"
                        onChange={this.handleNewPatientChange('dateOfHipec', 'value')}
                        /></FormControl>
                        {/* HIPEC Date of Referral Input */}
                        <FormControl className={classes.formControl}>
                        <TextField
                        required
                        id="outlined-required"
                        label="Date of Referral"
                        InputLabelProps={{
                            shrink: true,
                          }}
                        margin="normal"
                        type="date"
                        variant="outlined"
                        onChange={this.handleNewPatientChange('dateOfReferral', 'value')}
                        /></FormControl>
                        {/* HIPEC Date of Diagnosis Input */}
                        <FormControl className={classes.formControl}>
                        <TextField
                        required
                        id="outlined-required"
                        label="Diagnosis Date"
                        InputLabelProps={{
                            shrink: true,
                          }}
                        margin="normal"
                        type="date"
                        variant="outlined"
                        onChange={this.handleNewPatientChange('diagnosisDate', 'value')}
                        /></FormControl>
                        </>
                        ) : (<></>)} {/* <-- Render nothing if no HIPEC */}
                        {/* Alive on Date Input */}
                        <FormControl className={classes.formControl}>
                            <TextField
                            required
                            id="outlined-required"
                            label="Alive on Date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            type="date"
                            variant="outlined"
                            onChange={this.handleNewPatientChange('aliveOnDate', 'value')}
                            />
                        </FormControl>
                        {/* Sensor */}
                        <FormControl component="fieldset" className={classes.formControlSub}>
                            <FormLabel component="legend" style={{display: 'inline-block'}}>Sensor</FormLabel>
                            <RadioGroup
                                aria-label="sensor"
                                name="sensor"
                                value={this.state.patient.sensor}
                                onChange={this.handleNewPatientChange('sensor', 'value')}
                                style={{display: 'flex', flexDirection: 'row'}}
                            >
                                <FormControlLabel value="yes" control={<Radio className={classes.radio}/>} label="Yes" />
                                <FormControlLabel value="no" control={<Radio className={classes.radio}/>} label="No" />
                            </RadioGroup>
                        </FormControl>
                        {/* Hospital Tel Input */}
                        <FormControl className={classes.formControl}>
                            <TextField
                            required
                            id="outlined-required"
                            label="Hospital Telephone Number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Hospital Telephone Number e.x. 555-555-5555"
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                            type="string"
                            onChange={this.handleNewPatientChange('hospitalTel', 'value')}
                            />
                        </FormControl>
                        {/* Referring Doctor Input */}
                        <FormControl className={classes.formControl}>
                            <TextField
                            required
                            id="outlined-required"
                            label="Referring Doctor"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Referring Doctor e.x. Dr. Claudio Gonzales"
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                            type="string"
                            onChange={this.handleNewPatientChange('refDoc', 'value')}
                            />
                        </FormControl>
                        {/* HIPEC Current Status Input */}
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel shrink
                                htmlFor="outlined-age-native-simple"
                            >
                                Current Status
                            </InputLabel>
                            <Select
                                value={this.state.patient.currentStatus}
                                onChange={this.handleNewPatientChange('currentStatus', 'value')}
                                input={<OutlinedInput
                                    name="title"
                                    fullWidth
                                    id="outlined-age-native-simple"
                                    />}
                            >
                            {this.props.dropdownOptions.map( option => {
                                return(
                                    <MenuItem key={option.id} value={option.id}>{option.status}</MenuItem>
                                )
                            })}
                            </Select>
                        </FormControl>
                        {/* Interval Prime Surgery - HIPEC Input */}
                        <FormControl className={classes.formControl}>
                            <TextField
                            required
                            id="outlined-required"
                            label="Interval Prime Surgery - HIPEC"
                            InputLabelProps={{shrink: true,}}
                            value={this.state.patient.ipshipec}
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                            type="string"
                            onChange={this.handleNewPatientChange('ipshipec', 'value')}
                            /></FormControl>
                        {/* Survival (HIPEC Death) Input */}
                        <FormControl className={classes.formControl}>
                            <TextField
                            required
                            id="outlined-required"
                            label="Survival (HIPEC Death)"
                            InputLabelProps={{shrink: true,}}
                            value={this.state.patient.survivalhipecdeath}
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                            type="string"
                            onChange={this.handleNewPatientChange('survivalhipecdeath', 'value')}
                            />
                        </FormControl>
                        {/* Survival (HIPEC Last Contact) Input */}
                        <FormControl className={classes.formControl}>
                            <TextField
                            required
                            id="outlined-required"
                            label="Survival (HIPEC Last Contact)"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={this.state.patient.survivalhipeclastcontact}
                            margin="normal"
                            variant="outlined"
                                                        fullWidth={true}
                                type="string"
                                onChange={this.handleNewPatientChange('survivalhipeclastcontact', 'value')}
                            />
                        </FormControl>
                        {/* Interval Diagnosis PC-HIPEC Input */}
                        <FormControl className={classes.formControl}>
                            <TextField
                            required
                            id="outlined-required"
                            label="Interval Diagnosis PC-HIPEC"
                            InputLabelProps={{shrink: true,}}
                            value={this.state.patient.intervalDiagnosisPcHipec}
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                            type="string"
                            onChange={this.handleNewPatientChange('intervalDiagnosisPcHipec', 'value')}
                            />
                        </FormControl>
                    </DialogContent>
                            <DialogActions>
                                {/* Cancel Add New Patient Button */}
                                <Button onClick={this.handleClose} color="primary">
                                Cancel
                                </Button>
                                {/* Finish Add New Patient Button */}
                                <Button onClick={this.addPatient} color="primary">
                                Add Patient
                                </Button>
                            </DialogActions>
                        </Dialog>
                </Grid>
            </div>
        )
    }
};

PatientProfileSearchPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = reduxState => ({
    patientSearch: reduxState.patientReducer.patientSearch,
    newPatientId: reduxState.patientReducer.newPatientId,
    dropdownOptions: reduxState.dropdownOptions.currentStatusOptions,
});

export default withStyles(styles)(connect(mapStateToProps)(PatientProfileSearchPage));