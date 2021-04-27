import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  TextField,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
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
  dateGrid: {
    marginTop: "0px",
  },
}));

const initialFValues = {
  id: "",
  tripId: "",
  tripDate: new Date(),
  firstAcAvailableSeats: 0,
  secondAcAvailableSeats: 0,
  thirdAcAvailableSeats: 0,
  firstClassAcAvailableSeats: 0,
  chairCarAcAvailableSeats: 0,
  sleeperAvailableSeats: 0,
  status: "",
};

function AddTripSchedule(props) {
  const classes = useStyles();
  const { addOrEdit, tripScheduleForEdit, setOpen, isAdd } = props;
  const [values, setValues] = useState(initialFValues);

  const handleArrivalTimeChange = (date) => {
    // const time = (date.getUTCHours() +":" + date.getUTCMinutes() + ":" + date.getUTCSeconds());
    const time = date.toTimeString().split(" ")[0];
    // setValues({ arrivalTime: date, arrival : time});
    setValues((prev) => {
      return { ...prev, tripDate: date, arrival: time };
    });
  };

  const handleTripDateChange = (date) => {
    console.log(date);
    // const time = (date.getUTCHours() +":" + date.getUTCMinutes() + ":" + date.getUTCSeconds());

    // setValues({departureTime:date, departure: time});
    setValues((prev) => {
      return { ...prev, tripDate: date };
    });
  };

  useEffect(() => {
    console.log(tripScheduleForEdit);
    if (tripScheduleForEdit != null)
      setValues({
        ...tripScheduleForEdit,
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrEdit(values, isAdd);
    setOpen(false);
    console.log(values + "submit");
  };

  const handleStatusChange = (e) =>{
    setValues((prev) => {
        return { ...prev, status: e.target.value };
      });
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} className={classes.grid}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              id="tripId"
              value={values.tripId}
              label="Trip ID"
              placeholder="Trip Id"
              onChange={(event) => {
                setValues((prev) => {
                  console.log(event.target.value);
                  return { ...prev, tripId: event.target.value };
                });
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.dateGrid}
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                id="tripDate"
                placeholder="YYYY-MM-DD"
                label="Trip Date"
                value={values.tripDate}
                onChange={handleTripDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                InputLabelProps={{ shrink: true }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={4}>
            <InputLabel id="status-input-label">Status</InputLabel>
            <Select
              labelId="Status"
              id="status"
              value={values.status}
              onChange={handleStatusChange}
            >
              <MenuItem value={"active"}>Active</MenuItem>
              <MenuItem value={"cancelled"}>Cancelled</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              onChange={(event) =>
                setValues((prev) => {
                  return { ...prev, firstAcAvailableSeats: event.target.value };
                })
              }
              id="1AC"
              label="1AC"
              type="number"
              value={values.firstAcAvailableSeats}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="2AC"
              onChange={(event) =>
                setValues((prev) => {
                  return { ...prev, secondAcAvailableSeats: event.target.value };
                })
              }
              label="2AC"
              type="number"
              value={values.secondAcAvailableSeats}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="3AC"
              onChange={(event) =>
                setValues((prev) => {
                  return { ...prev, thirdAcAvailableSeats: event.target.value };
                })
              }
              label="3AC"
              type="number"
              value={values.thirdAcAvailableSeats}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="CC"
              label="CC"
              onChange={(event) =>
                setValues((prev) => {
                  return { ...prev, chairCarAcAvailableSeats: event.target.value };
                })
              }
              type="number"
              value={values.chairCarAcAvailableSeats}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="FC"
              onChange={(event) =>
                setValues((prev) => {
                  return { ...prev, firstClassAcAvailableSeats: event.target.value };
                })
              }
              label="FC"
              type="number"
              value={values.firstClassAcAvailableSeats}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="SS"
              onChange={(event) =>
                setValues((prev) => {
                  return { ...prev, sleeperAvailableSeats: event.target.value };
                })
              }
              label="SS"
              type="number"
              value={values.sleeperAvailableSeats}
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

export default AddTripSchedule;
