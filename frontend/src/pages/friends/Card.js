import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  acceptRequest,
  deleteRequest,
  cancelRequest,
} from "../../functions/user";

export default function Card({ userr, type, getData }) {
  const { user } = useSelector((state) => ({ ...state }));
  const cancelRequestHandler = async (userId) => {
    const res = await cancelRequest(userId, user.token);
    if (res == "OK") {
      getData();
    }
  };
  const confirmRequestHandler = async (userId) => {
    const res = await acceptRequest(userId, user.token);
    if (res == "OK") {
      getData();
    }
  };
  const deleteRequestHandler = async (userId) => {
    const res = await deleteRequest(userId, user.token);
    if (res == "OK") {
      getData();
    }
  };
  return (
    <div className="request_card">
      <Link to={`/profile/${userr.username}`}>
        <img src={userr.picture} alt="" />
      </Link>
      <div className="req_namr">
        {userr.first_name} {userr.last_name}
      </div>
      {type === "sent" ? (
        <button
          className="blue_btn"
          onClick={() => cancelRequestHandler(userr._id)}
        >
          Cancel Request
        </button>
      ) : type === "request" ? (
        <>
          <button
            className="blue_btn"
            onClick={() => confirmRequestHandler(userr._id)}
          >
            Confirm
          </button>
          <button
            className="gray_btn"
            onClick={() => deleteRequestHandler(userr._id)}
          >
            Delete
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
