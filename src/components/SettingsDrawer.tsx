import { Database, PiggyBank, Settings } from "lucide-react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"

import useUiStore, { PAPER_DATABASES } from "@/stores/useUiStore"

interface SettingsDrawerProps {

}

const SettingsDrawer: React.FC<SettingsDrawerProps> = () => {
    const { aiHeadlines, paperDatabase, setAiHeadlines, setPaperDatabase } = useUiStore()

    function getNextPaperDatabase(current: PAPER_DATABASES): PAPER_DATABASES {
        const values = Object.values(PAPER_DATABASES)
        const index = values.indexOf(current)
        const nextIndex = (index + 1) % values.length
        return values[nextIndex]
    }
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="ghost">
                    <Settings className="h-4 w-4" />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle className="text-center">Settings</DrawerTitle>
                    </DrawerHeader>
                    <div className="items relative flex flex-col font-medium">
                        <div className="flex gap-2 items-center border-b border-t p-4">
                            <Checkbox id="terms" checked={aiHeadlines} onCheckedChange={setAiHeadlines} />
                            <label
                                htmlFor="terms"
                                className=""
                            >
                                Use AI Headlines
                            </label>
                        </div>
                        <div 
                            className="flex gap-2 items-center border-b p-4"
                            onClick={() => {
                                const next = getNextPaperDatabase(paperDatabase)
                                setPaperDatabase(next)
                            }}>
                            <Database className="size-4" />
                            Switch database to {getNextPaperDatabase(paperDatabase)}
                        </div>
                        <div 
                            className="flex gap-2 items-center border-b p-4"
                            onClick={() => window.location.href = 'https://www.patreon.com/home'}>
                            <PiggyBank className="size-4" />
                            Donate
                        </div>
                    </div>
                </div>
                
            </DrawerContent>
        </Drawer>
    )
}

export default SettingsDrawer