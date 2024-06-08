"use client";

import {
  Button,
  Navbar as NavbarNextUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const menuItems = ["Browse", "Log Out"];

  useEffect(() => {
    setIsLoggedIn(!!getCookie("access_token"));
  }, []);

  return (
    <NavbarNextUI onMenuOpenChange={setIsMenuOpen} className="bg-blue-950">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-white"
        />
        <NavbarBrand>
          <p className="font-bold text-white">mockaas.tv</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link className="text-yellow-500" href="/browse">
            Browse
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {isLoggedIn ? (
            <Button
              className="bg-yellow-500"
              onClick={() => {
                deleteCookie("access_token");
                router.push("/signin");
              }}
            >
              Sign out
            </Button>
          ) : (
            <>
              {pathname.startsWith("/register") && (
                <Link href="/signin">
                  <Button className="bg-yellow-500">Sign in</Button>
                </Link>
              )}
              {pathname.startsWith("/signin") && (
                <Link href="/register">
                  <Button className="bg-yellow-500">Register</Button>
                </Link>
              )}
            </>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="bg-blue-950">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full text-white" href="#">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NavbarNextUI>
  );
}
