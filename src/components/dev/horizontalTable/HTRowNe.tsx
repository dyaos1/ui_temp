/* eslint-disable */
'use client'

import { useState } from "react"
import HTUCRow from "./HTUCRow"

interface HTRowNeProps {
    ne: {
        name: string,
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
    }
    idx: number

    // disable-eslint-next-line
    setNeDemand: any
    // disable-eslint-next-line
    setVisible: any
    // disable-eslint-next-line
    setCalculatorTarget: any
}

const HTRowNe = ({ ne, idx, setNeDemand, setVisible, setCalculatorTarget }: HTRowNeProps) => {
    const cellProp = "col-span-2"
    const miniCellProp = "col-span-1"
    const buttonProp = "col-span-2"

    // disable-eslint-next-line
    const onChangeNeDemand = (e: any) => {
        setNeDemand(e.target.value, idx)
    }

    return (
        <div>
            <div className="grid grid-cols-12 text-center content-start items-start p-1">
                <div className={cellProp}>
                    {ne.name}
                </div>

                <div className={cellProp}>
                    { ne.budget.lastYear.total || "" }
                </div>

                <div className={cellProp}>
                    { ne.budget.thisYear.total || "" }
                </div>

                <input 
                    className={buttonProp + " text-center"} 
                    value={ ne.budget.nextYear.total || "" }
                    onChange={onChangeNeDemand}
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
            <HTUCRow 
                key={`HTUC-${idx}`}
                budget={ne.budget} 
                setVisible={setVisible} 
                setCalculatorTarget={setCalculatorTarget}
                idx={idx}
            />
        </div>
    )
}

export default HTRowNe;