import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="row">
      <div className="container text-center">
        <h1>Page Not Found</h1>
        <Link to="/">
          <button className="btn btn-primary" data-testid="back-button">Back to Home Page</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
