import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { Polaroid } from "@/components/Polaroid";

export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          themes: { light: "github-light", dark: "github-dark" },
          keepBackground: false,
        },
      ],
    ],
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

// Every article photo gets the Polaroid treatment (aged print + click to zoom).
export const mdxComponents = {
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Polaroid
      src={typeof props.src === "string" ? props.src : ""}
      alt={props.alt ?? ""}
      className="my-8"
    />
  ),
};
