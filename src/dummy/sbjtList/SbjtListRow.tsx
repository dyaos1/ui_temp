interface SbjtListRowProps {
    type: string
    name: string
    period: string
    organization: string
    subOrganizations: string
    yearBeforeLast: string
    lastYear: string
    thisYear: string
    nextYear: string
    nation: string
    foreign: string
}

const SbjtListRow = ({
        type, 
        name, 
        period, 
        organization, 
        subOrganizations, 
        yearBeforeLast, 
        lastYear, 
        thisYear, 
        nextYear, 
        nation, 
        foreign 
    }: SbjtListRowProps) => {
    
    const rename = (type === "세부사업") ? "<"+name+">" 
         : (type==="내역사업") ? "o" + name 
         : name
    const bold = (type==="세부사업" || type==="내역사업" ) ? " font-semibold": ""

    return (
        <div className="grid grid-cols-10 text-center items-center">
            <div className="col-span-6 grid grid-cols-12 items-center content-center overflow-hidden break-words">
                <div className={`col-span-4 ${bold}`}>
                    {rename}
                </div>
                <div className="col-span-2">
                    {period}
                </div>
                <div className="col-span-3">
                    {organization}
                </div>
                <div className="col-span-3">
                    {subOrganizations}
                </div>
            </div>
            <div className="col-span-4 grid grid-cols-6 items-center content-center overflow-hidden break-words">
                <div>{yearBeforeLast}</div>
                <div>{lastYear}</div>
                <div>{thisYear}</div>
                <div>{nextYear}</div>
                <div>{nation}</div>
                <div>{foreign}</div>
            </div>
        </div>
    )
}

export default SbjtListRow