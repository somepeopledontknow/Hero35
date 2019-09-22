import {
  AppBar,
  Container,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Box,
  Typography,
  Button,
  Avatar
} from "@material-ui/core";
import ROUTES from "../constants/routes";
import SearchInput from "./SearchInput";
import { default as NextLink } from "next/link";
import { useContext } from "react";
import { UserContext } from "./UserContextProvider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    logo: {
      maxHeight: "30px"
    },
    search: {
      maxWidth: "350px",
      margin: "0"
    }
  })
);

const Navigation = () => {
  const { state, dispatch } = useContext(UserContext);
  const classes = useStyles({});

  return (
    <AppBar
      className={classes.appBar}
      position="sticky"
      color="default"
      elevation={0}
    >
      <Container>
        <Toolbar disableGutters={true}>
          <Box marginRight={1}>
            <MenuLink href={ROUTES.ACCOUNT}>
              {state.signedIn ? (
                <Avatar alt={state.name} src={state.picture} />
              ) : (
                "Sign in"
              )}
            </MenuLink>
          </Box>
          <Box marginRight={1}>
            <MenuLink href={ROUTES.HOME}>Home</MenuLink>
          </Box>
          <Box flexGrow="1" m={1}>
            <SearchInput className={classes.search} />
          </Box>
          <Box m={2}>
            <Typography variant="caption" color="textSecondary">
              Heroes is in ALPHA
            </Typography>
          </Box>
          <img src="/static/HERO35-logo-tagline.svg" className={classes.logo} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const MenuLink = ({ href, children }) => {
  const classes = useStyles({});
  return (
    <NextLink href={href} as={href} passHref>
      <Button>{children}</Button>
    </NextLink>
  );
};

export default Navigation;
