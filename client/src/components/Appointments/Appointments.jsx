import React, { useEffect, useState } from "react";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import Aziz from "../Aziz/Aziz";
import Appointment from "./Appointments.css";
import Example from "../Example/Example";
import { FIREBASE_AUTH , db } from "../../firebaseconfig";

import axios from 'axios'

const Appointments = () => {
  const [appointments,setAppointments] = useState([])
  const [id,setId]=useState("")
  const [refrech, setRefrech] = useState(false);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const [lawyer, setLawyer] = useState({});
  const [upcomingAppointments,setUpcomingAppointments]=useState([])
  const [lawyerId,setLawyerId]=useState(0)
  const [userId,setUserId]=useState(0)





const getUpcomingAppointments= async () => {
  try {
    const response = await axios.get(`http://localhost:1128/api/appointment/appointment/upcoming/${lawyer.id}`)
    setUpcomingAppointments(response.data)
  }catch (error) {
    console.log(error);
  }


}


const deleteAppointment = async (id) => {
    console.log(id,"this is the id")
    // /deleteAppointment
    try {
      const x = await axios.delete(`http://localhost:1128/api/appointment/deleteAppointment/${id}`);
      setRefrech(!refrech);
      console.log("deleted");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const acceptAppointment = async (appointmentId) => {
    console.log(appointmentId, "this is the appointmenttttt");
    console.log(userId, "this is the user id");
    console.log(lawyerId, "this is the lawyer id");
    try {
      const response = await axios.put(`http://localhost:1128/api/appointment/updateAppointment/${appointmentId}`, {accepted: "accepted"});
      console.log(response.data);
      
      const addUserAndLawyerId = async () => {
        console.log(userId);
        try {
          const response = await axios.post('http://localhost:1128/api/user_lawyer/addUser_Lawyer', {
            userId: userId,
            lawyerId: lawyerId
          });
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      addUserAndLawyerId();
  
    } catch (error) {
      console.log(error);
    }
  };

  const getAcceptedAppointments= async () => {
    try {
      const response = await axios.get(`http://localhost:1128/api/appointment/appointment/lawyer/${lawyer.id}`)
      setAcceptedAppointments(response.data)
    }catch (error) {
      console.log(error);
    }
  }
  const getLawyer = async () => {
    try {
      const loggedInLawyer = FIREBASE_AUTH.currentUser.email;
      console.log(loggedInLawyer);
      const res = await axios.get(`http://localhost:1128/api/lawyer/getLawyerByEmail/${loggedInLawyer}`);
      console.log("this is lawyer",res.data);
      setLawyer(res.data);
    } catch(err) {
      console.log(err);
    }
  };
  const getUserById = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:1128/api/user/getUserId/${userId}`);
      console.log("this is user",response.data.fullName);
      return response.data.fullName;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  
  const getAppointments = async () => {
    if (!lawyer.id) {
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:1128/api/appointment/appointment/lawyer/${lawyer.id}`);
      const appointmentsWithUserNames = await Promise.all(response.data.map(async (appointment) => {
        const userName = await getUserById(appointment.userId);
        return { ...appointment, userName };
      }));
      console.log("this is the lawyer appointments", appointmentsWithUserNames);
      setAppointments(appointmentsWithUserNames);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    getLawyer();
  }, []);
  
  useEffect(() => {
    getAppointments();
    getUpcomingAppointments()
    getAcceptedAppointments()
  }, [lawyer]);
  return (
    <div>
      <div>
        <NavbarDashboard />
      </div>
      <div className="apointment">
        <div className="table">
          <Aziz appointments={appointments} deleteAppointment={deleteAppointment} setId={setId}    acceptAppointment={acceptAppointment} setLawyerId={setLawyerId} setUserId={setUserId} />
        </div>
        <div className="extra">
          <div className="upcoming">
            <div className="scrollable-content">
              <p className="upcoming-title">Upcoming Appointments</p>
              <div className="cardAndBorder">
              {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="appointment-item1 border-black p-1" style={{ borderRadius: "3%", justifyContent:"center" }}>
                      <div className="appointment1-text">
                        <img className="appointment-image" src={appointment?.user.ImageUrl}></img>
                        <p className="appointment-username">{appointment?.user.fullName}</p>
                        <p className="appointment-date">Date: {appointment.date.slice(0,10)} Time: {appointment.time.slice(0,5)}</p>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
          <div className="statistics">
            {" "}
            <Example />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
