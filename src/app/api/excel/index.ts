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
        // sheetData의 키를 기반으로 열 헤더 생성
        const headers = Object.keys(sheetData[0]).map(key => ({ header: key, key }));

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(sheetTitle);

        worksheet.columns = headers;

        // 데이터 추가
        sheetData.forEach(data => {
            worksheet.addRow(data);
        });

        // 파일 쓰기
        const buffer = await workbook.xlsx.writeBuffer();

        // Blob으로 변환하여 다운로드
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `${sheetTitle}.xlsx`);

        return { success: true };
    }catch (error){
        return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
};