import React, {useMemo, useRef, useState} from "react";
import './index.less'

export default function Typewriter(props) {
  const {speed, start, text, showSubscript} = props
  const [showText, setShowText] = useState('')
  const [length, setLength] = useState(1)
  const [isEnd, setIsEnd] = useState(false)
  const ref = useRef()
  useMemo(() => {
    if (start) {
      clearTimeout(ref.current)
      ref.current = setTimeout(() => {
        setShowText(text.slice(0, length))
        const newLength = length + 1
        if (newLength >= text.length) {
          clearTimeout(ref.current)
          setIsEnd(true)
        } else {
          setLength(newLength)
        }
      }, speed)
    }
    return () => clearTimeout(ref.current)
  }, [start, length])
  return <span>{showText}{showSubscript && <a className="subscript">_</a>}</span>
}
