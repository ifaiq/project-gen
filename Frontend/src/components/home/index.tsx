import axios from "axios";
import { Button } from "baseui/button";
import { HeadingXXLarge } from "baseui/typography";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { Container } from "../commons";

function Home() {
  const singOut = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    singOut();
    navigate("/login");
  };


  return (
    <Container>
      <HeadingXXLarge color="secondary500">Welcome to the application.</HeadingXXLarge>
  
      <Button kind="secondary" onClick={logout}>
        Logout
      </Button>
    </Container>
  );
}

export { Home };
