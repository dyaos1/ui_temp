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

    // eslint-disable-next-line
    setVisible: any
    // eslint-disable-next-line
    setPayload: any
    payload: string
}

const HTDataRow = ({ type, bsnsNm, lastYear, thisYear, nextYear, updated, increase, increasePercent, setVisible, setPayload }: HTDataRowProps) => {
    
    const typeAProps = (type === "A") ? " font-semibold": ""
    const typeBProps = (type === "B") ? "" : ""
    const typeCProps = (type === "C") ? " text-left text-sm" : ""

    const cellProp = "col-span-2" + typeAProps + typeBProps + typeCProps
    const miniCellProp = "col-span-1" + typeAProps + typeBProps + typeCProps


    // eslint-disable-next-line
    const SummonUnitCostCalculator = (e: any) => {
        if (type ==="C") {
            setVisible(true)
            console.log(e.target.value)
            setPayload(e.target.value)
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

            <button className={cellProp} onClick={SummonUnitCostCalculator} value={updated}>
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