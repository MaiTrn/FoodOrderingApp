// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../../util/mongo";
import Product from "../../../models/product";

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
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(`error: ${err}`);
    }
  }
  if (method === "PUT") {
    if (!token || token !== process.env.TOKEN)
      return res.status(401).json("Not authenticated");
    try {
      const product = await Product.findByIdAndUpdate(id, req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(`error: ${err}`);
    }
  }
  if (method === "DELETE") {
    if (!token || token !== process.env.TOKEN)
      return res.status(401).json("Not authenticated");
    try {
      await Product.findByIdAndDelete(id);
      res.status(201).json("The product has been deleted!");
    } catch (err) {
      res.status(500).json(`error: ${err}`);
    }
  }
}
