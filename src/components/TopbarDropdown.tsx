import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PiggyBank, Settings } from "lucide-react"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import useUiStore from "@/stores/useUiStore"

interface TopbarDropdownProps {

}

const TopbarDropdown: React.FC<TopbarDropdownProps> = () => {
    const { aiHeadlines, setAiHeadlines } = useUiStore()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <Settings className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                        <DropdownMenuCheckboxItem checked={aiHeadlines} onCheckedChange={setAiHeadlines}>
                            
                            Use AI headlines
                        </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <PiggyBank className="h-4 w-4"/>
                        <a href='https://www.patreon.com/home' target="_blank">Donate</a>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default TopbarDropdown