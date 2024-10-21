'use client'

import HTDataRow from "./HTDataRow";
import HorizontalTableHeader from "./HorizontalTableHeader";
import { HT_DataRow } from "../../data/ht_mapper"


interface HorizontalTableProps {
    // eslint-disable-next-line
    setVisible: any
    // eslint-disable-next-line
    setPayload: any
    // eslint-disable-next-line
    setRowCount: any

    data: HT_DataRow[]
}

const HorizontalTable = ({setPayload, setVisible, data, setRowCount}: HorizontalTableProps) => {
    return (
        <div className="mx-5 mt-2 mb-5">
            <HorizontalTableHeader />
            {
                data.map(
                    (e, i) => (
                        <HTDataRow 
                            key={e.bsnsNm+i}
                            type={e.type}
                            bsnsNm={e.bsnsNm}  
                            lastYear={e.lastYear}
                            thisYear={e.thisYear}
                            nextYear={e.nextYear}
                            updated={e.updated}
                            increase={e.increase}
                            increasePercent={e.increasePercent}
                            setVisible={setVisible}
                            setPayload={setPayload}
                            setRowCount={setRowCount}
                            rowCount={e.rowCount}
                        />
                    )
                )
            }


            
        </div>
    )
}

export default HorizontalTable;