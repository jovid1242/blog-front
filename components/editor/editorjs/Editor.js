import React, { useState, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";

import Header from "@editorjs/header";
import LinkTool from "@editorjs/link";
import RawTool from "@editorjs/raw";
import ImageTool from "@editorjs/image";
import Checklist from "@editorjs/checklist";
import Quote from "@editorjs/quote";
import CodeTool from "@editorjs/code";
import { StyleInlineTool } from "editorjs-style";
import Tooltip from "editorjs-tooltip";

import { CloudImage } from "../UploadImage/CloudImage";

const Editor = ({setContent }) => {
  const [editor, setEditor] = useState({});

  const onFileChange = async (file) => {
    const form_data = new FormData();
    let preset = process.env.NEXT_PUBLIC_PRESET;
    if (preset) {
      form_data.append("upload_preset", preset);
    }
    if (file) {
      form_data.append("image", file);
      const imageUrl = await CloudImage(form_data); 

      if (imageUrl) {
        return imageUrl;
      } else {
        return "Ошибка при загрузка файла"; // <-- put an error image url here
      }
    }

    return "Ошибка при загрузка файла"; // <-- put an error image url here
  };

  const Configuration = () => {
    // save images in Cloudinary

    return {
      holder: "editorjs",
      autofocus: true,
      tools: {
        style: StyleInlineTool,
        tooltip: {
          class: Tooltip,
          config: {
            location: "left",
            highlightColor: "#FFEFD5",
            underline: true,
            backgroundColor: "#154360",
            textColor: "#FDFEFE",
            holder: "editorId",
          },
        },
        header: {
          class: Header,
          inlineToolbar: true,
          config: {
            defaultLevel: 1,
          },
        },
        raw: RawTool,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file) {
                return onFileChange(file).then((imageUrl) => {
                  return {
                    success: 1,
                    file: {
                      url: imageUrl,
                    },
                  };
                });
              },
            },
          },
        },

        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+O",
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
        code: {
          class: CodeTool,
          inlineToolbar: true,
        },
      },
      /**
       * Previously saved data that should be rendered
       */
      //  onReady: () => {
      //     console.log('Editor.js is ready to work!')
      //  },
       onChange: (api, event) => {
          api.saver.save().then((outputData) => {
            setContent(outputData);
          }) 
      },

      data: {
        time: 1643195431504,
        blocks: [
          {
            id: "o72AO0sY-1",
            type: "paragraph",
            data: {
              text: "Начни писать сюда!!!",
            },
          },
        ],
        version: "2.22.2",
      },
    };
  };

  useEffect(() => {
    const editor = new EditorJS(Configuration());
    setEditor(editor);
  }, []);

  return (
    <div>
      <div id="editorjs" />
    </div>
  );
};

export default Editor;
