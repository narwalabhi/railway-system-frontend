import "./App.css";
import Trains from "./components/trains/Trains";
import Stations from "./components/stations/Stations";
import Trips from "./components/trips/Trips";
import Users from "./components/users/Users";
import Profile from "./components/profile/Profile";
import Tickets from "./components/tickets/Tickets";
import MyDrawer from "./components/drawer/MyDrawer";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TripSchedules from "./components/tripSchedules/TripSchedules";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
});
function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.container}>
        <MyDrawer />
        <Switch>
          <Route
            exact
            from="/trains"
            render={(props) => <Trains {...props} />}
          />
          <Route
            exact
            path="/stations"
            render={(props) => <Stations {...props} />}
          />
          <Route exact path="/trips" render={(props) => <Trips {...props} />} />

          <Route
            exact
            path="/trip-schedules"
            render={(props) => <TripSchedules {...props} />}
          />
          <Route exact path="/users" render={(props) => <Users {...props} />} />
          <Route
            exact
            path="/tickets"
            render={(props) => <Tickets {...props} />}
          />
          <Route
            exact
            path="/profile"
            render={(props) => <Profile {...props} />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
