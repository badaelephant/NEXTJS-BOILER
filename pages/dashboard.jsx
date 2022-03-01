import axios from "axios";
import * as cookie from "cookie";
import { verify } from "../lib/jwt";
import refresh from "./api/users/refresh";
export default function DashBoard() {
  return <div>DashBoard</div>;
}

export async function getServerSideProps(ctx) {
  const cookies = ctx.req.headers.cookie;
  const { accessToken } = cookie.parse(cookies);
  let result = verify(accessToken);
  if (!result.success && result.message === "jwt expired") {
    const res = await refresh(ctx.req, ctx.res);
    console.log(res);
  }
  return {
    props: {},
  };
}
