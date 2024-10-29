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

const SbjtListRow = ({
        type,
        name, 
        period, 
        mainOrg, 
        lastYear, 
        subOrgs,
        thisYear,
        demand, 
        nextYear, 
        nation, 
        foreign 
    }: SbjtListDisplay) => {
    const se = type==="세부사업" ? " font-semibold text-md p-2 bg-gray-200" : ""
    const ne = type==="내역사업" ? " font-semibold p-2 bg-gray-100" : ""

    return (
        <div className={"grid grid-cols-10 text-center items-center border-t-1 border-solid"+se+ne} >
            <div className="col-span-6 grid grid-cols-12 items-center content-center overflow-hidden break-words">
                <div className={`col-span-4`}>
                    {name}
                </div>
                <div className="col-span-2">
                    {period}
                </div>
                <div className="col-span-3">
                    {mainOrg}
                </div>
                <div className="col-span-3">
                    {subOrgs}
                </div>
            </div>
            <div className="col-span-4 grid grid-cols-6 items-center content-center overflow-hidden break-words">
                <div>{lastYear}</div>
                <div>{thisYear}</div>
                <div>{demand}</div>
                <div>{nextYear}</div>
                <div>{nation}</div>
                <div>{foreign}</div>
            </div>
        </div>
    )
}

export default SbjtListRow