import Image from 'next/image'
import Icon from '/public/assets/arrow.svg'

interface IButtonArrow {
  className?: string
  onClick?: () => void
  isShowHiddenTabs: boolean
}

const ButtonArrow = ({
  className,
  onClick,
  isShowHiddenTabs,
}: IButtonArrow) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center bg-blue p-2 rounded-md ${className}`}
    >
      <Image
        src={Icon}
        alt='icon arrow'
        className={`w-[16px] transition-all duration-500 ease-in-out ${
          isShowHiddenTabs ? 'rotate-[-180deg]' : ''
        }`}
      />
    </button>
  )
}

export default ButtonArrow
