import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

// slices
import { logout } from "../../redux/slices/auth/authSlice";

// icons
import { RollbackOutlined } from "@ant-design/icons";

// styles
import styles from "../../styles/profile.module.scss";

const ProfileHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <div className={styles.profile_header}>
      <Link href="/">
        <a>
          <RollbackOutlined style={{ fontSize: "2rem" }} />
        </a>
      </Link>
      <div className={styles.user_edit_btn}>
        <button onClick={() => isLogout()}>Выйти</button>
      </div>
    </div>
  );
};

export default ProfileHeader;
