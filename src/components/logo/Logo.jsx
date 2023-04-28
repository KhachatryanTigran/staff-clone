import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { auth } from "../../firebase";
import ImageAvatars from "../../UI/Avatar";
import { changeCurrentUser, changeIsUser } from "../../store/slices/loginSlice";
import LogOutButton from "../../UI/Button";
import styles from "./logo.module.scss";

const Logo = ({ isHomePage }) => {
  const currentUser = useSelector((state) => state.loginSlice.currentUser);
  const isLoading = useSelector((state) => state.loginSlice.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogOut = (e) => {
    e.preventDefault();
    dispatch(changeCurrentUser(null));
    dispatch(changeIsUser(null));
    signOut(auth);
    navigate("/");
  };
  return (
    <div className={styles.logoBox}>
      {isLoading && (
        <>
          <ImageAvatars
            variant="Avatar"
            companyName={currentUser.displayName}
            photoURL={currentUser?.photoURL}
          />
          <div className={styles.logOutBtn}>
            <h3
              className={`${styles.title} ${[
                !isHomePage ? "" : styles.whiteTitle,
              ]}  `}
            >
              {currentUser?.displayName}
            </h3>
            <LogOutButton
              size="small"
              onClick={(e) => onLogOut(e)}
              variant={isHomePage ? "HomeBtn" : "LogOut"}
            >
              LogOut{" "}
            </LogOutButton>
          </div>
        </>
      )}
    </div>
  );
};

export default Logo;
