'use client'

import numberHandler from "@/utils/numberHandler"

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
}

const HTDataRow = ({ type, bsnsNm, lastYear, thisYear, nextYear, updated, increase, increasePercent, setVisible, setPayload, rowCount, setRowCount }: HTDataRowProps) => {
    
    const typeAProps = (type === "A") ? " font-semibold": ""
    const typeBProps = (type === "B") ? "" : ""
    const typeCProps = (type === "C") ? " text-left text-sm" : ""

    const buttonAProps = (type === "A") ? " font-semibold hover:cursor-default": ""
    const buttonBProps = (type === "B") ? "" : ""
    const buttonCProps = (type === "C" ) ? " text-left text-sm hover:bg-slate-200" : ""

    const cellProp = "col-span-2" + typeAProps + typeBProps + typeCProps
    const miniCellProp = "col-span-1" + typeAProps + typeBProps + typeCProps
    const buttonProp = "col-span-2" + buttonAProps + buttonBProps + buttonCProps


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

            <button className={buttonProp} onClick={SummonUnitCostCalculator} value={updated}>
                {numberHandler(updated)}
            </button>

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