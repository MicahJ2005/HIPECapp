import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const myOptions = [
  {id: 1, status: 'Death of Disease'},
  {id: 2, status: 'Alive with Disease'},
  {id: 3, status: 'No Evidence of Disease'},
  {id: 4, status: 'Treatment Related Death'}
];

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    // minWidth: 120,
  },
});

class DischargeStatus extends Component {

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
          shrink htmlFor="status_at_discharge">Discharge Status</InputLabel>
          <Select fullWidth={true}
            label="Discharge Status"
            value={this.props.status_at_discharge}
            input={
              <OutlinedInput
                  value={this.props.status_at_discharge}
                  name="status_at_discharge"
                  id="status_at_discharge"
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

const mapReduxStateToProps = (reduxState) => ({
  dropdownOptions:reduxState
});

export default connect(mapReduxStateToProps) (withStyles(styles)(DischargeStatus));