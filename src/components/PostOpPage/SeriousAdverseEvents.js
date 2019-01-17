import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ClavienScore from './ClavienScore';
import Checkbox from '@material-ui/core/Checkbox';
import GridItem from '@material-ui/core/Grid';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
  },
});

class SeriousAdverseEvent extends Component {

  render(){

    const { classes } = this.props;

    return (
      <FormGroup row>
        <Grid  container spacing={12}>
          
        {
          this.props.adverse_events.map((event, index) => (
            <GridItem item xs={3} key={index}>
                <FormControlLabel
                control={
                    <Checkbox
                    // key={index}
                    name={event.name}
                    checked={this.props.adverse_events[index].checked}
                    onChange={this.props.handleChangeAdverseEvent}
                    value={event.id}
                    />
                }
                label={event.name}
                />
                <ClavienScore checked={event.checked} clavienScore={event.clavien_score} id={event.id}
                  handleChangeClavienScore={this.props.handleChangeClavienScore}/>
                
              </GridItem>
              
          ))
        }
          
        </Grid>
      </FormGroup>
    )
  } // end return
} // end class SeriousAdverseEvent

export default (withStyles(styles)(SeriousAdverseEvent));