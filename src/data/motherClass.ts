import the_data from "./the_data.json"
import { rounderNumber } from "../utils/rounder"


interface MotherDataI {
    se: {
        name: string,
        startDate: string,
        endDate: string,
        budget: { year: number, amount: number }[],
        ne: {
            name: string,
            startDate: string,
            endDate: string,
            budget: { year: number, amount: number }[],
            sbjt:  {
                name: string, 
                startDate: string, 
                endDate: string, 
                mainOrganization: string|null, 
                subOrganizations: string|null,
                budget: { year: number, amount: string }[],
                nation: string|null,
                foreign: string|null
            }[]
        }[]
    }
}

interface SbjtI {
    name: string, 
    startDate: string, 
    endDate: string, 
    mainOrganization: string|null, 
    subOrganizations: string|null,
    budget: { year: number, amount: string }[],
    nation: string|null,
    foreign: string|null
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

interface SummaryTableDisplay {
    name: string
    budget: { year: number, amount: number }[]
}

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

interface DashboardDisplay {
    se: {
        name: string,
        in: {
            amount: number|null
        }
        out: {
            amount: number|null
        }
    }
    ne: {
        name: string,
        in: {
            amount: number|null,
            weight: number|null,
            new: {
                count: number|null,
                sum: number|null,
                unitCost: number|null
            },
            continuous: {
                count: number|null,
                sum: number|null,
                unitCost: number|null
            }
        },
        out: {
            amount: number|null,
            weight: number|null,
            new: {
                count: number|null,
                sum: number|null,
                unitCost: number|null
            },
            continuous: {
                count: number|null,
                sum: number|null,
                unitCost: number|null
            }
        }
    }[]
}

class MotherDataClass {
    motherData: MotherDataI
    year: number

    constructor(
        // the_data: data: MotherDataI, 
        // year: number
    ) {
        this.motherData = {
            se: {
                name: the_data.data.세부사업.사업명,
                startDate: the_data.data.세부사업.시작일,
                endDate: the_data.data.세부사업.종료일,
                budget: the_data.data.세부사업.예산.map((e) => { return { year: e.년도, amount: e.금액 }}),
                ne:the_data.data.세부사업.내역사업.map((e) => {
                    return {
                        name: e.사업명,
                        startDate: e.시작일,
                        endDate: e.종료일,
                        budget: e.예산.map((el) => {
                            return { year: el.년도, amount: el.금액 }
                        }),
                        sbjt: e.과제,
                    }
                })
            }
        }
        const years = this.motherData.se.budget.map(e => e.year).sort((a, b) => a - b)
        this.year = years[years.length-1]
    }



    setYear(year:number) {
        this.year = year
        return this
    }

    setMotherData(newMD: MotherDataI) {
        this.motherData = newMD
    }

    getSeYears(): number[] {
        return this.motherData.se.budget.map(e => e.year)
    }

    getMotherData() {
        return this.motherData
    }

    setSeBudget(demand: number, year: number) {
        const budget = this.motherData.se.budget.map(e => {
            if ((e.amount).toString() === year.toString()) { e.amount = demand }
            return e
        })
        this.motherData.se.budget = budget
    }

    toDashBoard() {
        const lastYearSeAmount = this.motherData.se.budget.find((e) => e.year == this.year)?.amount || 0
        const result: DashboardDisplay = {
            se: {
                name: this.motherData.se.name,
                in: {
                    amount: this.motherData.se.budget.find(e => e.year==this.year+1)?.amount || null
                },
                out: {
                    amount: null
                }
            }, 
            ne: this.motherData.se.ne.map((e) => {
                const newSbjts = e.sbjt.filter((el) => el.startDate.split(".")[0] === (this.year+1).toString())
                const continueSbjts = e.sbjt.filter((el) => 
                    ( 
                        Number(el.startDate.split(".")[0]) < this.year+1 
                        && this.year+1 <= Number(el.endDate.split(".")[0]) 
                    )
                )

                const newCount = newSbjts.length
                const newSum = newSbjts.reduce((acc, cur) => (acc + (
                        cur.budget.find((elem) => elem.year === this.year+1) 
                         ? Number(cur.budget.find((elem) => elem.year === this.year+1)!.amount) 
                         : 0))
                    , 0)
                
                const continueCount = continueSbjts.length
                const continueSum = continueSbjts.reduce((acc, cur) => (acc + (
                        cur.budget.find((elem) => elem.year === this.year+1) 
                            ? Number(cur.budget.find((elem) => elem.year === this.year+1)!.amount) 
                            : 0))
                    , 0)

                const lastYearNeAmount = e.budget.find(e => e.year === this.year)?.amount || 0
                const weight = (lastYearSeAmount !== 0) ? lastYearNeAmount/lastYearSeAmount : 0
                return {
                    name: e.name,
                    in: {
                        amount: e.budget.find(e => e.year === this.year+1)?.amount || null,
                        weight: weight,
                        new: {
                            count: newCount,
                            sum: rounderNumber(newSum),
                            unitCost: rounderNumber(newSum/newCount/9*12)
                        }, 
                        continuous: {
                            count: continueCount,
                            sum: rounderNumber(continueSum),
                            unitCost: rounderNumber(continueSum/continueCount)
                        }
                    },
                    out: {
                        amount: null,
                        weight: weight,
                        new: {
                            count: null,
                            sum: null,
                            unitCost: null
                        }, 
                        continuous: {
                            count: null,
                            sum: null,
                            unitCost: null
                        }
                    },
                }
            })
        }
        return result
    }

    toHeader() {

    }

