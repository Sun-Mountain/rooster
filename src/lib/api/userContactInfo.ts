export const getOrCreateContactInfo = async (userId: string) => {
  try {
    const contactInfo = await fetch(`/api/user/contact?userId=${userId}`);
    const contactInfoJSON = await contactInfo.json();
    if (!contactInfoJSON) {
      const newContactInfo = await fetch(`/api/user/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      return newContactInfo.json();
    } else {
      return contactInfoJSON;
    }
  } catch (error) {
    console.error(error);
  }
};