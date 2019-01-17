import React, { Component } from 'react'
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import moment from 'moment';

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

class IntakePageDiagnostic extends Component {
    render() {
        const { classes } = this.props;
        return(
        <>
            <Grid container spacing={24}>
            <Grid item xs={4} className={classes.gridItem}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Diagnostic Scopy</FormLabel>
                    <RadioGroup row
                        aria-label="diagnostic_scopy"
                        name="diagnostic_scopy"
                        className={classes.group}
                        value={this.props.intake.diagnostic_scopy}
                        onChange={this.props.handleChange}
                    >
                        <FormControlLabel value='1' control={<Radio />} label="Yes" />
                        <FormControlLabel value='2' control={<Radio />} label="No" />
                        <FormControlLabel value='3' control={<Radio />} label="Unknown" />

                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={4} className={classes.gridItem}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Scopy Conclusion</FormLabel>
                    <RadioGroup row
                        aria-label="scopy_conclusion"
                        name="scopy_conclusion"
                        className={classes.group}
                        value={this.props.intake.scopy_conclusion}
                        onChange={this.props.handleChange}
                    >
                        <FormControlLabel value='1' control={<Radio />} label="Amenable" />
                        <FormControlLabel value='2' control={<Radio />} label="Benefit of Doubt" />
                        <FormControlLabel value='3' control={<Radio />} label="No Go" />

                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={4} className={classes.gridItem}>
                <TextField dense
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    type="date"
                    fullWidth="true"
                    onChange={this.props.handleChange}
                    name="date_scopy"
                    label="Date of Diagnostic Scopy"
                    value={moment(this.props.intake.date_scopy).format('YYYY-MM-DD')}
                />
            </Grid>
            </Grid>
        </>
        )
    }
  
};

const mapStateToProps = reduxState => ({
    dropdownOptions: reduxState.dropdownOptions,
});

export default connect(mapStateToProps) (withStyles(styles)(IntakePageDiagnostic))
