
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TextField from "@/components/.ui/TextField";

const StudentInfoForm = () => {
  return (
    <div className="content-section">
      <div className="section-header">
        <PersonOutlineOutlinedIcon />
        <h3>Personal Information</h3>
      </div>
      <div className="section-content">
        <div className="form-container">
          <form>
            <div className="form-row">
              <TextField
                label="First Name"
                name="firstName"
                type="text"
                // disabled={isLoading}
                // errorMsg={signUpErrors.firstName?.errors[0]}
                formHelperText
              />
              <TextField
                label="Last Name"
                name="lastName"
                type="text"
                // disabled={isLoading}
                // errorMsg={signUpErrors.lastName?.errors[0]}
                formHelperText
              />
            </div>
            <div className="form-row">
              <TextField
                label="Phone Number"
                name="phone"
                type="text"
                // disabled={isLoading}
                // errorMsg={signUpErrors.firstName?.errors[0]}
                formHelperText
              />
              <TextField
                label="Email Address"
                name="email"
                type="text"
                // disabled={isLoading}
                // errorMsg={signUpErrors.lastName?.errors[0]}
                formHelperText
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StudentInfoForm;