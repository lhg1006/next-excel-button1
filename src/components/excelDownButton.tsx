import {downloadExcel} from "@/app/api/excel";

interface ExcelDownButtonProps<T> {
    sheetTitle: string;
    sheetData: T[];
}

const ExcelDownButton = <T extends {}>({ sheetTitle, sheetData }: ExcelDownButtonProps<T>) => {
    const handleClick = async () => {
        const userConfirmed = confirm("다운로드 하시겠습니까?");

        if (userConfirmed) {
            const result = await downloadExcel({
                sheetTitle: sheetTitle,
                sheetData: sheetData
            });

            if (result.success) {
                console.log("다운로드 성공");
            } else {
                console.error("다운로드 실패:", result.message);
            }
        } else {
            console.log("사용자가 다운로드를 취소했습니다.");
        }
    };

    return (
        <button className={'bg-blue-500 text-white font-bold py-2 px-4 rounded'} onClick={handleClick}>엑셀 다운로드</button>
    );
};

export default ExcelDownButton;