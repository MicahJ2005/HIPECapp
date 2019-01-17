import React from 'react'
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';


const rows = [
  { label: 'ID' },
  { label: 'First Name' },
  { label: 'Last Name' },
  { label: 'Active' },
  { label: 'Access Level' },
  { label: 'Edit' },
];



class EnhancedTableHead extends React.Component {

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow padding="checkbox">
          
          {rows.map(row => {
            return (
              <TableCell
                
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding="default"
                sortDirection={orderBy === row.id ? order : false}
              >
               
                  <TableSortLabel
                    
                    active={orderBy === row.id}
                    direction={order}
                  >
                    {row.label}
                  </TableSortLabel>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
          <Typography variant="h6" id="tableTitle">
            Current Users
          </Typography>
      </div>
      <div className={classes.spacer} />
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'ID',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
    open: false,
    userId: '',
    title: '',
    firstName:'',
    lastName: '', 
    accessLevel: '',
    active: '',
    // username: '', 
    // password: '',
    
  };

  componentDidMount(){
    this.props.dispatch({ type: 'RENDER_ALL_USERS' })
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };


  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleClickOpen = (n) => {
    console.log('in handleClickOpen profile', n);
    this.setState({
        userId: n.id,
        title: n.title,
        firstName: n.first_name,
        lastName: n.last_name, 
        accessLevel: n.access_level,
        active: n.active,
        // username: n.username, 
        // password: n.password,
        open: true,
    })
  };

  editProfile = () => {
    this.setState({ open: false });
    this.props.dispatch({
      type: 'EDIT_INDIVIDUAL_USER', payload: {
        userId: this.state.userId,  
        title: this.state.title,
        firstName: this.state.firstName,
        lastName: this.state.lastName, 
        accessLevel: this.state.accessLevel,
        active: this.state.active,
        // username: this.state.username, 
        // password: this.state.password,
      }
    })
    swal("Success!", "Profile is Updated!", "success");
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
    
      <Paper className={classes.root}>
        
        
        {this.props.reduxState.individualUserReducer[0] == null ? (
            <div>
            <EnhancedTableToolbar numSelected={selected.length} />
            <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {this.props.reduxState.allUsersReducer.map(n => {
                  return (
                    <TableRow
                      key={n.id}
                      
                    >
                
                      <TableCell component="th" scope="row" padding="default">
                        {n.id}
                      </TableCell>
                      <TableCell align="right">{n.first_name}</TableCell>
                      <TableCell align="right">{n.last_name}</TableCell>
                      {n.active === true ? (
                          <TableCell align="right"><p>Active</p></TableCell>
                      ):(
                        <TableCell align="right"><p>Inactive</p></TableCell>
                      )
                      }
                      
                      <TableCell align="right">{n.access_level}</TableCell>
                      <TableCell><Button variant="contained" color="primary" component="span" className={classes.button} onClick={() => this.handleClickOpen(n)}>Edit</Button></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
          </div>
        ) : ( 
            <div>
            <EnhancedTableToolbar numSelected={selected.length} />
            <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {this.props.reduxState.individualUserReducer.map(n => {
                  return (
                    <TableRow
                      key={n.id}
                      
                    >
                      
                      <TableCell component="th" scope="row" padding="default">
                        {n.id}
                      </TableCell>
                      <TableCell align="right">{n.first_name}</TableCell>
                      <TableCell align="right">{n.last_name}</TableCell>
                      {n.active === true ? (
                          <TableCell align="right"><p>Active</p></TableCell>
                      ):(
                        <TableCell align="right"><p>Inactive</p></TableCell>
                      )
                      }
                      
                      <TableCell align="right">{n.access_level}</TableCell>
                      <TableCell><Button variant="outlined" onClick={() => this.handleClickOpen(n)}>Edit</Button></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
          </div>
        )
    }
         
{/* // Conditionally rendered form */}
        <div>
          <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit User Profile</DialogTitle>
          <DialogContent>
                <FormControl variant="outlined" margin="normal" className={classes.formControl}>
                            <InputLabel
                                ref={ref => {
                                this.InputLabelRef = ref;
                                }}
                                htmlFor="outlined-age-native-simple"
                            >
                                Title
                            </InputLabel>
                                <Select
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                    input={
                                    <OutlinedInput
                                        name="title"
                                        labelWidth={this.state.labelWidth}
                                        id="outlined-age-native-simple"
                                    />
                                    }
                                >
                                    <MenuItem value="None">None</MenuItem>
                                    <MenuItem value="Dr.">Dr.</MenuItem>
                                    <MenuItem value="Mr.">Mr.</MenuItem>
                                    <MenuItem value="Mrs.">Mrs.</MenuItem>
                                    <MenuItem value="Miss">Miss</MenuItem>
                                </Select>
                            </FormControl>
          </DialogContent>
          <DialogContent>
            <TextField
              onChange={this.handleChange}
              value={this.state.firstName}
              name="firstName"
              autoFocus
              margin="dense"
              id="firstName"
              label="Update First Name"
              type="text"
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogContent>
            <TextField
              onChange={this.handleChange}
              value={this.state.lastName}
              name="lastName"
              autoFocus
              margin="dense"
              id="lastName"
              label="Update Last Name"
              type="text"
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogContent>
          <FormControl variant="outlined" margin="normal" className={classes.formControl}>
                            <InputLabel
                                ref={ref => {
                                this.InputLabelRef = ref;
                                }}
                                htmlFor="outlined-age-native-simple"
                            >
                                User Role
                            </InputLabel>
                                <Select
                                    value={this.state.accessLevel}
                                    onChange={this.handleChange}
                                    input={
                                    <OutlinedInput
                                        name="accessLevel"
                                        labelWidth={this.state.labelWidth}
                                        id="outlined-age-native-simple"
                                    />
                                    }
                                >
                                    <MenuItem value="3">Admin</MenuItem>
                                    <MenuItem value="2">Surgeon</MenuItem>
                                    <MenuItem value="1">Researcher</MenuItem>
                                </Select>
                        </FormControl> 
          
          </DialogContent>
          <DialogContent>
          <FormControl variant="outlined" margin="normal" className={classes.formControl}>
                            <InputLabel
                                ref={ref => {
                                this.InputLabelRef = ref;
                                }}
                                htmlFor="outlined-age-native-simple"
                            >
                                Active User?
                            </InputLabel>
                                <Select
                                    value={this.state.active}
                                    onChange={this.handleChange}
                                    input={
                                    <OutlinedInput
                                        name="active"
                                        labelWidth={this.state.labelWidth}
                                        id="outlined-age-native-simple"
                                    />
                                    }
                                >
                                    <MenuItem value={true}>True</MenuItem>
                                    <MenuItem value={false}>False</MenuItem>
                                </Select>
                        </FormControl>
          </DialogContent>
          {/* <DialogContent>
            <TextField
              onChange={this.handleChange}
              value={this.state.username}
              name="username"
              autoFocus
              margin="dense"
              id="username"
              label="Update Username"
              type="text"
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogContent>
            <TextField
              onChange={this.handleChange}
              value={this.state.password}
              name="password"
              autoFocus
              margin="dense"
              id="password"
              label="Update Password"
              type="password"
              fullWidth
              variant="outlined"
            />
          </DialogContent> */}

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.editProfile()} color="primary">
              Complete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
   
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps) (withStyles(styles)(EnhancedTable))
