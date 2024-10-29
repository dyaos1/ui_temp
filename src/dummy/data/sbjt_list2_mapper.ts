import { rounderNumber } from "@/utils/rounder"
import sbjt_list3 from "./sbjt_list3.json"

interface SbjtList3I {
    name: string
    period: string
    mainOrg: string
    subOrgs: string
    lastYear: string
    thisYear: string
    demand: string
    nextYear: string
    nation: string
    foreign: string
}


const sbjtListMapper = (thisYear: number) => {
    const data: SbjtList3I[] = []
    sbjt_list3.data.map((e, i) => {
        const period = `${dateFormatChange(e.startDate) || e.startDate}~${dateFormatChange(e.endDate) || e.startDate}\n(${sumOfExpense(thisYear, e.budget)})`

        data.push({
            name: `${(i+1).toString()}. ${e.name}`,
            period: period,
            mainOrg: e.mainOrganization || "-",
            subOrgs: (e.subOrganizations || "-").replace(", ", "\n"),
            lastYear: (e.budget.find((it) => it.year === thisYear-1)?.amount || "").toString(),
            thisYear: (e.budget.find((it) => it.year === thisYear)?.amount || "").toString(),
            demand: (e.budget.find((it) => it.year === thisYear+1)?.amount || "").toString(),
            nextYear: (e.budget.find((it) => it.year === thisYear+2)?.amount || "").toString(),
            nation: e.nation || "-",
            foreign: e.foreign || "-",
        })
    })
    return data
}



interface SbjtList3JsonI {
    name: string
    startDate: string
    endDate: string
    mainOrganization: string | null
    subOrganizations: string | null
    budget: SbjtList3Budget[]
    nation: string | null
    foreign: string | null
}

interface SbjtList3Budget {
    year: number
    amount: string
}

const sumOfExpense = (thisYear: number, budget: SbjtList3Budget[]) => {
    const lastYearBud = Number(budget.find((e) => e.year === thisYear-1)?.amount) || 0
    const thisYearBud = Number(budget.find((e) => e.year === thisYear)?.amount) || 0
    const demand = Number(budget.find((e) => e.year === thisYear+1)?.amount) || 0
    const nextYearBud = Number(budget.find((e) => e.year === thisYear+2)?.amount) || 0

    return lastYearBud + thisYearBud + demand + nextYearBud
}

const dateFormatChange = (date: string) => {
    const dateArr = date.split(".")
    try {
        return `\`${dateArr[0].slice(2, 4)}.${dateArr[1]}`
    } catch {

    }
    return null
}

interface UCTotalI {
    lastYear: UCCellI
    thisYear: UCCellI
    nextYear: UCCellI
}

interface UCCellI {
    new: (UCI|null)
    concord: UCI | null
    end: UCI | null
    continue: UCI | null
}

interface UCI {
    type: string
    count: number | null
    unitCost: number | null
    months: number
    sum: number | null
}

interface UCICelltoString {
    lastYear: UCItoString
    thisYear: UCItoString
    nextYear: UCItoString
}

interface UCItoString {
    new: (string|null)
    concord: string | null
    end: string | null
    continue: string | null
}

const UCTotalMaker = (year: number) => {
    const total: UCTotalI = {
        lastYear: {
            new: UCMaker(year-1, "신규"),
            concord: UCMaker(year-1, "기일치"),
            end: UCMaker(year-1, "종료"),
            continue: UCMaker(year-1, "계속")
        }, 
        thisYear: {
            new: UCMaker(year, "신규"),
            concord: UCMaker(year, "기일치"),
            end: UCMaker(year, "종료"),
            continue: UCMaker(year, "계속")
        }, 
        nextYear: {
            new: UCMaker(year+1, "신규"),
            concord: UCMaker(year+1, "기일치"),
            end: UCMaker(year+1, "종료"),
            continue: UCMaker(year+1, "계속")
        }
    }
    return total
}

