import { PhoneNumProps } from "@/lib/types";
import { TextField } from "@/components/_ui/TextField";

interface PhoneNumberFieldProps {
  isLoading: boolean;
  formAreaCode?: string;
  formPrefix?: string;
  formLineNumber?: string;
  errors?: {
    areaCode?: string[];
    prefix?: string[];
    lineNumber?: string[];
  };
}

export const PhoneNumberFields = ({
  areaCode,
  prefix,
  lineNumber,
  isLoading,
  errors,
  formAreaCode = "areaCode",
  formPrefix = "prefix",
  formLineNumber = "lineNumber"
}: PhoneNumProps & PhoneNumberFieldProps) => {
  return (
    <div className="field-group">
      Phone Number:
      <div className="phone-field-container">
        <TextField
          label="Area Code"
          name={formAreaCode}
          type="text"
          initialValue={areaCode || ''}
          disabled={isLoading}
          errorMsg={errors?.areaCode?.[0]}
        />
        <TextField
          label="XXX"
          name={formPrefix}
          type="text"
          initialValue={prefix || ''}
          disabled={isLoading}
          errorMsg={errors?.prefix?.[0]}
        />
        <div className="phone-separator">-</div>
        <TextField
          label="XXXX"
          name={formLineNumber}
          type="text"
          initialValue={lineNumber || ''}
          disabled={isLoading}
          errorMsg={errors?.lineNumber?.[0]}
        />
      </div>
    </div>
  )
}