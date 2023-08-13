"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
import { PendulumThumbnail } from "~~/components/readChain/pendulumThumbnail";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [userData, setUserData] = useState<any>();
  const [pendulums, setPendulums] = useState([]);

  useEffect(() => {
    // Redirect to the login page if the user is not signed in
    if (!session?.user) {
      router.push("/login");
    }

    const getUserDetails = async () => {
      const res = await axios.post("/api/users/me", { email: session?.user?.email });
      console.log("user maybe: ", res.data.data);
      setUserData(res.data.data);
    };

    getUserDetails();
  }, []);

  useEffect(() => {
    if (userData) {
      console.log("userdata.pendulums:", userData.pendulums);
      var pendulumsArray: any = [];
      const getUserPendulums = async () => {
        for (var i = 0; i < userData.pendulums.length; i++) {
          console.log("pendulums[i].refId: ", userData.pendulums[i].refId);
          const res = await axios.post("/api/pendulums/findPendulum", { _id: userData.pendulums[i].refId });
          console.log("pendulum found: ", res.data.data[0]);
          pendulumsArray.push(res.data.data[0]);
        }
        setPendulums(pendulumsArray);
      };

      getUserPendulums();
    }
  }, [userData]);

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="/purple-gradient-1.jpg" alt="Profile" className="w-16 h-16 rounded-full mr-4" />
          <div>
            <h1 className="text-2xl font-semibold">{userData ? userData.username : <>Name</>}</h1>
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
      <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-1 md:grid-cols-2">
        {/* Repeat this block for each NFT widget */}
        {
          
          pendulums.map((pendulum: any) => {
            return <PendulumThumbnail address={pendulum.address}></PendulumThumbnail>;
          })}
      </div>
    </div>
  );
};

ProfilePage.auth = true;

export default ProfilePage;
