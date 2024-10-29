import { rounderNumber } from '@/utils/rounder'
import data from './the_data.json'

interface SbjtListDisplay {
    type: string
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
    const result: SbjtListDisplay[] = [{
        type: "세부사업",
        name: `${data.data.세부사업.사업명}`,
        period: `${data.data.세부사업.시작일}~${data.data.세부사업.종료일}`,
        mainOrg: "-",
        subOrgs: "-",
        lastYear: (data.data.세부사업.예산.find((it) => it.년도 === thisYear-1)?.금액 || "").toString(),
        thisYear: (data.data.세부사업.예산.find((it) => it.년도 === thisYear)?.금액 || "").toString(),
        demand: (data.data.세부사업.예산.find((it) => it.년도 === thisYear+1)?.금액 || "").toString(),
        nextYear: (data.data.세부사업.예산.find((it) => it.년도 === thisYear+2)?.금액 || "").toString(),
        nation: "-",
        foreign: "-",
    }]

    let counter = 0

    data.data.세부사업.내역사업.map((e, i) => {
        result.push({
            type: "내역사업",
            name: `${e.사업명}`,
            period: `${e.시작일}~${e.종료일}`,
            mainOrg: "-",
            subOrgs: "-",
            lastYear: (e.예산.find((it) => it.년도 === thisYear-1)?.금액 || "").toString(),
            thisYear: (e.예산.find((it) => it.년도 === thisYear)?.금액 || "").toString(),
            demand: (e.예산.find((it) => it.년도 === thisYear+1)?.금액 || "").toString(),
            nextYear: (e.예산.find((it) => it.년도 === thisYear+2)?.금액 || "").toString(),
            nation: "-",
            foreign: "-",
        })
        e.과제.map((e, i) => {
            const period = `${dateFormatChange(e.startDate) || e.startDate}~${dateFormatChange(e.endDate) || e.startDate}\n(${sumOfExpense(thisYear, e.budget)})`
            counter++
            result.push({
                type: "과제",
                name: `${counter.toString()}. ${e.name}`,
                period: period,
                mainOrg: e.mainOrganization || "-",
                subOrgs: (e.subOrganizations || "-").replace(/,\s/g, "\n"),
                lastYear: (e.budget.find((it) => it.year === thisYear-1)?.amount || "").toString(),
                thisYear: (e.budget.find((it) => it.year === thisYear)?.amount || "").toString(),
                demand: (e.budget.find((it) => it.year === thisYear+1)?.amount || "").toString(),
                nextYear: (e.budget.find((it) => it.year === thisYear+2)?.amount || "").toString(),
                nation: e.nation || "-",
                foreign: e.foreign || "-",
            })
        })
    })
    return result
}

interface HTDisplay {
    se: {
        name: string,
        budget: {lastYear: number|null, thisYear: number|null, nextYear: number|null}
    }
    ne: {
        name: string
        budget: {
            lastYear: {
                total: number|null,
                new: {
                    count: number|null,
                    unitCost: number|null,
                    months: number|null,
                    sum: number|null,
                    toString: string
                },
                concord: {
                    count: number|null,
                    unitCost: number|null,
                    months: number|null,
                    sum: number|null,
                    toString: string
                },
                end: {
                    count: number|null,
                    unitCost: number|null,
                    months: number|null,
                    sum: number|null,
                    toString: string
                },
                continue: {
                    count: number|null,
                    unitCost: number|null,
                    months: number|null,
                    sum: number|null,
                    toString: string
                }
            }, 
            thisYear: {
                total: number|null,
                new: {
                    count: number|null,
                    unitCost: number|null,
                    months: number|null,
                    sum: number|null,
                    toString: string
                },
                concord: {
                    count: number|null,
                    unitCost: number|null,
                    months: number|null,
                    sum: number|null,
                    toString: string
                },
                end: {
                    count: number|null,
                    unitCost: number|null,
                    months: number|null,
                    sum: number|null,
                    toString: string
                },
                continue: {
                    count: number|null,
                    unitCost: number|null,
                    months: number|null,
                    sum: number|null,
                    toString: string
                }
            }, 
            nextYear: {
                total: number|null,
                new: {
                    count: number|null,
                    unitCost: number|null,
                    months: number|null,
                    sum: number|null,
                    toString: string
                },
                concord: {
                    count: number|null,
                    unitCost: number|null,
                    months: number|null,
                    sum: number|null,
                    toString: string
                },
                end: {
                    count: number|null,
                    unitCost: number|null,
                    months: number|null,
                    sum: number|null,
                    toString: string
                },
                continue: {
                    count: number|null,
                    unitCost: number|null,
                    months: number|null,
                    sum: number|null,
                    toString: string
                }
            }
        }
    }[]
}


