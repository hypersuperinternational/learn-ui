import useItemStore from "@/stores/useItemStore"
import PaperObject from "./PaperObject"

interface PaperObjectListProps {

}

const PaperObjectList: React.FC<PaperObjectListProps> = () => {
    const {items} = useItemStore()
    return (
        <div className="paper-object-list">
            {items.map(item => {
                return (
                    <PaperObject data={item} key={item.doi} />
                )
            })}
        </div>
    )
}

export default PaperObjectList