import { FullNameFields } from "./FullName";
import { PhoneNumberFields } from "./PhoneNumber";
import { TextField } from "@/components/UI/TextField";
import { EmergencyContactProps } from "@/lib/interfaces/user";

export const EmergencyContactFields = (props: EmergencyContactProps) => {
  return (
    <div className="divider-top">
      <h3>Emergency Contact Information:</h3>
      <FullNameFields
        firstNameFieldName="emergencyContactFirstName"
        lastNameFieldName="emergencyContactLastName"
        firstNameValue={props?.firstName || ''}
        lastNameValue={props?.lastName || ''}
        emergencyContact={true}
      />
      <TextField
        label="Relationship"
        name="emergencyContactRelationship"
        initialValue={props?.relationship || ''}
        type="text"
      />
      <PhoneNumberFields
        areaCode={props?.phoneNumber?.areaCode || ''}
        numberGrp1={props?.phoneNumber?.numberGrp1 || ''}
        numberGrp2={props?.phoneNumber?.numberGrp2 || ''}
        emergencyContact={true}
      />
    </div>
  )
};