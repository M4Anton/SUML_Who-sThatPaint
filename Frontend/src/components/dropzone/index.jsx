import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = (props) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: "1",
    onDrop,
  });

  const onDrop =  useCallback((acceptedFiles) => {
      props.onDrop(acceptedFiles);
  }, [])

  return (
    <div className="container" {...props}>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag'n'drop some files here, or click to select files</p>
        <em>(Only image items will be accepted)</em>
      </div>
    </div>
  );
};

export default Dropzone;
