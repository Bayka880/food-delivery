import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserCtx";
import "../../styles/profile.css";

export default function Profile(props: any) {
  /***************************   USER PROFILE INFORMATION    **********************
   *   * 2 input filled with user information
   *   * 2nd input type must be number!
   *   * each input has a button that enables/disables editability of those inputs
   *     and the button below
   *   * Button Хадгалах will submit the information to the back-end success/fail
   *     must show the toaster
   *******************************************************************************/
  const { user, setUsers } = useUser();
  let getUser: any;
  if (user !== null) {
    getUser = user;
  }

  function editProfileHandler(e: any) {
    e.preventDefault();
    getUser.name = e.target[0].value;
    getUser.phone = e.target[1].value;
    editUserInfo(getUser);
    setUsers(getUser);
    localStorage.setItem("user", JSON.stringify(getUser));
    e.target[0].value = "";
    e.target[1].value = "";
  }

  const editUserInfo = async (namePass: any) => {
    return fetch("https://dev-api.mstars.mn/admin/update/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(namePass),
    })
      .then((res) => res.json())
      .then((res) => {
        props.setChangeUserDetails(res.data);
      });
  };

  return (
    <div>
      {user ? (
        <div className="user-profile container">
          <div>
            <div></div>
            <p>Хэрэглэгч</p>
          </div>
          <form
            className="d-flex flex-column profile-form"
            onSubmit={(e) => {
              editProfileHandler(e);
            }}
          >
            <label htmlFor="user-name">Нэр</label>
            <input
              type="text"
              id="user-name"
              placeholder={
                props.changeUserDetails
                  ? props.changeUserDetails.name
                  : user?.name
              }
              required
            />
            <label htmlFor="user-password">Утасны дугаар</label>
            <input
              type="number"
              id="user-password"
              placeholder={
                props.changeUserDetails
                  ? props.changeUserDetails.phone
                  : user?.phone
              }
              required
            />
            <button>Хадгалах</button>
          </form>
        </div>
      ) : (
        <div>Nevterch orno uu </div>
      )}
    </div>
  );
}
