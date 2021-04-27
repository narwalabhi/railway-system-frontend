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
import ScheduleIcon from "@material-ui/icons/Schedule";
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
import AddTripSchedule from "./AddTripSchedule";
// import Add from "./add";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    height:'100%',
    width:'100%'
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
  { id: "id", label: "TripSchedule Id" },
  { id: "tripId", label: "Trip Id" },
  { id: "tripDate", label: "Trip Date" },
  { id: "firstAcAvailableSeats", label: "1AC Avl." },
  { id: "secondAcAvailableSeats", label: "2AC Avl." },
  { id: "thirdAcAvailableSeats", label: "3AC Avl." },
  { id: "FirstClassAcAvailableSeats", label: "FC Avl." },
  { id: "chairCarAcAvailableSeats", label: "CC Avl." },
  { id: "SleeperAvailableSeats", label: "SS Avl." },
  { id: "status", label: "Status" },
  { id: "action", label: "Action" },
];

function TripSchedules() {
  const classes = useStyles();
  const [tripScheduleForEdit, setTripScheduleForEdit] = useState(null);
  const [tripSchedules, setTripSchedules] = useState([]);
  const [isAdd, setIsAdd] = useState(false)
  const [open, setOpen] = useState();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const loadTripSchedules = async () => {
    try {
      const tripSchedules = await axios.get("http://localhost:8084/train/trip-schedules/getAll", {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmFyd2FsQGdtYWlsLmNvbSIsImV4cCI6MTYxOTU3MTUzMiwiaWF0IjoxNjE5NDg1MTMyLCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl19.rdgyllXPFER41NR5x0goKGckOgaOFt4_98YVyv_noew"      },
      });
      setTripSchedules(tripSchedules.data);
      console.log(tripSchedules.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTripSchedules();
    console.log(open);
  }, []);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(tripSchedules, headCells, filterFn);

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

  const updateTripSchedule = async (tripSchedule) => {
    console.log(tripSchedule.name + " " + tripSchedule.number + " " );
    console.log(JSON.stringify(tripSchedule) + "data");
    const updatedTripSchedule = axios.put("http://localhost:8084/train/trip-schedules/update/"+tripScheduleForEdit.id,tripSchedule,{
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmFyd2FsQGdtYWlsLmNvbSIsImV4cCI6MTYxOTU3MTUzMiwiaWF0IjoxNjE5NDg1MTMyLCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl19.rdgyllXPFER41NR5x0goKGckOgaOFt4_98YVyv_noew"      },
    })
    console.log((await updatedTripSchedule).data + "updated");
    return updatedTripSchedule;
  }

  const addTripSchedule = (trip) => {
    console.log(JSON.stringify(trip));
    const newTripSchedule = axios.post("http://localhost:8084/train/trip-schedules/add",trip,{
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmFyd2FsQGdtYWlsLmNvbSIsImV4cCI6MTYxOTU3MTUzMiwiaWF0IjoxNjE5NDg1MTMyLCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl19.rdgyllXPFER41NR5x0goKGckOgaOFt4_98YVyv_noew"      },
    })
    console.log( newTripSchedule.data + "new");
    return newTripSchedule;
  };

  const deleteTripSchedule = (tripSchedule) => {
    console.log(tripSchedule + " delete");
    const deletedTripSchedule = axios.delete("http://localhost:8084/train/trip-schedules/delete/"+tripSchedule.id,{
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmFyd2FsQGdtYWlsLmNvbSIsImV4cCI6MTYxOTU3MTUzMiwiaWF0IjoxNjE5NDg1MTMyLCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl19.rdgyllXPFER41NR5x0goKGckOgaOFt4_98YVyv_noew"    
    },
    });
    console.log(deletedTripSchedule.dat);
  }

  const addOrEdit = (trip, isAdd) => {
    if(isAdd){
      const newTripSchedule = addTripSchedule(trip);
      console.log(newTripSchedule);
    }else{
      const updatedTripSchedule = updateTripSchedule(trip);
      console.log(updatedTripSchedule + "addOrEdit");
    }
  };

  const onClickBtn = () => {
    setOpen(true);
    setTripScheduleForEdit(null);
    setIsAdd(true)
    console.log(open);
  };

  const openInPopup = (item) => {
    setOpen(true);
    setIsAdd(false)
    setTripScheduleForEdit(item);
    console.log(open);
  };

  return (
    <div style={{marginTop:'4%', width:'100%'}}>
      <PageHeader
        title="Trip Schedules"
        subTitle="List of available trip schedules in the database"
        icon={<ScheduleIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
        <Toolbar>
          <Controls.Input
            label="Search Trips"
            placeholder="Enter TripId"
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
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.tripId}</TableCell>
                <TableCell>{item.tripDate}</TableCell>
                <TableCell>{item.firstAcAvailableSeats}</TableCell>
                <TableCell>{item.secondAcAvailableSeats}</TableCell>
                <TableCell>{item.thirdAcAvailableSeats}</TableCell>
                <TableCell>{item.firstClassAcAvailableSeats}</TableCell>
                <TableCell>{item.chairCarAcAvailableSeats}</TableCell>
                <TableCell>{item.sleeperAvailableSeats}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => {
                      setTripScheduleForEdit(item)
                      openInPopup(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Button>
                  <Button color="secondary"
                    onClick={()=>{
                      deleteTripSchedule(item)
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
      <Popup title="Add Trip Schedule" openPopup={open} setOpenPopup={setOpen}>
          <AddTripSchedule tripScheduleForEdit={tripScheduleForEdit} addOrEdit={addOrEdit} setOpen={setOpen} isAdd={isAdd} />
      </Popup>
    </div>
  );
}

export default TripSchedules;
