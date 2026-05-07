interface SlideIndicatorsProps {
  currentIndex: number
  totalSlides: number
  onSlideChange: (index: number) => void
}

export default function SlideIndicators({
  currentIndex,
  totalSlides,
  onSlideChange,
}: SlideIndicatorsProps) {
  return (
    <div className="absolute left-48 top-4 bottom-4 right-4 z-50 flex flex-col items-end justify-center rounded-3xl pr-8 pointer-events-none">
      <div className="flex flex-col gap-2.5 pointer-events-auto">
        {Array.from({ length: totalSlides }, (_, index) => (
          <button
            key={index}
            onClick={() => onSlideChange(index)}
            className={`rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-2 h-6'
                : 'bg-white/30 w-2 h-2 border border-white/50'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
