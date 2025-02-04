
// import Notes from "./Notes";
import AddNote from "./AddNote";


export const FormList = (props) => {
 const  {showAlert}= props
  return (
    <div>
      {/* <Notes showAlert={showAlert}/> */}
      <AddNote showAlert={showAlert} />

    </div>
   
  );
};
