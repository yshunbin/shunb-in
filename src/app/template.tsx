import { ViewTransition } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "page-flip-forward",
        "nav-back": "page-flip-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "page-flip-forward",
        "nav-back": "page-flip-back",
        default: "none",
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
