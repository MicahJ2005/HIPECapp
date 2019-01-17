import React, { Component } from 'react'
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
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
});

class IntakePageGeneral extends Component {
    render() {
        const { classes } = this.props;
        return(
            <>
            <Grid container spacing={24}>
                <Grid item xs={2}>
                    <TextField
                        variant="outlined"
                        margin="dense"
                        onChange={this.props.handleChange}
                        name="weight_kg"
                        value={this.props.intake.weight_kg}
                        id="patientWeightInput"
                        label="Weight/Kilograms"
                        notched="true"
                        className={classNames(classes.margin, classes.textField, classes.InputLabelProps)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        variant="outlined"
                        margin="dense"
                        onChange={this.props.handleChange}
                        name="length_m"
                        value={this.props.intake.length_m}
                        id="lengthInput"
                        label="Height/Meters"
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        variant="outlined"
                        margin="dense"
                        disabled
                        onChange={this.props.handleChange}
                        name="bmi"
                        value={this.props.intake.bmi_auto}
                        id="bmi"
                        label="BMI (Body Mass Index)"
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        variant="outlined"
                        margin="dense"
                        onChange={this.props.handleChange}
                        name="ca125"
                        value={this.props.intake.ca125}
                        id="ca125"
                        label="CEA"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        variant="outlined"
                        margin="dense"
                        onChange={this.props.handleChange}
                        name="crp"
                        value={this.props.intake.crp}
                        id="crp"
                        label="CRP"
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        variant="outlined"
                        margin="dense"
                        onChange={this.props.handleChange}
                        name="length_m"
                        value={this.props.intake.leucocyte}
                        id="leucocyte"
                        label="Leucocyte"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={24}>
                <Grid item xs={2} className={classes.gridItem}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Smoking</FormLabel>
                        <RadioGroup
                            aria-label="Smoking"
                            name="smoking"
                            className={classes.group}
                            value={this.props.intake.smoking}
                            onChange={this.props.handleChange}
                        >
                            <FormControlLabel margin='dense' value='1' control={<Radio />} label="Yes" />
                            <FormControlLabel value='2' control={<Radio />} label="No" />
                            <FormControlLabel value='3' control={<Radio />} label="Unknown" />

                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={2} className={classes.gridItem}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Diabetes</FormLabel>
                        <RadioGroup
                            aria-label="diabetes"
                            name="diabetes"
                            className={classes.group}
                            value={this.props.intake.diabetes}
                            onChange={this.props.handleChange}
                        >
                            <FormControlLabel value='1' control={<Radio />} label="Yes" />
                            <FormControlLabel value='2' control={<Radio />} label="No" />
                            <FormControlLabel value='3' control={<Radio />} label="Unknown" />

                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={2} className={classes.gridItem}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Insulin Dependent</FormLabel>
                        <RadioGroup
                            aria-label="insulinDep"
                            name="insulin_dependent"
                            className={classes.group}
                            value={this.props.intake.insulin_dependent}
                            onChange={this.props.handleChange}
                        >
                            <FormControlLabel value='1' control={<Radio />} label="Yes" />
                            <FormControlLabel value='2' control={<Radio />} label="No" />
                            <FormControlLabel value='3' control={<Radio />} label="Unknown" />

                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={2} className={classes.gridItem}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Cardiovascular</FormLabel>
                        <RadioGroup
                            aria-label="cardiovasc"
                            name="cardiovascular"
                            className={classes.group}
                            value={this.props.intake.cardiovascular}
                            onChange={this.props.handleChange}
                        >
                            <FormControlLabel value='1' control={<Radio />} label="Yes" />
                            <FormControlLabel value='2' control={<Radio />} label="No" />
                            <FormControlLabel value='3' control={<Radio />} label="Unknown" />

                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={2} className={classes.gridItem}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Hypertension</FormLabel>
                        <RadioGroup
                            aria-label="Hypertension"
                            name="hypertension"
                            className={classes.group}
                            value={this.props.intake.hypertension}
                            onChange={this.props.handleChange}
                        >
                            <FormControlLabel value='1' control={<Radio />} label="Yes" />
                            <FormControlLabel value='2' control={<Radio />} label="No" />
                            <FormControlLabel value='3' control={<Radio />} label="Unknown" />

                        </RadioGroup>
                    </FormControl>
                </Grid> 
            </Grid>
            </>
        )
    }
  
};

const mapStateToProps = reduxState => ({
    dropdownOptions: reduxState.dropdownOptions,
});


export default connect(mapStateToProps) (withStyles(styles)(IntakePageGeneral))
