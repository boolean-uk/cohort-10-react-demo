import { useParams } from 'react-router-dom'

function Users({ setUsername }) {
  const urlParams = useParams()
  const username = urlParams.username
  setUsername(username)
  return(
    <></>
  )
}

export default Users
