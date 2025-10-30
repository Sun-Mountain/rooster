import { TextField } from "@/components/UI/TextField"

interface ZipCountryFieldsProps {
  zipName?: string;
  countryName?: string;
  zipValue?: string;
  countryValue?: string;
}

export const ZipCountryFields = ({ zipName, countryName, zipValue, countryValue }: ZipCountryFieldsProps) => {
  return (
    <div className="flex-fields-container">
      <TextField
        label="Zip/Postal Code"
        name={
          zipName ? zipName : 'zip'
        }
        initialValue={zipValue ? zipValue : ''}
        type="text"
      />
      <TextField
        label="Country"
        name={
          countryName ? countryName : 'country'
        }
        initialValue={countryValue ? countryValue : ''}
        type="text"
      />
    </div>
  )
}
