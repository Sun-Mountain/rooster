import { getTermSignUpDetailsByTermId } from "@/lib/prisma/termSignup"


export function getTermRooster(classId: string) {
  const termSignupInfo = getTermSignUpDetailsByTermId(classId)
	
  return termSignupInfo
}