import React, { useState, useEffect } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  // extract any external onError handler so we can call it when the native image errors
  const { onError: externalOnError, src, alt, style, className, loading = 'lazy', decoding = 'async', ...rest } = props

  // reset error state when the source changes so a new image can be attempted
  useEffect(() => {
    setDidError(false)
  }, [src])

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setDidError(true)
    // call external handler if provided (carousel uses this to mark failed indices)
    try {
      if (typeof externalOnError === 'function') (externalOnError as any)(e)
    } catch (err) {
      // ignore external handler errors
      // console.warn('external onError threw', err)
    }
  }

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img
          src={ERROR_IMG_SRC}
          alt="Error loading image"
          loading={loading as any}
          decoding={decoding as any}
          {...rest}
          data-original-url={src}
        />
      </div>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={loading as any}
      decoding={decoding as any}
      {...rest}
      onError={handleError}
    />
  )
}
