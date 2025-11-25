import { Video } from '../types/video'

export const VIDEOS: Video[] = [
  {
    id: '1',
    vimeoId: '1139666352',
    title: 'Título do Vídeo 1',
  },
  {
    id: '2',
    vimeoId: '1117117497',
    title: 'Título do Vídeo 2',
  },
  {
    id: '3',
    vimeoId: '1139666352',
    title: 'Título do Vídeo 3',
  },
]

export const SLIDER_CONFIG = {
  autoPlayInterval: 15000, // 15 segundos
  wheelThrottle: 600, // 0.6 segundos (reduzido para resposta mais rápida)
  swipeThreshold: 50, // pixels
  wheelThreshold: 20, // pixels (reduzido para detectar scroll mais facilmente)
  animationDuration: 1000, // 1 segundo
} as const

