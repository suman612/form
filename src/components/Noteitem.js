import Table from 'react-bootstrap/Table';
// import { MdOutlineDoneOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React, { useContext } from "react";
import "./style.css"
import iCone from '../img/like.png'

import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote, index } = props;



  return (

    <Table striped="columns">
      {/* <input type='text' className='searchBox' placeholder='search here'
      onChange={searchHandle} /> */}
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date of Birth</th>
          <th>Gender</th>
          <th>Father's Name</th>
          <th>Father's Occ</th>
          <th>Father's Number</th>
          <th>I Agree</th>
        </tr>

      </thead>
        
      <tbody className='hideTd'>
        <tr>
          <td>{index + 1000 + 1}</td>
          <td>{note.firstName}</td>
          <td>{note.lastName}</td>
          <td>{note.dob}</td>
          <td>{note.gender}</td>
          <td>{note.fatherName}</td>
          <td>{note.fatherOcc}</td>
          <td>{note.fatherNum}</td>          
          <td><img className='imgIcone' src={iCone}  alt="I Agree"/> {note.agree}</td>
        </tr>
        </tbody>
          
        <thead>
        <tr>
          <th>Mother,s Name</th>
          <th>Mother,s Occ</th>
          <th>Mother,s Nomber</th>
          <th>Email</th>
          <th>Activity</th>
          <th>Health Problem</th>
          <th>Fees Mode</th>
          <th>Date of joining</th>
          <th> <FaRegEdit
            className="green mx-2"
            onClick={() => {
              updateNote(note);
            }}
          /></th>
        </tr>
        </thead> 
        <tbody>
        <tr>
          <td>{note.motherName}</td>
          <td>{note.motherOcc}</td>
          <td>{note.motherNum}</td>
          <td>{note.email}</td>
          <td>{note.activity}</td>
          <td>{note.health}</td>
          <td>{note.feesMode}</td>
          <td>{note.dateOfJuining}</td>
          <td><MdDelete
           className="red mx-2"
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Delete successfully", "success");
            }}
          /></td>
        </tr>f
        </tbody> 
        {/* <p className="card-rext">{note.dob}</p> */}
      
    </Table>



  );

}

export default Noteitem;
