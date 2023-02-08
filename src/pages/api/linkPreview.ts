import type { NextApiRequest, NextApiResponse } from "next";
import { getLinkPreview } from "link-preview-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { link } = JSON.parse(req.body);
  console.log({ link });

  const data = await getLinkPreview(link);

  res.json({ data });
}
