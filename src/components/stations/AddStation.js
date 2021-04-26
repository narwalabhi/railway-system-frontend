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
  id: "",
  code: "",
  name: "",
  zone: "",
  state: "",
};

function AddStation(props) {
  const classes = useStyles();
  const { addOrEdit, stationForEdit, setOpen, isAdd} = props;
  const [values, setValues] = useState(initialFValues);


  useEffect(() => {
    console.log(stationForEdit);
    if (stationForEdit != null)
      setValues({
        ...stationForEdit,
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
              id="code"
              value={values.code}
              label="Code"
              placeholder="Station Code"
              onChange={(event)=>{setValues(prev => {
                console.log(event.target.value);
                return {...prev,code:event.target.value}})}}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              value={values.name}
              id="name"
              label="Name"
              placeholder="Station Name"
              onChange={(event)=>{setValues(prev => {
                console.log(event.target.value);
                return {...prev,name:event.target.value}})}}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              value={values.zone}
              id="zone"
              label="Train Zone"
              onChange={(event)=>setValues(prev => {return {...prev,zone:event.target.value}})}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              id="state"
              label="State"
              type="State"
              onChange={(event)=>setValues(prev => {return {...prev,state:event.target.value}})}
              value={values.state}
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

export default AddStation;