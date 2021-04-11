import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectServer } from "../../redux/server/server.selectors";
import {
  getServerData,
  toggleCreateServer,
} from "../../redux/server/server.actions";

import "./servers-list.styles.scss";

const ServersList = ({
  currentUser,
  servers,
  getServerData,
  toggleCreateServer,
}) => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getServerData(token);
    }
  }, []);

  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const handleCreateServer = () => {
    toggleCreateServer();
  };

  const getAbb = (name) => {
    const nameArr = name.split(" ");
    console.log(nameArr);
    var abbreviation = "";
    for (var i = 0; i <= nameArr.length - 1; i++) {
      if (i === 4) {
        break;
      }
      abbreviation += nameArr[i].charAt(0);
    }
    return <span className="servers-list-server-name-abb">{abbreviation}</span>;
  };

  return (
    <div className="servers">
      {click ? <div className="btn-click">{""}</div> : null}
      <ul className="servers-list">
        {servers
          ? servers.map((server, index) => (
              <li className="servers-list-server" key={index}>
                <button
                  className="servers-list-server-name"
                  onClick={handleClick}
                >
                  {getAbb(server.serverName)}
                </button>
              </li>
            ))
          : null}
        <li className="servers-list-server" key={1}>
          <button
            className="servers-list-server-name"
            onClick={handleCreateServer}
          >
            +
          </button>
        </li>
      </ul>
    </div>
  );
};

const MapStateToProps = createStructuredSelector({
  servers: selectServer,
});

const MapDispatchToProps = (dispatch) => ({
  getServerData: (token) => dispatch(getServerData(token)),
  toggleCreateServer: () => dispatch(toggleCreateServer()),
});

export default connect(MapStateToProps, MapDispatchToProps)(ServersList);
