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
import AddTrip from './AddTrip'
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
// import Add from "./add";

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
  { id: "tripId", label: "Trip Id" },
  { id: "number", label: "Train No." },
  { id: "src", label: "Source Station Code" },
  { id: "dest", label: "Destination Station Code" },
  { id: "baseFare", label: "Base Fare(₹)" },
  { id: "duration", label: "Duration" },
  { id: "action", label: "Action" },
];

function Trips() {
  const classes = useStyles();
  const [tripForEdit, setTripForEdit] = useState(null);
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
      const trips = await axios.get("http://localhost:8084/train/trips/get", {
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

  const updateTrip = async (trip) => {
    console.log(trip.name + " " + trip.number + " " );
    console.log(JSON.stringify(trip) + "data");
    const updatedTrip = axios.put("http://localhost:8084/train/trips/update/"+tripForEdit.tripId,trip,{
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

  const addTrip = (trip) => {
    console.log(JSON.stringify(trip));
    const newTrain = axios.post("http://localhost:8084/train/trips/add",trip,{
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmFyd2FsQGdtYWlsLmNvbSIsImV4cCI6MTYxOTQ0NzE3NywiaWF0IjoxNjE5NDExMTc3LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl19.NITXQMra4fmT0iTIIKECVqWZbEfiMYpIREpMv91x-jY",
      },
    })
    console.log( newTrain.data + "new");
    return newTrain;
  };

  const deleteTrip = (trip) => {
    console.log(trip + " delete");
    const deletedTrain = axios.delete("http://localhost:8084/train/trips/delete/"+trip.tripId,{
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmFyd2FsQGdtYWlsLmNvbSIsImV4cCI6MTYxOTQ0NzE3NywiaWF0IjoxNjE5NDExMTc3LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl19.NITXQMra4fmT0iTIIKECVqWZbEfiMYpIREpMv91x-jY",
      },
    })
  }

  const addOrEdit = (trip, isAdd) => {
    if(isAdd){
      const newTrip = addTrip(trip);
      console.log(newTrip);
    }else{
      const updatedTrip = updateTrip(trip);
      console.log(trip + "addOrEdit");
    }
  };

  const onClickBtn = () => {
    setOpen(true);
    setTripForEdit(null);
    setIsAdd(true)
    console.log(open);
  };

  const openInPopup = (item) => {
    setOpen(true);
    setIsAdd(false)
    setTripForEdit(item);
    console.log(open);
  };

  return (
    <div style={{marginTop:'4%', width:'100%'}}>
      <PageHeader
        title="Trips"
        subTitle="List of available Trips in the database"
        icon={<CardTravelIcon fontSize="large" />}
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
              <TableRow key={item.number}>
                <TableCell>{item.tripId}</TableCell>
                <TableCell>{item.trainNo}</TableCell>
                <TableCell>{item.sourceStationCode}</TableCell>
                <TableCell>{item.destinationStationCode}</TableCell>
                <TableCell>{item.baseFare}</TableCell>
                <TableCell>
                  {getDuration(item.durationHrs, item.durationMns)}
                </TableCell>
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
                      setTripForEdit(item)
                      deleteTrip(item)
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
      <Popup title="Add Train" openPopup={open} setOpenPopup={setOpen}>
        <AddTrip tripForEdit={tripForEdit} addOrEdit={addOrEdit} setOpen={setOpen} isAdd={isAdd}/>
      </Popup>
    </div>
  );
}

export default Trips;
