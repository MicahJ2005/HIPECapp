import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ReactDOM from 'react-dom';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const myOptions = [
  {id: 1, val: true, status: 'Yes'},
  {id: 2, val: false, status: 'No'},
  {id: 3, val: null, status: 'Unknown'}
]

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
  },
});

class MortalitySelector extends Component {

  state = {
    labelWidth: 0,
}

componentDidMount() {
    this.setState({
        labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
}

  renderOptions() {
    // 
    return myOptions.map((option, i) => {
      return (
        <MenuItem
          
          key={i}
          value={option.val}>
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
                  shrink htmlFor="hospital_mortality">Hospital Mortality</InputLabel>
          <Select fullWidth={true}
            variant="outlined" 
            value={this.props.hospital_mortality}
            
            input={
              <OutlinedInput
                  value={this.props.hospital_mortality}
                  name="hospital_mortality"
                  id="hospital_mortality"
                  labelWidth={this.state.labelWidth}
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

export default (withStyles(styles)(MortalitySelector));