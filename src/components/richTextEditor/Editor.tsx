"use client"
import React, { useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { notification } from "antd";

const CustomUndo = () => (
    <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
        <path
            className="ql-stroke"
            d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
        />
    </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
    <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
        <path
            className="ql-stroke"
            d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
        />
    </svg>
);

// Undo and redo functions for Custom Toolbar

function undoChange() {
    //@ts-ignore
    this.quill.history.undo();
}
function redoChange() {
    //@ts-ignore
    this.quill.history.redo();
}

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "lucida"
];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
 

// Formats objects for setting up the Quill editor
export const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block"
];


export const Editor = ({value,onChange,placeholder,index}:{value:any,onChange:any,placeholder?:string,index:any}) => {

    const quillRef = useRef<any>();

    const imageHandler = (e:any) => {
        const editor = quillRef.current.getEditor();
        console.log(editor)
        const input:any = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (/^image\//.test(file.type)) {
                console.log(file);
                const formData = new FormData();
                formData.append("image", file);
                // const res = await ImageUpload(formData); // upload data into server or aws or cloudinary
                // const url = res?.data?.url;
                editor.insertEmbed(editor.getSelection(), "image", "http://res.cloudinary.com/dh6kaqmlf/image/upload/v1710705789/gwbkov5f0muga05woimg.jpg");
            } else {
                notification.error({ message:"You could only upload images."})
            }
        };
    }

    const modules =useMemo(()=>(
        {
            toolbar: {
                container: `#toolbar${index}`,
                handlers: {
                    undo: undoChange,
                    redo: redoChange,
                    image: imageHandler
                }
            },
            history: {
                delay: 500,
                maxStack: 100,
                userOnly: true
            }
        }
    ),[]); 
  
   
    return (
        <div className="">
            {/* <EditorToolbar /> */}
            <div id={`toolbar${index}`}>
                <span className="ql-formats">
                    <select className="ql-font" defaultValue="arial">
                        <option value="arial">Arial</option>
                        <option value="comic-sans">Comic Sans</option>
                        <option value="courier-new">Courier New</option>
                        <option value="georgia">Georgia</option>
                        <option value="helvetica">Helvetica</option>
                        <option value="lucida">Lucida</option>
                    </select>
                    <select className="ql-size" defaultValue="medium">
                        <option value="extra-small">Size 1</option>
                        <option value="small">Size 2</option>
                        <option value="medium">Size 3</option>
                        <option value="large">Size 4</option>
                    </select>
                    <select className="ql-header" defaultValue="3">
                        <option value="1">Heading</option>
                        <option value="2">Subheading</option>
                        <option value="3">Normal</option>
                    </select>
                </span>
                <span className="ql-formats">
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-strike" />
                </span>
                <span className="ql-formats">
                    <button className="ql-list" value="ordered" />
                    <button className="ql-list" value="bullet" />
                    <button className="ql-indent" value="-1" />
                    <button className="ql-indent" value="+1" />
                </span>
                <span className="ql-formats">
                    <button className="ql-script" value="super" />
                    <button className="ql-script" value="sub" />
                    <button className="ql-blockquote" />
                    <button className="ql-direction" />
                </span>
                <span className="ql-formats">
                    <select className="ql-align" />
                   
                </span>
                <span className="ql-formats">
                    <button className="ql-link" />
                    <button className="ql-image" />
                    
                </span>
                <span className="ql-formats">
                    <button className="ql-formula" />
                    <button className="ql-code-block" />
                    <button className="ql-clean" />
                </span>
                <span className="ql-formats">
                    <button className="ql-undo">
                        <CustomUndo />
                    </button>
                    <button className="ql-redo">
                        <CustomRedo />
                    </button>
                </span>
            </div>
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                modules={modules}
                formats={formats}
            />
        </div>
    );
};