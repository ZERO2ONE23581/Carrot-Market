import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/users/me")
      .then((response) => response.json())
      .then((data) => {
        //
        if (!data.ok) {
          return router.replace("/enter");
          //router.push는 browser에 history가 남고, replace는 남지 않는다.
        }
        setUser(data.profile);
      });
  }, []);
  return user;
}
