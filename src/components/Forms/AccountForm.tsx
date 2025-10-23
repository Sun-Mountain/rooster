import { AccountLinks } from '../AccountLinks';
import { Button } from '../UI/Button';
import { TextField } from '../UI/TextField';

interface AccountFormProps {
  showSignIn?: boolean;
  showSignUp?: boolean;
}

export const AccountForm = (
  { showSignIn, showSignUp }: AccountFormProps
) => {
  return (
    <div className="form-container">
      <form>
        {showSignIn && (
          <>
            <TextField
              label="First Name"
              value=""
              type="text"
            />
            <TextField
              label="Last Name"
              value=""
              type="text"
            />
          </>
        )}
        <TextField
          label="Email"
          value=""
          type="email"
        />
        <TextField
          label="Password"
          value=""
          type="password"
        />
        {showSignIn && (
          <TextField
            label="Confirm Password"
            value=""
            type="password"
          />
        )}
        <Button>{showSignIn ? 'Sign Up' : 'Sign In'}</Button>
      </form>
      <AccountLinks showSignIn={showSignIn} showSignUp={showSignUp} />
    </div>
  );
};
