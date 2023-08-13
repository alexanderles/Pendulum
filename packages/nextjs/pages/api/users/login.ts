import { connect } from "../../../dbConfig/dbConfig";
import User from "../../../models/userModel";
import bcryptjs from "bcryptjs";
import { deleteCookie, getCookie, getCookies, setCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

console.log("going to connect");
connect();
console.log("connected");

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const reqBody = await req.body;
    const { email, password } = reqBody;
    console.log(reqBody);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.json({ error: "User does not exist" });
    }

    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      res.json({ error: "Invalid password" });
    }

    // Create token data
    // const tokenData = {
    //   id: user._id,
    //   username: user.username,
    //   email: user.email,
    // };

    // Create token
    // const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
    //   expiresIn: "1d",
    // });

    // setCookie("token", token, { req, res, httpOnly: true });
    // console.log("response from login: ", res);

    const response = res.json({
      message: "Login successful",
      success: true,
    });

    return response;
  } catch (error: any) {
    res.json({ error: error.message });
  }
}
