import React, { Component } from 'react'
import { connect } from 'react-redux';
import ResectionDropdown from '../InterventionPage/ResectionDropdown';
import AdditionalPageInfo from '../InterventionPage/AdditionalPageInfo';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import GridItem from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactDOM from 'react-dom';

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

  const lesionSizeScore = [
    { option: 'LS 0 No Tumor Seen', score: 0 },
    { option: 'LS 1 Tumor up to 0.5cm', score: 1 },
    { option: 'LS 2 Tumor up to 5.0cm', score: 2 },
    { option: 'LS 3 Tumor > 5.0cm or confluence', score: 3 },
  ];


  class InterventionPage extends Component {
    state = {
        changesMade: false,
        central: 0,
        rightUpper: 0,
        Epigastrium: 0,
        leftUpper:0,
        leftFlank:0,
        leftLower:0,
        pelvisPCI:0,
        rightLower:0,
        rightFlank:0,
        upperJejunum:0,
        lowerJejunum:0,
        upperIlium:0,
        lowerIlium:0,
        PCITotal:0,
        surgeonOne: '',
        surgeonTwo:'',
        surgeonThree: '',
        nrHipec: '',
        hipecType:'',
        reasonOC:'',
        expanded1: true,
        expanded2: false,
        ///additionalPageInfo from here down
        checked: '',
        anastomosis: false ,
        AnastomosisNumber:'', 
        revisionStoma: false,
        stomaType:'',
        bloodLoss:'',
        volume: '',
        hipecRegiment: '',
        bloodLossTime: '',
        concentration: '',
        rScore: '',
        duration: '',
        stomaPostHIPEC: false, 
        StomaPostHIPECType: '',
        ///ResectionDropdown from here down
        interventionId: '',
        ovaries: false,
        uterus: false,
        omentum:false,
        rectum:false,
        sigmoid:false,
        left_colon:false,
        transverse_colon:false,
        right_colon:false,
        ileocaecal: false,
        appendix:false,
        duodenum:false,
        jejunum: false,
        ileum:false,
        gallbladder: false,
        stomach: false,
        spleen:false,
        diagphram_l:false,
        diagphram_r:false,
        pancreas:false,
        bladder:false,
        urether:false,
        lymphnodes:false,
        left_peritoneum:false,
        right_peritoneum:false,
        peritoneum:false,
        pelvis:false,
        labelWidth: 0,
    }

    componentDidMount(){
        {this.props.intervention !== undefined ? 
        (
            this.setState({
                changesMade: false,
                central: this.props.intervention.pci_0,
                rightUpper: this.props.intervention.pci_1,
                Epigastrium: this.props.intervention.pci_2,
                leftUpper: this.props.intervention.pci_3,
                leftFlank: this.props.intervention.pci_4,
                leftLower: this.props.intervention.pci_5,
                pelvisPCI: this.props.intervention.pci_6,
                rightLower: this.props.intervention.pci_7,
                rightFlank: this.props.intervention.pci_8,
                upperJejunum: this.props.intervention.pci_9,
                lowerJejunum: this.props.intervention.pci_10,
                upperIlium: this.props.intervention.pci_11,
                lowerIlium: this.props.intervention.pci_12,
                PCITotal: this.props.intervention.pci_score,
                surgeonOne: this.props.intervention.surgeon_1,
                surgeonTwo:this.props.intervention.surgeon_2,
                surgeonThree: this.props.intervention.surgeon_3,
                nrHipec: this.props.intervention.nrhipec,
                hipecType: this.props.intervention.hipec_type,
                reasonOC:this.props.intervention.reason_oc,
                anastomosis: this.props.intervention.anastomosis ,
                AnastomosisNumber: this.props.intervention.anastomosis_number , 
                revisionStoma: this.props.intervention.revision_stoma ,
                stomaType: this.props.intervention.stoma_post_hipec_type ,
                bloodLoss: this.props.intervention.bloodloss ,
                volume: this.props.intervention.volume ,
                hipecRegiment: this.props.intervention.hipec_regiment ,
                bloodLossTime: this.props.intervention.time,
                concentration: this.props.intervention.concentration,
                rScore: this.props.intervention.r_score,
                duration: this.props.intervention.duration,
                stomaPostHIPEC: this.props.intervention.stoma_post_hipec, 
                ovaries: this.props.intervention.ovaries,
                uterus: this.props.intervention.uterus,
                omentum:this.props.intervention.omentum,
                rectum:this.props.intervention.rectum ,
                sigmoid:this.props.intervention.sigmoid,
                left_colon:this.props.intervention.left_colon,
                transverse_colon:this.props.intervention.transverse_colon,
                right_colon:this.props.intervention.right_colon,
                ileocaecal: this.props.intervention.ileocaecal,
                appendix:this.props.intervention.appendix,
                duodenum:this.props.intervention.duodenum,
                jejunum: this.props.intervention.jejunum,
                ileum:this.props.intervention.ileum,
                gallbladder: this.props.intervention.gallbladder,
                stomach: this.props.intervention.stomach,
                spleen:this.props.intervention.spleen,
                diagphram_l:this.props.intervention.diagphram_l,
                diagphram_r:this.props.intervention.diagphram_r,
                pancreas:this.props.intervention.pancreas,
                bladder:this.props.intervention.bladder,
                urether:this.props.intervention.urether,
                lymphnodes:this.props.intervention.lymphnodes,
                left_peritoneum:this.props.intervention.left_peritoneum,
                right_peritoneum:this.props.intervention.right_peritoneum,
                peritoneum:this.props.intervention.peritoneum,
                pelvis:this.props.intervention.pelvis,
                labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
              
            })
        ):(
        this.setState({
            changesMade: false,
            central: 0,
            rightUpper: 0,
            Epigastrium: 0,
            leftUpper:0,
            leftFlank:0,
            leftLower:0,
            pelvisPCI:0,
            rightLower:0,
            rightFlank:0,
            upperJejunum:0,
            lowerJejunum:0,
            upperIlium:0,
            lowerIlium:0,
            PCITotal:0,
            surgeonOne: '',
            surgeonTwo:'',
            surgeonThree: '',
            nrHipec: '',
            hipecType:'',
            reasonOC:'',
            expanded1: true,
            expanded2: false,
            ///additionalPageInfo from here down
            checked: '',
            anastomosis: false ,
            AnastomosisNumber:'', 
            revisionStoma: false,
            stomaType:'',
            bloodLoss:'',
            volume: '',
            hipecRegiment: '',
            bloodLossTime: '',
            concentration: '',
            rScore: '',
            duration: '',
            stomaPostHIPEC: false, 
            StomaPostHIPECType: '',
            ///ResectionDropdown from here down
            interventionId: '',
            ovaries: false,
            uterus: false,
            omentum:false,
            rectum:false,
            sigmoid:false,
            left_colon:false,
            transverse_colon:false,
            right_colon:false,
            ileocaecal: false,
            appendix:false,
            duodenum:false,
            jejunum: false,
            ileum:false,
            gallbladder: false,
            stomach: false,
            spleen:false,
            diagphram_l:false,
            diagphram_r:false,
            pancreas:false,
            bladder:false,
            urether:false,
            lymphnodes:false,
            left_peritoneum:false,
            right_peritoneum:false,
            peritoneum:false,
            pelvis:false,   
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
            })
        )}
    }

    calculatePCI = () => {
        let PCI;
        let PCI1 = Number(this.state.central);
        let PCI2 = Number(this.state.rightUpper);
        let PCI3 = Number(this.state.Epigastrium);
        let PCI4 = Number(this.state.leftUpper);
        let PCI5 = Number(this.state.leftFlank);
        let PCI6 = Number(this.state.leftLower);
        let PCI7 = Number(this.state.pelvisPCI);
        let PCI8 = Number(this.state.rightLower);
        let PCI9 = Number(this.state.rightFlank);
        let PCI10 = Number(this.state.upperJejunum);
        let PCI11 = Number(this.state.lowerJejunum);
        let PCI12 = Number(this.state.upperIlium);
        let PCI13 = Number(this.state.lowerIlium);
        PCI = PCI1 + PCI2 + PCI3 + PCI4 + PCI5 + PCI6 + PCI7 + PCI8 + PCI9 + PCI10 + PCI11 + PCI12 + PCI13

        this.setState({
            changesMade: true,
            PCITotal: PCI
        })
    }

    handlePCIChange = (event) => {
        this.setState({
            ...this.state,
            changesMade: true,
            [event.target.name]: event.target.value,
        },
        this.calculatePCI);
      }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            changesMade: true,
            [event.target.name]: event.target.value,
        })
      }

    expansionPanel1 = () => {
        this.setState({
            expanded1: true
        })
    }

    expansionPanel2 = () => {
        this.setState({
            expanded2: !true
        })
    }

    saveForm = () => {
        if (this.state.changesMade){ 
        confirmAlert({
          title: 'Save Intervention Form',
          message: 'Do you want to save Intervention Form?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.props.dispatch({ type: 'POST_INTERVENTION_PAGE', 
              payload: {
                  interventionState: this.state,
                  userId: this.props.patient.patient.id
              }
               })
            },
            {
              label: 'No',
              onClick: () => alert('Form not submitted')
            }
          ]
        })
        }
        this.setState({
            changesMade: false,
        })
    }
    
    handleChangeCheckbox = (event) => {
        this.setState({
            ...this.state,
            changesMade: true,
            [event.target.name]: event.target.checked,
        });
      }

    componentWillUnmount () {
        this.saveForm();
    }

    render() {
    const { classes } = this.props;
    return (
        
      <div className={classes.root}>
        <Grid container spacing={12} >
            <ExpansionPanel defaultExpanded onClick={this.expansionPanel1} >
            
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <GridItem item xs={5} >
                    <Typography className={classes.heading}><h4>Peritoneal Cancer Index (PCI)</h4></Typography>
                </GridItem>
                <GridItem item xs={5} >
                    <Typography className={classes.heading}><h1>PCI: {this.state.PCITotal}</h1></Typography>
                </GridItem>
                <GridItem item xs={2} >
                    <Typography className={classes.heading}>(click to expand/retract)</Typography>
                </GridItem>
            </ExpansionPanelSummary>
            
            <ExpansionPanelDetails>
                <Grid container spacing={24} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Region Number</TableCell>
                                    <TableCell>Region Name</TableCell>
                                    <TableCell>Lesion Size/Score</TableCell>
                                </TableRow>
                            </TableHead>
                                <TableBody>
                                        <TableRow >
                                            <TableCell>
                                                0
                                            </TableCell>
                                            <TableCell>
                                                Central
                                            </TableCell>
                                            <TableCell>
                                                <Select 
                                                    fullWidth={true}
                                                    value={this.state.central}
                                                    onChange={this.handlePCIChange}
                                                    input={
                                                    <OutlinedInput
                                                        value={this.state.central}
                                                        name="central"
                                                        id="central"
                                                    />
                                                    }
                                                >
                                                    {lesionSizeScore.map( score => {
                                                        return(
                                                            <MenuItem key={score.index} value={score.score} >{score.option}</MenuItem>
                                                        )
                                                    })}
                                                    
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell>
                                                1
                                            </TableCell>
                                            <TableCell>
                                            Right Upper
                                            </TableCell>
                                            <TableCell>
                                                <Select 
                                                    fullWidth={true}
                                                    value={this.state.rightUpper}
                                                    onChange={this.handlePCIChange}
                                                    input={
                                                    <OutlinedInput
                                                        value={this.state.rightUpper}
                                                        name="rightUpper"
                                                        id="rightUpper"
                                                    />
                                                    }
                                                >
                                                    {lesionSizeScore.map( score => {
                                                        return(
                                                            <MenuItem key={score.index} value={score.score} >{score.option}</MenuItem>
                                                        )
                                                    })}
                                                    
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell>
                                                2
                                            </TableCell>
                                            <TableCell>
                                            Epigastrium
                                            </TableCell>
                                            <TableCell>
                                                <Select 
                                                    fullWidth={true}
                                                    value={this.state.Epigastrium}
                                                    onChange={this.handlePCIChange}
                                                    input={
                                                    <OutlinedInput
                                                        value={this.state.Epigastrium}
                                                        name="Epigastrium"
                                                        id="Epigastrium"
                                                    />
                                                    }
                                                >
                                                    {lesionSizeScore.map( score => {
                                                        return(
                                                            <MenuItem key={score.index} value={score.score} >{score.option}</MenuItem>
                                                        )
                                                    })}
                                                    
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell>
                                                3
                                            </TableCell>
                                            <TableCell>
                                            Left Upper
                                            </TableCell>
                                            <TableCell>
                                                <Select 
                                                    fullWidth={true}
                                                    value={this.state.leftUpper}
                                                    onChange={this.handlePCIChange}
                                                    input={
                                                    <OutlinedInput
                                                        value={this.state.leftUpper}
                                                        name="leftUpper"
                                                        id="leftUpper"
                                                    />
                                                    }
                                                >
                                                    {lesionSizeScore.map( score => {
                                                        return(
                                                            <MenuItem key={score.index} value={score.score} >{score.option}</MenuItem>
                                                        )
                                                    })}
                                                    
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell>
                                                4
                                            </TableCell>
                                            <TableCell>
                                            Left Flank
                                            </TableCell>
                                            <TableCell>
                                                <Select 
                                                    fullWidth={true}
                                                    value={this.state.leftFlank}
                                                    onChange={this.handlePCIChange}
                                                    input={
                                                    <OutlinedInput
                                                        value={this.state.leftFlank}
                                                        name="leftFlank"
                                                        id="leftFlank"
                                                    />
                                                    }
                                                >
                                                    {lesionSizeScore.map( score => {
                                                        return(
                                                            <MenuItem key={score.index} value={score.score} >{score.option}</MenuItem>
                                                        )
                                                    })}
                                                    
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell>
                                                5
                                            </TableCell>
                                            <TableCell>
                                            Left Lower
                                            </TableCell>
                                            <TableCell>
                                                <Select 
                                                    fullWidth={true}
                                                    value={this.state.leftLower}
                                                    onChange={this.handlePCIChange}
                                                    input={
                                                    <OutlinedInput
                                                        value={this.state.leftLower}
                                                        name="leftLower"
                                                        id="leftLower"
                                                    />
                                                    }
                                                >
                                                    {lesionSizeScore.map( score => {
                                                        return(
                                                            <MenuItem key={score.index} value={score.score} >{score.option}</MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell>
                                                6
                                            </TableCell>
                                            <TableCell>
                                            Pelvis
                                            </TableCell>
                                            <TableCell>
                                                <Select 
                                                    fullWidth={true}
                                                    value={this.state.pelvisPCI}
                                                    onChange={this.handlePCIChange}
                                                    input={
                                                    <OutlinedInput
                                                        value={this.state.pelvisPCI}
                                                        name="pelvisPCI"
                                                        id="pelvisPCI"
                                                    />
                                                    }
                                                >
                                                    {lesionSizeScore.map( score => {
                                                        return(
                                                            <MenuItem key={score.index} value={score.score} >{score.option}</MenuItem>
                                                        )
                                                    })}
                                                    
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell>
                                                7
                                            </TableCell>
                                            <TableCell>
                                            Right Lower
                                            </TableCell>
                                            <TableCell>
                                                <Select 
                                                    fullWidth={true}
                                                    value={this.state.rightLower}
                                                    onChange={this.handlePCIChange}
                                                    input={
                                                    <OutlinedInput
                                                        value={this.state.rightLower}
                                                        name="rightLower"
                                                        id="rightLower"
                                                    />
                                                    }
                                                >
                                                    {lesionSizeScore.map( score => {
                                                        return(
                                                            <MenuItem key={score.index} value={score.score} >{score.option}</MenuItem>
                                                        )
                                                    })}
                                                    
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell>
                                                8
                                            </TableCell>
                                            <TableCell>
                                            Right Flank
                                            </TableCell>
                                            <TableCell>
                                                <Select 
                                                    fullWidth={true}
                                                    value={this.state.rightFlank}
                                                    onChange={this.handlePCIChange}
                                                    input={
                                                    <OutlinedInput
                                                        value={this.state.rightFlank}
                                                        name="rightFlank"
                                                        id="rightFlank"
                                                    />
                                                    }
                                                >
                                                    {lesionSizeScore.map( score => {
                                                        return(
                                                            <MenuItem key={score.index} value={score.score} >{score.option}</MenuItem>
                                                        )
                                                    })}
                                                    
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell>
                                                9
                                            </TableCell>
                                            <TableCell>
                                            Upper Jejunum
                                            </TableCell>
                                            <TableCell>
                                                <Select 
                                                    fullWidth={true}
                                                    value={this.state.upperJejunum}
                                                    onChange={this.handlePCIChange}
                                                    input={
                                                    <OutlinedInput
                                                        value={this.state.upperJejunum}
                                                        name="upperJejunum"
                                                        id="upperJejunum"
                                                    />
                                                    }
                                                >
                                                    {lesionSizeScore.map( score => {
                                                        return(
                                                            <MenuItem key={score.index} value={score.score} >{score.option}</MenuItem>
                                                        )
                                                    })}
                                                    
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell>
                                                10
                                            </TableCell>
                                            <TableCell>
                                            Lower Jejunum
                                            </TableCell>
                                            <TableCell>
                                                <Select 
                                                    fullWidth={true}
                                                    value={this.state.lowerJejunum}
                                                    onChange={this.handlePCIChange}
                                                    input={
                                                    <OutlinedInput
                                                        value={this.state.lowerJejunum}
                                                        name="lowerJejunum"
                                                        id="lowerJejunum"
                                                    />
                                                    }
                                                >
                                                    {lesionSizeScore.map( score => {
                                                        return(
                                                            <MenuItem key={score.index} value={score.score} >{score.option}</MenuItem>
                                                        )
                                                    })}
                                                    
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell>
                                                11
                                            </TableCell>
                                            <TableCell>
                                            Upper Ilium
                                            </TableCell>
                                            <TableCell>
                                                <Select 
                                                    fullWidth={true}
                                                    value={this.state.upperIlium}
                                                    onChange={this.handlePCIChange}
                                                    input={
                                                    <OutlinedInput
                                                        value={this.state.upperIlium}
                                                        name="upperIlium"
                                                        id="upperIlium"
                                                    />
                                                    }
                                                >
                                                    {lesionSizeScore.map( score => {
                                                        return(
                                                            <MenuItem key={score.index} value={score.score} >{score.option}</MenuItem>
                                                        )
                                                    })}
                                                    
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell>
                                                12
                                            </TableCell>
                                            <TableCell>
                                            Lower Ilium
                                            </TableCell>
                                            <TableCell>
                                                <Select 
                                                    fullWidth={true}
                                                    value={this.state.lowerIlium}
                                                    onChange={this.handlePCIChange}
                                                    input={
                                                    <OutlinedInput
                                                        value={this.state.lowerIlium}
                                                        name="lowerIlium"
                                                        id="lowerIlium"
                                                    />
                                                    }
                                                >
                                                    {lesionSizeScore.map( score => {
                                                        return(
                                                            <MenuItem key={score.index} value={score.score} >{score.option}</MenuItem>
                                                        )
                                                    })}
                                                    
                                                </Select>
                                        </TableCell>
                                    </TableRow>
                            </TableBody>
                        </Table>
                </Grid>
                <Grid  container spacing={24}>
                        <img alt="bodyImage" height="650" width="750" src="images/bodyImage.png"/>
                        <GridItem item xs={4} sm={4}>
                                <DialogContent >
                                    <TextField
                                    onChange={this.handleChange}
                                    value={this.state.surgeonOne}
                                    name="surgeonOne"
                                    margin="dense"
                                    id="surgeonOne"
                                    label="Surgeon 1"
                                    type="text"
                                    variant="outlined"
                                    />
                                </DialogContent>
                        </GridItem>
                        <GridItem item xs={4} sm={4}>
                                <DialogContent >
                                    <TextField
                                    onChange={this.handleChange}
                                    value={this.state.surgeonTwo}
                                    name="surgeonTwo"
                                    margin="dense"
                                    id="surgeonTwo"
                                    label="Surgeon 2"
                                    type="text"
                                    variant="outlined"
                                    />
                                </DialogContent>
                        </GridItem>
                        <GridItem item xs={4} sm={4}>
                                <DialogContent >
                                    <TextField
                                    onChange={this.handleChange}
                                    value={this.state.surgeonThree}
                                    name="surgeonThree"
                                    margin="dense"
                                    id="surgeonThree"
                                    label="Surgeon 3"
                                    type="text"
                                    variant="outlined"
                                    />
                                </DialogContent>
                        </GridItem>
                        <GridItem item xs={4} sm={4}>
                                <DialogContent >
                                    <TextField
                                    onChange={this.handleChange}
                                    value={this.state.nrHipec}
                                    name="nrHipec"
                                    margin="dense"
                                    id="nrHipec"
                                    label="Nr HIPEC"
                                    type="text"
                                    variant="outlined"
                                    />
                                </DialogContent>
                        </GridItem>
                        <GridItem item xs={4} sm={4}>
                            <DialogContent >
                                <FormControl fullWidth={true} variant="outlined" margin="dense" className={classes.formControl}>
                                        <InputLabel
                                            htmlFor="hipecType"
                                            ref={ref => {
                                                this.InputLabelRef = ref;
                                              }}
                                        >
                                            HIPEC Type
                                        </InputLabel>
                                        <Select
                                            value={this.state.hipecType}
                                            onChange={this.handleChange}
                                            input={
                                            <OutlinedInput
                                                value={this.state.hipecType}
                                                name="hipecType"
                                                id="hipecType"
                                                labelWidth={this.state.labelWidth}
                                            />
                                            }
                                        >
                                            {this.props.hipecTypeOptions.map( option => {
                                                return(
                                                    <MenuItem key={option.index} value={option.id}>{option.status}</MenuItem>
                                                )
                                                
                                            })}
                                            
                                        </Select>
                                    </FormControl>
                                </DialogContent>
                        </GridItem>
                        <GridItem item xs={4} sm={4}>
                                <DialogContent >
                                    <FormControl fullWidth={true} variant="outlined" margin="dense" className={classes.formControl}>
                                        <InputLabel
                                            htmlFor="reasonOC"
                                            ref={ref => {
                                                this.InputLabelRef = ref;
                                              }}
                                        >
                                            Reason O/C
                                        </InputLabel>
                                        <Select
                                            value={this.state.reasonOC}
                                            onChange={this.handleChange}
                                            input={
                                            <OutlinedInput
                                                name="reasonOC"
                                                fullWidth
                                                id="reasonOC"
                                                labelWidth={this.state.labelWidth}
                                            />
                                            }
                                        >
                                        {this.props.reasonOpenCloseOption.map( option => {
                                                return(
                                                    <MenuItem key={option.index} value={option.id}>{option.status}</MenuItem>
                                                )
                                                
                                            })}
                                        </Select>
                                    </FormControl>
                                </DialogContent>
                        </GridItem>
                    </Grid>                    
            </ExpansionPanelDetails>
            </ExpansionPanel>
        </Grid> 

        <ResectionDropdown state={this.state} handleChange={this.handleChange} expansionPanel2={this.expansionPanel2} handleChangeCheckbox={this.handleChangeCheckbox}/>
        <AdditionalPageInfo state={this.state} handleChange={this.handleChange} handleChangeCheckbox={this.handleChangeCheckbox}/>
        <Button variant="contained" color="primary" onClick={this.saveForm}>Save</Button>
      </div>
    )};
  }

  InterventionPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = reduxState => ({
    intervention: reduxState.pciReducer[0],
    patient: reduxState.patientReducer,
    hipecTypeOptions: reduxState.dropdownOptions.hipecTypeOptions,
    reasonOpenCloseOption: reduxState.dropdownOptions.reasonOpenCloseOption,
});


export default connect(mapStateToProps) (withStyles(styles)(InterventionPage))