import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/server";
import { rings } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { randomUUID } from "crypto";
import { logout } from "../(open)/(user)/actions";

export const Header = async () => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  const avatar = createAvatar(rings, {
    seed: data.user? data.user.email : randomUUID.toString(),
  });

  const svg = avatar.toDataUri();

  return (
    <section className="flex justify-between h-20 items-center z-10">
      <div className="mx-20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={svg} alt="Profile Icon" />
              <AvatarFallback>oO</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>Profile</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
};
