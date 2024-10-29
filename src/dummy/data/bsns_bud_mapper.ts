import bsns_bud from "./bsns_bud.json"

// interface bsnsBudI {
//     type: string
//     name: string
//     year: number
//     budget: number
// }

const bsnsBudFilter = () => {
    const se = bsns_bud.data.filter((e) => (e.type === "세부사업"))
    const ne = bsns_bud.data.filter((e) => (e.type === "내역사업"))

    return [se, ne]
}

interface SummaryTableDataI {
    name: string
    data: SummaryTableDataRowI[]
}

interface SummaryTableDataRowI {
    year: number
    budget: number
}

const summaryTableData = (thisYear: number) => {
    const [se, ] = bsnsBudFilter()

    const dataRow: SummaryTableDataRowI[] = []

    se.map((e) => {
        dataRow.push({
            year: e.year,
            budget: e.budget
        })
    })

    const data: SummaryTableDataI = {
        name: se[0].name,
        data: dataRow.filter(e => e.year <= thisYear).sort((a, b) => ( a.year - b.year ))
    }

    return data
}

const havingYears = () => {
    const [se, ] = bsnsBudFilter()
    const years: number[] = []
    se.map(e => years.push(e.year))

    return years.sort()
}

export {
    bsnsBudFilter, summaryTableData, havingYears
}