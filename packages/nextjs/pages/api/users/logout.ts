import { deleteCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";


export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    deleteCookie("token", { req, res, httpOnly: true })
    const response = res.json({
      message: "Logout successful",
      success: true,
    });
    return response;
  } catch (error: any) {
    return res.json({ error: error.message });
  }
}
