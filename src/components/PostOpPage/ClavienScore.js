import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Grid from '@material-ui/core/Grid';
import GridItem from '@material-ui/core/Grid';


const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
  },
});

class ClavienScore extends Component {

  renderOptions() {
    // 
    return this.props.clavienScoreOptions.map((option, i) => {
      return (
        <MenuItem
          key={i}
          value={option.id}>
          {option.score}
        </MenuItem>
      ); // end return
    }); // end map
  } // end renderTagOptions

  render(){
    const { classes } = this.props;
    return (
      <Grid container spacing={12}>
        <GridItem item xs={12}>
          <FormControl  variant="outlined" margin="dense" className={classes.formControl}>
              <Select
                // value={this.props.clavianScore}
                disabled={!this.props.checked}
                id={this.props.id}
                
                input={
                  <OutlinedInput
                    
                      value={this.props.clavienScore}
                      name={this.props.id}
                      id={this.props.id}
                  />
                  }
                onChange={this.props.handleChangeClavienScore}
              >
                {this.renderOptions()}
              </Select> 
          </FormControl>
        </GridItem>
      </Grid>
    )
  } // end return
} // end class TagSelector

const mapReduxStateToProps = (reduxState) => ({
  clavienScoreOptions: reduxState.dropdownOptions.clavienScore
});

export default connect(mapReduxStateToProps)(withStyles(styles)(ClavienScore));