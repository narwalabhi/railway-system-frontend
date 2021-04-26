import React, { useState, useEffect } from "react";
import axios from "axios";
import TrainIcon from "@material-ui/icons/Train";
import AddIcon from "@material-ui/icons/Add";
import Search from "@material-ui/icons/Search";
import PageHeader from "../pageHeader/PageHeader";
import useTable from "../useTable/useTable";
import Controls from "../controls/Controls";
import Popup from "../controls/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
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
import Add from "./add";

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
  { id: "number", label: "Train No." },
  { id: "name", label: "Train Name" },
  { id: "fromStationCode", label: "From" },
  { id: "toStationCode", label: "To" },
  { id: "1ACSeats", label: "1AC" },
  { id: "2ACSeats", label: "2AC" },
  { id: "3ACSeats", label: "3AC" },
  { id: "FCSeats", label: "FC" },
  { id: "CCSeats", label: "CC" },
  { id: "SSeats", label: "SL" },
  { id: "duration", label: "Duration" },
  { id: "departure", label: "Deprture" },
  { id: "arrival", label: "Arrival" },
  { id: "distance", label: "Distance(Kms)" },
  { id: "action", label: "Action" },
];

function Trains() {
  const classes = useStyles();
  const [trainForEdit, setTrainForEdit] = useState(null);
  const [trains, setTrains] = useState([]);
  const [isAdd, setIsAdd] = useState(false)
  const [open, setOpen] = useState();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const loadTrains = async () => {
    try {
      const trains = await axios.get("http://localhost:8084/train/getAll", {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmFyd2FsQGdtYWlsLmNvbSIsImV4cCI6MTYxOTQ0NzE3NywiaWF0IjoxNjE5NDExMTc3LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl19.NITXQMra4fmT0iTIIKECVqWZbEfiMYpIREpMv91x-jY",
        },
      });
      setTrains(trains.data);
      console.log(trains.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTrains();
    console.log(open);
  }, []);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(trains, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else return items.filter((x) => x.number.includes(target.value));
      },
    });
  };


  const getDuration = (hrs, mins) => {
    return "" + hrs + " hrs " + mins + " mins";
  };

  const updateTrain = async (train) => {
    console.log(train.name + " " + train.number + " " );
    console.log(JSON.stringify(train) + "data");
    const updatedTrain = axios.put("http://localhost:8084/train/update/"+trainForEdit.id,train,{
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmFyd2FsQGdtYWlsLmNvbSIsImV4cCI6MTYxOTQ0NzE3NywiaWF0IjoxNjE5NDExMTc3LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl19.NITXQMra4fmT0iTIIKECVqWZbEfiMYpIREpMv91x-jY",
      },
    })
    return updatedTrain;
    console.log((await updatedTrain).data + "updated");
  }

  const addTrain = (train) => {
    console.log(JSON.stringify(train));
    const newTrain = axios.post("http://localhost:8084/train/add",train,{
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

  const deleteTrain = (train) => {
    console.log(train + " delete");
    const deletedTrain = axios.delete("http://localhost:8084/train/delete/"+train.id,{
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmFyd2FsQGdtYWlsLmNvbSIsImV4cCI6MTYxOTQ0NzE3NywiaWF0IjoxNjE5NDExMTc3LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl19.NITXQMra4fmT0iTIIKECVqWZbEfiMYpIREpMv91x-jY",
      },
    })
  }

  const addOrEdit = (train, isAdd) => {
    if(isAdd){
      const newTrain = addTrain(train);
      console.log(newTrain);
    }else{
      const updateTrain = updateTrain(train);
      console.log(train + "addOrEdit");
    }
  };

  const onClickBtn = () => {
    setOpen(true);
    setTrainForEdit(null);
    setIsAdd(true)
    console.log(open);
  };

  const openInPopup = (item) => {
    setOpen(true);
    setTrainForEdit(item);
    setIsAdd(false)
    console.log(open);
  };

  return (
    <div style={{marginTop:'4%'}}>
      <PageHeader
        title="Trains"
        subTitle="List of available Trains in the database"
        icon={<TrainIcon fontSize="large" />}
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
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.number}</TableCell>
                <TableCell>{item.fromStationCode}</TableCell>
                <TableCell>{item.toStationCode}</TableCell>
                <TableCell>{item.firstAcSeats}</TableCell>
                <TableCell>{item.secondAcSeats}</TableCell>
                <TableCell>{item.thirdAcSeats}</TableCell>
                <TableCell>{item.firstClassSeats}</TableCell>
                <TableCell>{item.chairCarSeats}</TableCell>
                <TableCell>{item.sleeperSeats}</TableCell>
                <TableCell>
                  {getDuration(item.durationHrs, item.durationMns)}
                </TableCell>
                <TableCell>{item.departure}</TableCell>
                <TableCell>{item.arrival}</TableCell>
                <TableCell>{item.distance}</TableCell>
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
                      setTrainForEdit(item)
                      deleteTrain(item)
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
        <Add trainForEdit={trainForEdit} addOrEdit={addOrEdit} setOpen={setOpen} isAdd={isAdd}/>
      </Popup>
    </div>
  );
}

export default Trains;
