import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FollowUpDetailDetail from './FollowUpDetailDetail';
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
    expasion: {
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
    },
    superCool: {
        backgroundColor: '#eeeeee',
        height: 25,
    }
});


class FollowUpDetail extends Component {

    render() {

        const { classes } = this.props;
        
        return(
            <div>
            {
                this.props.followUpHistory.map((history, index) => (
                    <div key={history.id}>
                         <ExpansionPanel defaultExpanded>
                            <ExpansionPanelSummary className={classes.superCool} expandIcon={<ExpandMoreIcon />}>
                                {history.date ? (<h3>{moment(history.date).format('MM-DD-YYYY')}</h3>) : (<h3>Enter Details</h3>)}
                            </ExpansionPanelSummary>
                            <FollowUpDetailDetail history={history} />
                        </ExpansionPanel>
                    </div>
                ))
            }
            </div>
        )
    }
};

const mapStateToProps = reduxState => ({
    followUpHistory: reduxState.followUpHistory,
});

export default connect(mapStateToProps) (withStyles(styles)(FollowUpDetail));