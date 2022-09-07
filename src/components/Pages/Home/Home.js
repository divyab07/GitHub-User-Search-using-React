import React, {useState , useEffect} from "react";
import './Home.css'
import { InputText } from 'primereact/inputtext';
import axios from "../../../axios";
import User from "../ui/User";
import { Button } from 'primereact/button';
// npmimport "primeicons/primeicons.css";
// import { Dropdown } from 'primereact/dropdown';
// import { Value } from "sass";

const Home =() =>{
const [query,setQuery]=useState("");
//users fetched from API
const [users , setUsers]=useState([]);
//page display
const [page,setPage]=useState(1);
//per page display
const [limit, setLimit]=useState(10);





const handleQueryInput = (e)=>{
    const value=e.target.value;
    setQuery(value);

};

const handlePrevPage = ()=>{
    setPage((page)=>{
        if(page === 1) return page;

        else return page - 1;

    })

};

const handleNextPage = ()=>{

    setPage((page) => page + 1

    );
};

const handlePageLimit = (e)=> {
    const value = e.target.value
     setLimit(parseInt(value));

   
}

const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/search/users?q=' + query, {
        params: {
          page: page,
          per_page: limit,
        },
      });
      return data?.items;
    } catch (error) {
      console.error(error);
      return null;
    }
  };


 const handleSearchUsers = async (e) => {
    e.preventDefault();
    if (query) {
      const items = await fetchUsers();
      setUsers(items);
    } else {
      console.log('Your query is empty...');
    }
  };

  useEffect(() => {
    const displayUsersOnChange = async () => {
      if (query) {
        const items = await fetchUsers();
        setUsers(items);
      }
    };
    displayUsersOnChange();
  }, [page, limit]);


return(
    <div className="container">
       <div className="search-form">
            <h2>GitHub Search User</h2>
        
        <form>
         
            <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={query} onChange={handleQueryInput} placeholder="Search User" />
                    <Button onClick={handleSearchUsers}>Search</Button>
                   
                </span>
     
             </form>
        </div>
        
         <div className="serch-results">
            <div className="more-options">

          
            
 
           

                <label>
                    <small>Per Page</small>
                    <select onChange={handlePageLimit}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </label>

                <div className="Pagination">
                    <Button onClick={handlePrevPage}>{page}</Button>
                    <Button onClick={handleNextPage}>{page + 1 }</Button>
                </div>


            </div>
           
         {users ? (
          users.map((user) => {
            return <User user={user} key={user.id} />;
          })
        ) : (
          <h2>There is nothing to display....</h2>
        )}
      </div>
    </div>
  );
};


export default Home;