import { useState } from "react";

export default function useMutation(
  url: string
): [
  (data: any) => void,
  { loading: boolean; data: undefined | any; error: undefined | any }
] {
  //
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);
  //
  function mutation(data: any) {}

  //1. 리턴값으로 첫번째 array는 함수
  //2. 두번째 array는 loading,data,error return
  return [mutation, { loading, data, error }];
}
