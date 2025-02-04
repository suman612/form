
import React, { useContext, useState } from "react";
import { Link } from 'react-scroll'
// import{ Link as Link2} from 'react-router-dom'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'
import noteContext from "../context/notes/noteContext";
import "./style.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddNote = (props) => {
  const context = useContext(noteContext);
  let history = useHistory();
  const { addNote } = context;

  const [note, setNote] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    fatherName: "",
    fatherOcc: "",
    fatherNum: "",
    motherName: "",
    motherOcc: "",
    motherNum: "",
    email: "",
    activity: "",
    health: "",
    feesMode: "",
    dateOfJuining: "",
    agree: "",
  });
  const handleClick = (e) => {
    e.preventDefault();

    addNote(
      note.firstName,
      note.lastName,
      note.dob,
      note.gender,
      note.fatherName,
      note.fatherOcc,
      note.fatherNum,
      note.motherName,
      note.motherOcc,
      note.motherNum,
      note.email,
      note.activity,
      note.health,
      note.feesMode,
      note.dateOfJuining,
      note.agree,
    );
    if (validateForm()) {
      props.showAlert("Added successfully", "success");
      history.push("/formList");
      console.log('Form Data:', note);
    } else {
      console.log('Form has errors');
    }

  };

  // ------------------------------Validatiaon-----------------------------

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!note.firstName) {
      newErrors.firstName = 'First Name is required';
    } else if (note.firstName.length < 3) {
      newErrors.firstName = 'First Name must be at least 3 characters';
    }

    //last Name validation
    if (!note.lastName) {
      newErrors.lastName = 'Last Name is required';
    } else if (!/^[a-zA-Z]+$/.test(note.lastName.length < 3)) {
      newErrors.lastName = 'Last Name must be at least 3 characters';
    }
    // dob

    if (!note.dob) {
      newErrors.dob = 'Date of birth is required';
    }
    // gender
    if (!note.gender) {
      newErrors.gender = 'Gender is required';
    }
    // fatherName

    if (!note.fatherName) {
      newErrors.fatherName = 'Father Name is required';
    } else if (note.fatherName.length < 3) {
      newErrors.fatherName = 'Father Name must be at least 3 characters';
    }
    // fatherOcc
    if (!note.fatherOcc) {
      newErrors.fatherOcc = 'Father Occ is required';
    } else if (note.fatherOcc.length < 3) {
      newErrors.fatherOcc = 'Father Occ must be at least 3 characters';
    }
    // fatherNum
    if (!note.fatherNum) {
      newErrors.fatherNum = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(note.fatherNum)) {
      newErrors.fatherNum = 'Invalid mobile number (must be 10 digits)';
    }
    // motherName
    if (!note.motherName) {
      newErrors.motherName = 'Mother Name is required';
    } else if (note.motherName.length < 3) {
      newErrors.motherName = 'Mother Name must be at least 3 characters';
    }

    // motherOcc
    if (!note.motherOcc) {
      newErrors.motherOcc = 'Mother Occ is required';
    } else if (note.motherOcc.length < 3) {
      newErrors.motherOcc = 'Mother Occ must be at least 3 characters';
    }
    // motherNum
    // Mobile number validation
    if (!note.motherNum) {
      newErrors.motherNum = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(note.motherNum)) {
      newErrors.motherNum = 'Invalid mobile number (must be 10 digits)';
    }
    // email

    // Email validation
    if (!note.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(note.email)) {
      newErrors.email = 'Invalid email address';
    }


    //activity
    if (!note.activity) {
      newErrors.activity = "Activity is required"
    }
    //the string to be more than 10 chars

    // health
    if (!note.health) {
      newErrors.health = "Health is required"
    }
    //the string to be more than 10 chars
    // else if(note.password.length < 10){
    //     errors.password='Password length insufficient'
    // }
    // feesMode
    if (!note.feesMode) {
      newErrors.feesMode = "Fees Mode is required"
    }
    //the string to be more than 10 chars
    // else if(note.password.length < 10){
    //     errors.password='Password length insufficient'
    // }
    // dateOfJuining
    if (!note.dateOfJuining) {
      newErrors.dateOfJuining = "Date Of Juining is required"
    }
    //the string to be more than 10 chars
    // else if(note.password.length < 10){
    //     errors.password='Password length insufficient'
    // }

    // Checkbox validation
    if (!note.agree) {
      newErrors.agree = 'You must agree to the Rules & Regulations';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const options = [
    { id: 1,  label: 'Dance' },
    { id: 2, label: 'Gymnastics' },
    { id: 3, label: 'Guitar' },
    { id: 4, label: 'Art&Craft' },
    { id: 4, label: 'Acting' },
    { id: 4, label: 'Martial Arts' },
];


  const onChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === 'interests' ) {
      const updatedInterests = checked
      // const updatedActivity = activitiCheked
        ? [...note.agree,    value]
        : note.agree.filter((item) => item !== value)

        ? [...note.activity,    value]
            : note.activity.filter((item) => item !== value)
        setNote({ ...note,agree: updatedInterests, activity: updatedInterests});
      }
      else {
          setNote({ ...note, [name]: value });
        }
    // setNote({ ...note, [e.target.name]: e.target.value });
  };


  return (
    <div>
      <div className="container">
        <h1 className="h1-text">Registration Form</h1>
        <form >
          <div className="main-user-info">
            <div className="user-input-box">
              <label >First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                // aria-describedby="emailHelp"
                onChange={onChange}
                minLength={2}
                required
                value={note.firstName}
              />

              {errors.firstName && <span className="validationError">{errors.firstName}</span>}
            </div>
            <div className="user-input-box">
              <label >Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                onChange={onChange}
                required
                value={note.lastName}
              />
              {errors.lastName && <span className="validationError">{errors.lastName}</span>}
            </div>
            <div className="user-input-box">
              <label >Date Of Birth</label>
              <input
                type="date"
                // className="form-control"
                id="dob"
                name="dob"
                onChange={onChange}
                required
                value={note.dob}
              /> {errors.dob && <span className="validationError">{errors.dob}</span>}
            </div>

            <div className="user-input-box">
              <label>Gender</label>
              <select
                name="gender"
                id="gender"
                className="dropDown"
                onChange={onChange}
                value={note.gender}
                required
              >
                <option ></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
              {errors.gender && <span className="validationError">{errors.gender}</span>}
            </div>
            <div className="user-input-box">
              <label >Father's Name</label>
              <input
                type="text"
                className="form-control"
                id="fatherName"
                name="fatherName"
                onChange={onChange}
                required
                value={note.fatherName}
              />
              {errors.fatherName && <span className="validationError">{errors.fatherName}</span>}
            </div>
            <div className="user-input-box">
              <label >Father's Occ</label>
              <input
                type="text"
                className="form-control "
                id="fatherOcc"
                name="fatherOcc"
                onChange={onChange}
                required
                value={note.fatherOcc}
              />
              {errors.fatherOcc && <span className="validationError">{errors.fatherOcc}</span>}
            </div>
            <div className="user-input-box">
              <label >Father's Mobile</label>
              <input
                type="number"
                className="form-control"
                id="fatherNum"
                name="fatherNum"
                onChange={onChange}
                required
                value={note.fatherNum}
              />{errors.fatherNum && <span className="validationError">{errors.fatherNum}</span>}
            </div>
            <div className="user-input-box">
              <label >Mother's Nmae</label>
              <input
                type="text"
                className="form-control"
                id="motherName"
                name="motherName"
                onChange={onChange}
                required
                value={note.motherName}
              />
              {errors.motherName && <span className="validationError">{errors.motherName}</span>}
            </div>
            <div className="user-input-box">
              <label >Mother's Occ</label>
              <input
                type="text"
                className="form-control"
                id="motherOcc"
                name="motherOcc"
                onChange={onChange}
                required
                value={note.motherOcc}
              />{errors.motherOcc && <span className="validationError">{errors.motherOcc}</span>}
            </div>
            <div className="user-input-box">
              <label >Mother's Mobile</label>
              <input
                type="number"
                className="form-control"
                id="motherNum"
                name="motherNum"
                onChange={onChange}
                required
                value={note.motherNum}
              />{errors.motherNum && <span className="validationError">{errors.motherNum}</span>}
            </div>
            <div className="user-input-box">
              <label >Email ID</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={onChange}
                required
                value={note.email}
              />{errors.email && <span className="validationError">{errors.email}</span>}

            </div>

            {/* <div className="user-input-box">
              <label>Activities</label>
              <label>Interests:</label>
              <label> <input value="Dance-" onChange={onChange} checked={note.activity.includes('Dance-')} type="checkbox" name="interests" />Dance</label>
            <label><input value="Gymnastics-" onChange={onChange} checked={note.activity.includes('Gymnastics-')} type="checkbox" name="interests" />Gymnastics</label>
            <label><input value="Guitar-" onChange={onChange} checked={note.activity.includes('Guitar-')} type="checkbox" name="interests" />Guitar</label>
            <label><input value="Art&Craft-" onChange={onChange}checked={note.activity.includes('Art&Craft-')} type="checkbox" name="interests" />Art&Craft</label> 
            <label><input value="Acting-"onChange={onChange} checked={note.activity.includes('Acting-')} type="checkbox" name="interests" />Acting</label> 
            <label><input value="Martial Arts-" onChange={onChange}checked={note.activity.includes('Martial Arts')} type="checkbox" name="interests" />Martial Arts</label> 
              {errors.activity && <span className="validationError">{errors.activity}</span>}
            </div> */}

            <div className="user-input-box">
              
            <label>Choose Activitis</label>
            {options.map((option) => (
                    <div key={option.id}>
                        <label>
                            <input
                            name="interests"
                                type="checkbox"
                                value={option.label}
                                checked={note.activity.includes(option.label)}
                                onChange={onChange}
                            />
                            {option.label}
                        </label>
                        {errors.activity && <span className="validationError">{errors.activity}</span>}
                    </div>
                ))}
</div>
            <div className="user-input-box"> 
              <label>Any Health Problem?</label>
              <select
                // className="gender <%=errors.gender ? 'is-invalid' : '' %>"
                name="health"
                id="health"
                className="dropDown"
                onChange={onChange}
                value={note.health}
                required
              >
                <option ></option>
                <option value="No">No</option>
                <option value="yes">Yes</option>
              </select>
              {errors.health && <span className="validationError">{errors.health}</span>}
            </div>

            <div className="user-input-box">
              <label>Fees Mode</label>
              <select
                // className="gender <%=errors.gender ? 'is-invalid' : '' %>"
                name="feesMode"
                id="feesMode"
                className="dropDown"
                // onChange={setdata}
                onChange={onChange}
                value={note.feesMode}
                required
              >
                <option ></option>
                <option value="Monthly">Monthly</option>
                <option value="Quaterly">Quaterly</option>
                <option value="Yearly">Yearly</option>
              </select>
              {errors.feesMode && <span className="validationError">{errors.feesMode}</span>}

            </div>
            <div className="user-input-box">
              <label >Date of Joining</label>
              <input
                className="form-control"
                type="date"
                id="dateOfJuining"
                name="dateOfJuining"
                onChange={onChange}
                required
                value={note.dateOfJuining}

              />
              {errors.dateOfJuining && <span className="validationError">{errors.dateOfJuining}</span>}
            </div>
            <div className="tirmsConditionBox">
              <label>Rules & Regulations</label>
              <ul className="tirmsCondition">
                <li>
                  Student should be Punctual, must come on alloted time as no
                  extra time will given.
                </li>
                <li>Leaves from student's side would be non-adjustable.</li>
                <li>Fees and admission charges are non-refundable</li>
                <li>
                  Parents are requested to pay fee on there respective due
                  date to avoid late payment charges.
                </li>
                <li>Enrollment date would be consider as due date</li>
              </ul>
              <div className="except">
                <label >I Agree</label>
                <label>
                <input
                  className="input-box"
                  type="checkbox"
                  id="agree"
                  name="interests"
                  onChange={onChange}
                  required
                  checked={note.agree.includes('.')}
                  value="."
                />  {errors.agree && <span className="validationError">{errors.agree}</span>}
                </label>
              </div>
            </div>
          </div>

          <div className="form-submit-btn">
            <input type="submit"
              onClick={handleClick}
              disabled={note.firstName.length < 2} />
          </div>
        </form>
        <div className="top">
                <Link activeClass='active' to='top' spy={true} smooth={true} duration={900}>
                    <BsFillArrowUpCircleFill className='icon' />
                </Link>
                </div>
      </div>
    </div>
  );
};
export default AddNote;
