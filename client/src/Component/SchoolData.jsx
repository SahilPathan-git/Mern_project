import React, { useState, useEffect } from 'react'
import '../skeleton.css'
import axios from 'axios';

const SchoolData = () => {
    const [student, setStudent] = useState({
        name: "",
        lname: ""
    })

    const [updateStudent, setUpdateStudent] = useState({
        name: "",
        lname: ""
    })

    const [getStd, setGetStd] = useState([])

    useEffect(() => {
        getStudent()
    }, [])

    // Add Student Data 
    const handleData = async (e) => {
        e.preventDefault()
        if (student.name !== "" && student.lname !== "") {
            try {
                const response = await axios.post('http://localhost:4000/student/add', {
                    student: {
                        name: student.name,
                        lname: student.lname
                    }

                })
                if (response.status === 200) {
                    console.log("Data Added successfully")
                    getStudent()
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            alert("Name And Last Name Required")
        }


    }
    // Get Data from DataBase
    const getStudent = async () => {
        try {
            const response = await axios.get('http://localhost:4000/student/')
            if (response.status === 200) {
                setGetStd(response.data)
            } else {
                console.log("error")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getStdObj = (std) => {
        console.log(std)
        setUpdateStudent(std)
    }

    //for Update Student
    const handleUpdate = async (e) => {
        e.preventDefault()
        // console.log(updateStudent._id)
        try {
            const response = await axios.put(`http://localhost:4000/student/update/${updateStudent._id}`, {
                student: {
                    name: updateStudent.name,
                    lname: updateStudent.lname
                }
            })
            if (response.status === 200) {
                console.log("Data Updated successfully")
                getStudent()
            }
        } catch (error) {
            console.log(error)
        }
    }

    //for Delete student in DataBase

    const handleDelete = async (id) => {
        alert("Are you sure you want to delete?")
        try {
            const response = await axios.delete(`http://localhost:4000/student/delete/${id}`)
            if (response.status === 200) {
                console.log("Data Deleted successfully")
                getStudent()
            }
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div>

            <div><h3>MERN Application</h3></div>
            <div><h4>Add Student</h4></div>

            <div>
                <form onSubmit={handleData}>
                    <div className="row container">
                        <div className="six columns">
                            <label >First Name</label>
                            <input className="u-full-width" type="text" placeholder="First name" value={student.name} onChange={(e) => setStudent({ ...student, name: e.target.value })} />
                        </div>
                        <div className="six columns">
                            <label >Last Name</label>
                            <input className="u-full-width" type="text" placeholder="Last name" value={student.lname} onChange={(e) => setStudent({ ...student, lname: e.target.value })} />

                        </div>
                    </div>


                    <button className="button-primary">Add</button>
                </form>
            </div>
            <table className="container u-full-width">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        getStd.length > 0 && getStd.map((std, index) => {
                            return (
                                <tr key={std._id}>
                                    <td>{index + 1}</td>
                                    <td>{std.name}</td>
                                    <td>{std.lname}</td>
                                    <td><button className="button-primary " style={{ marginRight: "20px" }} onClick={() => getStdObj(std)}>Edit</button><button className="button-primary" onClick={() => handleDelete(std._id)}>Delete</button></td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
            <div><h4>Update Student</h4></div>
            <div>
                <form onSubmit={handleUpdate}>
                    <div className="row container">
                        <div className="six columns">
                            <label >First Name</label>
                            <input className="u-full-width" type="text" placeholder="First name" value={updateStudent.name} onChange={(e) => setUpdateStudent({ ...updateStudent, name: e.target.value })} />
                        </div>
                        <div className="six columns">
                            <label >Last Name</label>
                            <input className="u-full-width" type="text" placeholder="Last name" value={updateStudent.lname} onChange={(e) => setUpdateStudent({ ...updateStudent, lname: e.target.value })} />

                        </div>
                    </div>

                    <button className="button-primary">Update</button>
                </form>
            </div>

        </div >
    )
}


export default SchoolData;
