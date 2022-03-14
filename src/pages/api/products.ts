import axios from "axios";
import products from '../../utils/mock.json'
export default async function handler(req, res) {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    res.status(200).json(response.data);
  } catch (error) {
    if(error.status === 504) {
      res.status(200).json(products);
    }
    res.status(error.status).json({ message: error.message });
  }
}
