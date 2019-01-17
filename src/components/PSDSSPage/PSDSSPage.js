import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import PSDSSPageData from './PSDSSPageData';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
      },
    gridItem:{
        marginBottom: 10,
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
      table: {
        // maxWidth: 200,
        paddingBottom: 20,
      },
      headingElements:{
          marginTop: 10,
          marginBottom: 30,
      },
      containerPaper:{
          padding: 20,
      }
});

class PSDSSPage extends Component {
    state = {
        clinical: '',
        pci: '',
        histology: '',
        synchronous_liver_treatment: false,
        timing: '',
        date_treatment: '',
        treatment_type: '',
        notes: '',
        total: '(auto)',
    }

    //Function to set the state of the component equal to the redux state
    setInitialState = () => {
        this.setState({
            ...this.state,
            patient_id: this.props.psdss.patient_id,
            clinical: this.props.psdss.clinical,
            pci: this.props.psdss.pci,
            histology: this.props.psdss.histology,
            synchronous_liver_treatment: this.props.psdss.synchronous_liver_treatment,
            timing: this.props.psdss.timing,
            date_treatment: this.props.psdss.date_treatment,
            treatment_type: this.props.psdss.treatment_type,
            notes: this.props.psdss.notes,
            total: this.props.psdss.total,
        })
    }

    //Function to handle the changes in our inputs and selectors.
    handleChange = (event) => {
        this.setState ({
            [event.target.name]: event.target.value,
        }
        , this.calculatePSDSS
        )
        console.log(this.state);
    }

    handleChangeCheckbox = (event) => {
        this.setState({
            ...this.state,
            changesMade: true,
            [event.target.name]: event.target.checked,
        });
    }

    //function in charge of calculating PSDSS Score
    calculatePSDSS = () => {
        const clin = Number(this.state.clinical);
        const pci = Number(this.state.pci);
        const hist = Number(this.state.histology);
        const calculatedNum = clin + pci + hist;
            this.setState({
                total: calculatedNum,
            })
    }
    
    //Function in charge of toggling switches from true to false and viceverse
    toggleSwitch = (event) => {
        this.setState ({
            [event.target.name]: event.target.checked
        })
        console.log(this.state);
    }

    //Function to update or set a new row.
    upsertEntriesInDB = () => {
        this.props.dispatch({type: 'UPSERT_DATA_FOR_PSDSS', payload: {state: this.state, id: this.props.patient.patient.id}})
    }

    componentDidMount(){
        this.setInitialState();
    }

    componentWillUnmount(){
        this.upsertEntriesInDB();
    }

