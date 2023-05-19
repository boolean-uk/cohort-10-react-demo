function UserProfile ({username, user}) {
  return (
    <>
      <h1>{username}</h1>
      <img width="200" src={`${user.avatar_url}`} alt="user avatar"/>
    </>
  )
}

export default UserProfile
