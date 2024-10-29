import numberHandler from "@/utils/numberHandler"

interface SummaryTableDisplay {
    name: string
    budget: { year: number, amount: number }[]
}


interface SummaryTableProps {
    year: number
    summaryTableData: SummaryTableDisplay
}

const SummaryTable = ({ year, summaryTableData }: SummaryTableProps ) => {

    return (
        <div className="px-5 pt-2 pb-5">
            <div className="grid grid-cols-6 p-1 text-center bg-slate-300 font-bold">
                <div className="">사업명</div>
                <div className="">{`${year-4}년`}</div>
                <div className="">{`${year-3}년`}</div>
                <div className="">{`${year-2}년`}</div>
                <div className="">{`${year-1}년`}</div>
                <div className="">{`${year}년`}</div>
            </div>

            <div className="grid grid-cols-6 p-1 text-center">
                <div className="">{summaryTableData.name}</div>
                {
                    summaryTableData.budget.map((e, i) => (
                        <div key={"summaryTableHeader"+i} className="">{(e.amount > -1) ? numberHandler((e?.amount).toString()) : ""}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default SummaryTable