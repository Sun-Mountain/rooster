import { getClassById } from "prisma/schema/termSignup"


export function getTermRooster(classId: string) {
  const termSignupInfo = getTermSignupByTermId(classId)
	
  return termSignupInfo
}