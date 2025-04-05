import PaperObjectList from "@/components/PaperObjectList"

interface HomeProps {

}

const Home: React.FC<HomeProps> = ({}) => {
    return (
        <div className="view home relative w-full h-full bg-learn-main">
            <PaperObjectList />
        </div>
    )
}

export default Home