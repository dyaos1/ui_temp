'use client'

import Header from "../Header";
import HorizontalTable from "../horizontalTable/HorizontalTable";
import Line from "../Line";
import SummaryTable from "../SummaryTable";
import Title from "../component/Title";
// import BasicCalculator from "./calculators/BasicCalculator";
import UnitCostCalculator from "../calculators/UnitCostCalculator";
import { useEffect, useState } from "react";
import BottomButtons from "../buttonGroup/BottomButtons";
import LoadingMark from "../component/LoadingMark";
import { ht_mapper } from "@/data/ht_mapper";
import SbjtList from "../sbjtList/SbjtList";

const Container = () => {
    const [visible, setVisible] = useState(false)
    const [payload, setPayload] = useState("")
    const [rowCount, setRowCount] = useState(0)

    const [HT, setHT] = useState(
        ht_mapper().data
    )

    const [spinner, setSpinner] = useState(true)

    useEffect(() => {
        setTimeout(() => {setSpinner(false)}, 300)
    }, [])
    
    return (
        <>
            <Line />

            <Header />

            <Line />
            {
                spinner ? <LoadingMark /> :
                (<>
                    <Title content="개요" />

                    <SummaryTable />

                    <Line />

                    <Title content="가로장표" />

                    {
                        visible && <UnitCostCalculator setVisible={setVisible} payload={payload} rowCount={rowCount} HT={HT} setHT={setHT} />
                    }

                    <HorizontalTable setVisible={setVisible} HT={HT} setPayload={setPayload} setRowCount={setRowCount} setHT={setHT} />

                    <Line />

                    <Title content="과제리스트"/>

                    <SbjtList />

                    <Line />

                    <BottomButtons />

                    {/* <BasicCalculator /> */}

            
                </>)
            }

        </>
    )
}

export default Container;