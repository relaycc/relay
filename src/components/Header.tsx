import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useDisconnect } from "wagmi";

export const Header = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const { disconnect } = useDisconnect();

  return (
    <header>
      <div>
        <p>
          {!session && (
            <>
              <span>You are not signed in</span>
            </>
          )}
          {session?.address && (
            <>
              <span>
                <small>Signed in as</small>
                <br />
                <strong>{session.address}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault();
                  disconnect();
                  signOut();
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/siwe">SIWE</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
