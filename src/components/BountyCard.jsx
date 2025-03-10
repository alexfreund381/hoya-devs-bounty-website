import supabase from "../config/supaBaseClient"

const BountyCard = ({bounty, onDelete}) => {

    const handleDelete = async() => {
        const { data, error} = await supabase
            .from("bountyForm")
            .delete() //gets rid of the specific bounty from supabase
            .eq("id", bounty.id) //from the bounty prop, we just don't use id from supabase so we dont see it in website implementation
            .select() //need the .select to keep the data / retrieve it and console.log it

        if (error) {
            console.error(error)
        }
        if (data) {
            console.log(data) 
            onDelete(bounty.id)
        }
    }

    return (
        <div className="bounty-card">
            <div className="name-contact">
                <div className="name">
                    <h4>Name: </h4>
                    <p>{bounty.fullName}</p>
                </div>
                <div className="contact">
                    <h4>Contact:</h4>
                    <p>{bounty.contactMethod}</p>
                </div>
            </div>
            <div className="bounty-details">
                <div className="title">
                    <h4>Title of Job:</h4>
                    <p>{bounty.title}</p>
                </div>
                <div className="timeline">
                    <h4>Timeline:</h4>
                    <p>{bounty.timeline}</p>
                </div>
                <div className="jobPayment">
                    <h4>Job Payment:</h4>
                    <p>{bounty.jobPayment}</p>
                </div>
            </div>
            <div className="description">
                <h4>Job Description:</h4>
                <p>{bounty.description}</p>
            </div> 
            <div> 
                <button id="claimButton" onClick={handleDelete}>Claim!</button>
            </div>
        </div>
    )
}

export default BountyCard 