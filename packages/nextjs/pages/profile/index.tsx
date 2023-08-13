"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Button from "~~/components/Button";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [userData, setUserData] = useState();

  useEffect(() => {
    // Redirect to the login page if the user is not signed in
    if (!session?.user) {
      router.push("/login");
    }

    const getUserDetails = async () => {
      const res = await axios.post("/api/users/me", {email: session?.user?.email});
      console.log("user maybe: ", res.data.data);
      setUserData(res.data.data);
    };

    getUserDetails();

  }, []);

  

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="/purple-gradient-1.jpg" alt="Profile" className="w-16 h-16 rounded-full mr-4" />
          <div>
            <h1 className="text-2xl font-semibold">{userData? userData.username : (<>Name</>)}</h1>
            <p className="text-gray-500">Expert</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-blue-500">
            Twitter
          </a>
          <a href="#" className="text-blue-500">
            Facebook
          </a>
          <a href="#" className="text-blue-500">
            Instagram
          </a>
          <a href="#" className="text-blue-500">
            GitHub
          </a>
        </div>
      </div>
      <p className="mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel tincidunt quam. Donec nec odio vitae eros
        ultrices vehicula vel eget libero. Sed varius et ex non consectetur.
      </p>
      <div className="mt-8 bg-white bg-opacity-80 backdrop-blur-md p-4 rounded-lg flex items-center justify-between">
        <p className="text-gray-500">Followers: 1.5K</p>
        <p className="text-gray-500">NFTs Created: 10</p>
        <p className="text-gray-500">Volume: 50 ETH</p>
        <p className="text-gray-500">Rating: 4.8/5</p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* Repeat this block for each NFT widget */}
        <div className="bg-white rounded-lg shadow-md">{/* NFT widget content */}</div>
        {/* Repeat this block for each NFT widget */}
      </div>
      {/* <Button onClick={getUserDetails()}>Details</Button> */}
    </div>
  );
};

ProfilePage.auth = true;

export default ProfilePage;
