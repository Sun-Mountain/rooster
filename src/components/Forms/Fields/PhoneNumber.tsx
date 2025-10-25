import { TextField } from '@/components/UI/TextField'

export const PhoneNumberFields = () => {
  return (
    <div className="phone-field-container">
      <TextField
        label="(###)"
        name="areaCode"
        value=""
        type="text"
      />
      <TextField
        label="###"
        name="numberGrp1"
        value=""
        type="text"
      />
      <span className="phone-separator">-</span>
      <TextField
        label="####"
        name="numberGrp2"
        value=""
        type="text"
      />
    </div>
  )
}