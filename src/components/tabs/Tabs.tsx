'use client'
import { contextMenuData, tabsData } from '@/data'
import { IContextMenu, ITab } from '@/types'
import { useCallback, useEffect, useRef, useState } from 'react'
import ButtonArrow from '../ButtonArrow'
import ContextMenu from './ContextMenu'
import HiddenTabs from './HiddenTabs'
import TabContainer from './TabContainer'

const Tabs = () => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const [isShadow, setShadow] = useState<boolean>(false)
  const [isShowHiddenTabs, setShowHiddenTabs] = useState<boolean>(false)
  const [contextMenu, setContextMenu] = useState<IContextMenu>(contextMenuData)
  const [tabs, setTabs] = useState<ITab[]>(tabsData)

  const containerRef = useRef<HTMLDivElement>(null)

  const handlePinTab = useCallback((tabId: number) => {
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === tabId ? { ...tab, isPinned: !tab.isPinned } : tab
      )
    )
    setContextMenu({ visible: false, x: 0, y: 0, tabId: -1 })
  }, [])

  useEffect(() => {
    const savedTabs = localStorage.getItem('tabs')
    const savedActiveTab = localStorage.getItem('activeTab')
    if (savedTabs) {
      setTabs(JSON.parse(savedTabs))
    }
    if (savedActiveTab) {
      setActiveTab(Number(savedActiveTab))
    }
  }, [])

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('tabs', JSON.stringify(tabs))
      localStorage.setItem('activeTab', activeTab.toString())
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [tabs, activeTab])

  useEffect(() => {
    const handleClickOutsideContextMenu = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (contextMenu.visible && !target.closest('.context-menu')) {
        setContextMenu({ visible: false, x: 0, y: 0, tabId: -1 })
      }
    }

    document.addEventListener('click', handleClickOutsideContextMenu)

    return () => {
      document.removeEventListener('click', handleClickOutsideContextMenu)
    }
  }, [contextMenu])

  return (
    <div className='App'>
      <div className='container' ref={containerRef}>
        {/* container tabs */}
        <div className={isShadow ? `container-with-shadow` : ''}>
          <TabContainer
            tabs={tabs}
            setTabs={setTabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setContextMenu={setContextMenu}
            containerRef={containerRef}
            setShadow={setShadow}
          />
        </div>
        <ButtonArrow
          className='absolute top-[10px] right-[15px]'
          onClick={() => setShowHiddenTabs(!isShowHiddenTabs)}
          isShowHiddenTabs={isShowHiddenTabs}
        />
      </div>
      {/*ShowHiddenTabs */}
      {isShowHiddenTabs && (
        <HiddenTabs
          tabs={tabs}
          setActiveTab={setActiveTab}
          setShowHiddenTabs={setShowHiddenTabs}
          isShowHiddenTabs={isShowHiddenTabs}
          setTabs={setTabs}
        />
      )}
      {/* contextMenu */}
      {contextMenu.visible && (
        <ContextMenu
          contextMenu={contextMenu}
          tabs={tabs}
          handlePinTab={handlePinTab}
        />
      )}
    </div>
  )
}

export default Tabs
