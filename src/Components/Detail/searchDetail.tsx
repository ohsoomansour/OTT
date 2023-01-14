import styled  from "styled-components";
import {AnimatePresence, motion, useViewportScroll} from "framer-motion";
import { makeImagePath, makeMoviePath } from "../../utils";
import { useQuery } from "react-query";
import { getDetail, getTvStream, getVideoFunc } from "../../api";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isSoundAtom } from "../../recoil";
import ReactPlayer from "react-player";
import { IMovieVideo } from "../../Router/Home";

const BigMovie = styled(motion.div)`
  position: absolute;
  left:0px;
  right:0px;
  margin: 0 auto;
  width: 960px;
  height: 1000px;
  max-width: calc(100% - 40px);
  max-height: calc(100% - 80px);
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow: hidden;
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top:0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity:0;
`;
const BigCover = styled.div<{bgphoto:string}>`
  width: 100%;
  height:100vh;
  background-image:linear-gradient(to bottom, transparent, black), url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
`;
const TagLine = styled.p`
  position: relative;
  font-size:28px;
  font-weight:600;
  top:-100px;
  text-align:center;
`
const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 35px;
  position: relative; 
  top:150px;
`;
const BigOverview = styled.p`
  font-size:17px;
  line-height:1.5;
  padding: 0 20px;
  position: relative;
  top:140px;
  color: ${(props) => props.theme.white.lighter};
`;
export const PlayerWrapper = styled.div`
  position:relative;
  display:flex;
  jusify-content:center;
  top:190px;
  padding-top: 56.25%
  .react-player{
    position:absolute;
    left:0;
    right:0;
  }
`
export interface IDetailProps {
  id:number;
  kind:string;
  category:string;
}

export interface IDetailDatas{
  backdrop_path:string;
  belongs_to_collection:{
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  }
  genres:{id:number; name:string;}[]
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies:{id:number; logo_path:string; name:string; origin_country:string;}[]
  production_countries:{iso_3166_1:string; name:string;}
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages:{english_name:string; iso_639_1:string; name:string; }[]
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
const OverlayVariants = {
  initial:{
    opacity:0
  },
  animate:{
    opacity:1
  },
  exit:{
    opacity:0
  }
}

export default function SearchDetail({id, kind, category}:IDetailProps) {
  const searchMatch = useRouteMatch<{searchId:string}>([
    "/search/MultiSearch/:searchId"
  ])
  const {data:movieVideoData} = useQuery<IMovieVideo>(
    ["movieVideo", "Video"], () => getVideoFunc(searchMatch?.params.searchId))
  console.log(movieVideoData)
  const {data: TvStreamData } = useQuery<IMovieVideo>(
    ["TvStream","Tv"], () => getTvStream(searchMatch?.params.searchId)) 
  //🚧callback함수의 인수가 kind props = "search" >  ⭐실제 api에서 받을 수 있는 kind === "tv" 또는 "movie"🚧   
  const { data:movieDetail } = useQuery<IDetailDatas>(
    ["Detail",kind, id ],
    () => getDetail("movie", id)
  )
  const { data:tvDetail } = useQuery<IDetailDatas>(
    ["Detail",kind, id ],
    () => getDetail("tv", id)
  )

  const [isSound, setIsSound] = useRecoilState(isSoundAtom);
  const setSound = useSetRecoilState(isSoundAtom)
  const { scrollY  } = useViewportScroll()
  const history = useHistory();
  const onOverlayClick = () => {
    history.goBack();
    setSound(false); 
  }
  
  return (
    <AnimatePresence>
    <>

      <Overlay 
        onClick={onOverlayClick}
        variants={OverlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      />
      <BigMovie 
        layoutId={id + "-" + kind + "-" + category}
        style={{  
          top: scrollY.get(),
          zIndex: 1000,
        }}
      > 
        {movieDetail && (
          <>  
            <BigCover
              bgphoto={makeImagePath(movieDetail?.poster_path)}
              
            >
              <BigTitle>{movieDetail.title}</BigTitle>
              <BigOverview>{movieDetail.overview}</BigOverview>
              <TagLine>{movieDetail.tagline}</TagLine>
              <PlayerWrapper>
                <ReactPlayer
                  className="react-player"
                  url={makeMoviePath(movieVideoData?.results[0].key)}
                  volume={isSound ? 0 : 2 }
                  muted={true} 
                  controls={true}
                  playing={true}
                  width="calc(100vw)"
                  height="calc(30vh)"
                  pip={false}
                  light={false}
                  loop={true}
                  >
              </ReactPlayer>
              
            </PlayerWrapper>  
            </BigCover>
          </>
        )}

      </BigMovie>

    </>  
    </AnimatePresence>
  )
}