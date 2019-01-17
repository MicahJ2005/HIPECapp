import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
  },
});

class Modality extends Component {

  renderOptions() {
    // 
    console.log('this.props.recurrence', this.props.recurrence)
    return this.props.recModalityOptions.map((option, i) => {
      return (
        <MenuItem
          key={i}
          value={option.id}>
          {option.status}
        </MenuItem>
      ); // end return
    }); // end map
  } // end renderTagOptions

  render(){
    const { classes } = this.props;

    return (
      <FormControl fullWidth={true} variant="outlined" margin="dense" className={classes.formControl}>
          <InputLabel 
          ref={ref => {
            this.InputLabelRef = ref;
          }}
          shrink htmlFor="rec_modality">Modality</InputLabel>
          <Select  
            value={this.props.recurrence.rec_modality}
            input={
              <OutlinedInput
                  value={this.props.recurrence.rec_modality}
                  name="rec_modality"
                  id="rec_modality"
              />
              }
            onChange={this.props.handleChange}
          >
            {this.renderOptions()}
          </Select> 
      </FormControl>
    )
  } // end return
} // end class Modality

Modality.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapReduxStateToProps = (reduxState) => ({
  recModalityOptions: reduxState.dropdownOptions.recModalityOptions
});

export default connect(mapReduxStateToProps)(withStyles(styles)(Modality));