import "./single.scss";
import { Loading } from "components";
import { useEffect, useState } from "react";
import basic from "images/start_image.jpg";


const Single = (props) => {
    const [currentSearch, setCurrentSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchImg, setSearchImg] = useState("");

    useEffect(() => {
        const loadImg = (file) => {
            console.log(file);
        }

        loadImg("balblabl")
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitted");
    }

    return (
        <div className="single">
            <div className="single--col">
            <div className="image-container">
                <img src={currentSearch ? searchImg : basic} alt="image" className="search--img" />
            </div>
            <form className="form" onSubmit={handleSubmit}>
                

            </form>
            </div>
            {currentSearch ? (
            <div className="single--col small">

            </div>
            ) : null}

            <Loading loading={loading} />
        </div>
    );
}

export default Single;