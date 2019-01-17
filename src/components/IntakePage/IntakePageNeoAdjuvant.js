import React, { Component } from 'react'
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';

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

class IntakePageNeoAdjuvant extends Component {
    render() {
        const { classes } = this.props;
        return(
            <>
            <Grid container spacing={24}>
                <Grid item xs={4} className={classes.gridItem}>
                    <FormControl row component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Neo Adjuvant Chemotherapy?</FormLabel>
                        <RadioGroup row
                            aria-label="nac"
                            name="neo_adjuvant_chemo"
                            className={classes.group}
                            value={this.props.intake.neo_adjuvant_chemo}
                            onChange={this.props.handleChange}
                        >
                            <FormControlLabel value='1' control={<Radio />} label="Yes" />
                            <FormControlLabel value='2' control={<Radio />} label="No" />
                            <FormControlLabel value='3' control={<Radio />} label="Unknown" />

                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={3} className={classes.gridItem}>
              <FormControl variant="outlined" margin="dense" fullWidth>
              <InputLabel
                  htmlFor="neo_adjuvant_chemo_type"
              >
                  Chemotherapy Type
                  </InputLabel>
              <Select
                      value={this.props.intake.neo_adjuvant_chemo_type}
                      onChange={this.props.handleChange}
                      input={
                      <OutlinedInput
                          value={this.props.intake.neo_adjuvant_chemo_type}
                          name="neo_adjuvant_chemo_type"
                          id="neo_adjuvant_chemo_type"
                      />
                      }
                  >
                      <MenuItem value="">
                          <em>None</em>
                      </MenuItem>
                      {this.props.dropdownOptions.adjChemoTypeOptions.map(adj => (
                          <MenuItem key={adj.id} value={adj.id}>{adj.status}</MenuItem> 
                      ))} 
                  </Select>
              </FormControl>
          </Grid>
          <Grid item xs={3} className={classes.gridItem}>
              <FormControl variant="outlined" margin="dense" fullWidth >
              <InputLabel shrink
                  htmlFor="biological"
              >
                  Biological
                  </InputLabel>
                  <Select
                      value={this.props.intake.biological}
                      onChange={this.props.handleChange}
                      input={
                      <OutlinedInput
                          value={this.props.intake.biological}
                          name="biological"
                          id="biological"
                      />
                      }
                  >
                      <MenuItem value="">
                          <em>None</em>
                      </MenuItem>
                      {this.props.dropdownOptions.biologicalOptions.map(adj => (
                          <MenuItem key={adj.id} value={adj.id}>{adj.status}</MenuItem> 
                      ))} 
                  </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <TextField
                  fullWidth="true"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.treatmentPrimeTumorNotes}
                  onChange={this.props.handleChange}
                  value={this.props.intake.notes}
                  name='notes'
                  multiline
                  rows="3"
                  variant="outlined"
                  label="Notes"
              />
          </Grid> 
        </Grid>
        </>
        )
    }
  
};

const mapStateToProps = reduxState => ({
    // intake: reduxState.intakeReducer,
    // patient: reduxState.patientReducer,
    dropdownOptions: reduxState.dropdownOptions,
});


export default connect(mapStateToProps) (withStyles(styles)(IntakePageNeoAdjuvant))
