import { areEmpty, isEmpty } from '@/utils/isEmpty'

interface HTRow2Props {
 //   type: string
    budget: {
        lastYear: UCCYearI
        thisYear: UCCYearI
        nextYear: UCCYearI
    }

    // eslint-disable-next-line
    setVisible: any
    // eslint-disable-next-line
    setCalculatorTarget: any

    idx: number
}

interface UCCYearI {
    new: UCCUnitI
    concord: UCCUnitI
    end: UCCUnitI
    continue: UCCUnitI
}

interface UCCUnitI {
    count: number|null,
    unitCost: number|null,
    months: number|null,
    sum: number|null,
    toString: string
}


const budgetRow = ({ budget, setVisible, setCalculatorTarget, idx }: HTRow2Props) => {
    const cellProp = "col-span-2"
    const miniCellProp = "col-span-1"
    const buttonProp = "col-span-2 h-full hover:bg-cyan-100"

/*
    "신규":["252개 x 1375백만 x 9/12\n = 259,889 백만원"],
    "기일치": "303개 x 854백만 x 12/12\n = 258657백만원",
    "계속":"1개 x 1,650백만 x 10/12\n = 17,875 백만원",
    "종료": "47개 x 1,526백만 x 11/12\n = 65,739백만원"
*/

    // eslint-diable-next-line
    const onClickButton = (e: any) => {
        setCalculatorTarget(idx)
        setVisible(true)
    }

    return (
        <div>
            <div className="grid grid-cols-12 text-center content-start items-start p-1">
                <div className={cellProp}>
                </div>

                <div className={cellProp}>
                    <div>
                        {`${isEmpty(budget.lastYear.new?.toString) ? "" : "<신규과제>"}`}
                    </div>
                    <div className="text-sm text-left px-2 pb-2">
                        {`${isEmpty(budget.lastYear.new?.toString) ? "" : budget.lastYear.new!.toString}`}
                    </div>
                    <div>
                        {`${(budget.lastYear.concord.toString + budget.lastYear.end.toString + budget.lastYear.continue.toString == "") ? "" : "<계속과제>"}`}
                    </div>
                    <div className="row-span-2 text-sm text-left px-2 pb-2">
                        {`${(isEmpty(budget.lastYear.concord?.toString) ? "" : budget.lastYear.concord!.toString+"\n") + (isEmpty(budget.lastYear.end?.toString) ? "" : budget.lastYear.end!.toString+"\n") + (isEmpty(budget.lastYear.continue?.toString) ? "" : budget.lastYear.continue!.toString+"\n")}`}
                    </div>
                </div>


                <div className={cellProp}>
                    <div>
                        {`${isEmpty(budget.thisYear.new?.toString) ? "" : "<신규과제>"}`}
                    </div>
                    <div className="text-sm text-left px-2 pb-2">
                        {`${isEmpty(budget.thisYear.new?.toString) ? "" : budget.thisYear.new!.toString}`}
                    </div>
                    <div>
                        {`${(budget.thisYear.concord.toString + budget.thisYear.end.toString + budget.thisYear.continue.toString == "") ? "" : "<계속과제>"}`}
                    </div>
                    <div className="row-span-2 text-sm text-left px-2 pb-2">
                        {`${(isEmpty(budget.thisYear.concord?.toString) ? "" : budget.thisYear.concord!.toString+"\n") + (isEmpty(budget.thisYear.end?.toString) ? "" : budget.thisYear.end!.toString+"\n") + (isEmpty(budget.thisYear.continue?.toString) ? "" : budget.thisYear.continue!.toString+"\n")}`}
                    </div>
                </div>

                <button 
                    className={buttonProp} 
                    onClick={onClickButton}
                >
                    <div>
                        {`${isEmpty(budget.nextYear.new?.toString) ? "" : "<신규과제>"}`}
                    </div>
                    <div className="text-sm text-left px-2 pb-2">
                        {`${isEmpty(budget.nextYear.new?.toString) ? "" : budget.nextYear.new!.toString}`}
                    </div>
                    <div>
                        {`${(budget.nextYear.concord.toString + budget.nextYear.end.toString + budget.nextYear.continue.toString == "") ? "" : "<계속과제>"}`}
                    </div>
                    <div className="row-span-2 text-sm text-left px-2 pb-2">
                        {`${(isEmpty(budget.nextYear.concord?.toString) ? "" : budget.nextYear.concord!.toString+"\n") + (isEmpty(budget.nextYear.end?.toString) ? "" : budget.nextYear.end!.toString+"\n") + (isEmpty(budget.nextYear.continue?.toString) ? "" : budget.nextYear.continue!.toString+"\n")}`}
                    </div>
                    
                </button>
                
                <button className={buttonProp}>
                    
                </button>

                <div className={miniCellProp}>
                    {}
                </div>

                <div className={miniCellProp}>
                    {}   
                </div>
            </div>
        </div>
    )
}

export default budgetRow;