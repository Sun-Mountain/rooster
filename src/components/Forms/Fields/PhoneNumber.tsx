import { TextField } from '@/components/UI/TextField';
import { PhoneNumberProps } from '@/lib/interfaces/user';

export const PhoneNumberFields = ({ ...props }: PhoneNumberProps) => {
  return (
    <div className="phone-field-container">
      <TextField
        label="(###)"
        name="areaCode"
        initialValue={props?.areaCode || ''}
        type="text"
      />
      <TextField
        label="###"
        name="numberGrp1"
        initialValue={props?.numberGrp1 || ''}
        type="text"
      />
      <span className="phone-separator">-</span>
      <TextField
        label="####"
        name="numberGrp2"
        initialValue={props?.numberGrp2 || ''}
        type="text"
      />
    </div>
  )
}