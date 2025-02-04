import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
// import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import { useHistory } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  let history = useHistory();
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    efirstName: "",
    elastName: "",
    edob: "",
    egender: "",
    efatherName: "",
    efatherOcc: "",
    efatherNum: "",
    emotherName: "",
    emotherOcc: "",
    emotherNum: "",
    eemail: "",
    eactivity: "",
    ehealth: "",
    efeesMode: "",
    edateOfJuining: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      efirstName: currentNote.firstName,
      elastName: currentNote.lastName,
      edob: currentNote.dob,
      egender: currentNote.gender,
      efatherName: currentNote.fatherName,
      efatherOcc: currentNote.fatherOcc,
      efatherNum: currentNote.fatherNum,
      emotherName: currentNote.motherName,
      emotherOcc: currentNote.motherOcc,
      emotherNum: currentNote.motherNum,
      eemail: currentNote.email,
      eactivity: currentNote.activity,
      ehealth: currentNote.health,
      efeesMode: currentNote.feesMode,
      edateOfJuining: currentNote.dateOfJuining,
    });
  };
  const handleClick = (e) => {
    editNote(
      note.id,
      note.efirstName,
      note.elastName,
      note.edob,
      note.egender,
      note.efatherName,
      note.efatherOcc,
      note.efatherNum,
      note.emotherName,
      note.emotherOcc,
      note.emotherNum,
      note.eemail,
      note.eactivity,
      note.ehealth,
      note.efeesMode,
      note.edateOfJuining
    );
    refClose.current.click();
    props.showAlert("Updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      {/* <AddNote showAlert={props.showAlert} /> */}

      <button
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ display: "none" }}
      ></button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-name" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="form-group">
                  <label htmlFor="efirstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="efirstName"
                    name="efirstName"
                    value={note.efirstName}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="elastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="elastName"
                    name="elastName"
                    value={note.elastName}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    id="edob"
                    name="edob"
                    value={note.edob}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                <label>Gender</label>
              <select
                name="egender"
                id="egender"
                onChange={onChange}
                value={note.egender}
                required
              >
                <option >Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
              </div>

                <div className="form-group">
                  <label htmlFor="fatherName">fatherName</label>
                  <input
                    type="text"
                    className="form-control"
                    id="efatherName"
                    name="efatherName"
                    value={note.efatherName}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fatherName">father's Occ</label>
                  <input
                    type="text"
                    className="form-control"
                    id="efatherOcc"
                    name="efatherOcc"
                    value={note.efatherOcc}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="efatherNum">Father's num</label>
                  <input
                    type="text"
                    className="form-control"
                    id="efatherNum"
                    name="efatherNum"
                    value={note.efatherNum}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fatherName">Mother's Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emotherName"
                    name="emotherName"
                    value={note.emotherName}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emotherOcc">Mother's occ</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emotherOcc"
                    name="emotherOcc"
                    value={note.emotherOcc}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fatherName">MotherNum</label>
                  <input
                    type="number"
                    className="form-control"
                    id="emotherNum"
                    name="emotherNum"
                    value={note.emotherNum}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fatherName">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="eemail"
                    name="eemail"
                    value={note.eemail}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                <label>Activities</label>
              <select
                name="eactivity"
                id="eactivity"
                onChange={onChange}
                value={note.eactivity}
                required
              >
                <option >Select Activities</option>
                <option value="dance">Dance</option>
                <option value="gymnastics">Gymnastics</option>
                <option value="guitar">Guitar</option>
                <option value="art&Craft">Art&Craft</option>
                <option value="acting">Acting</option>
                <option value="martialArts">Martial Arts</option>
              </select>
              </div>
              <div className="form-group">
                <label>Haelth Problem</label>
              <select
                name="ehealth"
                id="ehealth"
                onChange={onChange}
                value={note.ehealth}
                required
              >
                <option >Select</option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
              </div>
              <div className="form-group">
                <label>Fees Mode</label>
              <select
                name="efeesMode"
                id="efeesMode"
                onChange={onChange}
                value={note.efeesMode}
                required
              >
                <option >Select</option>
                <option value="monthly">Monthly</option>
                <option value="qwertly">Qwertly</option>
                <option value="yearly">Yearly</option>
              </select>
              </div>
              <div className="form-group">
                  <label htmlFor="dob">Date of Juining</label>
                  <input
                    type="date"
                    className="form-control"
                    id="edateOfJuining"
                    name="edateOfJuining"
                    value={note.edateOfJuining}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleClick}
                className="btn btn-primary"
                disabled={
                  note.efirstName.length < 5 || note.efatherName.length < 5
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1 className="h1-text">Your Notes</h1>
      <div className="row my-3">
        <div className="notesContainer">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note, index) => {
          return (
            <Noteitem
              key={note._id}
              showAlert={props.showAlert}
              updateNote={updateNote}
              note={note}
              index={index}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
