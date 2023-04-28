// import { convertFromRaw, convertToRaw, EditorState } from "draft-js";

// import React, { useState } from "react";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import styles from "./editorStyle.module.scss";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import {
//   onEditText,
//   onEditTitle,
// } from "../../../store/slices/companyInfoSlice";
// import TextEditor from "../../textEditor/TextEditor";
// const EditorComponent = ({ isTitle, data }) => {
//   const dispatch = useDispatch();

//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   let onEdit = isTitle ? onEditTitle : onEditText;

//   useEffect(() => {
//     if (data) {
//       let editorData = isTitle ? data.title : data.text;
//       setEditorState(EditorState.createWithContent(convertFromRaw(editorData)));
//     } else {
//       setEditorState(EditorState.createEmpty());
//     }
//   }, [data, isTitle]);

//   useEffect(() => {
//     let data = convertToRaw(editorState.getCurrentContent());
//     dispatch(onEdit(data));
//   }, [editorState, dispatch, onEdit]);

//   return (
//     <div>

//     </div>
//   );
// };
// export default EditorComponent;
