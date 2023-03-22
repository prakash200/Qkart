import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { color } from "@mui/system";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {

  const history = useHistory()

  const register = ()=>{
    history.push("/register")
  }

  const login = ()=>{
    history.push("/login")
  }

  const explore = ()=>{
    history.push("/")
  }

  const logout = ()=>{
    window.localStorage.clear("username")
    window.localStorage.clear("token")
    window.localStorage.clear("balance")
    history.push("/")
    window.location.reload()
  }


  if (hasHiddenAuthButtons) {
    return (
      <Box className="header">
        <Box className="header-title">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {children}
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={explore}
        >
          Back to explore
        </Button>
      </Box>
    )
  }
  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      {children}
      <Stack direction="row" spacing={2}>
        {
          
          (window.localStorage.getItem("username")===null) ? (
            <>
              <Button
                className="explore-button"
                variant="text"
                onClick={login}
              >
                LOGIN
              </Button>
              <Button
                variant="contained"
                onClick={register}
              >
                REGISTER
              </Button>
            </>
          ) : (
            <>
              <Avatar alt={window.localStorage.getItem("username")} src="avatar.png" />
              <p className="username-text">{window.localStorage.getItem("username")}</p>
              <Button
                variant="contained"
                onClick={logout}
              >
                LOGOUT
              </Button>
            </>
          )
        }


      </Stack>
    </Box>
  );
};

export default Header;
