import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
    padding: "2%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const initialFValues = {
  id: 0,
  number: "",
  name: "",
  fromStationCode: "",
  toStationCode: "",
  firstAcSeats: 0,
  secondAcSeats: 0,
  thirdAcSeats: 0,
  firstClassSeats: 0,
  chairCarSeats: 0,
  sleeperSeats: 0,
  durationHrs: 0,
  durationMns: 0,
  departure: "",
  arrival: "",
  distance: 0,
};

function Add(props) {
  const classes = useStyles();
  const { addOrEdit, trainForEdit, setOpen, isAdd} = props;
  const [values, setValues] = useState(initialFValues);
  
  const handleArrivalTimeChange = (date) => {
    // const time = (date.getUTCHours() +":" + date.getUTCMinutes() + ":" + date.getUTCSeconds());
    const time = date.toTimeString().split(' ')[0]
    setValues({ arrivalTime: date, arrival : time});
    setValues(prev => {return {...prev,arrivalTime:date, arrival: time}})
  };

  const handleDepartureTimeChange = (date) => {
    console.log(date);
    // const time = (date.getUTCHours() +":" + date.getUTCMinutes() + ":" + date.getUTCSeconds());
    const time =  date.toTimeString().split(' ')[0]
    setValues({departureTime:date, departure: time});
    setValues(prev => {return {...prev,departureTime:date, departure: time}})
  };

  useEffect(() => {
    console.log(trainForEdit);
    if (trainForEdit != null)
      setValues({
        ...trainForEdit,
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrEdit(values, isAdd);
    setOpen(false)
    console.log(values + "submit");
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} className={classes.grid}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              id="from-station-code"
              value={values.fromStationCode}
              label="From"
              placeholder="Station Code"
              onChange={(event)=>{setValues(prev => {
                console.log(event.target.value);
                return {...prev,fromStationCode:event.target.value}})}}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              value={values.toStationCode}
              id="to-station-code"
              label="To"
              placeholder="Station Code"
              onChange={(event)=>{setValues(prev => {
                console.log(event.target.value);
                return {...prev,toStationCode:event.target.value}})}}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              value={values.name}
              id="name"
              label="Train Name"
              InputLabelProps={{ shrink: true }}
              onChange={(event)=>setValues(prev => {return {...prev,name:event.target.value}})}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              value={values.number}
              id="number"
              label="Train Number"
              onChange={(event)=>setValues(prev => {return {...prev,number:event.target.value}})}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          {/* </Grid> */}
          {/* <Grid container spacing={3} className={classes.grid}> */}
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                fullWidth
                margin="normal"
                value={values.departureTime}
                id="departure-time-picker"
                label="Departure Time"
                ampm={false}
                onChange={handleDepartureTimeChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                margin="normal"
                id="arrival-time-picker"
                fullWidth
                ampm={false}
                value={values.arrivalTime}
                label="Arrival Time"
                onChange={handleArrivalTimeChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="distance"
              label="Distance(Km)"
              type="number"
              onChange={(event)=>setValues(prev => {return {...prev,distance:event.target.value}})}
              value={values.distance}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="duration-hrs"
              label="Duration(hrs)"
              type="number"
              onChange={(event)=>setValues(prev => {return {...prev,durationHrs:event.target.value}})}
              value={values.durationHrs}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              onChange={(event)=>setValues(prev => {return {...prev,durationMns:event.target.value}})}
              id="duration-mns"
              label="Duration(mns)"
              type="number"
              value={values.durationMns}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              onChange={(event)=>setValues(prev => {return {...prev,firstAcSeats:event.target.value}})}
              id="1AC"
              label="1AC"
              type="number"
              value={values.firstAcSeats}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              id="2AC"
              onChange={(event)=>setValues(prev => {return {...prev,secondAcSeats:event.target.value}})}
              label="2AC"
              type="number"
              value={values.secondAcSeats}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              id="3AC"
              onChange={(event)=>setValues(prev => {return {...prev,thirdAcSeats:event.target.value}})}
              label="3AC"
              type="number"
              value={values.thirdAcSeats}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              id="CC"
              label="CC"
              onChange={(event)=>setValues(prev => {return {...prev,chairCarSeats:event.target.value}})}
              type="number"
              value={values.chairCarSeats}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              id="FC"
              onChange={(event)=>setValues(prev => {return {...prev,firstClassSeats:event.target.value}})}
              label="FC"
              type="number"
              value={values.firstClassSeats}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              id="SS"
              onChange={(event)=>setValues(prev => {return {...prev,sleeperSeats:event.target.value}})}
              label="SS"
              type="number"
              value={values.sleeperSeats}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Add;
