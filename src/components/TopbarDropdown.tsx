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
import { Brain, Database, PiggyBank, Settings } from "lucide-react"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import useUiStore from "@/stores/useUiStore"
import { PAPER_DATABASES } from "@/stores/useUiStore"

interface TopbarDropdownProps {

}

const TopbarDropdown: React.FC<TopbarDropdownProps> = () => {
    const { aiHeadlines, paperDatabase, setAiHeadlines, setPaperDatabase } = useUiStore()

    function getNextPaperDatabase(current: PAPER_DATABASES): PAPER_DATABASES {
        const values = Object.values(PAPER_DATABASES)
        const index = values.indexOf(current)
        const nextIndex = (index + 1) % values.length
        return values[nextIndex]
    }
      
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
                            <Brain className="size-4" />
                            Use AI headlines
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuItem onClick={() => {
                            const next = getNextPaperDatabase(paperDatabase)
                            setPaperDatabase(next)
                        }}>
                            <Database className="size-4" />
                            Use {getNextPaperDatabase(paperDatabase)}
                        </DropdownMenuItem>
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