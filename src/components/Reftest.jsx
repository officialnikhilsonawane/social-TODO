import './ref.css'
import { useEffect, useRef } from 'react'

export default function Reftest() {

    const DivBgColor = useRef(null)

    useEffect(function(){

        function callback(){
            let rc1 = Math.floor(Math.random() * 256)
            let rc2 = Math.floor(Math.random() * 256)
            let rc3 = Math.floor(Math.random() * 256)
            let rc4 = Math.floor(Math.random() * 10)

            DivBgColor.current.style.backgroundColor = `rgb(${rc1}, ${rc2}, ${rc3}, ${rc4})`
        }
        
        document.addEventListener('click', callback)

        return function(){
            document.removeEventListener('click', callback)
        }

    }, [DivBgColor])

  return (
    <div className="container">
        <div className='box' ref={DivBgColor}></div>
        <button className='btn'>Change BgColor</button>
    </div>
  )
}
