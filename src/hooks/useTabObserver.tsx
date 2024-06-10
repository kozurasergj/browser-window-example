import { ITab } from '@/types'
import { useEffect, useRef } from 'react'

const useTabObserver = (
  tabs: ITab[],
  setTabs: React.Dispatch<React.SetStateAction<ITab[]>>,
  setShadow: React.Dispatch<React.SetStateAction<boolean>>,
  containerRef: React.RefObject<HTMLDivElement>
) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const updatedTabs = tabs.map((tab) => {
          const entry = entries.find(
            (e) => e.target === tabRefs.current[tab.id]
          )
          return { ...tab, isHidden: !entry?.isIntersecting }
        })
        setTabs(updatedTabs)

        const isAnyTabHidden = updatedTabs.some((tab) => tab.isHidden)
        setShadow(isAnyTabHidden)
      },
      {
        root: containerRef.current,
        threshold: 1.0,
      }
    )

    tabRefs.current.forEach((tabRef) => {
      if (tabRef) {
        observer.observe(tabRef)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [tabs, setTabs, setShadow, containerRef])

  return tabRefs
}

export default useTabObserver
