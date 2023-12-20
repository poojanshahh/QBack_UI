import RichTextContent from "@/fwk/components/form/richText/richTextContent";
import { Fragment, Highlights } from "@/fwk/types/highlights";
import cx from "classnames";
import { camelcaseToWords, isNil } from "@/fwk/utils/functions";
import _forEach from "lodash/forEach";
import _get from "lodash/get";
import _includes from "lodash/includes";
import _isNumber from "lodash/isNumber";
import _map from "lodash/map";
import * as React from "react";
import twitterText, { AutoLinkOptions } from "twitter-text";

const escape = twitterText.htmlEscape;

const onticHighlightStart = "//StartOnticHighLight//";
const onticHighlightEnd = "//EndOnticHighLight//";

//const DOM_PARSER = new DOMParser();

const linkContent = (content: string, options?: AutoLinkOptions) =>
  twitterText.autoLink(content, { targetBlank: true, ...options });

/**
 *
 * @param {string} content
 * @param {Fragment[]} fragments
 * @param {boolean} preferTextSearch - To be used when the content has html and "text" property is present in Fragment.
 * This will make sure that escaping don't change highlighting
 * @returns {string}
 */
const highlight = (
  content: string,
  fragments: Fragment[],
  preferTextSearch?: boolean
) => {
  if (!content) {
    return "";
  }

  const contentEscaped = escape(content);

  const updatedPreferTextSearch =
    preferTextSearch || contentEscaped.length !== content.length;

  // If after escaping the content is not same length then update fragments too.
  if (updatedPreferTextSearch) {
    _forEach(fragments, (fragment, index) => {
      const text = escape(fragment.text || fragment.string || "");
      fragments[index] = {
        ...fragment,
        text,
        string: text,
        length: text.length,
      };
    });
  }

  // If after escaping the content is not same length then use textSearch to find hits
  let hits: number[][] = _getHits(
    contentEscaped,
    content,
    fragments,
    updatedPreferTextSearch
  );

  const contentHighlighted = hits.length
    ? twitterText.hitHighlight(contentEscaped, hits, { tag: "span" })
    : contentEscaped;

  return linkContent(contentHighlighted);
};

const _convertUnescapedToEscapedFragments = (
  fragments: Fragment[],
  unescapedContent: string
) => {
  let offset = 0;
  let unEscapedContentWithHighlightMarkers = unescapedContent;
  _forEach(fragments, (fragment) => {
    if (!fragment.start || !fragment.length) return;
    const highLightStartIndex = fragment.start! + offset;
    const highLightEndIndex = fragment.start! + offset + fragment.length!;
    unEscapedContentWithHighlightMarkers =
      unEscapedContentWithHighlightMarkers.slice(0, highLightStartIndex) +
      onticHighlightStart +
      unEscapedContentWithHighlightMarkers.slice(
        highLightStartIndex,
        highLightEndIndex
      ) +
      onticHighlightEnd +
      unEscapedContentWithHighlightMarkers.slice(highLightEndIndex);
    offset = offset + onticHighlightStart.length + onticHighlightEnd.length;
  });

  let escapedContentWithHighlightMarkers = escape(
    unEscapedContentWithHighlightMarkers
  );
  const updatedFragments = _map(fragments, (fragment) => {
    if (!fragment.start || !fragment.length) return fragment;
    const escapedFragment = { ...fragment };
    const newStartIndex =
      escapedContentWithHighlightMarkers.indexOf(onticHighlightStart);
    if (newStartIndex > -1) {
      escapedFragment.start = newStartIndex;
      escapedContentWithHighlightMarkers =
        escapedContentWithHighlightMarkers.replace(onticHighlightStart, "");
    }
    const newEndIndex =
      escapedContentWithHighlightMarkers.indexOf(onticHighlightEnd);
    if (newEndIndex > -1) {
      escapedFragment.length = newEndIndex - newStartIndex;
      escapedContentWithHighlightMarkers =
        escapedContentWithHighlightMarkers.replace(onticHighlightEnd, "");
    }
    return escapedFragment;
  });
  return updatedFragments;
};

