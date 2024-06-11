"use client";

import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
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

  return (
    <Navbar isBordered maxWidth="full" className="px-[0]" position="sticky">
      <NavbarBrand>
        <p className="font-bold text-inherit">PlayYourWay</p>
      </NavbarBrand>
      <NavbarContent justify="end">
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
                  onPress={() => handleClick("deposit")}
                  variant="flat"
                  color="secondary"
                  size="md"
                >
                  £{user.credits}
                </Button>
                <Button
                  onPress={() => handleClick("logout")}
                  disableRipple
                  variant="flat"
                  color="primary"
                  size="md"
                >
                  Logout
                </Button>
              </div>
            )}
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
