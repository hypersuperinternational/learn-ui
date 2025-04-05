import useUiStore from "@/stores/useUiStore"
import { useEffect } from "react"
import TopbarDropdown from "./TopbarDropdown"
import { Compass } from "lucide-react"

interface TopbarProps {

}

const Topbar: React.FC<TopbarProps> = () => {
    const { aiHeadlines, setAiHeadlines } = useUiStore()
    useEffect(() => {
        console.log('ai headlines: ', aiHeadlines)
    }, [aiHeadlines])
    return (
        <div className="top-bar-container fixed z-10 top-0 left-0 w-full bg-white/90 backdrop-blur-md">
            <div className="top-bar p-2 px-4 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs font-bold">
                    <Compass className="h-4 w-4" />
                    LEARN
                </div>
                <div className="use-ai-headline flex items-center gap-1">
                    <TopbarDropdown />
                </div>
            </div>
        </div>
    )
}

export default Topbar