const _getHits = (
  content: string,
  unescapedContent: string,
  fragments: Fragment[],
  preferTextSearch?: boolean
) => {
  const hits: number[][] = [];
  const uiFragments = fragments?.[0]?.ignoreText
    ? _convertUnescapedToEscapedFragments(fragments, unescapedContent)
    : fragments;

  let prevMatchedIndex = 0;
  _forEach(uiFragments, (f) => {
    let hit;
    const _useTextFragment = () => {
      const hitFromText = _getHitsFromText(
        f,
        content,
        unescapedContent,
        prevMatchedIndex
      );
      if (hitFromText) {
        prevMatchedIndex = hitFromText.prevMatchedIndex;
        return hitFromText.hit;
      }
      return;
    };

    hit =
      preferTextSearch && !f.ignoreText
        ? _useTextFragment()
        : _getHitFromIndices(f);
    // If hit is not found from preferred way use other way as backup
    if (!hit) {
      hit =
        preferTextSearch && !f.ignoreText
          ? _getHitFromIndices(f)
          : _useTextFragment();
    }

    // sometimes happens identifiedText is not matching with fragment text (Backend issue), @rajan and @mohit is working on it, this fragment of code can be removed when backend framework is updated.

    if (hit) {
      const identifiedText = content.slice(hit[0], hit[1]),
        text = f?.text || f?.string;
      if (!_includes(text?.toLowerCase(), identifiedText?.toLowerCase()))
        hit = null;
    }

    hit && hits.push(hit);
  });

  return hits;
};

const _getTextByIndexFromUnescapedString = (
  f: Fragment,
  unescapedContent: string
) =>
  _isNumber(f.length) && _isNumber(f.start)
    ? unescapedContent.slice(f.start - 1, f.start + f.length - 1)
    : "";

const _getHitsFromText = (
  f: Fragment,
  content: string,
  unescapedContent: string,
  prevMatchedIndex: number
) => {
  let text =
    f &&
    (f.text ||
      f.string ||
      _getTextByIndexFromUnescapedString(f, unescapedContent)); // for old values

  if (text) {
    // const fullTextMatchPosition = f.ignoreCase
    //   ? content.toLowerCase().indexOf(text.toLowerCase(), prevMatchedIndex)
    //   : content.indexOf(text, prevMatchedIndex);

    //  Always check case-insensitive string confirmed with @rajan
    const fullTextMatchPosition = content
      .toLowerCase()
      .indexOf(text.toLowerCase(), prevMatchedIndex);
    const endLength = text.length;
    if (fullTextMatchPosition > -1) {
      return {
        hit: [fullTextMatchPosition, fullTextMatchPosition + endLength],
        prevMatchedIndex: fullTextMatchPosition + endLength,
      }; // start from end of matched string in next iteration
    }
  }

  return;
};

const _getHitFromIndices = (f: Fragment) =>
  f && f.length && _isNumber(f.length) && _isNumber(f.start)
    ? [f.start, f.start + f.length]
    : null;

const getHighlightComponent = (
  fieldLabelMap?: { [k: string]: string },
  highlights?: Highlights[],
  className?: string,
  isDotSeparated?: boolean
): React.ReactNode[] | null => {
  if (!highlights) return null;

  return highlights.map((highlightAttr: Highlights) => {
    const fieldName = _get(highlightAttr, "fieldName") || "";
    if (highlightAttr?.fragments?.length) {
      return (
        <div
          key={highlightAttr.fieldName}
          className={cx("content-highlight", className)}
          dangerouslySetInnerHTML={{
            __html: `<strong>${
              fieldLabelMap?.[fieldName] || camelcaseToWords(fieldName)
            }</strong> : ${highlightAttr.fragments
              .map(
                (fragment) =>
                  fragment?.text && highlight(fragment.text, [fragment])
              )
              .join(isDotSeparated ? "..." : " | ")}`,
          }}
        />
      );
    }

    return null;
  });
};

// const NewHighlightStartTag = '<span class="highlighted">';
// const NewHighlightEndTag = "</span>";

// const NewHighlightStart = escape(NewHighlightStartTag);
// const NewHighlightEnd = escape(NewHighlightEndTag);

// const getNewHighlightedFragment = (content: string, fragment: Fragment) => {
//   const { start, length, matchKeywordList } = fragment;

//   // either start & length OR matchKeywordList must be defined
//   if (!content || ((!length || !_isNumber(start)) && !matchKeywordList?.length))
//     return content;

//   let highlightedContent = escape(content); // escaped content

//   const highlightContent = (startIndex: number, endIndex: number) => {
//     highlightedContent =
//       highlightedContent.slice(0, startIndex) +
//       NewHighlightStart +
//       highlightedContent.slice(startIndex, endIndex) +
//       NewHighlightEnd +
//       highlightedContent.slice(endIndex);
//   };

