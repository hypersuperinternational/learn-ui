import { supabase } from "@/lib/supabase"
import useItemStore from "@/stores/useItemStore"
import { useEffect, useState } from "react"

interface DataFetcherProps {

}

const DataFetcher: React.FC<DataFetcherProps> = ({}) => {
    const { setItems } = useItemStore()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('n8n_table')
                    .select('*')
                    .limit(10)
        
                if (error) throw error
                console.log(data)
                setItems(data || [])
                } catch (err) {
                    console.error('Error fetching data:', err)
                } finally {
                    setLoading(false)
                }
            }
      
          fetchData()
    }, [])


    return (
        <div className="data-fetcher"></div>
    )
}

export default DataFetcher