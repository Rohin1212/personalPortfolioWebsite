import React, { Fragment } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import { animateScroll as scroll, scroller } from 'react-scroll';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  navLink: {
    marginRight: theme.spacing(2)
  }
}));

const NavLinks = ['Home', 'Projects', 'Skills', 'Contact'];

const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (sectionId) => {
    scroller.scrollTo(sectionId, {
      duration: 500,
      delay: 100,
      smooth: true,
      offset: 50,
      activeClass: 'active'
    });
    setAnchorEl(null);
  };
  const ElevationScroll = (props) => {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined
    });

    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0
    });
  };
  return (
    <div className={classes.root}>
      <ElevationScroll>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Rohin Chopra
            </Typography>
            <div>
              {isMobile ? (
                <Fragment>
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenu}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ horizontal: 'center' }}
                    keepMounted
                    open={open}
                    onClose={() => setAnchorEl(null)}
                  >
                    {NavLinks.map((nl) => (
                      <MenuItem onClick={() => handleMenuClick(nl.toLowerCase())}>{nl}</MenuItem>
                    ))}
                  </Menu>
                </Fragment>
              ) : (
                <Fragment>
                  {NavLinks.map((nl) => (
                    <Button
                      className={classes.navLink}
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={() => handleMenuClick(nl.toLowerCase())}
                    >
                      {nl}
                    </Button>
                  ))}
                </Fragment>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </div>
  );
};
export default Navbar;