//   /**
//    * Doing this specially for highlighting multiple keywords in fragment text
//    */
//   if (matchKeywordList?.length) {
//     let offset = 0;
//     _forEach(matchKeywordList, ({ start, length }) => {
//       const startIndex = offset + start;
//       const endIndex = startIndex + length;
//       highlightContent(startIndex, endIndex);
//       offset += NewHighlightStart.length + NewHighlightEnd.length;
//     });
//   } else {
//     const endIndex = start! + length!;
//     highlightContent(start!, endIndex);
//   }

//   // https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript/34064434#34064434
//   return (
//     DOM_PARSER.parseFromString(highlightedContent, "text/html")?.documentElement
//       ?.textContent || ""
//   );
// };

// export const getRichTextHighlightComponent = (
//   fieldLabelMap?: object,
//   highlights?: Highlights[],
//   className?: string,
//   isDotSeparated?: boolean,
//   hideFieldLabel?: boolean
// ) => {
//   if (!highlights) return null;

//   return highlights.map((highlightAttr: Highlights) => {
//     const fieldName = _get(highlightAttr, "fieldName") || "";
//     const fragmentsLength = highlightAttr?.fragments?.length;
//     if (fragmentsLength) {
//       return (
//         <div className={cx("rich-content-highlight", className)}>
//           {hideFieldLabel ? null : (
//             <>
//               <span className="mr-4 font-600">
//                 {fieldLabelMap?.[fieldName] || camelcaseToWords(fieldName)}
//               </span>
//               :{" "}
//             </>
//           )}
//           {highlightAttr.fragments.map((fragment, index) => {
//             const fragmentText = fragment?.text;
//             if (!fragmentText) return null;
//             const highlightedFragment = getNewHighlightedFragment(
//               fragmentText,
//               fragment
//             );
//             return (
//               <>
//                 <RichTextContent
//                   content={highlightedFragment}
//                   className="inline"
//                 />
//                 {index < fragmentsLength - 1 && (
//                   <>
//                     {" "}
//                     <span>{isDotSeparated ? "..." : "|"}</span>{" "}
//                   </>
//                 )}
//               </>
//             );
//           })}
//         </div>
//       );
//     }

//     return null;
//   });
// };

// const _highlightNodeContent = (node: HTMLElement, keywords?: string[]) => {
//   if (!node || !keywords?.length) return;

//   const childNodes = node.childNodes;
//   let textContent = node.textContent || node.innerText || node.innerHTML;

//   if (childNodes?.length) {
//     _forEach(childNodes, (childNode: HTMLElement) =>
//       _highlightNodeContent(childNode, keywords)
//     );
//   } else {
//     let offset = 0,
//       index;
//     let searchString = textContent;

//     /**
//      * Regex: (keywords.join('|'), 'i')
//      * | is OR operator between keywords
//      * "i" means case insensitive search
//      */
//     const regex = new RegExp(keywords.join("|"), "i");
//     let matchedResult = searchString.match(regex);
//     index = matchedResult?.index;

//     while (!isNil(index) && index! > -1) {
//       index = index as number; // to remove typescript error
//       const endIndex = index + matchedResult![0]?.length; // matchedResult[0] -- matched keyword
//       textContent =
//         textContent.slice(0, index) +
//         NewHighlightStartTag +
//         textContent.slice(index, endIndex) +
//         NewHighlightEndTag +
//         textContent.slice(endIndex);

//       offset =
//         index +
//         NewHighlightStartTag.length +
//         matchedResult![0]?.length +
//         NewHighlightEndTag.length;

//       searchString = textContent.substring(offset);
//       matchedResult = searchString.match(regex);
//       index = matchedResult?.index ? matchedResult.index + offset : null;
//     }

//     /**
//      * Here "node" will be text node
//      * text node can't contain html. so, we have to replace this with span to have highlighted part as html
//      */

//     const newNode = document.createElement("span");
//     newNode.innerHTML = textContent;
//     newNode.dataset["container"] = "of-text-node-content"; // ui-web/src/app/styles/utils.css -- .note-content-highlight
//     node.parentElement?.replaceChild(newNode, node);
//   }
// };

// export const getRichTextHighlightedContentWithKeyword = (
//   content: string,
//   keywords?: string[]
// ) => {
//   if (!keywords?.length || !content) return content;

//   const parsedBody = DOM_PARSER.parseFromString(content, "text/html")?.body;
//   _forEach(parsedBody?.childNodes, (childNode: TSAny) =>
//     _highlightNodeContent(childNode, keywords)
//   );

//   return parsedBody?.innerHTML;
// };

export { escape, linkContent, highlight, getHighlightComponent };
