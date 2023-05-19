function Repo ({repo}) {
  return (
    <div>
      <ul>
        <li>name: {repo.name}</li>
        <li>forks: {repo.forks}</li>
        <li>stars: {repo.stargazers_count}</li>
        <li>visibility: {repo.visibility}</li>
      </ul>
    </div>
  )
}

export default Repo
