import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import SidebarDash from "../SidebarDash/SidebarDash";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import axios from "axios";
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  Resources,
  DragDropProvider,
} from "@devexpress/dx-react-scheduler-material-ui";
import WbSunny from "@mui/icons-material/WbSunny";
import FilterDrama from "@mui/icons-material/FilterDrama";
import Opacity from "@mui/icons-material/Opacity";
import ColorLens from "@mui/icons-material/ColorLens";
import { styled, darken, alpha, lighten } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import classNames from "clsx";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "./style.css";


const PREFIX = "Demo";

const classes = {
  cell: `${PREFIX}-cell`,
  content: `${PREFIX}-content`,
  text: `${PREFIX}-text`,
  sun: `${PREFIX}-sun`,
  cloud: `${PREFIX}-cloud`,
  rain: `${PREFIX}-rain`,
  sunBack: `${PREFIX}-sunBack`,
  cloudBack: `${PREFIX}-cloudBack`,
  rainBack: `${PREFIX}-rainBack`,
  opacity: `${PREFIX}-opacity`,
  appointment: `${PREFIX}-appointment`,
  apptContent: `${PREFIX}-apptContent`,
  flexibleSpace: `${PREFIX}-flexibleSpace`,
  flexContainer: `${PREFIX}-flexContainer`,
  tooltipContent: `${PREFIX}-tooltipContent`,
  tooltipText: `${PREFIX}-tooltipText`,
  title: `${PREFIX}-title`,
  icon: `${PREFIX}-icon`,
  circle: `${PREFIX}-circle`,
  textCenter: `${PREFIX}-textCenter`,
  dateAndTitle: `${PREFIX}-dateAndTitle`,
  titleContainer: `${PREFIX}-titleContainer`,
  container: `${PREFIX}-container`,
};

const getBorder = (theme) =>
  `1px solid ${
    theme.palette.mode === "light"
      ? lighten(alpha(theme.palette.divider, 1), 0.88)
      : darken(alpha(theme.palette.divider, 1), 0.68)
  }`;

const DayScaleCell = (props) => (
  <MonthView.DayScaleCell
    {...props}
    style={{ textAlign: "center", fontWeight: "bold" }}
  />
);

const StyledOpacity = styled(Opacity)(() => ({
  [`&.${classes.rain}`]: {
    color: "#4FC3F7",
  },
}));

const StyledWbSunny = styled(WbSunny)(() => ({
  [`&.${classes.sun}`]: {
    color: "#FFEE58",
  },
}));