    toSummaryTable(): SummaryTableDisplay {
        const se = JSON.parse(JSON.stringify(this.motherData.se))
        const tableData: { year: number, amount: number }[] = [
            { year:this.year-4, amount:-1 },
            { year:this.year-3, amount:-1 },
            { year:this.year-2, amount:-1 },
            { year:this.year-1, amount:-1 },
            { year:this.year, amount:-1 }
        ]

        // eslint-disable-next-line
        se.budget.map((e: any) => {
            const idx = tableData.findIndex((el) => el.year === e.year)
            if (idx> 0) {tableData[idx].amount = e.amount}
        })

        return {
            name: se.name,
            budget: tableData
        }
    }

    toHT(): HTDisplay {
        const neList = this.motherData.se.ne.map((e) => {
            return {
                name: e.name,
                budget: {
                    lastYear: {
                        total: e.budget.find((elem) => elem.year === this.year-1)?.amount || null,
                        new: new UnitCostHandler(e.sbjt, this.year-1, "신규").init().emit(),
                        concord: new UnitCostHandler(e.sbjt, this.year-1, "기일치").init().emit(),
                        end: new UnitCostHandler(e.sbjt, this.year-1, "종료").init().emit(),
                        continue: new UnitCostHandler(e.sbjt, this.year-1, "계속").init().emit(),
                    }, 
                    thisYear: {
                        total: e.budget.find((elem) => elem.year === this.year)?.amount || null,
                        new: new UnitCostHandler(e.sbjt, this.year, "신규").init().emit(),
                        concord: new UnitCostHandler(e.sbjt, this.year, "기일치").init().emit(),
                        end: new UnitCostHandler(e.sbjt, this.year, "종료").init().emit(),
                        continue: new UnitCostHandler(e.sbjt, this.year, "계속").init().emit(),
                    }, 
                    nextYear: {
                        total: e.budget.find((elem) => elem.year === this.year+1)?.amount || null,
                        new: new UnitCostHandler(e.sbjt, this.year+1, "신규").init().emit(),
                        concord: new UnitCostHandler(e.sbjt, this.year+1, "기일치").init().emit(),
                        end: new UnitCostHandler(e.sbjt, this.year+1, "종료").init().emit(),
                        continue: new UnitCostHandler(e.sbjt, this.year+1, "계속").init().emit(),
                    },
                }
            }
        })
    
        const result: HTDisplay = {
            se: {
                name: this.motherData.se.name,
                budget: {
                    lastYear: this.motherData.se.budget.find((e) => e.year === this.year-1)?.amount || null,
                    thisYear: this.motherData.se.budget.find((e) => e.year === this.year)?.amount || null,
                    nextYear: this.motherData.se.budget.find((e) => e.year === this.year+1)?.amount || null
                }
            },
            ne: neList
        }
    
        return result
    }

    toSbjtList(): SbjtListDisplay[] {
        const result: SbjtListDisplay[] = [{
            type: "세부사업",
            name: `${this.motherData.se.name}`,
            period: `${this.motherData.se.startDate}~${this.motherData.se.endDate}`,
            mainOrg: "-",
            subOrgs: "-",
            lastYear: (this.motherData.se.budget.find((it) => it.year === this.year-1)?.amount || "").toString(),
            thisYear: (this.motherData.se.budget.find((it) => it.year === this.year)?.amount || "").toString(),
            demand: (this.motherData.se.budget.find((it) => it.year === this.year+1)?.amount || "").toString(),
            nextYear: (this.motherData.se.budget.find((it) => it.year === this.year+2)?.amount || "").toString(),
            nation: "-",
            foreign: "-"
        }]
    
        let counter = 0
    
        this.motherData.se.ne.map((e) => {
            result.push({
                type: "내역사업",
                name: `${e.name}`,
                period: `${e.startDate}~${e.endDate}`,
                mainOrg: "-",
                subOrgs: "-",
                lastYear: (e.budget.find((it) => it.year === this.year-1)?.amount || "").toString(),
                thisYear: (e.budget.find((it) => it.year === this.year)?.amount || "").toString(),
                demand: (e.budget.find((it) => it.year === this.year+1)?.amount || "").toString(),
                nextYear: (e.budget.find((it) => it.year === this.year+2)?.amount || "").toString(),
                nation: "-",
                foreign: "-",
            })
            e.sbjt.map((e) => {
                const period = `${dateFormatChange(e.startDate) || e.startDate}~${dateFormatChange(e.endDate) || e.startDate}\n(${sumOfExpense(this.year, e.budget)})`
                counter++
                result.push({
                    type: "과제",
                    name: `${counter.toString()}. ${e.name}`,
                    period: period,
                    mainOrg: e.mainOrganization || "-",
                    subOrgs: (e.subOrganizations || "-").replace(/,\s/g, "\n"),
                    lastYear: (e.budget.find((it) => it.year === this.year-1)?.amount || "").toString(),
                    thisYear: (e.budget.find((it) => it.year === this.year)?.amount || "").toString(),
                    demand: (e.budget.find((it) => it.year === this.year+1)?.amount || "").toString(),
                    nextYear: (e.budget.find((it) => it.year === this.year+2)?.amount || "").toString(),
                    nation: e.nation || "-",
                    foreign: e.foreign || "-",
                })
            })
        })
        return result
    }
}

const sumOfExpense = (thisYear: number, budget: { year: number, amount: string }[]) => {
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

class UnitCostHandler {
    sbjtList: SbjtI[]
    year: number
    type: string

    constructor(sbjtList: SbjtI[], year:number, type:string) {
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
            
        // eslint-disable-next-line
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
        if(fixUnitCost) { this.unitCost = this.calculateUnitCost() }
            else { this.sum = this.calculateSum() }
    }

    setMonths(input: number, fixUnitCost: boolean = false) {
        this.months = input
        if(fixUnitCost) { this.sum = this.calculateSum() } 
        else { this.unitCost = this.calculateUnitCost() }
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


export default MotherDataClass