import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import toast from "react-hot-toast";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Crendentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        console.log("credentials: ", credentials)
        const user = {
            email: credentials.email, 
            password: credentials.password,
        }
        try {
          const response = await axios.post(process.env.NEXTAUTH_URL + "/api/users/login", user);
          console.log("Login success: ", response.data);
          toast.success("Login success");
          const sessionUser = response.data.user;
          return sessionUser;
        } catch (error) {
          console.log("Login failed: ", error.message);
          toast.error(error.message);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
