"use client";
import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "./Button";
import { signOut, useSession } from "next-auth/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Button href={href} sizeClass="py-2" fontSize="font-bold text-sm">
      {children}
    </Button>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const { data: session, status } = useSession();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const navLinks = (
    <>
      <li>
        <NavLink href="/pendulum">Pendulums</NavLink>
      </li>
      {session && <li>
        <NavLink href="/create">Create</NavLink>
      </li>}
      {session && <li>
        <NavLink href="/profile">Profile</NavLink>
      </li>}
    </>
  );

  return (
    <div className="sticky lg:static top-0 navbar bg-base-300 min-h-0 flex-shrink-0 justify-between z-10 shadow-sm shadow-secondary px-0 sm:px-1">
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              {navLinks}
            </ul>
          )}
        </div>
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6">
          <div className="flex relative w-10 h-10">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.png" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight text-m">Pendulum</span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">{navLinks}</ul>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
        {session ? (
          <Button onClick={signOut} sizeClass="p-3 ml-4" fontSize="font-bold text-sm">
            <Link href="/login">Sign out</Link>
          </Button>
        ) : (
          <Button sizeClass="p-3 ml-4" fontSize="font-bold text-sm">
            <Link href="/login">Sign in</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
