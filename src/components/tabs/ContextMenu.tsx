import { ITab, IContextMenu as TypeContextMenu } from '@/types'
import Image from 'next/image'

interface IContextMenu {
  tabs: ITab[]
  contextMenu: TypeContextMenu
  handlePinTab: (arg: number) => void
}

const ContextMenu = ({ tabs, contextMenu, handlePinTab }: IContextMenu) => {
  return (
    <div
      className='context-menu absolute z-10 shadow-xl rounded bg-white'
      style={{ top: contextMenu.y + 20, left: contextMenu.x - 10 }}
    >
      <ul>
        <li
          className='flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-400 rounded-md select-none'
          onClick={() => handlePinTab(contextMenu.tabId)}
        >
          <span className='italic'>
            {tabs.find((tab) => tab.id === contextMenu.tabId)?.isPinned
              ? 'Unpin Tab'
              : 'Pin Tab'}
          </span>
          <Image src='/assets/pin.svg' width={14} height={14} alt='icon pin' />
        </li>
      </ul>
    </div>
  )
}

export default ContextMenu
