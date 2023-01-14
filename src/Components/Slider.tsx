import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { IData } from "../Router/Home";
import { useState } from "react";
import { makeImagePath } from "../utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSquareCaretLeft, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useRouteMatch } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isSoundAtom } from "../recoil";
import MovieDetail from "./Detail/movieDetail";
import TvDetail from "./Detail/tvDetail";
import SearchDetail from "./Detail/searchDetail";

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: 50px 1fr 1fr 1fr 1fr 1fr 1fr 50px;
  gap: 10px;
  position: absolute; 
  left:0;   
  right:0;
  margin:0 auto;
  width: 100%;
  height:180px;
`;

const Box = styled(motion.div)<{bgphoto:string;}>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size:cover;
  border-radius:5px;
  box-shadow:5px -7px 10px 3px rgba(19, 15, 64,1.0);
  color: ${(props) => props.theme.white.lighter};
  background-position: center center;
  font-size:50px;
  &:first-child{
    transform-origin: center left;
  }
  &:last-child{
    transform-origin: center right; 
  }
  cursor: pointer;
`;
const Info = styled(motion.div)`
  padding: 20px 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position:absolute;
  width: 100%;
  bottom:0;
  h4{
    text-align:center;
    font-size:14px;
    font-weight:900;
  }
  `;
const NextBtn = styled.button`
  font-size:20px;
  color:white;
  position:relative;
  cursor:pointer;
  border-radius:10px;
  box-shadow:10px -7px 20px 3px rgba(19, 15, 64,1.0);
  background-color:rgba(0, 0, 0, 0 );
`
const PrevBtn = styled.button`
  color:white;
  font-size:20px;
  cursor:pointer;
  border-radius:10px;
  box-shadow:-10px -7px 20px 3px rgba(19, 15, 64,1.0);
  background-color:rgba(0, 0, 0, 0 );
`
const rowVariants = {
  hidden:(increasing:boolean) =>({
    x: increasing ? window.outerWidth + 10 : - window.outerWidth - 10
  }),
  visible:{
    x: 0,                
  }, 
  exit:(increasing:boolean) => ({
    x: increasing ? - window.outerWidth - 10 : window.outerWidth + 10
  })
}
const BoxVariants = {
  normal:{
    scale: 1,
  },
  hover: {
    zIndex:99,
    scale:1.3,
    y:-80,
    transition:{
      type:"tween",
      duration: 0.1, 
      delay: 0.5,
    }
  }
}
const infoVariants ={
  hover:{ 
    opacity:1,
    transition:{
      type:"tween",
      duration: 0.1, 
      delay: 0.5,
    }
  }
}

export interface ISliderProps{
  data:IData[];
  category:string;
  kind:string;
}

const offset = 6;
export default function Slider({data, kind, category}:ISliderProps  ) {
  const [isSound, setSound] = useRecoilState(isSoundAtom)
  const history = useHistory();
  const onBoxClicked = (id:number, kind:string, category:string) => {
     history.push(`/${kind}/${category}/${id}`)
     setSound(true)
  }
  const [index, setIndex] = useState(0);
  const [increasing, setIncreasing] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => {
    setLeaving((prev) => !prev)
  }
  const increaseIndex = () => {
    if(data){
      if(leaving) return;
      toggleLeaving();
      setIncreasing(true);
      const TotalMovies = data.length - 1;
      const MaxIndex =  Math.floor(TotalMovies / offset) // 3      
      setIndex((prev) => prev === MaxIndex ? 0 : prev + 1 )
    }
  }
  const decreaseIndex = () => {
    if(data){
      if(leaving) return;
      toggleLeaving()
      setIncreasing(false)
      const TotalMovies = data.length - 1;
      const MaxIndex = Math.floor(TotalMovies/6) // 3
      setIndex((prev) => prev === 0 ? MaxIndex : prev - 1 )  
    }
  }
  const movieMatch = useRouteMatch<{
    kind:string;
    category:string;
    movieId:string;
  }>([
    "/movie/nowPlaying-Moive/:movieId",
    "/movie/topRated-Movie/:movieId",
    "/movie/upComing-Movie/:movieId"
  ])
  
  const tvMatch = useRouteMatch<{
    kind:string;
    category:string;
    tvId:string;
  }>([
    "/tv/airingToday/:tvId",
    "/tv/pupular-TV/:tvId",
    "/tv/topRated-TV/:tvId"
  ])
  const searchMovieMatch = useRouteMatch<{searchId:string}>([
    "/search/MultiSearch/:searchId"
  ])

  return (
    <>
       
      <AnimatePresence initial={false} custom={increasing} onExitComplete={toggleLeaving} >

        <Row
          custom={increasing}
          key={index}
          variants={rowVariants}
          transition={{ type:"tween", duration: 1 }} 
          initial="hidden"
          animate="visible"
          exit="exit"
        > 

          <NextBtn onClick={increaseIndex} >
            <FontAwesomeIcon icon={faSquareCaretLeft} size="1x" beat  />
          </NextBtn>
            {data?.slice(1).slice(index*offset, index*offset+offset).map((item) => (
              <Box
                key={item.id} 
                bgphoto={makeImagePath(item.backdrop_path, "w500")}
                variants={BoxVariants}
                initial="normal"
                whileHover="hover"
                layoutId={item.id+ "-" + kind + "-" + category }
                onClick={() => onBoxClicked(item.id, kind, category )}
              >
                <Info variants={infoVariants} > 
                  <h4>{item.title || item.original_name }  </h4> 
                </Info> 
              </Box>
                    
            ))}
          <PrevBtn onClick={decreaseIndex}>
            <FontAwesomeIcon icon={faSquareCaretRight} size="1x" beat  />
          </PrevBtn>
        </Row>
 
      </AnimatePresence>
      
        {movieMatch && (<MovieDetail
          id={+movieMatch.params.movieId}
          kind={kind}
          category={category}
        />
        )}
        {tvMatch && (<TvDetail 
          id={+tvMatch.params.tvId}
          kind={kind}
          category={category}
        />)}
        {searchMovieMatch && (<SearchDetail 
          id={+searchMovieMatch.params.searchId}
          kind={kind}
          category={category}
        />)}
       
    </>      
  )
}