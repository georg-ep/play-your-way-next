"use client";

import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Spinner,
} from "@nextui-org/react";
import { useUIStore } from "@/stores/ui";
import { useUserStore } from "@/stores/user";
import { useEffect, useState } from "react";
import { userServices } from "@/services/user";
import { useRouter } from "next/navigation";

export default function Header() {
  const { openModal } = useUIStore();
  const { user } = useUserStore();
  const { fetchUser, logout } = userServices();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      await fetchUser();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (type: string) => {
    switch (type) {
      case "logout":
        logout();
        router.push("/");
        break;
      case "login":
        openModal("auth", { initialType: "login" });
        break;
      case "deposit":
        openModal("deposit");
        break;
      case "register":
        openModal("auth", { initialType: "register" });
    }

  };

  const menuItems = [
    {
      label: "Profile",
      onClick: () => router.push("/profile/"),
    },
    {
      label: "Logout",
      onClick: () => handleClick("logout"),
    },
  ];

  return (
    <Navbar
      classNames={{ wrapper: ["px-3 md:px-6"] }}
      isBordered
      maxWidth="full"
      position="sticky"
    >
      <NavbarBrand>
        <Link className="text-white" href="/">
          <p className="font-bold text-inherit">PlayYourWay</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className={user ? "max-sm:hidden" : ""} justify="end">
        {loading ? (
          <Spinner color="default" />
        ) : (
          <>
            {!user ? (
              <>
                <Button
                  onPress={() => handleClick("login")}
                  disableRipple
                  variant="flat"
                  color="primary"
                  size="md"
                >
                  Login
                </Button>
                <Button
                  onPress={() => handleClick("register")}
                  disableRipple
                  variant="flat"
                  color="secondary"
                  size="md"
                >
                  Register
                </Button>
              </>
            ) : (
              <div className={"flex items-center gap-2"}>
                <Button
                  disableRipple
                  variant="flat"
                  color="success"
                  size={window.innerWidth < 640 ? "sm" : "md"}
                >
                  {user.username}
                </Button>
                <Button
                  disableRipple
                  onPress={() => handleClick("deposit")}
                  variant="flat"
                  color="secondary"
                  size={window.innerWidth < 640 ? "sm" : "md"}
                >
                  £{user.credits}
                </Button>
                <Button
                  onPress={() => handleClick("logout")}
                  disableRipple
                  variant="flat"
                  color="primary"
                  size={window.innerWidth < 640 ? "sm" : "md"}
                >
                  Logout
                </Button>
              </div>
            )}
          </>
        )}
      </NavbarContent>

      <NavbarMenu className='px-3'>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              onClick={item?.onClick}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      {user && <NavbarContent  className="sm:hidden" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>}
    </Navbar>
  );
}