const UCTotalToString = (total: UCTotalI): UCICelltoString => {
    return {
        lastYear: { 
            new: (total.lastYear.new) ? `${total.lastYear.new?.count}개 x ${total.lastYear.new?.unitCost}백만 x ${total.lastYear.new?.months}/12개월 = ${total.lastYear.new?.sum} 백만원` : null,
            concord: (total.lastYear.concord) ? `${total.lastYear.concord?.count}개 x ${total.lastYear.concord?.unitCost}백만 x ${total.lastYear.concord?.months}/12개월 = ${total.lastYear.concord?.sum} 백만원` : null,
            end: (total.lastYear.end) ? `${total.lastYear.new?.count}개 x ${total.lastYear.new?.unitCost}백만 x ${total.lastYear.new?.months}/12개월 = ${total.lastYear.new?.sum} 백만원` : null,
            continue: (total.lastYear.continue) ? `${total.lastYear.new?.count}개 x ${total.lastYear.new?.unitCost}백만 x ${total.lastYear.new?.months}/12개월 = ${total.lastYear.new?.sum} 백만원` : null
        }, 
        thisYear: { 
            new: (total.thisYear.new) ? `${total.thisYear.new?.count}개 x ${total.thisYear.new?.unitCost}백만 x ${total.thisYear.new?.months}/12개월 = ${total.thisYear.new?.sum} 백만원` : null,
            concord: (total.thisYear.concord) ? `${total.thisYear.concord?.count}개 x ${total.thisYear.concord?.unitCost}백만 x ${total.thisYear.concord?.months}/12개월 = ${total.thisYear.concord?.sum} 백만원` : null,
            end: (total.thisYear.end) ? `${total.thisYear.end.count}개 x ${total.thisYear.end.unitCost}백만 x ${total.thisYear.end.months}/12개월 = ${total.thisYear.end.sum} 백만원` : null,
            continue: (total.thisYear.continue) ? `${total.thisYear.new?.count}개 x ${total.thisYear.new?.unitCost}백만 x ${total.thisYear.new?.months}/12개월 = ${total.thisYear.new?.sum} 백만원` : null
        }, 
        nextYear: { 
            new: (total.nextYear.new) ? `${total.nextYear.new?.count}개 x ${total.nextYear.new?.unitCost}백만 x ${total.nextYear.new?.months}/12개월 = ${total.nextYear.new?.sum} 백만원` : null,
            concord: (total.nextYear.concord) ? `${total.nextYear.concord?.count}개 x ${total.nextYear.concord?.unitCost}백만 x ${total.nextYear.concord?.months}/12개월 = ${total.nextYear.concord?.sum} 백만원` : null,
            end: (total.nextYear.end) ? `${total.nextYear.end.count}개 x ${total.nextYear.end.unitCost}백만 x ${total.nextYear.end.months}/12개월 = ${total.nextYear.end.sum} 백만원` : null,
            continue: (total.nextYear.continue) ? `${total.nextYear.new?.count}개 x ${total.nextYear.new?.unitCost}백만 x ${total.nextYear.new?.months}/12개월 = ${total.nextYear.new?.sum} 백만원` : null
        }
    }
}

const categorizer = (e: SbjtList3JsonI, year: number, type: string) => {
    switch(type) {
        case "신규" :
            return e.startDate.split(".")[0] === year.toString()
        case "종료" :
            return e.endDate.split(".")[0] === year.toString()
        case "기일치":
            return (Number(e.startDate.split(".")[0]) < year) && (year < Number(e.endDate.split(".")[0]))
        default :
            return false
    }
}

const UCMaker = (year: number, type: string) => {
    const filtered = sbjt_list3.data.filter((e) => categorizer(e, year, type))

    const count = filtered.length
    if(count < 1) { return null }
    const sum = filtered.reduce((acc, cur) => acc + Number((cur.budget.filter((e) => (e.year === year))|| [0])[0].amount), 0)
    const months = (type === "신규") ? 9 : 12
    const unitCost = sum/count/months*12
    const result = {
        type: type,
        count: count,
        months: months,
        sum: rounderNumber(sum),
        unitCost: rounderNumber(unitCost)
    }

    return result
}

export {
    sbjtListMapper, UCTotalMaker, UCTotalToString
}
export type { UCTotalI, UCICelltoString }
