import useTabObserver from '@/hooks/useTabObserver'
import { IContextMenu, ITab } from '@/types'
import { DragTabList, Tab, Tabs, helpers } from '@react-tabtab-next/tabtab'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'

interface ITabContainer {
  tabs: ITab[]
  setTabs: React.Dispatch<React.SetStateAction<ITab[]>>
  activeTab: number
  setActiveTab: React.Dispatch<React.SetStateAction<number>>
  setContextMenu: React.Dispatch<React.SetStateAction<IContextMenu>>
  containerRef: React.RefObject<HTMLDivElement>
  setShadow: React.Dispatch<React.SetStateAction<boolean>>
}

const TabContainer = ({
  tabs,
  setTabs,
  activeTab,
  setActiveTab,
  setContextMenu,
  containerRef,
  setShadow,
}: ITabContainer) => {
  const router = useRouter()
  // const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const tabRefs = useTabObserver(tabs, setTabs, setShadow, containerRef)

  const sortedTabs = useMemo(() => {
    const pinnedTabs = tabs.filter((tab) => tab.isPinned)
    const unpinnedTabs = tabs.filter((tab) => !tab.isPinned)
    return [...pinnedTabs, ...unpinnedTabs]
  }, [tabs])

  const tabItems = useMemo(() => {
    return sortedTabs.map((tab, index) => {
      return (
        <Tab closable={true} key={index}>
          <button
            ref={(el) => {
              tabRefs.current[tab.id] = el
            }}
            onContextMenu={(e) => {
              e.preventDefault()
              setContextMenu({
                visible: true,
                x: e.clientX,
                y: e.clientY,
                tabId: tab.id,
              })
            }}
            onClick={() => {
              router.push(tab.path)
            }}
            className={`cursor-pointer flex items-center justify-center gap-2 mx-2 relative w-full h-full ${
              tab.isPinned ? 'max-w-[30px] overflow-hidden' : ''
            } `}
          >
            <span className={`${tab.isPinned ? 'hidden' : ''} `}>
              {tab.label}
            </span>
            <Image
              src={tab.icon}
              width={16}
              height={16}
              alt={`icon ${tab.icon}`}
              className={`h-[30px]`}
            />
          </button>
        </Tab>
      )
    })
  }, [router, sortedTabs])

  const handleOnTabSequenceChange = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      setTabs((tabs) => {
        const pinnedTabs = tabs.filter((tab) => tab.isPinned)
        const unpinnedTabs = tabs.filter((tab) => !tab.isPinned)

        const pinnedLength = pinnedTabs.length

        // Check if the move is between pinned and unpinned sections
        if (
          (oldIndex < pinnedLength && newIndex >= pinnedLength) ||
          (oldIndex >= pinnedLength && newIndex < pinnedLength)
        ) {
          return tabs // Prevent moving between pinned and unpinned sections
        }

        // Handle reordering within the same section
        if (oldIndex < pinnedLength && newIndex < pinnedLength) {
          const reorderedPinned = helpers.simpleSwitch(
            pinnedTabs,
            oldIndex,
            newIndex
          )
          return [...reorderedPinned, ...unpinnedTabs]
        } else {
          const reorderedUnpinned = helpers.simpleSwitch(
            unpinnedTabs,
            oldIndex - pinnedLength,
            newIndex - pinnedLength
          )
          return [...pinnedTabs, ...reorderedUnpinned]
        }
      })
      if (!tabs[newIndex].isPinned && newIndex !== activeTab) {
        setActiveTab(newIndex)
      } else {
        setActiveTab(oldIndex)
      }
      router.push(tabs[oldIndex].path)
    },
    [tabs, router, activeTab]
  )

  const handleOnTabChange = useCallback((i: number) => {
    setActiveTab(i)
  }, [])

  return (
    <Tabs
      activeIndex={activeTab}
      onTabChange={handleOnTabChange}
      onTabSequenceChange={handleOnTabSequenceChange}
      onTabClose={(i) => {
        setTabs((prev) => prev.filter((_, idx) => idx !== i))
      }}
      showArrowButton={false}
      showModalButton={false}
    >
      <DragTabList>{tabItems}</DragTabList>
    </Tabs>
  )
}

export default TabContainer
