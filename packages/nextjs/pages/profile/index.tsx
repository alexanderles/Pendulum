import React from 'react';

const ProfilePage = () => {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex items-center justify-between">
        
        <div className="flex items-center">
          <img
            src="path/to/profile-photo.jpg"
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h1 className="text-2xl font-semibold">Your Name</h1>
            <p className="text-gray-500">NFT Enthusiast</p>
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel
        tincidunt quam. Donec nec odio vitae eros ultrices vehicula vel eget
        libero. Sed varius et ex non consectetur.
      </p>
      <div className="mt-8 bg-white bg-opacity-80 backdrop-blur-md p-4 rounded-lg flex items-center justify-between">
        <p className="text-gray-500">Followers: 1.5K</p>
        <p className="text-gray-500">NFTs Created: 10</p>
        <p className="text-gray-500">Volume: 50 ETH</p>
        <p className="text-gray-500">Rating: 4.8/5</p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* Repeat this block for each NFT widget */}
        <div className="bg-white rounded-lg shadow-md">
          {/* NFT widget content */}
        </div>
        {/* Repeat this block for each NFT widget */}
      </div>
    </div>
  );
};

export default ProfilePage;
