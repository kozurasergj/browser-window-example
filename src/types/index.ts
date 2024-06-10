export interface ITab {
  label: string
  icon: string
  path: string
  id: number
  isHidden: boolean
  isPinned: boolean
}

export interface IContextMenu {
  visible: boolean
  x: number
  y: number
  tabId: number
}
