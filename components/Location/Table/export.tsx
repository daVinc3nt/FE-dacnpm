import { LocationOperation } from "@/BE-library/main";
import { useSession } from "@/providers/SessionProvider";
import { columns } from "./column";
import { DataTable } from "./datatable";
import { useState, useEffect } from "react";
// import { FindingStudentInfoByAdmin, StudentOperation, token } from "@/ambLib/amb";
// import { ProductOperation } from "@/do_an-library/main";
// const conditions: FindingStudentInfoByAdmin[] = [];
import Cookies from 'js-cookie';
async function getData(): Promise<any> {
  // const {session, status} = useSession();
  const action = new LocationOperation();
  const cnpm_token = Cookies.get("gid");
  const res = await action.searchAll(cnpm_token);
  return res?.data;
}
export default async function DemoPage(reloadData:any) {
  const data = await getData();
  const columnsWdata = await columns(reloadData);
  if (data)
    return(
      <div>
        <DataTable columns={columnsWdata} data={data} reload={reloadData}/>
      </div>
    )
  else 
    return(
      <div className="text-xl flex items-center">
        Lỗi xảy ra vui lòng thử lại!
      </div>
  )
}
