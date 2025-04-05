interface PaperObjectProps {
    data: any
    key: string
}

const PaperObject: React.FC<PaperObjectProps> = ({data, key}) => {
    return (
        <div className="paper-object-container p-4">
            <div className="paper-object">
                <h1 className="text-4xl">
                    {data.title_org}
                </h1>
            </div>
        </div>
    )
}

export default PaperObject