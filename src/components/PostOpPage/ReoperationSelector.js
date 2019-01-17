import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ReactDOM from 'react-dom';

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

class ReoperationSelector extends Component {

  state = {
    labelWidth: 0,
    reoperation: null,
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
  } // end renderOptions

  render(){
    const { classes } = this.props;

    return (
      <FormControl fullWidth={true} variant="outlined" margin="dense" className={classes.formControl}>
          <InputLabel  
          ref={ref => {
            this.InputLabelRef = ref;
          }}
          shrink htmlFor="reoperation">Reoperation</InputLabel>
          <Select 
             
            name="reoperation"
            value={this.props.reoperation}
            input={
              <OutlinedInput
                  value={this.props.reoperation}
                  name="reoperation"
                  id="reoperation"
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

export default connect()(withStyles(styles)(ReoperationSelector));