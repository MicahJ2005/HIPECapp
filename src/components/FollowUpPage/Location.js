import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
  },
});

class Location extends Component {

  renderOptions() {
    // 
    return this.props.recLocationOptions.map((option, i) => {
      return (
        <MenuItem
          key={i}
          value={option.id}>
          {option.status}
        </MenuItem>
      ); // end return
    }); // end map
  } // end renderOptions

  render(){
    const { classes } = this.props;

    return (
      <FormControl fullWidth={true} variant="outlined" margin="dense" className={classes.formControl}>
          <InputLabel shrink htmlFor="location">Location</InputLabel>
          <Select  
            value={this.props.recurrence.location}
            input={
              <OutlinedInput
                  value={this.props.recurrence.location}
                  name="location"
                  id="location"
              />
              }
            onChange={this.props.handleChange}
          >
            {this.renderOptions()}
          </Select> 
      </FormControl>
    )
  } // end return
} // end class Location

const mapReduxStateToProps = (reduxState) => ({
  recLocationOptions: reduxState.dropdownOptions.recLocationOptions
});

export default connect(mapReduxStateToProps)(withStyles(styles)(Location));