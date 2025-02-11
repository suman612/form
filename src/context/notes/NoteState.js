import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://registration-form-4mhi.onrender.com";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get All Notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    //  console.log(json);
    setNotes(json);
  };
  // Add a Note
  const addNote = async (
    firstName,
    lastName,
    dob,
    gender,
    fatherName,
    fatherOcc,
    fatherNum,
    motherName,
    motherOcc,
    motherNum,
    email,
    activity,
    health,
    feesMode,
    dateOfJuining,
    agree,
  ) => {
    // TODO: API Call
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({
        firstName,
        lastName,
        dob,
        gender,
        fatherName,
        fatherOcc,
        fatherNum,
        motherName,
        motherOcc,
        motherNum,
        email,
        activity,
        health,
        feesMode,
        dateOfJuining,
        agree,
      }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);

    // console.log("Delete" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    })

    setNotes(newNotes);
  };
  // Edit a Note
  const editNote = async (
    id,
    firstName,
    lastName,
    dob,
    gender,
    fatherName,
    fatherOcc,
    fatherNum,
    motherName,
    motherOcc,
    motherNum,
    email,
    activity,
    health,
    feesMode,
    dateOfJuining,
    agree
  ) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({
        firstName,
        lastName,
        dob,
        gender,
        fatherName,
        fatherOcc,
        fatherNum,
        motherName,
        motherOcc,
        motherNum,
        email,
        activity,
        health,
        feesMode,
        dateOfJuining,
        agree
      }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].firstName = firstName;
        newNotes[index].lastName = lastName;
        newNotes[index].dob = dob;
        newNotes[index].gender = gender;
        newNotes[index].fatherName = fatherName;
        newNotes[index].fatherOcc = fatherOcc;
        newNotes[index].fatherNum = fatherNum;
        newNotes[index].motherName = motherName;
        newNotes[index].motherOcc = motherOcc;
        newNotes[index].motherNum = motherNum;
        newNotes[index].email = email;
        newNotes[index].activity = activity;
        newNotes[index].health = health;
        newNotes[index].feesMode = feesMode;
        newNotes[index].dateOfJuining = dateOfJuining;
        newNotes[index].agree = agree;
        break;
      }
    }
    console.log(newNotes);
    setNotes(newNotes);
  };

  const searchHandle = async (event) => {
    let key = event.target.value
    if (key) {
      let response = await fetch(`${host}/api/notes/search/${key}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        // body: JSON.stringify({ name, dob, fatherName }),
      })
      response = await response.json()
      if (response) {
        setNotes(response)
      }
    }

    else {
      addNote()
    }




  }

  return (
    // <NoteContext.Provider value={{state, update}}>
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes, searchHandle }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
