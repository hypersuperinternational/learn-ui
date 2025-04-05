import useItemStore from "@/stores/useItemStore"
import PaperObject from "./PaperObject"
import { Loader } from "lucide-react"

interface PaperObjectListProps {

}

const PaperObjectList: React.FC<PaperObjectListProps> = () => {
    const { items, loading } = useItemStore()

    return (
        <div className="paper-object-list-container relative w-full h-full">
            <div className="paper-object-list flex flex-col gap-4">
                {items.map((item:any, index:number) => {
                    return (
                        <PaperObject data={item} key={index} />
                    )
                })}
                {loading && 
                    <div className="flex items-center justify-center p-4">
                        <Loader className="h-4 w-4 animate-spin" />
                    </div>
                }
            </div>
        </div>
    )
}

export default PaperObjectList