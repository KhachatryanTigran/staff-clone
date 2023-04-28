import { convertFromRaw, convertToRaw, EditorState } from "draft-js";

import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "./editorStyle.module.scss";
import { useEffect } from "react";

const EditorComponent = ({ isTitle, update, onEdit }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (update?.cvInfo?.editorData) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(update.cvInfo.editorData))
      );
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [update]);

  useEffect(() => {
    onEdit(convertToRaw(editorState.getCurrentContent()));
  }, [editorState, onEdit]);

  return (
    <div className={styles.mainBox}>
      <div>
        {" "}
        <span style={{ fontSize: "14px" }}>{update?.data?.title}</span>
      </div>
      <Editor
        editorState={editorState}
        toolbarClassName={styles.toolbar}
        wrapperClassName={styles.wrapper}
        editorClassName={styles.editor}
        onEditorStateChange={(editor) => setEditorState(editor)}
        hashtag={{
          separator: " ",
          trigger: "#",
        }}
        mention={{
          separator: " ",
          trigger: "@",
          suggestions: [
            { text: "JavaScript", value: "javascript", url: "js" },
            { text: "Golang", value: "golang", url: "go" },
          ],
        }}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "embedded",
            "emoji",
            "image",
            "remove",
            "history",
          ],
          inline: {
            inDropdown: true,
          },
          list: {
            inDropdown: true,
          },
          textAlign: { inDropdown: true },
          link: {
            inDropdown: true,
            showOpenOptionOnHover: true,
          },

          history: { inDropdown: true },
        }}
      />
    </div>
  );
};
export default EditorComponent;
