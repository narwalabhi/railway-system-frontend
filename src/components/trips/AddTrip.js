import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
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
  tripId: "",
  trainNo: "",
  name: "",
  sourceStationCode: "",
  destinationStationCode: "",
  durationHrs: 0,
  durationMns: 0,
};

function Add(props) {
  const classes = useStyles();
  const { addOrEdit, tripForEdit, setOpen, isAdd} = props;
  const [values, setValues] = useState(initialFValues);
  

  useEffect(() => {
    console.log(tripForEdit);
    if (tripForEdit != null)
      setValues({
        ...tripForEdit,
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
              value={values.sourceStationCode}
              label="From"
              placeholder="Station Code"
              onChange={(event)=>{setValues(prev => {
                console.log(event.target.value);
                return {...prev,sourceStationCode:event.target.value}})}}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              value={values.destinationStationCode}
              id="to-station-code"
              label="To"
              placeholder="Station Code"
              onChange={(event)=>{setValues(prev => {
                console.log(event.target.value);
                return {...prev,destinationStationCode:event.target.value}})}}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              required
              value={values.trainNo}
              id="number"
              label="Train No."
              InputLabelProps={{ shrink: true }}
              onChange={(event)=>setValues(prev => {return {...prev,trainNo:event.target.value}})}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="baseFare"
              label="Base Fare(₹)"
              type="number"
              onChange={(event)=>setValues(prev => {return {...prev,baseFare:event.target.value}})}
              value={values.baseFare}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
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
          <Grid item xs={3}>
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
