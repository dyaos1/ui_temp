'use client'

import numberHandler from "@/utils/numberHandler"
import { HT_DataRow } from "@/data/ht_mapper"
import { useEffect, useRef, useState } from "react"

interface HTDataRowProps {
    type: string
    bsnsNm: string
    lastYear: string
    thisYear: string
    nextYear: string
    updated: string
    increase: string
    increasePercent: string

    rowCount: number
    // eslint-disable-next-line
    setRowCount: any
    // eslint-disable-next-line
    setVisible: any
    // eslint-disable-next-line
    setPayload: any
    // eslint-disable-next-line
    setHT: any
    HT: HT_DataRow[]
}

const HTDataRow = ({ type, bsnsNm, lastYear, thisYear, nextYear, updated, increase, increasePercent, setVisible, setPayload, rowCount, setRowCount, setHT, HT }: HTDataRowProps) => {
    
    const typeAProps = (type === "A") ? " font-semibold": ""
    const typeBProps = (type === "B" || type==="D") ? "" : ""
    const typeCProps = (type === "C") ? " text-left text-sm" : ""

    const buttonAProps = (type === "A") ? " border border-solid text-center font-semibold": ""
    const buttonBProps = (type === "B") ? " border border-solid text-center" : ""
    const buttonCProps = (type === "C" ) ? " border border-solid text-left text-sm hover:bg-slate-200" : ""
    const buttonDProps = (type === "D") ? "" : ""

    const cellProp = "col-span-2" + typeAProps + typeBProps + typeCProps
    const miniCellProp = "col-span-1" + typeAProps + typeBProps + typeCProps
    const buttonProp = "col-span-2" + buttonAProps + buttonBProps + buttonCProps + buttonDProps

    const [ updatedUpdated, setUpdated ] = useState(updated)
    const updatedUpdatedRef = useRef(false)
    useEffect(() => {
        if (updatedUpdatedRef.current == false) { 
            setUpdated(numberHandler(updatedUpdated))
            updatedUpdatedRef.current = true 
        }
    }, [updatedUpdated, ])

    // eslint-disable-next-line
    const SummonUnitCostCalculator = (e: any) => {
        if (type ==="C") {
            setVisible(true)
            console.log(e.target.value)
            setPayload(e.target.value)
            setRowCount(rowCount)
        }
    }

    return (
        <div className="grid grid-cols-12 text-center content-start items-start p-1" id="change_line">
            <div className={cellProp}>
                {bsnsNm}
            </div>

            <div className={cellProp}>
                {numberHandler(lastYear)}
            </div>

            <div className={cellProp}>
                {numberHandler(thisYear)}
            </div>

            <div className={cellProp}>
                {numberHandler(nextYear)}
            </div>

            {
                (type === 'C')
                 ?
                <button className={buttonProp} onClick={SummonUnitCostCalculator} value={updated}>
                    {numberHandler(updated)}
                </button>
                 : (type === 'D')
                     ? <div className={buttonProp}>{numberHandler(updated)}</div>
                     : <input 
                     className={buttonProp} 
                     value={updatedUpdated} 
                     onChange={(e)=> {
                        updatedUpdatedRef.current = false
                        HT[rowCount].updated = e.target.value
                        setUpdated(e.target.value)
                        setHT(HT)
                    }}/>
            }
            

            <div className={miniCellProp}>
                {numberHandler(increase)}
            </div>

            <div className={miniCellProp}>
                {increasePercent}   
            </div>
        </div>
    )
}

export default HTDataRow;