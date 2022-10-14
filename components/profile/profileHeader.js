import React from "react";
import Link from "next/link";

// icons
import { RollbackOutlined } from "@ant-design/icons";

// styles
import styles from "../../styles/profile.module.scss";

const profileHeader = () => {
  return (
    <div className={styles.profile_header}>
      <Link href="/">
        <a>
          <RollbackOutlined style={{ fontSize: "2rem" }} />
        </a>
      </Link>
      <div className={styles.user_edit_btn}>
        <button>Выйти</button>
      </div>
    </div>
  );
};

export default profileHeader;
