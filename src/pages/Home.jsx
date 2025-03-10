import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supaBaseClient";


import "./Home.css";

const Home = () => {
    const navigate = useNavigate();  // Rename it correctly

    const [fullName, setFullName] = useState('')
    const [contactMethod, setContactMethod] = useState('')
    const [title, setTitle] = useState('')
    const [timeline, setTimeline] = useState('')
    const [jobPayment, setJobPayment] = useState('')
    const [description, setDescription] = useState('')
    
  
      const handleSubmit = async () => {
        if (
          !fullName ||
          !contactMethod ||   !title ||
          !timeline ||
          !jobPayment ||
          !description
        ) {
          alert("Please fill in all required fields");
          return;
        }
    
        try {
          
          const {data, error} = await supabase 
            .from("bountyForm")
            .insert([{fullName, contactMethod, title, timeline, jobPayment, description}])

          if (error) {
            alert("Error: Failed to submit data")
            console.error("Supabase error:", error)
          } 
           
          //if (data), wasn't navigating properly without try catch
          console.log("Data submitted successfully:", data)
          navigate("/display")

        } catch (error) {

          console.error("Unexpected error:", error);
          alert("An unexpected error occurred. Please try again.");
          
        }

        
      };
      
      const handleClick = (event) => {
        if (event.target.id === 'backButton') {
          window.location.href = "https://www.hoyadevelopers.com/";
        } else if (event.target.id === 'appButton') {
            navigate("/display");
        }
      };
    
      
    
      return (
          <div className='container'>
            <button id='backButton' onClick={handleClick}>
                Back to Website!
            </button>
            <button id='appButton' onClick={handleClick}>
                Go to Current Apllications!
            </button>
            <div className='application'>
              <div className='header'>
                <h2>Apply Now</h2>
                <h1>Hoya Dev's Application Form</h1>
                <p>We are thrilled for you to work with the team. Fill out the form to post your bounty!</p>
              </div>
              <div className='form'>
                <div className='short-form'>
                  <div className='short-text'>
                    <h4>Your Full Name</h4>
                    <h4>Contact Method</h4>
                  </div>
                  <div className='short-input'>
                    <input type="text"
                        placeholder="Name"
                        value= {fullName}
                        onChange= {(event) => {setFullName(event.target.value);}} />
                    <input type="text"
                        placeholder="Contact Method" 
                        value={contactMethod}
                        onChange={(event) => {setContactMethod(event.target.value);}} />
                  </div>
                </div>
                <div className='bounty'>
                  <div className='bounty-left'>               
                    <h4>Title of Project</h4>
                    <input type="text"
                        placeholder="Title of Project" 
                        value={title}
                        onChange={(event) => {setTitle(event.target.value);}} />
                    <h4>Timeline</h4>
                    <input type="text"
                        placeholder="Timeline" 
                        value={timeline}
                        onChange={(event) => {setTimeline(event.target.value);}}  />
                    <h4>Job Payment</h4>
                    <input type="text" 
                        placeholder="Job Payment" 
                        value={jobPayment}
                        onChange={(event) => {setJobPayment(event.target.value);}}  />
                  </div>
                  <div className ='bounty-right'>
                    <h4>Project Description</h4>
                    <textarea  
                        rows="4" cols="50" 
                        placeholder="Job Description"
                        value={description}
                        onChange={(event) => {setDescription(event.target.value);}} />
                    <button id="submitButton" onClick={handleSubmit}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )
    }
    export default Home; 