import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { useHistory, Link } from "react-router-dom";
import { GoogleLogout } from 'react-google-login';


import {
  logout as actionLogout
} from '../../../auth/store/actions';

import { Dropdown } from "../../../../ui";

import "./NavProfile.scss";

function NavProfile(props) {
  const { className = "" } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.AuthReducer.user);

  function logout(e) {
    console.log('logout!!')
    sessionStorage.clear();
    dispatch(actionLogout());
    history.replace("/sign-in");
  }

  const links = [
    {
      component: <Link to="/profile">Perfil</Link>
    },
    {
      component: (
        <>
          {user.idgoogle ?
            (<GoogleLogout
              clientId="322927841572-n1jacq7k1m60nfjt0hnj4mrb0cql9ih6.apps.googleusercontent.com"
              onLogoutSuccess={logout}
              render={(props) => {
                return (<a
                  href="#"
                  onClick={props.onClick}
                >
                  Logout
                </a>)
              }}
            ></GoogleLogout>)
            :
            <Link onClick={logout} to="/sign-in">Logout</Link>}
        </>
      )
    }
  ];

  return (
    <nav className={`NavProfile ${className}`}>
      <img src={`${user.imageUrl}`} alt="" />
      <Dropdown description={`${user.name}`} links={links} />
    </nav>
  );
}

export { NavProfile };
