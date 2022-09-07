import React , {useState, useEffect} from "react";
import './User.css'
import site from "../../../assets/site.png"
import github from "../../../assets/github.png"
import location from "../../../assets/location.png"
import user from "../../../assets/user.png"
import {Link , useParams} from "react-router-dom"
import axios from "../../../axios";
import Repo from "../ui/Repo";

const User =()=>{
    const {login} = useParams();

    //User Information 

    const [userInfo , setUserInfo] = useState({});

    //User Repositories

    const [ repos , setRepos] = useState([]);

    useEffect(() =>{

        const fetchuserInformation = async () => {
            try{
            const response = await Promise.all ([
                axios.get(`/users/${login}`),
                axios.get(`/users/${login}/repos`),

            ]);

            setUserInfo(response[0].data);
            setRepos(response[1].data)


            console.log(response);

        }catch (error){

            console.error(error);
        }

        };
        fetchuserInformation();

    } ,[]);

    return(
         <div className="container ">
            <Link to="/" className="back">Back</Link>

            <div className="user-information">
                <div className="image">
                    <img src={userInfo?.avatar_url}/>

                </div>
                <div className="user-content">
                    <h3>{userInfo?.name}</h3>

                    <p>{userInfo?.bio}</p>

                    <div className="more-data">
                        <p><img src={user} alt=""/>{userInfo?.followers} Followers . {userInfo?.following} Following</p>
                        {userInfo?.location &&<p><img src={location} alt=""/> {userInfo?.location } </p>}
                        {userInfo?.blog && <p><img src={site} alt=""/> {userInfo?.blog } </p>}
                        <p><img src={github} alt=""/><a href={userInfo?.html_url}>View GitHub Profile</a></p>

                    </div>
                    


                </div>



            </div>
           
            <div className="user-repos">
                {
                repos ? repos.map(repo => {
                    return <Repo repo = {repo} key={ repo.id}/>
                }) : <h2> No Repos for this User.....</h2>


                }
                       

                 
                    </div>
         </div>


    )
};

export default User;