    render() {
        const {classes} = this.props;
        return(
            <div>
            <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
            >
            <Grid item xs={12} className={classes.gridItem}>
                <Grid
                container
                direction="row"
                justify="flex-start"
                // alignItems="center"
                >
                     <Grid item xs={12} className={classes.gridItem} align="left">
                            <h4>Peritonial Surface Disease Severity Scale</h4>
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}></Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={2} className={classes.gridItem}>
                            <TextField dense
                            variant="outlined"
                            label="Clinical"
                            onChange={this.handleChange}
                            name="clinical"
                            value={this.state.clinical}
                            id="patientWeightInput"
                            className={classNames(classes.margin, classes.textField)}
                            />
                        </Grid>
                        <Grid item xs={2}>
                        </Grid>
                        <Grid item xs={2} className={classes.gridItem}>
                            <TextField dense
                                variant="outlined"
                                label="PCI"
                                onChange={this.handleChange}
                                name="pci"
                                value={this.state.pci}
                                id="pci"
                                className={classNames(classes.margin, classes.textField)}
                            />
                        </Grid>
                        <Grid item xs={2}>
                        </Grid>
                        <Grid item xs={2} className={classes.gridItem}>
                            <TextField dense
                                variant="outlined"
                                label="Histology Score"
                                onChange={this.handleChange}
                                name="histology"
                                value={this.state.histology}
                                id="histologyScore"
                                className={classNames(classes.margin, classes.textField)}
                            />
                        </Grid>
                    <Grid item xs={12} className={classes.gridItem} align="center">
                            <Grid
                            container
                            direction="row"
                            justify="space-evenly"
                            alignItems="center"
                            >
                                <Grid item xs={4} className={classes.headingElements} align="center">
                                    <Typography variant="h7">
                                        Clinical Evaluation<br />
                                        Enter a value from 0 to 6
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} className={classes.headingElements} align="center">
                                    <Typography variant="h7">
                                        PCI (Peritonial Cancer Index)<br />
                                        Enter a value from 1 to 7
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} className={classes.headingElements} align="center">
                                    <Typography variant="h7">
                                        Histology<br />
                                        Enter a value from 1 to 9
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem} align="center">
                                    <Divider />
                                </Grid>
                                <Grid item xs={4} className={classes.gridItem} align="center">
                                    <Typography variant="overline">
                                        No Symptoms
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} className={classes.gridItem} align="center">
                                    <Typography variant="overline">
                                        {"<"}  10
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} className={classes.gridItem} align="center">
                                    <Typography variant="overline">
                                        Good/Moderate N0
                                    </Typography>
                                </Grid>
                                <Grid itme xs={4} className={classes.gridItem} align="center">
                                    <Typography variant="subheading">
                                        0
                                    </Typography>
                                </Grid>
                                <Grid itme xs={4} className={classes.gridItem} align="center">
                                    <Typography variant="subheading">
                                        1
                                    </Typography>
                                </Grid>
                                <Grid itme xs={4} className={classes.gridItem} align="center">
                                    <Typography variant="subheading">
                                        1
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem} align="center">
                                    <Divider variant="fullWidth"></Divider>
                                </Grid>
                                <Grid item xs={4} className={classes.gridItem} align="center">
                                    <Typography variant="overline">
                                        Mild Symptoms
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} className={classes.gridItem} align="center">
                                    <Typography variant="overline">
                                        10-20
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} className={classes.gridItem} align="center">
                                    <Typography variant="overline">
                                        Moderate N1-2
                                    </Typography>
                                </Grid>
                                <Grid itme xs={4} className={classes.gridItem} align="center">
                                    <Typography variant="subheading">
                                        1
                                    </Typography>
                                </Grid>
                                <Grid itme xs={4} className={classes.gridItem} align="center">
                                    <Typography variant="subheading">
                                        3
                                    </Typography>
                                </Grid>
                                <Grid itme xs={4} className={classes.gridItem} align="center">
                                    <Typography variant="subheading">
                                        3
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem} align="center">
                                    <Divider variant="fullWidth"></Divider>
                                </Grid>
                                <Grid item xs={4} className={classes.gridItem} align="center">
                                    <Typography variant="overline">
                                        Severe Symptoms
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} className={classes.gridItem} align="center">
                                    <Typography variant="overline">
                                        {">"}  20
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} className={classes.gridItem} align="center">
                                    <Typography variant="overline">
                                        Poor/Signet
                                    </Typography>
                                </Grid>
                                <Grid itme xs={4} className={classes.gridItem} align="center">
                                    <Typography variant="subheading">
                                        6
                                    </Typography>
                                </Grid>
                                <Grid itme xs={4} className={classes.gridItem} align="center">
                                    <Typography variant="subheading">
                                        7
                                    </Typography>
                                </Grid>
                                <Grid itme xs={4} className={classes.gridItem} align="center">
                                    <Typography variant="subheading">
                                        9
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem} align="center">
                                    <Divider variant="fullWidth"></Divider>
                                </Grid>

                            </Grid>
                            <Grid item xs={12} className={classes.gridItem}>
                            <Typography variant="h5" align="center">PSDSS Score: {this.state.total}</Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.gridItem}>
                            <Typography variant="h7" align="center">2 to 3 (Stage I) - 4 to 7 (Stage II) - 8 to 10 (Stage III) - 11+ (Stage IV) </Typography>
                            </Grid>


                    </Grid>
                 </Grid>
                </Grid>
            </Grid>
            <h4>Additional Information</h4>
                <PSDSSPageData psdssInfo={this.state} toggleSwitch={this.toggleSwitch} handleChangeCheckbox={this.handleChangeCheckbox}/>
                <Button onClick={this.upsertEntriesInDB} className={classes.button}
                        variant="contained" color="primary">
                        Save
                </Button>
            </div>
        )
    }
};

const mapStateToProps = reduxState => ({
    timingTreamentOptions: reduxState.dropdownOptions.timingTreamentOptions,
    treamentTypeOptions: reduxState.dropdownOptions.treamentTypeOptions,
    psdss: reduxState.psdssReducer,
    patient: reduxState.patientReducer,
});

export default connect(mapStateToProps) (withStyles(styles)(PSDSSPage))
