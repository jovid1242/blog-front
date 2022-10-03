import useSWR from "swr";
import { useEffect } from "react";
import Router from "next/router";

export function useAuthSession() {
  const { data: user } = useSWR("api/session");
  useEffect(() => {
    if (!user) Router.push("/login");
  }, [user]);
  return user;
}
