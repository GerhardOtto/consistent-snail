import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";

export const Footer = () => {
  return (
    <section className="flex justify-between h-20 items-center z-10">
      <Menubar className="w-full flex justify-evenly mx-5">
        <MenubarMenu>
          <Button variant={"ghost"} asChild>
            <Link href={"/"}>Home</Link>
          </Button>
        </MenubarMenu>
        <MenubarMenu>
          <Button variant={"ghost"} asChild>
            <Link href={"/history"}>History</Link>
          </Button>
        </MenubarMenu>
        <MenubarMenu>
          <Button variant={"ghost"} asChild>
            <Link href={"/manage/workout"}>Manage</Link>
          </Button>
        </MenubarMenu>
      </Menubar>
    </section>
  );
};
