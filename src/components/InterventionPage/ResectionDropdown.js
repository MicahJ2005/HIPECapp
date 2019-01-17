import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import GridItem from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
      width: '100%',
      flexGrow: 1,
      marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      
    },
    table: {
        minWidth: 700,
      },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
  });

  

  class ResectionDropdown extends Component {

    render() {
    const { classes } = this.props;
    const myOptions = this.props.resections;

    return (
      <div className={classes.root}>
      <Grid container spacing={12} >
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <GridItem item xs={10} >
              <Typography className={classes.heading}><h3>Resection</h3></Typography>
            </GridItem>
            <GridItem item xs={2} >
              <Typography className={classes.heading}>(click to expand/retract)</Typography>
            </GridItem>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FormGroup row>
              <Grid container spacing={24} >
              {myOptions.map((option, index) => (
                <GridItem item xs={2} >
                    <FormControlLabel
                        control={
                            <Checkbox
                            key={index} 
                            name={option.stateName}
                            checked={this.props.state[option.stateName]}
                            onChange={this.props.handleChangeCheckbox}
                            value={option.status}
                            />
                        }
                        label={option.name}
                    />  
                </GridItem>
              ))
              }
              </Grid>
            </FormGroup>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        </Grid>
      </div>
    )};
  }
  
  ResectionDropdown.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = reduxState => ({
  resections: reduxState.dropdownOptions.resections,
});

export default connect(mapStateToProps) (withStyles(styles)(ResectionDropdown))