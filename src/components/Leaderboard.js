import { connect } from "react-redux";

const LeaderBoard = (props) => {
  const { ranking, users } = props;
  return (
    <div className="row">
      <div className="container text-center">
        <h3>LeaderBoard</h3>
      </div>
      <div className="container mx-auto">
        <table className="table table-striped table-hover table-border">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Answered</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((rank) => (
              <tr key={rank}>
                <td>{ranking.indexOf(rank) + 1}</td>
                <td>
                  <div className="row">
                    <div className="col xs-1">
                      <img
                        src={users[rank].avatarURL}
                        alt={`${rank}'s avatar`}
                        width="35"
                      />
                    </div>
                    <div className="col xs-3">
                      {users[rank].name}
                      <br />
                      <span className="text-muted">{rank}</span>
                    </div>
                  </div>
                </td>
                <td>{Object.keys(users[rank].answers).length}</td>
                <td>{Object.keys(users[rank].questions).length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  ranking: Object.keys(users).sort((a, b) => {
    const _b =
      Object.keys(users[b].answers).length +
      Object.keys(users[b].questions).length;
    const _a =
      Object.keys(users[a].answers).length +
      Object.keys(users[a].questions).length;
    return _b - _a;
  }),
  users: users,
});

export default connect(mapStateToProps)(LeaderBoard);
