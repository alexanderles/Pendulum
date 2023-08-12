import React from "react";
import Button from "~~/components/Button";

interface StatComponentProps {
  title: string;
  val: string;
  growth: string;
}

function StatCard({ title, val, growth }: StatComponentProps) {
  return (
    <div className="flex flex-col bg-slate-50 rounded-2xl items-center align-center p-6 w-1/5">
      <h3 className="text-md text-slate-400">{title}</h3>
      <h2 className="text-xl text-black">{val}</h2>
      <h4 className="text-sm text-lime-400">{growth}</h4>
    </div>
  );
}

function ProfilePage() {
  return (
    <main className="w-screen h-screen">
      <div className="flex mx-auto w-4/5 mt-12">
        <div className="flex flex-col">
          <img src="./punkpfp1.png" alt="User Profile" className="w-[100%] h-full object-cover rounded-2xl" />
          <div className="flex items-center space-x-4 mb-4 mt-4">
            <a href="#" className="flex items-center space-x-2">
              <img src="path-to-twitter-logo.png" alt="Twitter" className="w-6 h-6" />
              <span>Twitter</span>
            </a>

            <a href="#" className="flex items-center space-x-2">
              <img src="path-to-facebook-logo.png" alt="Facebook" className="w-6 h-6" />
              <span>Facebook</span>
            </a>

            <a href="#" className="flex items-center space-x-2">
              <img src="path-to-settings-logo.png" alt="Settings" className="w-6 h-6" />
              <span>Settings</span>
            </a>
          </div>
        </div>
        <div className="ml-8">
          <div className="flex justify-between items-center">
            <h1 className="text-bold text-4xl">Alice Koch</h1>
            <Button>
              <span>Follow</span>
            </Button>
          </div>
          <p className="w-3/4 mr-0 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A beatae numquam odit obcaecati eveniet dignissimos
            veniam molestias consequatur. Aliquam, asperiores voluptatem aspernatur consectetur maxime quidem eveniet
            natus temporibus voluptatibus voluptatum.
          </p>
          <div className="flex justify-between">
            <StatCard title="Following" val="12k" growth="5%"></StatCard>
            <StatCard title="Pendulums" val="10" growth="5%"></StatCard>
            <StatCard title="Volume" val="12k" growth="10ETH"></StatCard>
            <StatCard title="Rating " val="12k" growth="⭐️4.3"></StatCard>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
