interface PaperObjectProps {
    data: any
    key: string
}

const PaperObject: React.FC<PaperObjectProps> = ({data, key}) => {
    return (
        <div className="paper-object-container p-4">
            <div className="paper-object flex flex-col gap-2">
                <div className="image-container w-full rounded-md aspect-square">
                    <img src={data.image_url} alt='' className="w-full h-full" />
                </div>
                <h1 className="text-4xl">
                    {data.title_org}
                </h1>
            </div>
        </div>
    )
}

export default PaperObject