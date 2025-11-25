export interface Video {
  id: string
  vimeoId: string
  title: string
}

export interface VideoSliderProps {
  currentIndex: number
  onSlideChange: (index: number) => void
}


