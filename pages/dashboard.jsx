import axios from "axios";
import * as cookie from "cookie";
import { verify } from "../lib/jwt";
export default function DashBoard() {
  return <div>DashBoard</div>;
}

export async function getServerSideProps(ctx) {
  const cookies = ctx.req.headers.cookie;
  const { accessToken } = cookie.parse(cookies);
  let result = verify(accessToken);
  //   if (!result.success && result.message === "jwt expired") {
  //     let result = await axios.post(
  //       `${process.env.SITE_URL}:${process.env.HTTP_PORT}/api/users/refresh`
  //     );
  //     console.log(result);
  //   }
  return {
    props: {},
  };
}
