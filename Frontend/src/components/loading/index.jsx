import "./loading.scss";
import loadingImg from "images/loading.gif";

const Loading = ({ loading }) => {

    return !loading ? null : (
        <div className="overlay">
            <div className="loading">
                <img src={loadingImg} alt="loading_image" className="loading--image" />
            </div>

        </div>
    )
}

export default Loading;