import React, { useEffect, useState } from "react";
import supabase from "../config/supaBaseClient"; 
import { useNavigate } from "react-router-dom";

import BountyCard from "../components/BountyCard";

import "./Display.css";

import ClipLoader from "react-spinners/ClipLoader";


const Display = () => {
  
    const navigate = useNavigate();

    const [fetchError, setFetchError] = useState(null)
    const [bounties, setBounties] = useState(null)

    const [orderBy, setOrderBy] = useState("created_at")

    const [loading, setLoading] = useState(true)

    //function to update the state and instantly delete off page without refreshing, BountyCard.jsx gets rid from the database
    const hDelete = (id) => { //id of the bounty we want to delete taken in as an argument from onDelete in BountyCard.jsx
        //could all handleDelete as well, just called hDelete for my own visualization
        setBounties(prevBounties => { //function as the argument to cycle through which bounty to delete before update
            return prevBounties.filter(bt => bt.id != id) //bt stands for each bounty looped through, when the ids are equal, 
            // statement is false and removed, the filter creates a new array and only returns values to it when the function is true
        })
    }

    useEffect(() => {
        const fetchBounties = async () => {

            setLoading(true);

            const {data, error} = await supabase
            .from('bountyForm')
            .select()
            .order(orderBy, {ascending: false}) //how to filter the data, in the state of orderBy being passed in
            //supabase way as data is recieved dynamically, not like other project with data already given with the .filter method

            if (error) {
                setFetchError("Could not fetch the bounties")
                setBounties(null)
                console.log(error)
            }
            if (data) {
                setBounties(data)
                setFetchError(null)

                setLoading(false)
            }

        }

        fetchBounties()

    }, [orderBy]) //orderBy as a dependency to rerun function everytime orderBy's state changes and refetches the data according to new criteria

    const handleClick = (event) => {
        if (event.target.id === "backButton") {
          window.location.href = "https://www.hoyadevelopers.com/";
        } else if (event.target.id === "appButton") {
          navigate("/"); // Use navigate to go back to the Home page
        }
      };

  return (
    <div className="containerDisplay">
        <button id="backButton" onClick={handleClick}>
            Back to Website!
        </button>
        <button id="appButton" onClick={handleClick}>
            Apply Now!
        </button>
        {fetchError && (<p>{fetchError}</p>)}
        <h1>Current Bounties!</h1>
        {loading ? ( 
                // Show loader while fetching, ? shorthand for if else statement
                <ClipLoader color="#4A90E2" size={100} />
            ) : (
            <div className="bounties">
                <div className="order-by">
                    <h3>Order By:</h3>
                    <button onClick={() => setOrderBy("created_at")}>Time Created</button>
                    <button onClick={() => setOrderBy("jobPayment")}>Job Payment</button>
                </div>
                <div className="bounty-grid">
                    {bounties.map(bounty => (
                        <BountyCard 
                        key = {bounty.id} 
                        bounty={bounty} // bounty={bounty} prop passed into function
                        onDelete={hDelete}/> //passing handleDelete as a prop, and the prop is called onDelete
                        //onDelete passed as a prop and called in BountyCard.jsx
                    ))}                
                </div>
            </div>
        )}
    </div>
  );
};

export default Display;