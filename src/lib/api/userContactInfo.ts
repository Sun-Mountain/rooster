export const getOrCreateContactInfo = async (userId: string) => {
  try {
    const contactInfo = await fetch(`/api/user/contact?userId=${userId}`);
    const contactInfoJSON = await contactInfo.json();
    if (contactInfoJSON === null) {
      const newContactInfo = await fetch(`/api/user/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, body: {
          street1: "",
          street2: "",
          city: "",
          state: "",
          zip: "",
          phone: ""
        } }),
      });
      return newContactInfo.json();
    } else {
      return contactInfoJSON;
    }
  } catch (error) {
    console.error(error);
  }
};