export const getOrCreateEmergencyContact = async (userId: string) => {
  try {
    const emergencyContact = await fetch(`/api/user/emergency?userId=${userId}`);
    const emergencyContactJSON = await emergencyContact.json();
    if (emergencyContactJSON === null) {
      const newEmergencyContact = await fetch(`/api/user/emergency`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, body: {
          name: "",
          relationship: "",
          phone: ""
        } }),
      });
      return newEmergencyContact.json();
    } else {
      return emergencyContactJSON;
    }
  } catch (error) {
    console.error(error);
  }
}