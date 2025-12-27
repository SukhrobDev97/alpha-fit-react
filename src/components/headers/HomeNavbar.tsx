import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../lib/types/search";
import { useGlobals } from "../../app/hooks/useGlobals";
import { serverApi } from "../../lib/config";
import { Logout } from "@mui/icons-material";

interface HomeNavbarProps{
    cartItems : CartItem[];
    onAdd : (item : CartItem) => void;
    onRemove : (item : CartItem) => void;
    onDelete : (item : CartItem) => void;
    onDeleteAll : () => void;
    setSignupOpen: (isOpen: boolean) => void;
    setLoginOpen: (isOpen: boolean) => void;
    handleLogoutClick:(e:React.MouseEvent<HTMLElement>) => void;
    anchorEl: HTMLElement | null;
    handleCloseLogout: () => void;
    handleLogoutRequest: () => void
}

export function HomeNavbar (props: HomeNavbarProps){
    const {
        cartItems, 
        onAdd, 
        onRemove, 
        onDelete, 
        onDeleteAll, 
        setSignupOpen, 
        setLoginOpen,
        handleLogoutClick,
        anchorEl,
        handleCloseLogout,
        handleLogoutRequest
    } = props
    const {authMember} = useGlobals()


    return (
      <>
        <Box className="home-nav-sticky">
          <Container className="home-nav-container">
            <Stack className="menu">
                <Box>
                    <NavLink to={"/"}>
                        <img 
                            className="brand-logo"
                            src="/img/logoAlphaFit.png"
                            alt="AlphaFit Logo"
                        />
                    </NavLink>
                </Box>
                <Stack className="links">
                    <Box className={"hover-line"}>
                        <NavLink to="/" activeClassName={"underline"}>Home</NavLink>
                    </Box>
                    <Box className={"hover-line"}>
                        <NavLink to="/products">Products</NavLink>
                    </Box>
                    {authMember ? (
                        <Box className={"hover-line"}>
                          <NavLink to="/orders" activeClassName={"underline"}>Orders</NavLink>
                        </Box>
                    ) : null}
                     {authMember ? (
                        <Box className={"hover-line"}>
                          <NavLink to="/member-page" activeClassName={"underline"}>My page</NavLink>
                        </Box>
                    ) : null}
                    <Box className={"hover-line"}>
                        <NavLink to="/help" activeClassName={"underline"}>Help</NavLink>
                    </Box>
                    
                    <Basket 
                        cartItems={cartItems}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        onDelete={onDelete}
                        onDeleteAll={onDeleteAll}
                     />

                    {!authMember ? (
                        <Box>
                            <Button 
                                className="login-button" variant="contained"
                                onClick={() => setLoginOpen(true)}
                            >
                                Login
                            </Button>
                        </Box>
                    ) : (
                        <Box
                            component="img"
                            className="user-avatar"
                            src={authMember?.memberImage? `${serverApi}/${authMember?.memberImage}`
                                : "/icons/default-user.svg"
                            }
                            alt={authMember?.memberNick || "User avatar"}
                            onClick={handleLogoutClick}
                            sx={{ cursor: "pointer" }}
                            role="button"
                            aria-haspopup="true"
                        />
                    )}


<Menu
    anchorEl={anchorEl}
	id="account-menu"
    open={Boolean(anchorEl)}
    onClose={handleCloseLogout}
	PaperProps={{
		elevation: 0,
		sx: {
			overflow: 'visible',
			filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
			mt: 1.5,
			'& .MuiAvatar-root': {
				width: 32,
				height: 32,
				ml: -0.5,
				mr: 1,
			},
			'&:before': {
				content: '""',
				display: 'block',
				position: 'absolute',
				top: 0,
				right: 14,
				width: 10,
				height: 10,
				bgcolor: 'background.paper',
				transform: 'translateY(-50%) rotate(45deg)',
				zIndex: 0,
			},
		},
	}}
	transformOrigin={{ horizontal: 'right', vertical: 'top' }}
	anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
>
	<MenuItem onClick={handleLogoutRequest}>
		<ListItemIcon>
			<Logout fontSize="small" style={{ color: 'blue' }} />
		</ListItemIcon>
		Logout
	</MenuItem>
</Menu>
                </Stack>
            </Stack>
          </Container>
        </Box>
  
        <div className="home-navbar">
          <Container className="navbar-container">
            <Stack className="header-frame">
              <Stack className="detail">
                <Stack className="hero-badges" direction="row" spacing={1.5}>
                  <Box className="hero-badge">🥗 Healthy Meals</Box>
                  <Box className="hero-badge">💪 Fitness Programs</Box>
                  <Box className="hero-badge">🚚 24/7 Delivery</Box>
                </Stack>
                <Box className="head-main-text">AlphaFit — Where Strength Begins</Box>
                <Box className="wel-text">Power Your Healthy Life Journey</Box>
                <Box className="service-text">24 hours service</Box>
                <Box className="signup">
                  {!authMember ? (
                    <Button 
                        variant={"contained"}
                        className="signup-button"
                        onClick={() => setSignupOpen(true)}
                    >
                        JOIN US
                    </Button>
                ): null}
                </Box>
              </Stack>
              <Stack className="product-visual">
                <Box className="heroImageWrapper">
                  <img 
                    src="/img/grocery-shopping-with-eco-bag-white-wall-zero-waste-plastic-free-concept-flat-lay-copy-space.png" 
                    alt="Healthy Grocery Shopping" 
                    className="hero-product-image"
                  />
                </Box>
              </Stack>
            </Stack>
          </Container>
        </div>
      </>
    )
} 