import { supabase } from "@/lib/supabase"
import useItemStore from "@/stores/useItemStore"
import { useEffect, useRef, useState } from "react"

const DataFetcher: React.FC = () => {
    const { loading, appendItems, setLoading } = useItemStore()
    const [page, setPage] = useState<number>(0)
    const [lastFetchedPage, setLastFetchedPage] = useState<number | null>(null);
    const observerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (page === lastFetchedPage || loading) return
        
        const fetchData = async () => {
            console.log("Loading page: ", page)
            setLoading(true)
            try {
                const startIndex = page * 5
                const endIndex = startIndex + 4
                const { data, error } = await supabase
                    .from('n8n_table')
                    .select('*')
                    .eq('ai_summary_done', true)
                    .order('created_at', { ascending: false }) 
                    .range(startIndex, endIndex)

                if (error) throw error
                if (data.length) {
                    console.log(data)
                    appendItems(data)
                    setLastFetchedPage(page)
                }
            } catch (err) {
                console.error('Error fetching data:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [page])

    useEffect(() => {
        if (!observerRef.current) return

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading) {
                setPage((prev) => prev + 1)
            }
        })

        observer.observe(observerRef.current)
        return () => observer.disconnect()
    }, [loading])

    return (
        <div ref={observerRef} className="h-10" />
    )
}

export default DataFetcher
