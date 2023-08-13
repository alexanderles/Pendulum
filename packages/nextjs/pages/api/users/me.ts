import User from "../../../models/userModel";
import { connect } from "../../../dbConfig/dbConfig";
import { NextApiRequest, NextApiResponse } from "next";
import { useSession } from "next-auth/react"

connect();
console.log("connected");

export default async function GET(req: NextApiRequest, res: NextApiResponse) {

  try {
    console.log("trying");

    const reqBody = await req.body;
    const { email } = reqBody;
    console.log("email:", email);
    const user = await User.findOne({ email }).select("-password");

    console.log("user from me.ts: ", user);
    if (!user) {
      res.json({ error: "Could not find user" });
    }

    return res.json({ message: "User found", data: user });
  } catch (error: any) {
    return res.json({ error: error.message });
  }
}