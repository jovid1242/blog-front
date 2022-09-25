import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Profile = () => {
  const { auth } = useSelector((state) => state);
  const route = useRouter();

  const checkToken = () => {
    if (auth.token === "") {
      route.push("auth/login");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      {auth.token === "" ? (
        <center>
          <h2>Loading...</h2>
        </center>
      ) : (
        <div>
          <h1>Your Profile (Beta Test 2.0.1)</h1>
        </div>
      )}
    </>
  );
};

export default Profile;
