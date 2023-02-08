import { displayXsBold } from "@/design/typography";
import React, { FunctionComponent, memo, useEffect, useState } from "react";
import styled from "styled-components";

const Root = styled.div`
  padding: 1rem;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  gap: 0.5rem;
  margin: 1rem;
`;

const Title = styled.div`
  ${displayXsBold}
`;

const Description = styled.div``;

const Image = styled.img`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 4px;
`;

export const Component: FunctionComponent<
  React.LinkHTMLAttributes<HTMLAnchorElement>
> = ({ href }) => {
  const [preview, setPreview] = useState<{
    url: string;
    title: string;
    description: string;
    images: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/linkPreview", {
      method: "POST",
      body: JSON.stringify({ link: href }),
    }).then(async (data) => {
      const {
        data: { url, title, description, images },
      } = await data.json();

      console.log({ url, title, description, images });
      setPreview({ url, title, description, images });
    });
  }, [href]);

  if (!preview || !preview?.images?.[0]) {
    return <div>"Loading..."</div>;
  }

  return (
    <Root>
      <Title>{preview.title}</Title>
      <Description>{preview.description}</Description>
      <Image src={preview.images[0]} />
    </Root>
  );
};

export const PreviewRenderer = memo(
  Component,
  (prev, next) => prev.href !== next.href
);
