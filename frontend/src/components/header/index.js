import "./style.css";
import { Link } from "react-router-dom";
import { Friends, HomeActive, Search, Watch } from "../../svg";
export default function Header() {
  const color = "#65676b";
  return (
    <header>
      <div className="header_left">
        <div className="search search1">
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Social"
            className="hide_input"
          />
        </div>
      </div>
      <div className="header_middle">
        <Link to="/" className="middle_icon hover1 active">
          <HomeActive color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Friends color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
      </div>
      <div className="header_right"></div>
    </header>
  );
}
