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
// import AddUser from "./AddUser";

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
  { id: "pnr", label: "PNR" },
  { id: "tripScheduleId", label: "TripSchedule Id" },
  { id: "fromStationCode", label: "From" },
  { id: "toStationCode", label: "To" },
  { id: "journeyDate", label: "Journey Date" },
  { id: "status", label: "Status" },
  { id: "cancellable", label: "Cancellable" },
  { id: "class", label: "Class" },
  { id: "seats", label: "Seats" },
  { id: "action", label: "Action" },
];

function Tickets() {
  const classes = useStyles();
  const [ticketForEdit, setTicketForEdit] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [isAdd, setIsAdd] = useState(false)
  const [open, setOpen] = useState();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const loadTickets = async () => {
    try {
      const tickets = await axios.get("http://localhost:8084/booking/getAll", {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmFyd2FsQGdtYWlsLmNvbSIsImV4cCI6MTYxOTQ4MzQyNSwiaWF0IjoxNjE5NDQ3NDI1LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl19.JMBjtl1p-1BAAtLZcZADa3k2_YRjBd2dEBqwkUTaq9I",
        },
      });
      setTickets(tickets.data);
      console.log(tickets.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTickets();
    console.log(open);
  }, []);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(tickets, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else return items.filter((x) => x.pnr.includes(target.value));
      },
    });
  };


  const getDuration = (hrs, mins) => {
    return "" + hrs + " hrs " + mins + " mins";
  };

  const updateUser = async (user) => {
    console.log(user.name + " " + user.number + " " );
    console.log(JSON.stringify(user) + "data");
    const updatedUser = axios.put("http://localhost:8084/user/update/"+ticketForEdit.id,user,{
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmFyd2FsQGdtYWlsLmNvbSIsImV4cCI6MTYxOTQ0NzE3NywiaWF0IjoxNjE5NDExMTc3LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl19.NITXQMra4fmT0iTIIKECVqWZbEfiMYpIREpMv91x-jY",
      },
    })
    return updatedUser;
  }

  const addUser = (user) => {
    console.log(JSON.stringify(user));
    const newUser = axios.post("http://localhost:8084/user/add",user,{
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

  const deleteTicket = (ticket) => {
    console.log(ticket + " delete");
    const deletedTicket = axios.delete("http://localhost:8084/booking/delete/"+ticket.ticketId,{
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmFyd2FsQGdtYWlsLmNvbSIsImV4cCI6MTYxOTQ4MzQyNSwiaWF0IjoxNjE5NDQ3NDI1LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl19.JMBjtl1p-1BAAtLZcZADa3k2_YRjBd2dEBqwkUTaq9I",
      },
    })
    console.log(deletedTicket.data);
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


  const onClickBtn = () => {
    setOpen(true);
    setTicketForEdit(null);
    setIsAdd(true)
    console.log(open);
  };

  const openInPopup = (item) => {
    setOpen(true);
    setIsAdd(false)
    setTicketForEdit(item);
    console.log(open);
  };

  const getDOB = (dateString) => {
    const date = new Date(dateString);
    return date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
  }

  const getClass = (seats)=>{
    return Object.keys(seats)[0];
  }
  return (
    <div style={{marginTop:'4%', width:'100%'}}>
      <PageHeader
        title="Tickets"
        subTitle="List of booked tickets."
        icon={<PeopleIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
        <Toolbar>
          <Controls.Input
            label="Search Tickets"
            placeholder="Enter PNR"
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
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.ticketId}>
                <TableCell>{item.pnr}</TableCell>
                <TableCell>{item.tripScheduleId}</TableCell>
                <TableCell>{item.fromStationCode}</TableCell>
                <TableCell>{item.toStationCode}</TableCell>
                <TableCell>{item.journeyDate}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.cancellable ? "Yes" : "No"}</TableCell>
                <TableCell>{getClass(item.seats)}</TableCell>
                <TableCell>{item.seats[getClass(item.seats)]}</TableCell>
                <TableCell>
                  <Button color="secondary"
                    onClick={()=>{
                      setTicketForEdit(item)
                      deleteTicket(item)
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
        {/* <AddUser userForEdit={ticketForEdit} addOrEdit={addOrEdit} setOpen={setOpen} isAdd={isAdd}/> */}
      </Popup>
    </div>
  );
}

export default Tickets;
