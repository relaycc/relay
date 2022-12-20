import React from "react";
import { Discord } from "./icons/Discord";
import { Twitter } from "./icons/Twitter";
import { Github } from "./icons/Github";
import { Mirror } from "./icons/Mirror";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="sm:w-full flex justify-between flex-col sm:items-start gap-[25px] md:flex-row md:gap-0 mt-12 pt-10 border-t-2 border-blue-700">
      <div>
        <ul className="flex gap-3">
          <Link href={"https://twitter.com/relay_eth"} passHref>
            <a target="_blank">
              <li className="cursor-pointer">
                <Twitter />
              </li>
            </a>
          </Link>
          <Link href={"https://discord.gg/DTMKf63ZSf"} passHref>
            <a target="_blank">
              <li className="cursor-pointer">
                <Discord />
              </li>
            </a>
          </Link>
          <Link href={"https://github.com/relaycc"} passHref>
            <a target="_blank">
              <li className="cursor-pointer">
                <Github />
              </li>
            </a>
          </Link>
          <Link href={"https://mirror.xyz/relaycc.eth"} passHref>
            <a target="_blank">
              <li className="cursor-pointer">
                <Mirror />
              </li>
            </a>
          </Link>
        </ul>
      </div>
      <div className="flex gap-14">
        <ul className="flex flex-col gap-5">
          <li className="font-bold">About</li>
          <Link href="https://jobs.lever.co/relay" passHref>
            <a target="_blank">
              <li className="cursor-pointer">Careers</li>
            </a>
          </Link>
        </ul>
        <ul className="flex flex-col gap-5">
          <li className="font-bold">Resources</li>
          <Link href="https://mirror.xyz/relaycc.eth" passHref>
            <a target="_blank">
              <li className="cursor-pointer">Mirror</li>
            </a>
          </Link>
          <Link href="https://docs.relay.cc/relay" passHref>
            <a target="_blank">
              <li className="cursor-pointer">Docs</li>
            </a>
          </Link>
          <Link href="https://xmtp.com/" passHref>
            <a target="_blank">
              <li className="cursor-pointer">XMTP</li>
            </a>
          </Link>
        </ul>
        <ul className="flex flex-col gap-5">
          <li className="font-bold">Products</li>
          <Link href="https://docs.relay.cc/relay/relay-home" passHref>
            <a target="_blank">
              <li className="cursor-pointer">Relay</li>
            </a>
          </Link>
          <Link href="https://docs.relay.cc/relay/relay-receiver" passHref>
            <a target="_blank">
              <li className="cursor-pointer">Receiver</li>
            </a>
          </Link>
          <Link href="https://docs.relay.cc/relay/relay-bridge" passHref>
            <a target="_blank">
              <li className="cursor-pointer">Bridge</li>
            </a>
          </Link>
          <Link href="https://docs.relay.cc/relay/relay-broadcast" passHref>
            <a target="_blank">
              <li className="cursor-pointer">Pro</li>
            </a>
          </Link>
        </ul>
      </div>
    </footer>
  );
};
