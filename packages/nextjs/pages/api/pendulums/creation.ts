import { connect } from "../../../dbConfig/dbConfig";
import Pendulum from "../../../models/pendulumModel";
import { NextApiRequest, NextApiResponse } from "next";

connect();

export default async function POST(request: NextApiRequest, res: NextApiResponse) {
  try {
    const reqBody: any = request.body;
    const { name, count, pendulumAddr } = reqBody;

    console.log("reqBody: ", reqBody);

    // Check if pendulum already exists in database
    const pendulum = await Pendulum.findOne({ pendulumAddr });

    if (pendulum) {
      res.json({ error: "Pendulum is already in database" });
    }

    const newPendulum = new Pendulum({
      name,
      count,
      address: pendulumAddr,
    });

    const savedPendulum = await newPendulum.save();
    console.log("Saved user: ", savedPendulum);

    res.json({
        message: "Pendulum created successfully",
        success: true,
        savedPendulum,
      });
  } catch (error: any) {
    console.log("error: ", error.message);
    res.json({ error: error.message });
  }
}