const HTMapper = (year: number) => {
    const neList = data.data.세부사업.내역사업.map((e) => {
        return {
            name: e.사업명,
            budget: {
                lastYear: {
                    total: e.예산.find((elem) => elem.년도 === year-1)?.금액 || null,
                    new: new UnitCostHandler(e.과제, year-1, "신규").init().emit(),
                    concord: new UnitCostHandler(e.과제, year-1, "기일치").init().emit(),
                    end: new UnitCostHandler(e.과제, year-1, "종료").init().emit(),
                    continue: new UnitCostHandler(e.과제, year-1, "계속").init().emit(),
                }, 
                thisYear: {
                    total: e.예산.find((elem) => elem.년도 === year)?.금액 || null,
                    new: new UnitCostHandler(e.과제, year, "신규").init().emit(),
                    concord: new UnitCostHandler(e.과제, year, "기일치").init().emit(),
                    end: new UnitCostHandler(e.과제, year, "종료").init().emit(),
                    continue: new UnitCostHandler(e.과제, year, "계속").init().emit(),
                }, 
                nextYear: {
                    total: e.예산.find((elem) => elem.년도 === year+1)?.금액 || null,
                    new: new UnitCostHandler(e.과제, year+1, "신규").init().emit(),
                    concord: new UnitCostHandler(e.과제, year+1, "기일치").init().emit(),
                    end: new UnitCostHandler(e.과제, year+1, "종료").init().emit(),
                    continue: new UnitCostHandler(e.과제, year+1, "계속").init().emit(),
                },
            }
        }
    })

    const result: HTDisplay = {
        se: {
            name: data.data.세부사업.사업명,
            budget: {
                lastYear: data.data.세부사업.예산.find((e) => e.년도 === year-1)?.금액 || null,
                thisYear: data.data.세부사업.예산.find((e) => e.년도 === year)?.금액 || null,
                nextYear: data.data.세부사업.예산.find((e) => e.년도 === year+1)?.금액 || null
            }
        },
        ne: neList
    }

    return result
}


// util functions
interface sbjtListParam {
    name: string, 
    startDate: string, 
    endDate: string, 
    mainOrganization: string|null, 
    subOrganizations: string|null,
    budget: {year: number, amount: string}[],
    nation: string|null,
    foreign: string|null
}

class UnitCostHandler {
    sbjtList: sbjtListParam[]
    year: number
    type: string

    constructor(sbjtList: sbjtListParam[], year:number, type:string) {
        this.sbjtList = JSON.parse(JSON.stringify(sbjtList));
        this.year = year
        this.type = type
    }

    count: (number|null) = null
    months: (number|null) = null
    sum: (number|null) = null
    unitCost: (number|null) = null

