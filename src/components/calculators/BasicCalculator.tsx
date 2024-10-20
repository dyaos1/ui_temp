'use client'

import { useState } from "react"

const BasicCalculator = () => {

    const [display, setDisplay] = useState("0")
    const [reset, setReset] = useState(false)
    const [operator, setOperator] = useState("")
    const [repo, setRepo] = useState("")

    // eslint-disable-next-line
    const clickNumber = (e: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (display.toString() === "0" || reset ) ? setDisplay(e.target.value) : setDisplay(display+e.target.value)
        setReset(false)
    }

    const clickAC = () => {
        setDisplay("0")
    }

    // eslint-disable-next-line
    const clickOperator = (e: any) => {
        setOperator(e.target.textContent)
        setRepo(display)
        setReset(true)
    }

    const clickEqual = () => {
        switch (operator) {
            case '+':
                setDisplay((Number(repo) + Number(display)).toString())
                break;
            case '-':
                setDisplay((Number(repo) - Number(display)).toString())
                break;
            case 'X':
                setDisplay((Number(repo) * Number(display)).toString())
                break;
            case '/':
                if (display.toString() === "0" ) {
                    setDisplay("0")
                    break;
                }
                setDisplay((Number(repo) / Number(display)).toString())
                break;
            default:
                setDisplay(display)
                break;
        }
    }

    return (
        <div className="w-64 h-96 bg-slate-900 flex flex-col text-3xl text-center text-white">
            <div className="h-16 text-right p-2 text-5xl">
                {display}
            </div>
            <div className="h-16 grid grid-cols-4 gap-0">
                <button className="rounded-full bg-slate-400 content-center m-1"
                onClick={clickAC} value="AC">AC</button>
                <button className="rounded-full bg-slate-400 content-center m-1"></button>
                <button className="rounded-full bg-slate-400 content-center m-1" value="%">%</button>   
                <button className="rounded-full bg-orange-500 content-center m-1"
                onClick={clickOperator} value="/">/</button>         
            </div>
            <div className="h-16 grid grid-cols-4 gap-0">
                <button 
                    className="rounded-full bg-slate-600 content-center m-1"
                    onClick={clickNumber} value="7"
                >7</button>
                <button className="rounded-full bg-slate-600 content-center m-1"
                    onClick={clickNumber} value="8">8</button>
                <button className="rounded-full bg-slate-600 content-center m-1"
                    onClick={clickNumber} value="9">9</button>   
                <button className="rounded-full bg-orange-500 content-center m-1"
                onClick={clickOperator} value="X">X</button>           
            </div>
            <div className="h-16 grid grid-cols-4 gap-0">
                <button className="rounded-full bg-slate-600 content-center m-1"
                    onClick={clickNumber} value="4">4</button>
                <button className="rounded-full bg-slate-600 content-center m-1"
                    onClick={clickNumber} value="5">5</button>
                <button className="rounded-full bg-slate-600 content-center m-1"
                    onClick={clickNumber} value="6">6</button>   
                <button className="rounded-full bg-orange-500 content-center m-1"
                onClick={clickOperator} value="-">-</button> 
            </div>
            <div className="h-16 grid grid-cols-4 gap-0">
                <button className="rounded-full bg-slate-600 content-center m-1"
                    onClick={clickNumber} value="1">1</button>
                <button className="rounded-full bg-slate-600 content-center m-1"
                    onClick={clickNumber} value="2">2</button>
                <button className="rounded-full bg-slate-600 content-center m-1"
                    onClick={clickNumber} value="3">3</button>   
                <button className="rounded-full bg-orange-500 content-center m-1"
                onClick={clickOperator} value="+">+</button> 
            </div>
            <div className="h-16 grid grid-cols-4 gap-0">
                <button className="col-span-2 rounded-full bg-slate-600 content-center m-1"
                    onClick={clickNumber} value="0">0</button>
                <button className="rounded-full bg-slate-600 content-center m-1" value=".">.</button>
                <button className="rounded-full bg-orange-500 content-center m-1"
                onClick={clickEqual} value="=">=</button>
            </div>
        </div>
    )
}

export default BasicCalculator