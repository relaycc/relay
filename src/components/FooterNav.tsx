import { useRouter } from "next/router";
import * as Nav from "@/design/Nav";

export const FooterNav = () => {
  const router = useRouter();

  return (
    <Nav.Root>
      <Nav.NavItems>
        <Nav.NavItem>
          {(() => {
            if (router.pathname.startsWith("/receiver/messages")) {
              return <Nav.ChatIcon.Active />;
            } else {
              return (
                <Nav.ChatIcon.Inactive
                  onClick={() => {
                    router.push("/receiver/messages");
                  }}
                />
              );
            }
          })()}
        </Nav.NavItem>
        <Nav.NavItem>
          {(() => {
            if (router.pathname.startsWith("/receiver/profile")) {
              return <Nav.ProfileIcon.Active />;
            } else {
              return (
                <Nav.ProfileIcon.Inactive
                  onClick={() => {
                    router.push("/receiver/profile");
                  }}
                />
              );
            }
          })()}
        </Nav.NavItem>
        <Nav.NavItem>
          {(() => {
            if (router.pathname.startsWith("/receiver/about")) {
              return <Nav.AboutIcon.Active />;
            } else {
              return (
                <Nav.AboutIcon.Inactive
                  onClick={() => {
                    router.push("/receiver/about");
                  }}
                />
              );
            }
          })()}
        </Nav.NavItem>
      </Nav.NavItems>
    </Nav.Root>
  );
};
