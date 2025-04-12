import { useEffect, useState } from "react"
import { Loader } from "lucide-react"

import useItemStore from "@/stores/useItemStore"
import PaperObject from "./PaperObject"

interface PaperObjectListProps {

}

const PaperObjectList: React.FC<PaperObjectListProps> = () => {
    const { items, loading } = useItemStore()

    return (
        <div className="paper-object-list-container relative w-full h-full">
            <div className="paper-object-list flex flex-col gap-8">
                {items.map((item:any, index:number) => {
                    return (
                        <PaperObject data={item} key={index} />
                    )
                })}
                {(!items.length && !loading) &&
                    <div className="flex flex-col items-center justify-center p-4 text-xs font-medium">
                        <div style={{fontSize: '70px'}}>
                            &#128583;
                        </div> 
                        Sorry, nothing in here at the moment.
                    </div>
                }
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