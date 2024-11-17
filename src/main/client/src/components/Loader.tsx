import {useState} from "react";
import "./styling/loading.css";

const Loading = () => {
    const [durationSec] = useState(1);
    return (
        <div className="wrapper">
            { [5,4,3,2,1].map(
                (version)=> <div
                    className="rect"
                    style={{
                        animationDelay: `${(version-1) * (durationSec/12)}s`,
                    }}
                    key={version}
                ></div>
            )}
         </div>
                );
            };

export default Loading;