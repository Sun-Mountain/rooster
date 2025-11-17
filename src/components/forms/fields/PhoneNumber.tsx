import { PhoneNumProps } from "@/lib/types";
import { TextField } from "@/components/_ui/TextField";

interface PhoneNumberFieldProps {
  isLoading: boolean;
  formAreaCode?: string;
  formPrefix?: string;
  formLineNum?: string;
  errors?: {
    areaCode?: string[];
    prefix?: string[];
    lineNum?: string[];
  };
}

export const PhoneNumberFields = ({
  areaCode,
  prefix,
  lineNum,
  isLoading,
  errors,
  formAreaCode = "areaCode",
  formPrefix = "prefix",
  formLineNum = "lineNum"
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
          name={formLineNum}
          type="text"
          initialValue={lineNum || ''}
          disabled={isLoading}
          errorMsg={errors?.lineNum?.[0]}
        />
      </div>
    </div>
  )
}