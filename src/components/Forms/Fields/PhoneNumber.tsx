import { TextField } from '@/components/UI/TextField';
import { PhoneNumberProps } from '@/lib/interfaces/user';

export const PhoneNumberFields = ({ ...props }: PhoneNumberProps) => {
  return (
    <div className="field-group">
      <label className="field-label">Phone Number:
        <div className="phone-field-container">
          <TextField
            label="(###)"
            name={props.emergencyContact ? 'emergencyContactAreaCode' : 'areaCode'}
            initialValue={props?.areaCode || ''}
            type="text"
          />
          <TextField
            label="###"
            name={props.emergencyContact ? 'emergencyContactNumberGrp1' : 'numberGrp1'}
            initialValue={props?.numberGrp1 || ''}
            type="text"
          />
          <span className="phone-separator">-</span>
          <TextField
            label="####"
            name={props.emergencyContact ? 'emergencyContactNumberGrp2' : 'numberGrp2'}
            initialValue={props?.numberGrp2 || ''}
            type="text"
          />
        </div>
      </label>
    </div>
  )
}