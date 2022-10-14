// styles
import { Avatar } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import styles from "../../styles/profile.module.scss";

const userPosts = () => {
  return (
    <div className={styles.posts}>
      {[1, 1, 1, 1, 1, 1, 3].map((elm, i) => {
        return (
          <div className={styles.post} key={elm + i}>
            <div className="post_img">
              <Avatar size={64} src="https://joeschmoe.io/api/v1/random" />
            </div>
            <div className="post_title">dbfbfdbdfbdfbdfbfdbdfb... i</div>
            <div className={styles.post_action}>
              <DeleteOutlined />
              <EditOutlined />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default userPosts;
