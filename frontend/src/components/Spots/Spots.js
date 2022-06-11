import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { loadAllSpotsThunk } from "../../store/spot";
import SplashSpot from "./SplashSpot";
import SpotGridComponent from "./SplashSpot";
import Loading from "../../components/LoadingAndPageNotFound/Loading"

import "./Spots.css"

function Spots() {
    const dispatch = useDispatch();
    // const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(false);

    // const user = useSelector((state) => state?.session?.user?.id)
    // console.log("WHat is user?", user)

    const spots = useSelector((state) => state?.allSpots?.spots)
    // console.log("SPOTS MAICA \n\n", spots)

    // const array = spots.map(spot => spot)
    // console.log(array)

    useEffect(() => {
        dispatch(loadAllSpotsThunk())
            .then(() => setIsLoaded(true));
    }, [dispatch])


    if (!isLoaded) {
        return <Loading />
    } else {

        return(
            <>
                <div className="container">

                    <h1>SPOTS</h1>
                    <div id='spots-main'>
                        { spots?.map((spot) => (
                            <>
                                <div key={spot.id} className='box'>
                                        <div className='s-card'>
                                            <div id='s-gallery'>
                                                { spot?.Images?.reverse().map((image) => (
                                                    <>
                                                        <div className='g-con' key={image?.id}>
                                                            {/* {console.log(image?.id)} */}

                                                            <img className='g-img'src={image?.url}/>
                                                        </div>
                                                    </>
                                                ))}
                                            </div>

                                            <div>
                                                <a>+</a>
                                                <a>+</a>
                                            </div>
                                            <div className="s-bottom">
                                                <div className="city-rating">
                                                    <p>{spot.city }, {spot.state}</p>
                                                    {/* <p>{spot?.Reviews?.review?.rating}</p> */}
                                                </div>
                                                <div>
                                                    <p>{spot.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </>
                        ))}

                    </div>
                </div>
            </>
        )
    }
}

export default Spots;
