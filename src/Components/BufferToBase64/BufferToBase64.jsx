import axios from "axios";

// Utility function to convert Buffer to Base64
export default async function BufferToBase64({ buffer }) {
  const back_api = process.env.REACT_APP_API_URL ;
  try {
    if (!buffer) {
      throw new Error("No buffer provided");
    }

    // Convert Buffer to JSON-compatible array
    const serializedBuffer = Array.from(new Uint8Array(buffer));

    // Send serialized buffer to backend
    const response = await axios.post(`${back_api}/BufferToBase64`, serializedBuffer, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Return the Base64 string
    return response.data.base64;
  } catch (error) {
    console.error("Error in BufferToBase64:", error);
    throw error; // Re-throw error for external handling
  }
}
