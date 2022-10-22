import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useLocation, useNavigate } from "react-router-dom";
import { isJwtExpired } from "jwt-check-expiration";
import isJwtTokenExpired, { decode } from "jwt-check-expiry";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/reducer/UserSlice";

const pages = [
  {
    name: "TRANG CHỦ",
    path: "/",
  },
  {
    name: "ĐẶT TIỆC",
    path: "/dat-tiec",
  },
  {
    name: "CÁC LOẠI TIỆC",
    path: "/cac-loai-tiec",
  },
  {
    name: "BLOG",
    path: "/blogs",
  },
  {
    name: "CONTACT US",
    path: "/contact-us",
  },
];
const settings = [
  {
    name: "Giỏ hàng",
    path: "cart",
  },
  {
    name: "Quản lý tài khoản",
    path: "user/info",
  },

  {
    name: "Đăng xuất",
    path: "logout",
  },
];

const Header = ({ handleScroll }) => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (path) => {
    setAnchorElNav(null);
  };
  const handleClickNav = (path) => {
    // //console.log("click");
    if (path === "logout") {
      localStorage.setItem("UserInfo", "");
      dispatch(logout());
      window.location.reload();
    } else {
      navigate(path);
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [appAuthencated, setAppAuthencated] = React.useState(false);
  const [user, setUser] = React.useState({});
  const location = useLocation();
  const { authencated } = useSelector((state) => state.userReducer);
  return (
    <AppBar
      style={{
        backgroundColor: "#B32B21",
      }}
      className="navbar"
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src="logo.png" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((e, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => {
                      if (e.path === "/dat-tiec") {
                        handleScroll();
                      } else {
                        handleClickNav(e.path);
                      }
                    }}
                  >
                    {e.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src="logo.png" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((e, index) => (
              <Button
                key={index}
                onClick={() => {
                  if (e.path === "/dat-tiec") {
                    handleScroll();
                  } else {
                    handleClickNav(e.path);
                  }
                }}
                sx={{
                  my: 2,
                  color:
                    location.pathname === e.path
                      ? "white"
                      : "rgba(255, 255, 255, 0.6)",
                  display: "block",
                }}
              >
                {e.name}
              </Button>
            ))}
          </Box>

          {authencated == true ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Người dùng">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user.fullName}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem key={index} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => {
                        handleClickNav(setting.path);
                      }}
                    >
                      {setting.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box>
              <Button
                className="btn-warning"
                variant="contained"
                color="warning"
                onClick={() => {
                  navigate("register");
                }}
              >
                Đăng ký
              </Button>
              <Button
                className="btn-warning"
                onClick={() => {
                  navigate("login");
                }}
                variant="contained"
                color="warning"
                style={{
                  marginLeft: 3,
                }}
              >
                Đăng nhập
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
