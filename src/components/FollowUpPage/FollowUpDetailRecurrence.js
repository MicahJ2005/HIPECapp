import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Modality from './Modality';
import Location from './Location';
import SystemicLocation from './SystemicLocation';
import FollowUpDetailTreatment from './FollowUpDetailTreatment';
import Status from './Status';
import moment from 'moment';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    expanded: {
      backgroundColor: '#cccccc',
      minHeight: 0,
      marginTop: 0,
      marginBottom: 0,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    group: {
        flexDirection: 'row',
    }
});

class FollowUpDetailRecurrence extends Component {
    
    render() {
        const { classes } = this.props;
        
        return(
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <h3>Recurrence Information</h3>
            </Grid>
            <Grid item xs={3}>
              <TextField 
                label="Date of Recurrence"
                type="date"
                fullWidth="true"
                variant="outlined"
                margin="dense"
                onChange={this.props.handleChange}
                name="date"
                value={moment(this.props.recurrence.date).format('YYYY-MM-DD')}
              />
            </Grid>
            <Grid item xs={3}>
            <TextField
                name="cea"
                label="CEA"
                className={classes.textField}
                value={this.props.recurrence.cea}
                fullWidth
                onChange={this.props.handleChange}
                margin="dense"
                variant="outlined"
                />
            </Grid>
            <Grid item xs={3}>
              <Modality recurrence={this.props.recurrence} 
                            handleChange={this.props.handleChange}
                            handleChangeCheckbox={this.props.handleChangeCheckbox}/>
            </Grid>
            <Grid item xs={12}>
                Treatment
            </Grid>
            <Grid item xs={3}>
              <TextField 
                  margin="dense"
                  label="Treatment Date"
                  variant="outlined"
                  type="date"
                  fullWidth="true"
                  onChange={this.props.handleChange}
                  name="date_treatment"
                  value={moment(this.props.recurrence.date_treatment).format('YYYY-MM-DD')}
                />
            </Grid>
            <Grid item xs={3}>
              <Location recurrence={this.props.recurrence} 
                            handleChange={this.props.handleChange}
                            handleChangeCheckbox={this.props.handleChangeCheckbox}/>
            </Grid>
            <Grid item xs={3}>
              <SystemicLocation recurrence={this.props.recurrence} 
                            handleChange={this.props.handleChange}
                            handleChangeCheckbox={this.props.handleChangeCheckbox}/>
            </Grid>
            <Grid item xs={3}>
              <FollowUpDetailTreatment recurrence={this.props.recurrence} 
                            handleChange={this.props.handleChange}
                            handleChangeCheckbox={this.props.handleChangeCheckbox}/>
            </Grid>
            <Grid item xs={3}>
              <Status recurrence={this.props.recurrence} 
                            handleChange={this.props.handleChange}
                            handleChangeCheckbox={this.props.handleChangeCheckbox}/>
            </Grid>
            <Grid item xs={9}>
                <TextField shrink
                name="treatment_notes"
                className={classes.textField}
                value={this.props.recurrence.treatment_notes}
                multiline
                rows="4"
                fullWidth
                onChange={this.props.handleChange}
                margin="dense"
                variant="outlined"
                />
            </Grid>
          </Grid>
        )
    }
  
};

export default connect() (withStyles(styles)(FollowUpDetailRecurrence));