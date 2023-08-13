import { connect } from "../../../dbConfig/dbConfig";
import { NextApiRequest, NextApiResponse } from "next";
import Pendulum from "~~/models/pendulumModel";

connect();
console.log("connected");

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("trying");

    const reqBody = await req.body;
    const { _id } = reqBody;
    console.log("_id:", _id.toString());
    const pendulum = await Pendulum.find({ _id });

    console.log("pendulum from findPendulum: ", pendulum);
    if (!pendulum) {
      res.json({ error: "Could not find pendulum" });
    }

    return res.json({ message: "Pendulum found", data: pendulum });
  } catch (error: any) {
    return res.json({ error: error.message });
  }
}
