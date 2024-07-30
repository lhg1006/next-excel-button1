'use client'

import {useEffect, useState} from "react";
import {DummyDataTypes, getDummyData} from "@/app/api/dummy";
import ExcelDownButton from "@/components/excelDownButton";


export default function Page(){
    const [data, setData] = useState<DummyDataTypes[]>([])

    useEffect(() => {
        const dummyData = getDummyData();
        setData([... dummyData])
    }, []);

    return(
        <>
            <h2 className={'bg-amber-300 text-4xl text-white px-2 py-2 rounded'}>Excel Down Test Page</h2>
            <br/>
            <ExcelDownButton sheetTitle={'첫번째 테스트 페이지의 엑셀'} sheetData={data} />
        </>
    )
}