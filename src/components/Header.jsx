import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, styled } from "@mui/material";
import HealingIcon from "@mui/icons-material/Healing";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const StyledBox = styled(Box)`
  display: flex;
  gap: 20px;
  align-items: center;
  color: white;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 120%;
`;

const Header = () => {
  return (
    <AppBar position="sticky">
      <StyledToolbar sx={{ height: 70 }}>
        <StyledBox>
          <HealingIcon />
          <StyledNavLink to="/">
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              Medeekit
            </Typography>
          </StyledNavLink>
        </StyledBox>
        <StyledBox>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to="/library">My Kit</StyledNavLink>
        </StyledBox>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
