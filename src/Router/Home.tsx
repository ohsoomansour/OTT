import styled from "styled-components";
import { useQuery } from "react-query";
import { getLatestMovies, getNowPlayingMovies, getTopRatedMoives, getUpcomingMovies, getVideoFunc } from "../api";
import { makeMoviePath } from "../utils";
import Slider from "../Components/Slider";
import { category, isSoundAtom} from "../recoil";
import ReactPlayer from "react-player";
import React  from "react";
import { useRecoilState } from "recoil";
import { Helmet } from "react-helmet";

const Wrapper = styled.div`
  background-color:black;
`
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderWrapper = styled.div`
  width:100%;
  height:300px;
`;
const SliderTitle = styled.p`
  font-size:35px;
  color:${(props) => props.theme.white.lighter};
  font-family: 'Merienda One', cursive;
  position:relative;
  padding:20px;
  margin-bottom:10px;
`
const PlayerWrapper = styled.div`
  position:relative;
  padding-top: 56.25%
  .react-player{
    position:absolute;
    top:0;
    left:0;
  }
`
const PlayBtn = styled.button`
  font-size: 15px;
  height: 30px;
  border-radius: 5px;
  font-weight: 600;
  border: none;
  outline: none;
  cursor:pointer;
`;
export interface IData{
  adult: boolean;
  backdrop_path: string;
  id: number;
  media_type:string;
  original_language: string;
  original_title: string;
  original_name:string; 
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  name:string; 
  vote_count: number;
}
export interface IGetDataResult{
  dates:{
    maximum:string;
    minumum:string;
  },
  results:IData[]
  total_pages:number;
  total_results:number;
}
export interface IMovieVideo{
  id:number;
  results:{
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: false,
    published_at: string;
    id: string;
  }[]
}

export default function Home() {
  
  const {data:nowPlayingData, isLoading:nowPlayingLoading} = useQuery<IGetDataResult>(
    ["nowPlaying", "Movies" ], getNowPlayingMovies)
  const nowPlayingDatas = nowPlayingLoading
    ? []
    : nowPlayingData
    ? nowPlayingData.results
    : [];

  const {data:topRatedData, isLoading:topRatedLoading} = useQuery<IGetDataResult>(
    ["TopRated", "Movies"],getTopRatedMoives)
  const topRatedDatas = topRatedLoading
    ? []
    : topRatedData
    ? topRatedData.results
    : [];
  const {data:upComingData, isLoading:upComingLoading} = useQuery<IGetDataResult>(
    ["Upcoming", "Movies"], getUpcomingMovies)
  const upComingDatas = upComingLoading
    ? []
    : upComingData
    ? upComingData.results
    : [];
  const {data:latestData, isLoading:latestLoading} = useQuery<IGetDataResult>(
    ["Latest", "Movies"], getLatestMovies)
  const latestDatas = latestLoading
    ? []
    : latestData
    ? latestData.results
    : [];

  const {data:VideoData, isLoading:VideoLoading} = useQuery<IMovieVideo>(
    ["MovieVideo","VIDEO" ],() => getVideoFunc(String(619803)))  

  const [isSound, setIsSound] = useRecoilState(isSoundAtom);

  const handleChangeSound = () => {
    setIsSound((prev) => !prev)
  }

      return (
      <Wrapper>
        <Helmet>
          <title>OTT</title>
        </Helmet>
        {nowPlayingLoading ? (
          <Loader>Loading...</Loader>
        ) : (
        <> 
          <PlayerWrapper>
            <ReactPlayer
              className="react-player"
              url={makeMoviePath(VideoData?.results[0].key || "" )}
              volume={isSound ? 0 : 2 }
              muted={true} 
              controls={true}
              playing={true}
              width="100vw"
              height="calc(110vh)"
              pip={false}
              light={false}
              loop={true}
            >
            </ReactPlayer>
          </PlayerWrapper>  
          <PlayBtn type="button" onClick={() => handleChangeSound()}>
              {isSound ? "Sound ON" : "Sound OFF" }
          </PlayBtn>
         
          <SliderWrapper>
             
            <SliderTitle>Now Playing </SliderTitle>
            <Slider
              data={nowPlayingDatas}
              kind={"movie"}
              category={category["nowPlaying-Moive"]} 
            />  
          </SliderWrapper>
          <SliderWrapper>
            <SliderTitle>TopRated</SliderTitle>
            <Slider
              data={topRatedDatas}
              kind={"movie"}
              category={category["topRated-Movie"]} 
            />  
          </SliderWrapper>
          <SliderWrapper>
            <SliderTitle>UpComing</SliderTitle> 
            <Slider
              data={upComingDatas}
              kind={"movie"}
              category={category["upComing-Movie"]} 
            />  
          </SliderWrapper>
          <SliderWrapper>
            <SliderTitle>Latest</SliderTitle>
            <Slider
              data={latestDatas}
              kind={"movie"}
              category={category["latest-Movie"]} 
            />  
          </SliderWrapper>

        </>  
        )}
      </Wrapper>
    )  
}

