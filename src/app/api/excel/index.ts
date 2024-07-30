import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

interface DownloadExcelParams<T> {
    sheetTitle: string;
    sheetData: T[];
}

interface DownloadExcelResult {
    success: boolean;
    message?: string;
}

/**
 * 엑셀 다운로드 기능
 * @param sheetTitle 파일 이름
 * @param sheetData 시트에 넣을 데이터
 */
export const downloadExcel = async <T extends {}>({ sheetTitle, sheetData }: DownloadExcelParams<T>): Promise<DownloadExcelResult> => {
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(sheetTitle);

        // sheetData의 키를 기반으로 열 헤더 생성
        if (sheetData.length > 0) {
            const columns = Object.keys(sheetData[0]).map(key => ({ header: key, key }));
            worksheet.columns = columns as ExcelJS.Column[];
        }

        // 데이터 추가
        sheetData.forEach(data => {
            worksheet.addRow(data);
        });

        // 파일을 Blob으로 변환하여 저장
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `${sheetTitle}.xlsx`);

        return { success: true };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
};




// 엑셀 다운로드 기능
// xlsx 라이브러리로 구현
// 현재는 보안 취약점 때문에 보류
// >> CVE-2023-30533, CVE-2024-22363
//
// export const downloadExcel = <T>({ sheetTitle, sheetData }: DownloadExcelParams<T>): void => {
//     const worksheet = XLSX.utils.json_to_sheet(sheetData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, sheetTitle);
//     XLSX.writeFile(workbook, `${sheetTitle}.xlsx`);
// };