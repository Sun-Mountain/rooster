import { getClassById } from "prisma/schema/class"


export function getClassRooster(classId: string) {
	const classInfo = getClassById(classId)
	
	
}