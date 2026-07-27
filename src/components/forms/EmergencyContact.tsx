
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import TextField from "@/components/.ui/TextField";

const EmergencyContactForm = () => {
  return (
    <div className="content-section">
      <div className="section-header with-cav">
        <div>
          <LocalPhoneOutlinedIcon />
          <h3>Emergency Contact</h3>
        </div>
        <div className="caveat">
          Required for in-person classes
        </div>
      </div>
      <div className="section-content">
        <div className="form-container">
          <form>
            <div className="form-row">
              <TextField
                label="Full Name"
                name="name"
                type="text"
                // disabled={isLoading}
                // errorMsg={signUpErrors.firstName?.errors[0]}
                formHelperText
              />
              <TextField
                label="Relationship (optional)"
                name="relationship"
                type="text"
                // disabled={isLoading}
                // errorMsg={signUpErrors.lastName?.errors[0]}
                formHelperText
              />
            </div>
            <TextField
              label="Phone Number"
              name="phone"
              type="text"
              // disabled={isLoading}
              // errorMsg={signUpErrors.firstName?.errors[0]}
              formHelperText
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default EmergencyContactForm;