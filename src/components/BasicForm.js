import useInput from "../hooks/useInput";

const isNotEmpty = value => value.trim() !== ''
const isEmail = value => value.includes('@')

const BasicForm = (props) => {
  const {
    value: firstName, 
    valueUpdateHandler: firstNameUpdateHandler, 
    valueBlurHandler: firstNameBlurHandler, 
    reset: firstNameReset, 
    isInvalid: firstNameIsInvalid,
    isValid: firstNameIsValid
  } = useInput(isNotEmpty)

  const {
    value: lastName, 
    valueUpdateHandler: lastNameUpdateHandler, 
    valueBlurHandler: lastNameBlurHandler, 
    reset: lastNameReset, 
    isInvalid: lastNameIsInvalid,
    isValid: lastNameIsValid
  } = useInput(isNotEmpty)

  const {
    value: email, 
    valueUpdateHandler: emailUpdateHandler, 
    valueBlurHandler: emailBlurHandler, 
    reset: emailReset, 
    isInvalid: emailIsInvalid,
    isValid: emailIsValid
  } = useInput(isEmail)

  let formIsValid = firstNameIsValid && lastNameIsValid && emailIsValid

  const formSubmitHandler = (e) => {
    e.preventDefault()
    if(!formIsValid) {
      // following if statements search why form is invalid to show proper error messages
      // these are considered for the case when the user click on Submit button without even focusing on all inputs 
      if (!firstNameIsValid) firstNameBlurHandler()
      if (!lastNameIsValid) lastNameBlurHandler()
      if (!emailIsValid) emailBlurHandler()
      return
    }
    console.log({firstName, lastName, email})
    firstNameReset()
    lastNameReset()
    emailReset()
  }

  
  return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className={`form-control ${firstNameIsInvalid && 'invalid'}`}>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' value={firstName} onChange={firstNameUpdateHandler} onBlur={firstNameBlurHandler}/>
          {firstNameIsInvalid && <p className="error-text"> first name must not be empty</p>}
        </div>
        <div className={`form-control ${lastNameIsInvalid && 'invalid'}`}>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' value={lastName} onChange={lastNameUpdateHandler} onBlur={lastNameBlurHandler}/>
          {lastNameIsInvalid && <p className="error-text"> last name must not be empty</p>}
        </div>
      </div>
      <div className={`form-control ${emailIsInvalid && 'invalid'}`}>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name' value={email} onChange={emailUpdateHandler} onBlur={emailBlurHandler}/>
        {emailIsInvalid && <p className="error-text"> email must be valid</p>}
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
