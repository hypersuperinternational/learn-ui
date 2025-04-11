import { useEffect, useState } from "react"
import { Loader } from "lucide-react"

import useItemStore from "@/stores/useItemStore"
import PaperObject from "./PaperObject"
import PaperObjectDetail from "./PaperObjectDetail"

interface PaperObjectListProps {

}

const PaperObjectList: React.FC<PaperObjectListProps> = () => {
    const { items, loading } = useItemStore()
    const [selectedItem, setSelectedItem] = useState<any | null>(null)

    useEffect(() => {
        console.log(selectedItem)
    }, [selectedItem])

    return (
        <div className="paper-object-list-container relative w-full h-full">
            <div className="paper-object-list flex flex-col gap-4">
                {items.map((item:any, index:number) => {
                    return (
                        <PaperObject data={item} onImageClick={setSelectedItem} key={index} />
                    )
                })}
                {loading && 
                    <div className="flex items-center justify-center p-4">
                        <Loader className="h-4 w-4 animate-spin" />
                    </div>
                }
            </div>
            {selectedItem && (
                <PaperObjectDetail
                    data={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </div>
    )
}

export default PaperObjectList