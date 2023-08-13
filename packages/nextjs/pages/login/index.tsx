"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Button from "~~/components/Button";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  function handleSignIn(e: any) {
    e.preventDefault();
    signIn("credentials", { email: user.email, password: user.password });
    router.push("/profile");
  }

  // const onLogin = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.post("/api/users/login", user);
  //     console.log("Login success: ", response.data);
  //     toast.success("Login success")

  //     router.push(`/profile`);
  //   } catch (error: any) {
  //     console.log("Login failed: ", error.message);
  //     toast.error(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center">{loading ? "Processing..." : "Login"}</h1>
      <hr />
      {/* Email */}
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-stone-700"
        id="email"
        type="text"
        value={user.email}
        onChange={e => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      {/* Password */}
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-stone-700"
        id="password"
        type="password"
        value={user.password}
        onChange={e => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      {/* Submit */}
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={handleSignIn}
      >
        Login
      </button>
      <Link href="/signup">Sign up with a new account</Link>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Button onClick={() => signIn("google")}>Sign in with Google</Button>
    </div>
  );
}
