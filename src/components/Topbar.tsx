import useUiStore from "@/stores/useUiStore"
import TopbarDropdown from "./TopbarDropdown"
import { useEffect } from "react"
import SettingsDrawer from "./SettingsDrawer"

interface TopbarProps {

}

const Topbar: React.FC<TopbarProps> = () => {
    const { paperOpen } = useUiStore()
    
    return (
        <div className={`top-bar-container fixed z-30 left-0 w-full p-2 transition-all duration-300 ease-out-learn
            ${paperOpen ? '-top-18' : 'top-0'}`}>
            <div className="top-bar p-2 px-2 flex items-center justify-between bg-gray-900/80 text-white backdrop-blur-md rounded-full">
                <div className="flex items-center gap-1 ml-3 text-xs font-bold">
                    {/* <Compass className="h-4 w-4" /> */}
                    LEARN
                </div>
                <div className="use-ai-headline flex items-center gap-1">
                    {/* <TopbarDropdown /> */}
                    <SettingsDrawer />
                </div>
            </div>
        </div>
    )
}

export default Topbar