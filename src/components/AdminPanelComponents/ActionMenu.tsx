import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EllipsisIcon from "../svg/ellipsis-icon";
import {  EditIcon, EyeIcon, TrashIcon } from "lucide-react";

const ActionMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div>
          <EllipsisIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="font-semibold flex gap-2"><EyeIcon/>View</DropdownMenuItem>
        <DropdownMenuItem className="font-semibold flex gap-2"><EditIcon/>Edit</DropdownMenuItem>
        <DropdownMenuItem className="font-semibold flex gap-2"><TrashIcon/>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionMenu;
