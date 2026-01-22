const API_URL = import.meta.env.PROD ? "" : "http://localhost:3001";

export async function submitContact(data) {
  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Error submitting contact:", error);
    return { success: false, message: "Network error" };
  }
}

export async function submitBooking(data) {
  try {
    const response = await fetch(`${API_URL}/api/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Error submitting booking:", error);
    return { success: false, message: "Network error" };
  }
}
