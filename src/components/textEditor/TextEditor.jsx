import React, { useState } from "react";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Editor } from "react-draft-wysiwyg";

import style from "./editor.module.scss";
import { useEffect } from "react";

const TextEditor = ({ onChange, value, big }) => {
  const [editor, setEditor] = useState(
    value
      ? EditorState.createWithContent(convertFromRaw(value))
      : EditorState.createEmpty()
  );

  useEffect(() => {
    console.log(EditorState.createEmpty());
    const newValue = value
      ? EditorState.createWithContent(convertFromRaw(value))
      : EditorState.createEmpty();

    console.log(value, "value");
    console.log(JSON.stringify(newValue) !== JSON.stringify(editor));
    if (JSON.stringify(newValue) !== JSON.stringify(editor)) {
      setEditor(newValue);
    }
  }, [value]);

  const onEditorStateChange = (newEditor) => {
    setEditor(newEditor);
    const contentState = newEditor.getCurrentContent();
    const raw = convertToRaw(contentState);
    onChange(raw);
  };

  return (
    <div className={style.editor}>
      <Editor
        editorState={editor}
        wrapperClassName="wrapper-class"
        editorClassName={big ? "editor-class-big" : "editor-class"}
        toolbarClassName="toolbar-class"
        onEditorStateChange={onEditorStateChange}
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
          colorPicker: {
            className: "demo-option-custom",
            popupClassName: "demo-popup-custom",
          },
          link: {
            popupClassName: "demo-popup-custom",
            link: { className: "demo-option-custom" },
            unlink: { className: "demo-option-custom" },
          },
          blockType: {
            className: "demo-option-custom-wide",
            dropdownClassName: "demo-dropdown-custom",
          },

          embedded: {
            className: "demo-option-custom",
            popupClassName: "demo-popup-custom",
          },
          image: {
            className: "demo-option-custom",
            popupClassName: "demo-popup-custom",
          },
          remove: { className: "demo-option-custom" },
          emoji: { className: "demo-option-custom" },
          list: {
            unordered: { className: "demo-width" },
            ordered: { className: "demo-width" },
            indent: { className: "demo-option-custom" },
            outdent: { className: "demo-option-custom" },
          },
          fontFamily: {
            className: "demo-dropdown-custom",
            dropdownClassName: "demo-dropdown-custom",
          },
        }}
      />
    </div>
  );
};

export default TextEditor;
