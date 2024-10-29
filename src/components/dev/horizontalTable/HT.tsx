'use client'

import HorizontalTableHeader2 from "./HTHeader";
import HTRowSe from "./HTRowSe";
import HTRowNe from "./HTRowNe";
import HTUCRow from "./HTUCRow";
import { useEffect, useState } from "react";
import UnitCostCalculator2 from "@/components/calculators/UnitCostCalculator";
import { rounderNumberTwo } from "@/utils/rounder";

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

interface HTProps {
    year: number
    HTData: HTDisplay
}

const HT2 = ({ year, HTData }: HTProps) => {
    // UnitCostCalculator 관련
    const [visible, setVisible] = useState(false)

    // se demand change
    const [seBudgets, setSeBudgets] = useState(HTData.se)

    const setSeDemand = (demand: number) => {
        const lastYearValue = HTData.se.budget.thisYear || 0
        const increase = lastYearValue - demand
        const increaseRate = (lastYearValue === 0) ? NaN : rounderNumberTwo(increase / lastYearValue)

        const thisYearNeSum = HTData.se.budget.thisYear || 0

        setSeBudgets(prev => {
            const newState = {
                ...prev,
                budget: {
                    ...prev.budget,
                    nextYear: demand
                }
            }
            return newState
        })
    }

    // ne change
    const [neBudgets, setNeBudgets] = useState(HTData.ne)

    const setNeDemand = (demand: number, idx: number) => {
        setNeBudgets(prev => {
            const newValue = {
                ...prev[idx],
                budget: {
                    ...prev[idx].budget,
                    nextYear: {
                        ...prev[idx].budget.nextYear,
                        total: demand
                    }
                }
            }
            const newState = [
                ...prev.slice(0, idx),
                newValue,
                ...prev.slice(idx+1)
            ]
            return newState
        })   
        console.log(neBudgets)
    }

    // when change year
    useEffect(() => {
        setSeBudgets(HTData.se)
        setNeBudgets(HTData.ne)
    }, [year])

    const setUCState = (
        value: {
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
        }, idx: number
    ) => {
        setNeBudgets(prev => {
            const newValue = {
                ...prev[idx],
                budget: {
                    ...prev[idx].budget,
                    nextYear: {
                        ...prev[idx].budget.nextYear,
                        ...value
                    }
                }
            }

            const newState = [
                ...prev.slice(0, idx),
                newValue,
                ...prev.slice(idx+1)
            ]
            return newState
        })
    }


    const [calculatorTarget, setCalculatorTarget] = useState(-1)

    // useEffect(() => {
    //     setHTData()
    // }, [year, HTData])


    return (
        <div className="mx-5 mt-2 mb-5">

            { visible && <UnitCostCalculator2 setVisible={setVisible} dataState={neBudgets[calculatorTarget].budget.nextYear} calculatorTarget={calculatorTarget} setUCState={setUCState} />}

            <HorizontalTableHeader2 year={year} />

            <HTRowSe se={seBudgets} setSeDemand={setSeDemand} />

            {
                neBudgets.map((e, i) => (
                    <div key={`HT-${i}`}>
                        <HTRowNe 
                            key={`ne-${i}`}
                            ne={e} 
                            idx={i}
                            setNeDemand={setNeDemand}
                            setVisible={setVisible}
                            setCalculatorTarget={setCalculatorTarget}
                        />
                    </div>
                ))
            }

            
        </div>
    )
}

export default HT2;