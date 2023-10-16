import * as React from "react"
import Reset from "../../components/auth/Reset"

const ResetPage = ({ location }) => {
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  console.log(token)
  return (
    <Reset token={token}/>
  )
}
export default ResetPage
