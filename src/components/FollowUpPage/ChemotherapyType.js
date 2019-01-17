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

class ChemotherapyType extends Component {

  renderOptions() {
    return this.props.adjChemoTypeOptions.map((option, i) => {
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
      <FormControl fullWidth="true" variant="outlined" margin="dense" className={classes.formControl} disabled={this.props.adjuvant_chemo == 2 || this.props.adjuvant_chemo == 3}>
          <InputLabel shrink htmlFor="adjuvant_chemo_type">Chemotherapy Type</InputLabel>
          <Select fullWidth={true}
            name="adjuvant_chemo_type"
            value={this.props.adjuvant_chemo_type}
            input={
              <OutlinedInput
                  value={this.props.adjuvant_chemo_type}
                  name="adjuvant_chemo_type"
                  id="adjuvant_chemo_type"
              />
              }
            onChange={this.props.handleChange}
          >
            {this.renderOptions()}
          </Select> 
      </FormControl>
    )
  } // end return
} // end class TagSelector

const mapReduxStateToProps = (reduxState) => ({
  adjChemoTypeOptions: reduxState.dropdownOptions.adjChemoTypeOptions
});

export default connect(mapReduxStateToProps)(withStyles(styles)(ChemotherapyType));