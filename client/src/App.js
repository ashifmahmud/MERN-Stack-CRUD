import React from 'react'
import './App.css'
import { useState } from 'react'
import Axios from 'axios'
import axios from 'axios'


const App = () => {

  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [country, setCountry] = useState("")
  const [wage, setWage] = useState(0)

  const [employeeList, setEmployeeList] = useState([])
  const [newWage, setNewWage] = useState(0)

  const addEmployee =() =>{
    Axios.post("http://localhost:3001/create",{name:name, age:age, country:country, wage:wage}).then(()=>{
      setEmployeeList([
        ...employeeList,
        {
          name:name,
          age:age,
          country: country,
          wage:wage,
        },
      ])
    })
  }

  const getEmployees = () =>{
    Axios.get("http://localhost:3001/employees",).then((response)=>{
      setEmployeeList(response.data)
    })
  }

  const updateEmployeeWage = (id) =>{
    Axios.put("http://localhost:3001/update",{wage: newWage, id:id}).then((response)=>{
      setEmployeeList(employeeList.map((val)=>{
        return val.id == id ? {id:val.id, name:val.name, country: val.country, wage:newWage} : val
      }))
    })
  }

  const deleteEmployee = (id) =>{
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>{
      setEmployeeList(employeeList.filter((val)=>{
        return val.id!=id
      }))
    })
  }

  const displayInfo = () => {
    console.log(name+age+country+wage)
  }
 
  return (
    <div className="App">
      <div className='information'>
        <h1>Hello</h1>
        <label>Name:</label>
        <input type="text"  onChange={(event)=>setName(event.target.value)}/>
        <label>Age:</label>
        <input type="number" onChange={(event)=>setAge(event.target.value)}/>
        <label>Country</label>
        <input type="text" onChange={(event)=>setCountry(event.target.value)}/>
        <label>Wage</label>
        <input type="number" onChange={(event)=>setWage(event.target.value)}/>
        <button onClick={addEmployee}>Add Employees</button>
        
        <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>
        {employeeList.map((val,key)=>{
          return <div className='employee'>
            <h3>Name: {val.name}</h3>
            <h3>Age: {val.age}</h3>
            <h3>Country: {val.country}</h3>
            <h3>Wage: {val.wage}</h3>
            <div>
              <input type="text" placeholder='2000...' onChange={(event)=>{setNewWage(event.target.value)}} />
              <button onClick={()=>{updateEmployeeWage(val.id)}}>Update</button>
              <button onClick={()=>deleteEmployee(val.id)}>Delete </button>
              
              </div>
            </div>
        })}
        </div>

        
      </div>
    </div>
  )
}

export default App