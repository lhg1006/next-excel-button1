import {dummyData} from "@/lib/dummyData";

export type DummyDataTypes = {
    no : number,
    name : string,
    email : string
}
export const getDummyData = () : DummyDataTypes[] =>{
    return dummyData;
}
