'use client'

import Line from "../component/Line";
import Title from "../component/Title";
import { useEffect, useState } from "react";
import BottomButtons from "../buttonGroup/BottomButtons";
import LoadingMark from "../component/LoadingMark";
import HT2 from "./horizontalTable/HT";
import Header from "./Header";
import SummaryTable from "./SummaryTable";
import SbjtList from "./sbjtList/SbjtList";
import MotherDataClass from "../../data/motherClass"
import TempDashboard from "@/components/dev/tempDashboard/TempDashboard"
import Security from "../buttonGroup/Security";

const Container = () => {

    // security
    const [secure, setSecure] = useState(false)

    // spinner
    const [spinner, setSpinner] = useState(true)

    useEffect(() => {
        setTimeout(() => {setSpinner(false)}, 300)
    }, [])

    // 전역상태
    const [mainData, setMainData] = useState(new MotherDataClass())

    const years: number[] = mainData.getSeYears()
    const [ year, setYear ] = useState(years[years.length-1])

    // summary table 관련
    const [summaryTableData, setSummaryTableData] = useState(mainData.toSummaryTable())

    // Horizontal Table 관련
    const [HTData, setHTData] = useState(mainData.toHT())

    // SbjtList Table 관련
    const [sbjtList, setSbjtList] = useState(mainData.toSbjtList())

    // dashboard 관련
    const [dashboardData, setDashboardData] = useState(mainData.toDashBoard())

    // when year change
    useEffect(() => {
        setSpinner(true)

        setTimeout(() => {
            setMainData( mainData.setYear(year) )
            setSummaryTableData(mainData.toSummaryTable())
            setHTData(mainData.toHT())
            setSbjtList(mainData.toSbjtList())
            setDashboardData(mainData.toDashBoard())
            setSpinner(false)
        }, 1000)
    }, [year])
    
    return (
        <>
            {
                secure ? <Security setSecurityVisible={setSecure}/> :
                <>
                    <Line />

                    <Header year={year} setYear={setYear} years={years} />

                    <Line />
                    {
                        spinner ? <LoadingMark /> :
                        (<>
                            <Title content="개요" />

                            <SummaryTable year={year} summaryTableData={summaryTableData} />

                            <Line />

                            <Title content="임시 입력 인터페이스" />

                            <TempDashboard dashboardData={dashboardData} setDashboardData={setDashboardData} />

                            <Line />

                            <Title content="가로장표" />

                            <HT2 year={year} HTData={HTData} />

                            <Line />

                            <Title content="과제리스트"/>

                            <SbjtList year={ year } sbjtList={sbjtList} />

                            <Line />

                            <BottomButtons />

                            {/* <BasicCalculator /> */}

                    
                        </>)
                    }
                </>
            }
        </>
    )
}

export default Container;