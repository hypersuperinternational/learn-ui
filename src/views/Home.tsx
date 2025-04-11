import { AnimatePresence } from 'motion/react'
import PaperObjectList from "@/components/PaperObjectList"
import Topbar from "@/components/Topbar"

interface HomeProps {

}

const Home: React.FC<HomeProps> = ({}) => {
    return (
        <div className="view home relative w-full h-full bg-learn-main pt-14">
            <AnimatePresence>
                <PaperObjectList />
            </AnimatePresence>
            <Topbar />
        </div>
    )
}

export default Home