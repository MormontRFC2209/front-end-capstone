import {useState, useEffect} from "react";


export default function RIANDCOMP(props) {
  //Fill out
  const [reviews,setReviews]=useState([]);
  const getReviews = () => {
    console.log(props.productId);
    return axios.get("/info", {params: {route: '/reviews/', apiParams: {product_id:props.productId}}})
      .then((response) => {
        console.log('test1',response);
        setReviews(response.results);
      })
      .catch((err) => console.log('err'))
  };

  useEffect(() => {
    getReviews()
      .catch((err) => console.log(err))
  }, []);

  return (
    <>{props.productId}</>
  )
};