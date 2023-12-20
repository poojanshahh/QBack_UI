import classNames from "classnames";
import * as React from "react";
import "./richText.css";

interface Props {
  content: any;
  className?: any;
}

const RichTextContent: React.FC<Props> = (props) => {
  const { content } = props;
  const contentRef = React.useRef<TSAny>();

  React.useEffect(() => {
    // handle list style type for indented list items
    const liElements = contentRef.current?.querySelectorAll("li");

    liElements?.forEach((element: HTMLLIElement) => {
      if (element.querySelector("ul") || element.querySelector("ol")) {
        element.classList.add("no-list-style");
      }
    });
  }, [content]);

  return typeof content === "string" ? (
    <div
      ref={contentRef}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
      className={classNames(props.className, "rte-content")}
    />
  ) : (
    <React.Fragment>{content}</React.Fragment>
  );
};

export default RichTextContent;
