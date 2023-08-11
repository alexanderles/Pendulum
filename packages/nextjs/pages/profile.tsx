import Button from "~~/components/Button";

interface StatComponentProps {
  title: string;
  val: string;
  growth: string;
}

function StatCard({ title, val, growth }: StatComponentProps) {
  return (
    <div className="flex flex-col bg-slate-50">
      <h3 className="text-md text-slate-400">{title}</h3>
      <h2 className="text-xl text-black">{val}</h2>
      <h4 className="text-sm text-green">{growth}</h4>
    </div>
  );
}

export const Profile = () => {
  return (
    <main>
      <div className="flex">
        <div className="flex flex-col">
          <img
            src="https://via.placeholder.com/48"
            alt="User Profile"
            className="w-[100%] h-full object-cover rounded-lg"
          />
          <div className="flex items-center space-x-4">
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
        <div>
          <div className="flex space-between">
            <h1>Alice Koch</h1>
            <Button>
              <span>Follow</span>
            </Button>
          </div>
          <p className="w-3/4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A beatae numquam odit obcaecati eveniet dignissimos
            veniam molestias consequatur. Aliquam, asperiores voluptatem aspernatur consectetur maxime quidem eveniet
            natus temporibus voluptatibus voluptatum.
          </p>
          <div className="flex">
            <StatCard title="Social Following" val="12k" growth="5%"></StatCard>
            <StatCard title="Pendulums Created" val="10" growth="5%"></StatCard>
            <StatCard title="Volume" val="12k" growth="10ETH"></StatCard>
            <StatCard title="Rating " val="12k" growth="⭐️4.3"></StatCard>
          </div>
        </div>
      </div>
      <hr className="w-4/5 border-t border-white" />
    </main>
  );
};
