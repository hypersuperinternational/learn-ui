import { useEffect, useRef, useState } from "react"
import { supabase } from "@/lib/supabase"

import useItemStore from "@/stores/useItemStore"
import useUiStore from "@/stores/useUiStore"

const DataFetcher: React.FC = () => {
    const { loading, appendItems, setItems, setLoading } = useItemStore()
    const { paperDatabase } = useUiStore()

    const [page, setPage] = useState<number>(0)
    const [lastFetchedPage, setLastFetchedPage] = useState<number | null>(null)

    const observerInstance = useRef<IntersectionObserver | null>(null)
    const observerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (page === lastFetchedPage || loading) return
        
        const fetchData = async () => {
            setLoading(true)
            try {
                const startIndex = page * 5
                const endIndex = startIndex + 4
                const { data, error } = await supabase
                    .from(paperDatabase)
                    .select('*')
                    .eq('ai_summary_done', true)
                    .order('created_at', { ascending: false }) 
                    .range(startIndex, endIndex)

                if (error) throw error
                if (data.length) {
                    appendItems(data)
                    setLastFetchedPage(page)
                } else {
                    setItems([])
                }
            } catch (err) {
                console.error('Error fetching data:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [page, lastFetchedPage, paperDatabase])

    useEffect(() => {
        setItems([])
        if (observerInstance.current) {
            observerInstance.current?.disconnect()
        }
        setPage(0)
        setLastFetchedPage(null)
    }, [paperDatabase])
    

    useEffect(() => {
        if (!observerRef.current) return

        const _observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading && page === lastFetchedPage) {
                setPage((prev) => prev + 1)
            }
        })

        observerInstance.current = _observer

        _observer.observe(observerRef.current)
        return () => _observer.disconnect()
    }, [loading])

    return (
        <div ref={observerRef} className="h-10" />
    )
}

export default DataFetcher
