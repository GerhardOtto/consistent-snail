"use client"

import { Button } from "@/components/ui/button";
import { logout } from "../(user)/actions";

export const Footer = () => {
  return (
    <Button type="submit" onClick={logout}>
      Logout
    </Button>
  );
};
