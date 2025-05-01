import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/server";
import { rings } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { randomUUID } from "crypto";
import { logout } from "../(open)/(user)/actions";
import { redirect } from "next/navigation";

export const Header = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const avatar = createAvatar(rings, {
    seed: data.user ? data.user.email : randomUUID.toString(),
  });

  const svg = avatar.toDataUri();
  return (
    <section className="flex justify-between w-full h-20 items-center z-10 fixed top-0 bg-background border-b">
      <div className="mx-5 w-full">
        <div className="flex w-full justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={svg} alt="Profile Icon" />
                <AvatarFallback>-_-</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 mx-5">
              <DropdownMenuGroup>
                <DropdownMenuItem disabled>Profile</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <p className="">Hello {data.user.email}</p>
        </div>
      </div>
    </section>
  );
};
