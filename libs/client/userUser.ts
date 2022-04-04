import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

//fetch function fetches(brings) the data and return
//데이터가 swr캐시에 저장된다. 페이지를 이동할때 undefined가 뜨지 않는다.
//swr의 url 자체가 id가 되어 hook을 어디에서나 쓸수있도록 해준다.
const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function useUser() {
  const { data, error } = useSWR("/api/users/me", fetcher);

  return data;
}
