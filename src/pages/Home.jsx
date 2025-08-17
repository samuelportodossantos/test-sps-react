import AuthGuard from "../middlewares/AuthGuard";
import Layout from "./Layout";

function Home() {
  return (
    <AuthGuard>
      <Layout>
        <div className="container">
          <div className="content">
            <h2>SPS REACT TEST</h2>
          </div>
        </div>
      </Layout>
    </AuthGuard>
  );
}

export default Home;
