import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Notes from "./Notes";
import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";


// import AddNote from "./AddNote";


export const Home = (props) => {
  const context = useContext(noteContext);
  const { searchHandle } = context;
 const  {showAlert}= props
  return (
    <div>
        <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
              onChange={searchHandle}
            />
          </Col>
      <Notes showAlert={showAlert}/>
      

    </div>
   
  );
};
