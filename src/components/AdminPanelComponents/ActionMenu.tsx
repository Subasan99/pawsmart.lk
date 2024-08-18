"use router"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EllipsisIcon from "../svg/ellipsis-icon";
import { EditIcon, EyeIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  pathName: string;
}

const ActionMenu = (props: Props) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div>
          <EllipsisIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => router.push(props.pathName)} className="font-semibold flex gap-2">
          <EyeIcon />
          View
        </DropdownMenuItem>
        <DropdownMenuItem className="font-semibold flex gap-2">
          <EditIcon />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="font-semibold flex gap-2">
          <TrashIcon />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionMenu;
