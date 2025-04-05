import useItemStore from "@/stores/useItemStore"
import PaperObject from "./PaperObject"

interface PaperObjectListProps {

}

const PaperObjectList: React.FC<PaperObjectListProps> = () => {
    const {items} = useItemStore()

    return (
        <div className="paper-object-list-container">
            <div className="paper-object-list flex flex-col gap-4">
                {items.map(item => {
                    return (
                        <PaperObject data={item} key={item.doi} />
                    )
                })}
            </div>
        </div>
    )
}

export default PaperObjectList