'use client';

import { Button } from "@/components/_ui/Button";
import { TextField } from "@/components/_ui/TextField";

export const AccountAddressForm = () => {
  return (
    <div className="form-container editor">
      <h3>Address</h3>
      <form>
        <div className="flex-fields-container">
          <TextField label="Street 1" name="street1" />
          <TextField label="Street 2" name="street2" />
        </div>
        <div className="flex-fields-container">
          <TextField label="City" name="city" />
          <TextField label="State" name="state" />
          <TextField label="Zip Code" name="zip" />
        </div>
        <div className="btn-container">
          <Button type="submit" className="btn btn-primary">Update</Button>
        </div>
      </form>
    </div>
  )
};