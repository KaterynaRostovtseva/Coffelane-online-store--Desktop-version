import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get("https://onlinestore-928b.onrender.com/api/products", {
      params: req.query, 
    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
}
