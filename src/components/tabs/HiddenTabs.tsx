import { ITab } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface IHiddenTabs {
  tabs: ITab[]
  setActiveTab: React.Dispatch<React.SetStateAction<number>>
  setShowHiddenTabs: React.Dispatch<React.SetStateAction<boolean>>
  isShowHiddenTabs: boolean
  setTabs: React.Dispatch<React.SetStateAction<ITab[]>>
}

const HiddenTabs = ({
  tabs,
  setActiveTab,
  setShowHiddenTabs,
  isShowHiddenTabs,
  setTabs,
}: IHiddenTabs) => {
  const router = useRouter()

  return (
    <div className='absolute top-[50px] right-[30px] bg-white shadow-lg max-h-[500px] overflow-y-scroll'>
      <ul>
        {tabs
          .filter((tab) => tab.isHidden)
          .map((tab) => (
            <li key={tab.id} className='flex gap-1 items-center'>
              <button
                onClick={() => {
                  setActiveTab(-1)
                  router.push(tab.path)
                  setShowHiddenTabs(!isShowHiddenTabs)
                }}
                className='cursor-pointer flex items-center gap-2 mx-2 relative w-full px-5 py-2'
              >
                <span>{tab.label}</span>
                <Image
                  src={tab.icon}
                  width={16}
                  height={16}
                  alt={`icon ${tab.icon}`}
                />
              </button>
              <button
                className='mr-5'
                onClick={() => {
                  setTabs((prev) => prev.filter((t) => t.id !== tab.id))
                }}
              >
                <Image
                  src='/assets/close.svg'
                  width={14}
                  height={14}
                  alt='icon close'
                  className='w-[30px] h-[30px]'
                />
              </button>
            </li>
          ))}
        {tabs.filter((tab) => tab.isHidden).length === 0 && (
          <li className='text-2xl font-bold'>All Tabs in view</li>
        )}
      </ul>
    </div>
  )
}

export default HiddenTabs
