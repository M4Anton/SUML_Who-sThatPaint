import "./single.scss";
import { Loading, Input, Button } from "components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "Context";
import basic from "images/start_image.jpg";
import Dropzone from "react-dropzone";

const Single = (props) => {
  const [loading, setLoading] = useState(false);
  const [searchImg, setSearchImg] = useState(basic);
  const [file, setFile] = useState(null);
  const [fromHistory, setFromHistory] = useState(false);
  const [notes, setNotes] = useState("");
  const [results, setResults] = useState([]);
  const {
    auth,
    setUserData,
    userData: { images },
  } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("File", file);
    form.append("notes", notes);
    try {
      const req = await fetch("/", { method: "POST", body: form });
      const res = await req.json();
      if (res.status === "success") {
        setUserData(res.new_user_data);
        setResults(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onDrop = (e) => {
    setFile(e[0]);
    setSearchImg(URL.createObjectURL(e[0]));
  };

  const handleOpenHistorySearch = (img) => {
    const path = img.file.split("/");
    console.log(path);
    // setSearchImg(path)
    setNotes(img.notes);
    setResults(img.pred);
    setFromHistory(true);
  };
  return (
    <div className="single">
      {auth && images.length ? (
        <aside className="sider left slide-left">
            <h4>Your search history</h4>
          <ul className="zero">
            {images.map((image) => (
              <li
                key={image.id}
                onClick={(e) => handleOpenHistorySearch(image)}
                className="flex pointer"
              >
                <span>
                  {image.file.split("/")[image.file.split("/").length - 1]} -{" "}
                  {image.date}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
      <div className="single--col">
        <div className="image-container">
          <img src={searchImg} alt="image" className="search--img" />
        </div>
        {fromHistory ? (
          <div className="history-record">
            <h3>Your notes</h3>
            <p>{notes}</p>
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <Dropzone onDropAccepted={onDrop} accept="image/*" maxFiles={1}>
              {({ getRootProps, getInputProps, acceptedFiles }) => (
                <section className="dropzone">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag &amp; drop some files here, or click to select files{" "}
                    </p>
                    <span>(Only image files will be accepted)</span>
                    <aside>
                      <h4>Files</h4>
                      <ul>
                        {acceptedFiles.map((file) => (
                          <li key={file.path}>{file.path}</li>
                        ))}
                      </ul>
                    </aside>
                  </div>
                </section>
              )}
            </Dropzone>
            <Input
              type="textarea"
              label="Notes"
              name="notes"
              onChange={(e) => setNotes(e.target.value)}
            />
            <Button text="Upload" />
          </form>
        )}
      </div>
      {!results ? null : (
        <aside className="sider right slide">
            <h4>Results: </h4>
          {results.map((res) => {
            const el = Object.entries(res);
            const link = `https://pl.wikipedia.org/wiki/${el[0][0].replace(" ", "_")}`
            return (
              <div className="flex pointer">
                <a href={link} target="_blank" key={el[0][1]} className="link">
                  {el[0][0]} - {el[0][1]}%
                </a>
              </div>
            );
          })}
        </aside>
      )}
      <Loading loading={loading} />
    </div>
  );
};

export default Single;
