import Pendulum from "~~/models/pendulumModel";
import { connect } from "../../../dbConfig/dbConfig";
import User from "../../../models/userModel";
import { NextApiRequest, NextApiResponse } from "next";

connect();

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const reqBody = await req.body;
    const { pendulum, userData } = reqBody;
    console.log("BODY: ", reqBody);

    const pendulums = userData.pendulums;
    console.log("pendulums: ", pendulums);
    console.log("pendulum.addess: ", pendulum.pendulumAddr);
    
    const pendulumFromDb = await Pendulum.findOne({address: pendulum.pendulumAddr});
    console.log("pendulumFromDb: ", pendulumFromDb);
    const refId: String = pendulumFromDb._id.toString();

    console.log("new id: ", refId);
    // const refObject = {refId};
    // console.log("refObject: ", refObject);
    
    const status = await User.updateOne({ email: userData.email }, {$push: {pendulums: refId}});


    const response = res.json({
      message: "Pendulum addition successful",
      success: true,
      status,
    });

    return response;
  } catch (error: any) {
    res.json({ error: error.message });
  }
}
