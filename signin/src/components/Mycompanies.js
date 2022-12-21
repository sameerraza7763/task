import React from 'react'
import { GetcompaniesFromDB, collection, db, doc, getDocs, auth,swal,SettokeninDB } from "./../config/Firebase"
import { useEffect, useState } from 'react'
import './company.css'

function Mycompanies() {







    async function Settoken() {
        const Token = document.getElementById('Token').value
        const TokenTime = document.getElementById('Token-Time').value
        const userid = auth.currentUser.uid;
        try {
        
          await SettokeninDB(Token,TokenTime,userid)
          await swal("Congratulations!", "Token Generate Sussesfully!", "success");
         
        } catch (e) {
          alert(e.message)
        }
    
      }
















    async function getCompaniesFromdb() {
        const querySnapShot = await getDocs(collection(db, "company"))
        const companies = []
        querySnapShot.forEach((doc) => {
            companies.push({ id: doc.id, ...doc.data() })

        });
        return companies
    }
    let [allCompanies, setAllcompanies] = useState([])
    useEffect(() => {
        const loadcompanies = async () => {
            const companies = await getCompaniesFromdb()
            console.log(companies)
            setAllcompanies(companies)

        }
        loadcompanies()
    }, [])

    console.log(allCompanies)


   


















    // async function getUsersFromdb() {
    //     const querySnapShot = await getDocs(collection(db, "users"))
    //     const users = []
    //     querySnapShot.forEach((doc) => {
    //         users.push({ id: doc.id, ...doc.data() })

    //     });
    //     return users
    // }
   
    const uid=localStorage.getItem("uid")
    console.log(uid)



   var displaycompany= allCompanies.map((item,index)=>{
        if (uid==item.userid){
        // document.getElementById('company-names').innerHTML+=item.company +<br />  
          return <div key={index} id='company-names' >{item.company}
          
      
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id='btn-warning' >
 Genrate Token Here
</button>


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Set Total Limits</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id='genrate-token' >
      <input type="text" class="form-control" placeholder="Write Token" aria-label="Server" id='Token' />
      <input type="text" class="form-control" placeholder="Token-Time" aria-label="Server" id='Token-Time' />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={Settoken} >Set Token</button>
      </div>
    </div>
  </div>
</div>





























          <button type="button" class="btn btn-danger" id='btn-Danger' >Reset Token</button>
          
          























          </div>
        }
       })



    return (
        <>
        {/* <h1 className='heading-company' >MY Companies </h1> */}
        <div  >{displaycompany}</div>
        </>
    )
}

export default Mycompanies