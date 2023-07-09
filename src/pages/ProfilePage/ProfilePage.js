import { useDispatch, useSelector } from "react-redux";
import "./ProfilePage.css";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserData, selectUser } from "../../slices/userSlice";
import { useEffect } from "react";
import Cookies from "js-cookie";
import ExtraInfoForm from "./ExtraInfoForm";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector(selectUser)?.data[0];
  const user_id = Cookies.get("user_id");

  useEffect(() => {
    dispatch(fetchUserData(id));
  }, [dispatch, id, navigate, user_id]);
  return (
    <div className="profile-page-container">
      <div className="profile-page-div">
        <h2>Profile</h2>
        <div className="profile-page-info">
          <p>
            First Name: <span className="info"> {user?.firstname} </span>{" "}
          </p>
          <p>
            Last Name: <span className="info">{user?.lastname} </span>
          </p>
          <p>
            E-mail: <span className="info">{user?.email} </span>
          </p>
          <p>
            Phone: <span className="info">{user?.phone}</span>
          </p>
          <div className="profile-page-address">
            <p>Address: </p>
            <div>
                <p className="info">{user?.addressline1}</p>
                <p className="info">{user?.addressline2}</p>
                <p className="info">{user?.city}</p>
                <p className="info">{user?.state}</p>
                <p className="info">{user?.postcode}</p>
                <p className="info">{user?.country}</p>
            </div>
          </div>
        </div>
        {user?.phone ? null : (
          <div className="profile-page-info form">
            <ExtraInfoForm id={id} dispatch={dispatch} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
