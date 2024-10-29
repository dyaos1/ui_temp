'use client'

interface HTRowSeProps {
    se: {
        name: string,
        budget: { lastYear: number|null, thisYear: number|null, nextYear: number|null }
    }
    // disable-eslint-next-line
    setSeDemand: any
}

const HTRowSe = ({se, setSeDemand}: HTRowSeProps) => {
    const cellProp = "col-span-2 font-semibold"
    const miniCellProp = "col-span-1 font-semibold"
    const buttonProp = "col-span-2 font-semibold"

    const inputDemand = (e: any) => {
        setSeDemand(e.target.value)
    }

    return (
        <div className="grid grid-cols-12 text-center content-start items-start p-1">
            <div className={cellProp}>
                {se.name}
            </div>

            <div className={cellProp}>
                { se.budget.lastYear || "" }
            </div>

            <div className={cellProp}>
                { se.budget.thisYear || "" }
            </div>

            <input 
                className={buttonProp + " text-center"} 
                value={ se.budget.nextYear?.toString() || "" }
                onChange={inputDemand}
            />

            <button className={buttonProp}>
            </button>

            <div className={miniCellProp}>
                {}
            </div>

            <div className={miniCellProp}>
                {}   
            </div>
        </div>
    )
}

export default HTRowSe;