    init() {
        try {
            if(this.type==="신규") { 
                this.sbjtList = this.sbjtList.filter((e) =>
                        e.startDate.split(".")[0] === this.year.toString()
                    )
                .map((e) => {
                    e.budget = e.budget.filter((elem) => elem.year === this.year)
                    return e
                })
            } else if(this.type==="기일치") { 
                this.sbjtList = this.sbjtList
                    .filter((e) => Number(e.startDate.split(".")[0]) < this.year && this.year < Number(e.endDate.split(".")[0]))
                    .map((e) => {
                        e.budget = e.budget.filter((elem) => elem.year === this.year)
                        return e
                    })
            } else if(this.type==="종료") { 
                this.sbjtList = this.sbjtList
                    .filter((e) => e.endDate.split(".")[0] === this.year.toString())
                    .map((e) => {
                    e.budget = e.budget.filter((elem) => elem.year === this.year)
                    return e
                })
            } else {
                this.sbjtList = []
            }
            this.count = this.sbjtList.length
            if(this.count > 0) {
                this.months = ['계속', '종료', '기일치'].includes(this.type) ? 12 : 9
                this.sum = this.sbjtList
                    .reduce((acc, cur) => acc + Number(cur.budget[0].amount), 0)
                this.unitCost = this.calculateUnitCost()
            }
        } catch (e: any) {
            console.log(e)
            this.count = null
        }
        return this
    }

    getCount() {
        if ( this.count ) { this.init() }
        if ( this.count! < 1 ) { return null }
        return this.count
    }

    getMonths() {
        if ( this.count ) { this.init() }
        if ( this.count! < 1 ) { return null }
        return this.months
    }

    getSum() {
        if ( this.count ) { this.init() }
        if ( this.count! < 1 ) { return null }
        return this.sum
    }

    getUnitCost() {
        if ( this.count ) { this.init() }
        if ( this.count! < 1 ) { return null }
        if (!this.sum) { throw new Error("Sum was not set up") }
        return this.unitCost
    }

    setCount(input: number, fixUnitCost: boolean = false) {
        this.count = input
        fixUnitCost 
            ? (this.unitCost = this.calculateUnitCost()) 
            : (this.sum = this.calculateSum())
    }

    setMonths(input: number, fixUnitCost: boolean = false) {
        this.months = input
        fixUnitCost 
            ? (this.sum = this.calculateSum())
            : (this.unitCost = this.calculateUnitCost()) 
    }

    setUnitCost(input: number) {
        this.unitCost = input
        this.sum = this.calculateSum()
    }

    setSum(input: number) {
        this.sum = input
        this.unitCost = this.calculateUnitCost()
    }

    calculateUnitCost() {
        return (this.sum || this.count || this.months) ? (this.sum! / this.count! / this.months! * 12) : null
    }

    calculateSum() {
        return (this.count || this.months || this.unitCost ) ? (this.count! * this.unitCost! * this.months! / 12) : null
    }

    getString() {
        const header = (this.type === "신규") ? "" : `(${this.type}) `
        const result = (this.count && this.unitCost && this.months && this.sum && (this.count > 0))
            ? `${header}${this.count}개 x ${rounderNumber(this.unitCost)}백만 x ${this.months}/12 개월 = ${rounderNumber(this.sum)} 백만원` 
            : ""
        return result
    }

    emit() {
        if(!(this.count && this.unitCost && this.months && this.sum)) { 
            return {
                count: null,
                unitCost: null,
                months: null,
                sum: null,
                toString: ""
            }
        }
        return {
            count: this.count,
            unitCost: this.unitCost,
            months: this.months,
            sum: this.sum,
            toString: this.getString()
        }
    }
}

const dateFormatChange = (date: string) => {
    const dateArr = date.split(".")
    try {
        return `\`${dateArr[0].slice(2, 4)}.${dateArr[1]}`
    } catch {

    }
    return null
}

interface SbjtListBudget {
    year: number
    amount: string
}

const sumOfExpense = (thisYear: number, budget: SbjtListBudget[]) => {
    const lastYearBud = Number(budget.find((e) => e.year === thisYear-1)?.amount) || 0
    const thisYearBud = Number(budget.find((e) => e.year === thisYear)?.amount) || 0
    const demand = Number(budget.find((e) => e.year === thisYear+1)?.amount) || 0
    const nextYearBud = Number(budget.find((e) => e.year === thisYear+2)?.amount) || 0

    return lastYearBud + thisYearBud + demand + nextYearBud
}

export {
    sbjtListMapper, UnitCostHandler, HTMapper
}
export type {
    SbjtListDisplay
}