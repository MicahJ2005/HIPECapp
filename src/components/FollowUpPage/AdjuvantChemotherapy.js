import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
  },
  group: {
    flexDirection: 'row',
}
});

class AdjuvantChemotherapy extends Component {

  render(){
    const { classes } = this.props;
    const myValue = this.props.adjuvant_chemo + '';

    return (

      <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">Adjuvant Chemotherapy</FormLabel>
          <RadioGroup 
              aria-label="Adjuvant Chemotherapy"
              name="adjuvant_chemo"
              className={classes.group}
              value={myValue}
              onChange={this.props.handleChange}
          >
              <FormControlLabel value='1' control={<Radio />} label="Yes" />
              <FormControlLabel value='2' control={<Radio />} label="No" />
              <FormControlLabel value='3' control={<Radio />} label="Unknown" />
          </RadioGroup>
      </FormControl>
    )
  } // end return
} // end class TagSelector

export default (withStyles(styles)(AdjuvantChemotherapy));