const StyledFilterDrama = styled(FilterDrama)(() => ({
  [`&.${classes.cloud}`]: {
    color: "#90A4AE",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    color: "#78909C!important",
    position: "relative",
    userSelect: "none",
    verticalAlign: "top",
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    "&:first-of-type": {
      borderLeft: "none",
    },
    "&:last-child": {
      paddingRight: 0,
    },
    "tr:last-child &": {
      borderBottom: "none",
    },
    "&:hover": {
      backgroundColor: "white",
    },
    "&:focus": {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  [`&.${classes.sunBack}`]: {
    backgroundColor: "#FFFDE7",
  },
  [`&.${classes.cloudBack}`]: {
    backgroundColor: "#ECEFF1",
  },
  [`&.${classes.rainBack}`]: {
    backgroundColor: "#E1F5FE",
  },
  [`&.${classes.opacity}`]: {
    opacity: "0.5",
  },
}));

const StyledDivText = styled("div")(() => ({
  [`&.${classes.text}`]: {
    padding: "0.5em",
    textAlign: "center",
  },
}));

const StyledDivContent = styled("div")(() => ({
  [`&.${classes.content}`]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
  },
}));

const StyledAppointmentsAppointment = styled(Appointments.Appointment)(() => ({
  [`&.${classes.appointment}`]: {
    borderRadius: "10px",
    "&:hover": {
      opacity: 0.6,
    },
  },
}));

const StyledToolbarFlexibleSpace = styled(Toolbar.FlexibleSpace)(() => ({
  [`&.${classes.flexibleSpace}`]: {
    flex: "none",
  },
  [`& .${classes.flexContainer}`]: {
    display: "flex",
    alignItems: "center",
  },
}));

const StyledAppointmentsAppointmentContent = styled(
  Appointments.AppointmentContent
)(() => ({
  [`&.${classes.apptContent}`]: {
    "&>div>div": {
      whiteSpace: "normal !important",
      lineHeight: 1.2,
    },
  },
}));

const appointments1 = [
  {
    id: 0,
    title: "Watercolor Landscape",
    startDate: new Date(2018, 6, 23, 9, 30),
    endDate: new Date(2018, 6, 23, 11, 30),
    ownerId: 1,
  },
  {
    id: 1,
    title: "Monthly Planning",
    startDate: new Date(2018, 5, 28, 9, 30),
    endDate: new Date(2018, 5, 28, 11, 30),
    ownerId: 1,
  },
  {
    id: 2,
    title: "Recruiting students",
    startDate: new Date(2018, 6, 9, 12, 0),
    endDate: new Date(2018, 6, 9, 13, 0),
    ownerId: 2,
  },
  {
    id: 3,
    title: "Oil Painting",
    startDate: new Date(2018, 6, 18, 14, 30),
    endDate: new Date(2018, 6, 18, 15, 30),
    ownerId: 2,
  },
  {
    id: 4,
    title: "Open Day",
    startDate: new Date(2018, 6, 20, 12, 0),
    endDate: new Date(2018, 6, 20, 13, 35),
    ownerId: 6,
  },
  {
    id: 5,
    title: "Watercolor Landscape",
    startDate: new Date(2018, 6, 6, 13, 0),
    endDate: new Date(2018, 6, 6, 14, 0),
    rRule: "FREQ=WEEKLY;BYDAY=FR;UNTIL=20180816",
    exDate: "20180713T100000Z,20180727T100000Z",
    ownerId: 2,
  },
  {
    id: 6,
    title: "Meeting of Instructors",
    startDate: new Date(2018, 5, 28, 12, 0),
    endDate: new Date(2018, 5, 28, 12, 30),
    rRule: "FREQ=WEEKLY;BYDAY=TH;UNTIL=20180727",
    exDate: "20180705T090000Z,20180719T090000Z",
    ownerId: 5,
  },
  {
    id: 7,
    title: "Oil Painting for Beginners",
    startDate: new Date(2018, 6, 3, 11, 0),
    endDate: new Date(2018, 6, 3, 12, 0),
    rRule: "FREQ=WEEKLY;BYDAY=TU;UNTIL=20180801",
    exDate: "20180710T080000Z,20180724T080000Z",
    ownerId: 3,
  },
  {
    id: 8,
    title: "Watercolor Workshop",
    startDate: new Date(2018, 6, 9, 11, 0),
    endDate: new Date(2018, 6, 9, 12, 0),
    ownerId: 3,
  },
  {
    id: 9,
    title: "mouhib test",
    startDate: new Date(2023, 6, 9, 11, 30),
    endDate: new Date(2023, 6, 9, 12, 0),
    ownerId: 3,
  },
  {
    id: 10,
    title: "mouhib test 2",
    startDate: new Date(2023, 6, 9, 14, 30),
    endDate: new Date(2023, 6, 9, 16, 0),
    ownerId: 3,
  },
];

const WeatherIcon = ({ id }) => {
  switch (id) {
    case 0:
      return <StyledOpacity className={classes.rain} fontSize="large" />;
    case 1:
      return <StyledWbSunny className={classes.sun} fontSize="large" />;
    case 2:
      return <StyledFilterDrama className={classes.cloud} fontSize="large" />;
    default:
      return null;
  }
};

const CellBase = React.memo(({ startDate, formatDate, otherMonth }) => {
  const iconId = Math.abs(Math.floor(Math.sin(startDate.getDate()) * 10) % 3);
  const isFirstMonthDay = startDate.getDate() === 1;
  const formatOptions = isFirstMonthDay
    ? { day: "numeric", month: "long" }
    : { day: "numeric" };
  return (
    <StyledTableCell
      tabIndex={0}
      className={classNames({
        [classes.cell]: true,
        [classes.rainBack]: iconId === 0,
        [classes.sunBack]: iconId === 1,
        [classes.cloudBack]: iconId === 2,
        [classes.opacity]: otherMonth,
      })}
    >
      <StyledDivContent className={classes.content}>
        <WeatherIcon classes={classes} id={iconId} />
      </StyledDivContent>
      <StyledDivText className={classes.text}>
        {formatDate(startDate, formatOptions)}
      </StyledDivText>
    </StyledTableCell>
  );
});

const TimeTableCell = CellBase;

const AppointmentComponent = ({ ...restProps }) => (
  <StyledAppointmentsAppointment
    {...restProps}
    className={classes.appointment}
  />
);

const AppointmentContentComponent = ({ ...restProps }) => (
  <StyledAppointmentsAppointmentContent
    {...restProps}
    className={classes.apptContent}
  />
);

const resources = [
  // {
  //   fieldName: "ownerId",
  //   title: "Owners",
  //   instances: owners,
  // },
];

const Calendar = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const [appointments,setAppointments]=useState([
  {
    id: 0,
    title: "Watercolor Landscape",
    startDate: new Date(2018, 6, 23, 9, 30),
    endDate: new Date(2018, 6, 23, 11, 30),
    ownerId: 1,
  },
  {
    id: 1,
    title: "Monthly Planning",
    startDate: new Date(2018, 5, 28, 9, 30),
    endDate: new Date(2018, 5, 28, 11, 30),
    ownerId: 1,
  },
  {
    id: 2,
    title: "Recruiting students",
    startDate: new Date(2018, 6, 9, 12, 0),
    endDate: new Date(2018, 6, 9, 13, 0),
    ownerId: 2,
  },
  {
    id: 3,
    title: "Oil Painting",
    startDate: new Date(2018, 6, 18, 14, 30),
    endDate: new Date(2018, 6, 18, 15, 30),
    ownerId: 2,
  },
  {
    id: 4,
    title: "Open Day",
    startDate: new Date(2018, 6, 20, 12, 0),
    endDate: new Date(2018, 6, 20, 13, 35),
    ownerId: 6,
  },
  {
    id: 5,
    title: "Watercolor Landscape",
    startDate: new Date(2018, 6, 6, 13, 0),
    endDate: new Date(2018, 6, 6, 14, 0),
    rRule: "FREQ=WEEKLY;BYDAY=FR;UNTIL=20180816",
    exDate: "20180713T100000Z,20180727T100000Z",
    ownerId: 2,
  },
  {
    id: 6,
    title: "Meeting of Instructors",
    startDate: new Date(2018, 5, 28, 12, 0),
    endDate: new Date(2018, 5, 28, 12, 30),
    rRule: "FREQ=WEEKLY;BYDAY=TH;UNTIL=20180727",
    exDate: "20180705T090000Z,20180719T090000Z",
    ownerId: 5,
  },
  {
    id: 7,
    title: "Oil Painting for Beginners",
    startDate: new Date(2018, 6, 3, 11, 0),
    endDate: new Date(2018, 6, 3, 12, 0),
    rRule: "FREQ=WEEKLY;BYDAY=TU;UNTIL=20180801",
    exDate: "20180710T080000Z,20180724T080000Z",
    ownerId: 3,
  },
  {
    id: 8,
    title: "Watercolor Workshop",
    startDate: new Date(2018, 6, 9, 11, 0),
    endDate: new Date(2018, 6, 9, 12, 0),
    ownerId: 3,
  },
  {
    id: 9,
    title: "mouhib test",
    startDate: new Date(2023, 6, 9, 11, 30),
    endDate: new Date(2023, 6, 9, 12, 0),
    ownerId: 3,
  },
  {
    id: 10,
    title: "mouhib test 2",
    startDate: new Date(2023, 6, 9, 14, 30),
    endDate: new Date(2023, 6, 9, 16, 0),
    ownerId: 3,
  },
])

const [addedAppo,setAddedAppo]=useState({
    id:10,
    title : "",
    startDate : "",
    endDate:"",
    ownerId:3
})

  const commitChanges = ({ added, changed, deleted }) => {
    setData((state) => {
      let newData = [...state];
      if (added) {
        const startingAddedId =
          newData.length > 0 ? newData[newData.length - 1].id + 1 : 0;
        newData = [...newData, { id: startingAddedId, ...added }];
      }
      if (changed) {
        newData = newData.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        newData = newData.filter((appointment) => appointment.id !== deleted);
      }
      return newData;
    });
  };

  const FlexibleSpaceComponent = ({ ...restProps }) => (
    <StyledToolbarFlexibleSpace
      {...restProps}
      className={classes.flexibleSpace}
    >
      <div className={classes.flexContainer}>
        <CalendarMonthIcon
          fontSize="large"
          htmlColor="#FF7043"
          onClick={handleOpen}
        />
        <Typography variant="h5" style={{ marginLeft: "10px" }}>
          L'Avocato
        </Typography>
      </div>
    </StyledToolbarFlexibleSpace>
  );

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(appointments)

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:1128/api/appointment/getAppointments"
      );
  

      setAppointments(response.data.map(el=>{
        return (
          {
            id : el.id+1 , 
            title:el.reason,
            startDate:new Date(el.date),
            // endDate:new Date(el.date),
            ownerId:3
          }
        )
      }))
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Paper>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SidebarDash />
        </Grid>
        <Grid item xs={9}>
          <Scheduler data={appointments} onClick={(date) => console.log(date)}>
            <EditingState onCommitChanges={commitChanges} />
            <ViewState defaultCurrentDate="2023-07-17" />
            <MonthView
              timeTableCellComponent={TimeTableCell}
              dayScaleCellComponent={DayScaleCell}
            />
            <Appointments
              appointmentComponent={AppointmentComponent}
              appointmentContentComponent={AppointmentContentComponent}
            />
            <Resources data={resources} />
            <Toolbar flexibleSpaceComponent={FlexibleSpaceComponent} />
            <DateNavigator />
            <EditRecurrenceMenu />
            <AppointmentTooltip
              showCloseButton
              showDeleteButton
              showOpenButton
            />
            <AppointmentForm />
            <DragDropProvider />
          </Scheduler>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div>
            <div >
            <label for="datetimepickerInline" class="form-label" > Type a title</label>
              <input type="text"  onChange={(e)=>setAddedAppo(prev=>{return (
    {...prev,title:e.target.value}
  )})}/>
  <label for="datetimepickerInline" class="form-label"  >
    Select Start Date and Time</label>
  <input type="datetime-local" class="form-control" id="datetimepickerInline"  onChange={(e)=>setAddedAppo(prev=>{return (
    {...prev,startDate:new Date(e.target.value)}
  )})}/>
  <label for="datetimepickerInline" class="form-label" >
    Select End Date and Time</label>
  <input type="datetime-local" class="form-control" id="datetimepickerInline" 
  
  onChange={(e)=>setAddedAppo(prev=>{return (
    {...prev,endDate:new Date(e.target.value)}
  )})}
  />
</div>
              <button className="confirm-button" style={{textAlign:"center", alignSelf:"center"}}
              
          onClick={
            ()=>{
              setAppointments(prev=>{
                return (
                  [...prev,addedAppo]
                )
              })
            }
          }
            
              
              >Confirm</button>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        </Box>
      </Modal>
    </Paper>
  );
};

export default Calendar;
