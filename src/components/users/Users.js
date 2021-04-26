import React, { useState, useEffect } from "react";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import Search from "@material-ui/icons/Search";
import PageHeader from "../pageHeader/PageHeader";
import useTable from "../useTable/useTable";
import Controls from "../controls/Controls";
import Popup from "../controls/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import CardTravelIcon from "@material-ui/icons/CardTravel";
// import AddTrip from './AddTrip'
import PeopleIcon from "@material-ui/icons/People";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Button,
} from "@material-ui/core";
import AddUser from "./AddUser";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "ic", label: "Id" },
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "dob", label: "DOB" },
  { id: "mobile", label: "Mobile" },
  { id: "roles", label: "Roles" },
  { id: "action", label: "Action" },
];

function Users() {
  const classes = useStyles();
  const [userForEdit, setUserForEdit] = useState(null);
  const [trips, setTrips] = useState([]);
  const [isAdd, setIsAdd] = useState(false)
  const [open, setOpen] = useState();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const loadTrips = async () => {
    try {
      const trips = await axios.get("http://localhost:8084/user/getAll", {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmFyd2FsQGdtYWlsLmNvbSIsImV4cCI6MTYxOTQ0NzE3NywiaWF0IjoxNjE5NDExMTc3LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl19.NITXQMra4fmT0iTIIKECVqWZbEfiMYpIREpMv91x-jY",
        },
      });
      setTrips(trips.data);
      console.log(trips.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTrips();
    console.log(open);
  }, []);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(trips, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else return items.filter((x) => x.tripId.includes(target.value));
      },
    });
  };


  const getDuration = (hrs, mins) => {
    return "" + hrs + " hrs " + mins + " mins";
  };

  const updateUser = async (user) => {
    console.log(user.name + " " + user.number + " " );
    console.log(JSON.stringify(user) + "data");
    const updatedTrip = axios.put("http://localhost:8084/train/trips/update/"+userForEdit.id,user,{
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmFyd2FsQGdtYWlsLmNvbSIsImV4cCI6MTYxOTQ0NzE3NywiaWF0IjoxNjE5NDExMTc3LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl19.NITXQMra4fmT0iTIIKECVqWZbEfiMYpIREpMv91x-jY",
      },
    })
    return updatedTrip;
    console.log((await updatedTrip).data + "updated");
  }

  const addUser = (trip) => {
    console.log(JSON.stringify(trip));
    const newUser = axios.post("http://localhost:8084/train/trips/add",trip,{
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmFyd2FsQGdtYWlsLmNvbSIsImV4cCI6MTYxOTQ0NzE3NywiaWF0IjoxNjE5NDExMTc3LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl19.NITXQMra4fmT0iTIIKECVqWZbEfiMYpIREpMv91x-jY",
      },
    })
    console.log( newUser.data + "new");
    return newUser;
  };

  const deleteUser = (user) => {
    console.log(user + " delete");
    const deletedTrain = axios.delete("http://localhost:8084/user/delete/"+user.id,{
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmFyd2FsQGdtYWlsLmNvbSIsImV4cCI6MTYxOTQ0NzE3NywiaWF0IjoxNjE5NDExMTc3LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl19.NITXQMra4fmT0iTIIKECVqWZbEfiMYpIREpMv91x-jY",
      },
    })
  }

  const addOrEdit = (user, isAdd) => {
    if(isAdd){
      const newUser = addUser(user);
      console.log(newUser);
    }else{
      const updatedUser = updateUser(user);
      console.log(user + "addOrEdit");
    }
  };

  const getName = (firstName, lastName) => {
      return firstName + " " + lastName;
  }

  const onClickBtn = () => {
    setOpen(true);
    setUserForEdit(null);
    setIsAdd(true)
    console.log(open);
  };

  const openInPopup = (item) => {
    setOpen(true);
    setIsAdd(false)
    setUserForEdit(item);
    console.log(open);
  };

  return (
    <div style={{marginTop:'4%', width:'100%'}}>
      <PageHeader
        title="Trips"
        subTitle="List of available Trips in the database"
        icon={<PeopleIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
        <Toolbar>
          <Controls.Input
            label="Search Trains"
            placeholder="Enter Train No."
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={onClickBtn}
          >
            Add New
          </Button>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{getName(item.firstName, item.lastName)}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.dob}</TableCell>
                <TableCell>{item.mobileNumber}</TableCell>
                <TableCell>{item.roles}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Button>
                  <Button color="secondary"
                    onClick={()=>{
                      setUserForEdit(item)
                      deleteUser(item)
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup title="Add User" openPopup={open} setOpenPopup={setOpen}>
        <AddUser userForEdit={userForEdit} addOrEdit={addOrEdit} setOpen={setOpen} isAdd={isAdd}/>
      </Popup>
    </div>
  );
}

export default Users;
