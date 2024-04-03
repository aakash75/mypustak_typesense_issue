import React, { useCallback, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { url, AuthInstance, url2 } from "@/helper/api_url";
// import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';

const MyEditor = ({ data, value, onChange }) => {

  const handleEditorChange = useCallback(
    (event, editor) => {
      const data = editor.getData();
      onChange(data);
    },
    [onChange]
  );

  function uploadAdapter(loader) {
    const timeStamp = new Date().getTime();

    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();

          loader?.file?.then((file) => {
            body.append("file", file);
            body.append("filename", `testBlog${timeStamp}.jpg`);
            fetch(`${url2}/aws_image_upload`, {
              method: "POST",
              body
            }).then((res => res?.json())).then((res) => {
              const imageUrl = res.url[0];
              resolve({ default: imageUrl });
            }).catch((err) => {
              reject(err);
            })
          })
        })
      }
    }
  }

  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    }
  }

  const customStyles = `
  .ck-editor__editable {
    min-height: 10rem; /* Adjust the min-height according to your needs */
  }
`;

  return (
    <>
      <style>{customStyles}</style>
      <CKEditor 
        config={{ 
          extraPlugins: [uploadPlugin]
        }}
        editor={ClassicEditor}
        data={data ? data : value}
        onChange={handleEditorChange} 
      />
    </>
  );
};

export default MyEditor;
