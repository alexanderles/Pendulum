import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../dbConfig/dbConfig";
import User from "../../../models/userModel";
import bcryptjs from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

connect();

export default async function POST(request: NextApiRequest, res: NextApiResponse) {
  console.log("In function");
  try {
    const reqBody: any = request.body;
    const { username, email, password } = reqBody;

    console.log("reqBody: ", reqBody);

    // Check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      res.json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    console.log("hashedpassword: ", hashedPassword);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log("Saved user: ", savedUser);

    res.json({
        message: "User created successfully",
        success: true,
        savedUser,
      });
  } catch (error: any) {
    console.log("error: ", error.message);
    res.json({ error: error.message });
  }
}
