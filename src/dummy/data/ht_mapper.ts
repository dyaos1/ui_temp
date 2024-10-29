import ht from './ht.json'

interface HT_DataRow {
    rowCount: number
    type: string
    bsnsNm: string
    lastYear: string
    thisYear: string
    nextYear: string
    updated: string
    increase: string
    increasePercent: string
}

interface HT_DataI {
    data: HT_DataRow[]
}

const ht_mapper = (): HT_DataI => {
    const result: HT_DataRow[] = []

    ht.data.map((e, i) => {
        const row: HT_DataRow = {
            rowCount: i,
            type: e.타입,
            bsnsNm: e.사업명,
            lastYear: e.전년도,
            thisYear: e.올해,
            nextYear: e.수정전,
            updated: e.수정후,
            increase: e.증감,
            increasePercent: e.퍼센트
        }
        result.push(row)
    })

    return {data: result}
}

export { ht_mapper }
export type { HT_DataRow }
