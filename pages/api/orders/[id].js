import dbConnect from "../../../util/mongo";
import Order from "../../../models/order";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies,
  } = req;
  const token = cookies.token;

  dbConnect();

  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(`error: ${err}`);
    }
  }
  if (method === "PUT") {
    if (!token || token !== process.env.TOKEN)
      return res.status(401).json("Not authenticated");
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json(`error: ${err}`);
    }
  }
  if (method === "DELETE") {
    if (!token || token !== process.env.TOKEN)
      return res.status(401).json("Not authenticated");
    try {
      await Order.findByIdAndDelete(id);
      res.status(201).json("The order has been deleted!");
    } catch (err) {
      res.status(500).json(`error: ${err}`);
    }
  }
}
