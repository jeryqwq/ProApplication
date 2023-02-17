import React, { useLayoutEffect } from "react"
import audio, {PlayerProps} from './index'
export default (audioRef: React.RefObject<HTMLDivElement | undefined>, config?: PlayerProps) => {
  useLayoutEffect(() => {
    config && audioRef.current && audio.bind(audioRef.current, config)
      return  () => {
        config && audioRef.current && audio.unbind(audioRef.current)
      }
  }, [config])
}

export const AudioProps = (_: PlayerProps) => <div></div>
