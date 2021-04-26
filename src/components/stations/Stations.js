import React, { useState, useEffect } from "react";
import axios from "axios";
import PlaceIcon from "@material-ui/icons/Place";
import AddIcon from "@material-ui/icons/Add";
import Search from "@material-ui/icons/Search";
import PageHeader from "../pageHeader/PageHeader";
import useTable from "../useTable/useTable";
import Controls from "../controls/Controls";
import Popup from "../controls/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import AddStation from './AddStation'
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
  { id: "code", label: "Station Code" },
  { id: "name", label: "Station Name" },
  { id: "zone", label: "Zone" },
  { id: "state", label: "State" },
  { id: "action", label: "Action" },
];

function Stations() {
  const classes = useStyles();
  const [stationForEdit, setStationForEdit] = useState(null);
  const [stations, setStations] = useState([]);
  const [isAdd, setIsAdd] = useState(false)
  const [open, setOpen] = useState();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const loadStations = async () => {
    try {
      const stations = await axios.get("http://localhost:8084/train/stations/getAll", {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmFyd2FsQGdtYWlsLmNvbSIsImV4cCI6MTYxOTQ0NzE3NywiaWF0IjoxNjE5NDExMTc3LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl19.NITXQMra4fmT0iTIIKECVqWZbEfiMYpIREpMv91x-jY",
        },
      });
      setStations(stations.data);
      console.log(stations.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadStations();
    console.log(open);
  }, []);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(stations, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else return items.filter((x) => x.number.includes(target.value));
      },
    });
  };

  const updateStation = async (station) => {
    console.log(station.name + " " + station.number + " " );
    console.log(JSON.stringify(station) + "data");
    const updatedStation = axios.put("http://localhost:8084/train/stations/update/"+stationForEdit.id,station,{
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmFyd2FsQGdtYWlsLmNvbSIsImV4cCI6MTYxOTQ0NzE3NywiaWF0IjoxNjE5NDExMTc3LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl19.NITXQMra4fmT0iTIIKECVqWZbEfiMYpIREpMv91x-jY",
      },
    })
    return updatedStation;
  }

  const addStation = (station) => {
    console.log(JSON.stringify(station));
    const newStation = axios.post("http://localhost:8084/train/stations/add",station,{
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmFyd2FsQGdtYWlsLmNvbSIsImV4cCI6MTYxOTQ0NzE3NywiaWF0IjoxNjE5NDExMTc3LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl19.NITXQMra4fmT0iTIIKECVqWZbEfiMYpIREpMv91x-jY",
      },
    })
    console.log( newStation.data + "new");
    return newStation;
  };

  const deleteStation = (station) => {
    console.log(station + " delete");
    const deletedStation = axios.delete("http://localhost:8084/train/stations/delete/"+station.id,{
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmFyd2FsQGdtYWlsLmNvbSIsImV4cCI6MTYxOTQ0NzE3NywiaWF0IjoxNjE5NDExMTc3LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl19.NITXQMra4fmT0iTIIKECVqWZbEfiMYpIREpMv91x-jY",
      },
    })
  }

  const addOrEdit = (Station, isAdd) => {
    if(isAdd){
      const newStation = addStation(Station);
      console.log(newStation);
    }else{
      const updatedStation = updateStation(Station);
      console.log(Station + "addOrEdit");
    }
  };

  const onClickBtn = () => {
    setOpen(true);
    setStationForEdit(null);
    setIsAdd(true)
    console.log(open);
  };

  const openInPopup = (item) => {
    setOpen(true);
    setStationForEdit(item);
    setIsAdd(false)
    console.log(open);
  };

  return (
    <div style={{marginTop:'4%', width:'100%'}}>
      <PageHeader
        title="Stations"
        subTitle="List of available Stations in the database"
        icon={<PlaceIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
        <Toolbar>
          <Controls.Input
            label="Search Stations"
            placeholder="Enter Station code"
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
              <TableRow key={item.code}>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.zone}</TableCell>
                <TableCell>{item.state}</TableCell>
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
                      setStationForEdit(item)
                      deleteStation(item)
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
      <Popup title="Add Station" openPopup={open} setOpenPopup={setOpen}>
        <AddStation stationForEdit={stationForEdit} addOrEdit={addOrEdit} setOpen={setOpen} isAdd={isAdd}/>
      </Popup>
    </div>
  );
}

export default Stations;