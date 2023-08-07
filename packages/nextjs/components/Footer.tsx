import { HeartIcon } from "@heroicons/react/24/outline";
//import { SwitchTheme } from "~~/components/SwitchTheme";
import { useGlobalState } from "~~/services/store/store";

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);

  return (
    <div className="min-h-0 p-5 mb-11 lg:mb-0 bg-base-300">
      <div></div>
      <div className="w-full">
        <ul className="menu menu-horizontal w-full">
          <div className="flex justify-center items-center gap-2 text-sm w-full">
            <div>
              Built with <HeartIcon className="inline-block h-4 w-4" /> by Pendulum Team
            </div>
            <span>·</span>
            <div>
              <a
                href="https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                Subscribe
              </a>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};
