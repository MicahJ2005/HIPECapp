import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import FormLabel from '@material-ui/core/FormLabel';
import moment from 'moment';

const styles = theme => ({
    gridItem:{
        marginBottom: 30,
    },
    dropDown:{
        fullWidth: true,
    },
      group: {
        margin: `${theme.spacing.unit}px 0`,
      },
});

class PrimaryTumorTreatment extends Component {

    state = {
        labelWidth: 0,
    }

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
    }

    render() {
        const { classes } = this.props;
        return(
            <>
            <Grid container spacing={24}>
          <Grid item xs={2} className={classes.gridItem}>
              <TextField 
              variant="outlined"
              margin="dense"
              label="Primary Surgery Date"
              type="date"
              fullWidth="true"
              onChange={this.props.handleChange}
              name="date_prime_surgery"
              value={moment(this.props.primary_tumor.date_prime_surgery).format('YYYY-MM-DD')}
              />
          </Grid >
          <Grid item xs={3} className={classes.gridItem}>
              <FormControl variant="outlined" fullWidth="true" margin="dense" >
                  <InputLabel 
                              htmlFor="intervention_type"
                              ref={ref => {
                                this.InputLabelRef = ref;
                              }}
                          >
                              Intervention Type
                  </InputLabel>                  
                  <Select
                      value={this.props.primary_tumor.intervention_type}
                      onChange={this.props.handleChange}
                      input={
                      <OutlinedInput
                          value={this.props.primary_tumor.intervention_type}
                          name="intervention_type"
                          id="interventionType"
                          labelWidth={this.state.labelWidth}
                      />
                      }
                  >
                      <MenuItem value="">
                          <em>None</em>
                      </MenuItem>
                      {this.props.dropdownOptions.interventionTypeOptions.map(int => (
                          <MenuItem key={int.id} value={int.id}>{int.status}</MenuItem> 
                      ))} 
                  </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3} className={classes.gridItem}>
                        <FormControl variant="outlined" margin="dense" fullWidth>
                            <InputLabel 
                              htmlFor="setting"
                              ref={ref => {
                                this.InputLabelRef = ref;
                              }}
                          >
                              Setting
                             </InputLabel>                  
                                    <Select
                                        value={this.props.primary_tumor.setting}
                                        onChange={this.props.handleChange}
                                        input={
                                        <OutlinedInput
                                            value={this.props.primary_tumor.setting}
                                            name="setting"
                                            id="setting"
                                            labelWidth={this.state.labelWidth}
                                        />
                                        }
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {this.props.dropdownOptions.settingOptions.map(set => (
                                            <MenuItem key={set.id} value={set.id}>{set.status}</MenuItem> 
                                        ))} 
                                    </Select>
                                </FormControl>
                            </Grid>
          <Grid item xs={3} className={classes.gridItem}>
              <FormControl variant="outlined" fullWidth="true" margin="dense">
              <InputLabel 
                  htmlFor="prime_tumor_surgery"
                  ref={ref => {
                    this.InputLabelRef = ref;
                  }}
              >
                  Prime Tumor Surgery
                  </InputLabel>
                  <Select
                      value={this.props.primary_tumor.prime_tumor_surgery}
                      onChange={this.props.handleChange}
                      input={
                      <OutlinedInput
                          value={this.props.primary_tumor.prime_tumor_surgery}
                          name="prime_tumor_surgery"
                          id="prime_tumor_surgery"
                          labelWidth={this.state.labelWidth}
                      />
                      }
                  >
                      <MenuItem value="">
                          <em>None</em>
                      </MenuItem>
                      {this.props.dropdownOptions.primaryTumorSurgeryOptions.map(pts => (
                          <MenuItem key={pts.id} value={pts.id}>{pts.status}</MenuItem> 
                      ))} 
                  </Select>
              </FormControl>
          </Grid>
          <Grid item xs={4} className={classes.gridItem}>
              <FormControl row component="fieldset" margin="dense" fullWidth className={classes.formControl}>
              <FormLabel component="legend">Adjuvant Chemotherapy</FormLabel>
                  <RadioGroup row
                      aria-label="adj"
                      name="adj_chemotherapy"
                      className={classes.group}
                      value={this.props.primary_tumor.adj_chemotherapy}
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
                  htmlFor="adj_chemotherapy_type"
                  ref={ref => {
                    this.InputLabelRef = ref;
                  }}
              >
                  Chemotherapy Type
                  </InputLabel>
              <Select
                      value={this.props.primary_tumor.adj_chemotherapy_type}
                      onChange={this.props.handleChange}
                      input={
                      <OutlinedInput
                          value={this.props.primary_tumor.adj_chemotherapy_type}
                          name="adj_chemotherapy_type"
                          id="type"
                          labelWidth={this.state.labelWidth}
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
              <InputLabel 
                  htmlFor="biological"
                  ref={ref => {
                    this.InputLabelRef = ref;
                  }}
              >
                  Biological
                  </InputLabel>
                  <Select
                      value={this.props.primary_tumor.biological}
                      onChange={this.props.handleChange}
                      input={
                      <OutlinedInput
                          value={this.props.primary_tumor.biological}
                          name="biological"
                          id="biological"
                          labelWidth={this.state.labelWidth}
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
                  onChange={this.props.handleChange}
                  value={this.props.primary_tumor.notes}
                  name='notes'
                  multiline
                  rows="5"
                  variant="outlined"
                  label="Notes"
              />
          </Grid> 
        </Grid>
            </>
        )
    }
  
};

PrimaryTumorTreatment.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = reduxState => ({
    dropdownOptions: reduxState.dropdownOptions,
});

export default connect(mapStateToProps) (withStyles(styles)(PrimaryTumorTreatment))
