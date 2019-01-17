import React, { Component } from 'react'
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
class PrimaryTumorDetails extends Component {

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
            <div>
            <Grid container spacing={24}>
                <Grid item xs={2}>
                  <TextField
                      onChange={this.props.handleChange}
                      value={moment(this.props.primary_tumor.date_primary_diagnosis).format('YYYY-MM-DD')}
                      name="date_primary_diagnosis"
                      margin="dense"
                      label="Primary Diagnosis Date"
                      type="date"
                      variant="outlined"
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControl variant="outlined" margin="dense" fullWidth>
                      <InputLabel 
                              htmlFor="primary_location"
                              ref={ref => {
                                this.InputLabelRef = ref;
                              }}
                          >
                              Primary Location
                          </InputLabel>
                          <Select
                              value={this.props.primary_tumor.primary_location}
                              onChange={this.props.handleChange}
                              input={
                              <OutlinedInput
                                  value={this.props.primary_tumor.primary_location}
                                  name="primary_location"
                                  id="primary_location"
                                  labelWidth={this.state.labelWidth}
                              />
                              }
                          >
                              <MenuItem value="">
                                  <em>None</em>
                              </MenuItem>
                              {this.props.dropdownOptions.primaryLocationOptions.map(location => (
                                  <MenuItem key={location.id} value={location.id}>{location.status}</MenuItem> 
                              ))} 
                          </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2} >
                    <FormControl variant="outlined" margin="dense" fullWidth>
                    <InputLabel
                            ref={ref => {
                              this.InputLabelRef = ref;
                            }}
                             htmlFor="t"
                          >
                              Tumor
                          </InputLabel>
                    <Select
                        value={this.props.primary_tumor.t}
                        onChange={this.props.handleChange}
                        input={
                        <OutlinedInput
                            value={this.props.primary_tumor.t}
                            name="t"
                            id="t"
                            labelWidth={this.state.labelWidth}
                        />
                        }
                    >
                        {this.props.dropdownOptions.t.map(t => (
                            <MenuItem key={t.id} value={t.status}>{t.name}</MenuItem> 
                        ))} 
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                <FormControl variant="outlined" margin="dense" fullWidth>
                      <InputLabel 
                              htmlFor="n-input"
                              ref={ref => {
                                this.InputLabelRef = ref;
                              }}
                          >
                              Node
                          </InputLabel>
                    <Select
                        value={this.props.primary_tumor.n}
                        onChange={this.props.handleChange}
                        input={
                        <OutlinedInput
                            value={this.props.primary_tumor.n}
                            name="n"
                            id="n-input"
                            labelWidth={this.state.labelWidth}
                        />
                        }
                    >
                        {this.props.dropdownOptions.n.map(n => (
                            <MenuItem key={n.id} value={n.status}>{n.name}</MenuItem> 
                        ))} 
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                <FormControl variant="outlined" margin="dense" fullWidth>
                    <InputLabel 
                              htmlFor="m"
                              ref={ref => {
                                this.InputLabelRef = ref;
                              }}
                          >
                              Metastasis
                          </InputLabel>
                    <Select
                        value={this.props.primary_tumor.m}
                        onChange={this.props.handleChange}
                        input={
                        <OutlinedInput
                            value={this.props.primary_tumor.m}
                            name="m"
                            id="m-input"
                            labelWidth={this.state.labelWidth}
                        />
                        }
                    >
                        {this.props.dropdownOptions.m.map(m => (
                            <MenuItem key={m.id} value={m.status}>{m.name}</MenuItem> 
                        ))} 
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={24}>
            <Grid item xs={4}>
                <FormControl variant="outlined" margin="dense" fullWidth>
                    <InputLabel 
                              htmlFor="m_location"
                              ref={ref => {
                                this.InputLabelRef = ref;
                              }}
                          >
                              Metastasis Location
                          </InputLabel>
                          <Select
                              value={this.props.primary_tumor.m_location}
                              onChange={this.props.handleChange}
                              input={
                              <OutlinedInput
                                  value={this.props.primary_tumor.m_location}
                                  name="m_location"
                                  id="primary-location"
                                  labelWidth={this.state.labelWidth}
                              />
                              }
                          >
                              <MenuItem value="">
                                  <em>None</em>
                              </MenuItem>
                              {this.props.dropdownOptions.mLocationOptions.map(location => (
                                  <MenuItem key={location.id} value={location.id}>{location.status}</MenuItem> 
                              ))} 
                          </Select>
                    </FormControl>
            </Grid>
            <Grid item xs={4} className={classes.gridItem}>
                        <FormControl variant="outlined" fullWidth="true" margin="dense" >
                        <InputLabel 
                              htmlFor="differentiation"
                              ref={ref => {
                                this.InputLabelRef = ref;
                              }}
                          >
                              Differentiation
                          </InputLabel>                            
                            <Select
                                value={this.props.primary_tumor.differentiation}
                                onChange={this.props.handleChange}
                                input={
                                <OutlinedInput
                                    value={this.props.primary_tumor.differentiation}
                                    name="differentiation"
                                    id="differentiation"
                                    labelWidth={this.state.labelWidth}
                                />
                                }
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {this.props.dropdownOptions.differentiationOptions.map(dif => (
                                    <MenuItem key={dif.id} value={dif.id}>{dif.status}</MenuItem> 
                                ))} 
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Mucinous</FormLabel>
                            <RadioGroup row
                                aria-label="mucinous"
                                name="mucinous"
                                className={classes.group}
                                value={this.props.primary_tumor.mucinous}
                                onChange={this.props.handleChange}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                                <FormControlLabel value="2" control={<Radio />} label="No" />
                                <FormControlLabel value="3" control={<Radio />} label="Unknown" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
        )
    }
  
};
const mapStateToProps = reduxState => ({
    dropdownOptions: reduxState.dropdownOptions,
});
export default connect(mapStateToProps) (withStyles(styles)(PrimaryTumorDetails))