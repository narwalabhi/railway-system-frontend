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
  firstName:"",
  lastName: "",
  email: "",
  dob: "",
  mobileNumber: "",
  password: "",
  roles: "",
};

function AddUser(props) {
  const classes = useStyles();
  const { addOrEdit, userForEdit, setOpen, isAdd} = props;
  const [values, setValues] = useState(initialFValues);


  useEffect(() => {
    console.log(userForEdit);
    if (userForEdit != null)
      setValues({
        ...userForEdit,
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
              id="firstName"
              value={values.firstName}
              label="FirstName"
              placeholder="First Name"
              onChange={(event)=>{setValues(prev => {
                console.log(event.target.value);
                return {...prev,firstName:event.target.value}})}}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              id="lastName"
              value={values.lastName}
              label="LastName"
              placeholder="Last Name"
              onChange={(event)=>{setValues(prev => {
                console.log(event.target.value);
                return {...prev,lastName:event.target.value}})}}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              value={values.email}
              id="email"
              label="Email"
              placeholder="Email"
              onChange={(event)=>{setValues(prev => {
                console.log(event.target.value);
                return {...prev,email:event.target.value}})}}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              value={values.dob}
              id="dob"
              label="DOB"
              onChange={(event)=>setValues(prev => {return {...prev,dob:event.target.value}})}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              id="mobileNumber"
              label="MobileNumber"
              type="MobileNumber"
              onChange={(event)=>setValues(prev => {return {...prev,mobileNumber:event.target.value}})}
              value={values.mobileNumber}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="password"
              label="Password"
              type="Password"
              onChange={(event)=>setValues(prev => {return {...prev,password:event.target.value}})}
              value={values.password}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="roles"
              label="Roles"
              type="Roles"
              onChange={(event)=>setValues(prev => {return {...prev,roles:event.target.value}})}
              value={values.roles}
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

export default AddUser;