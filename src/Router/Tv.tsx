import { AnimatePresence, motion } from "framer-motion";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getAiringTodayShowTv, getPopularShowTv, getTopRatedTv } from "../api";
import Slider from "../Components/Slider";
import { category } from "../recoil";
import { makeImagePath } from "../utils";
import { IGetDataResult} from "./Home";
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

/*
          <SliderWrapper>
            <SliderTitle>AiringToday</SliderTitle>
            <Slider
              data={airingTodayDatas}
              kind={"tv"}
              category={category.airingToday}
             />
          </SliderWrapper>
          <SliderWrapper>
            <SliderTitle>PopularToday</SliderTitle>
            <Slider
              data={PopularTodayDatas}
              kind={"tv"}
              category={category["pupular-TV"]}
             />
          </SliderWrapper>
 */
const Wrapper = styled.div`
  background-color:black;
`
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div<{bgphoto:string}>`
  height:100vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
  padding:60px;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${(props) => props.bgphoto}); 
  backgound-size:cover;
  background-position:center center;
`;
const Title = styled.h2`
  color:whit;
  font-size: 60px;
  margin-bottom: 10px;
`;
const Ovierview = styled.p`
  font-size: 24px;
  width: 50%;
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
  display:flex;
  jusify-content:center;
  padding-top: 56.25%
  .react-player{
    position:absolute;
    left:0;
    right:0;
  }
`

const PFSliderWrapper = styled(motion.div)`
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  background-color:black;
  height:150px;
`
const PFRow = styled(motion.div)`
  display:grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap:5px;
  position:absolute;
  left:0;
  right:0;
  margin:0 auto;
  width:40%;
  height: 110px;
`
const NextButton = styled(motion.button)`
  height:50px;
  width: 50px;
  border-radius:200px;
  border-width:5px;
  border-color:black;
  box-shadow: 3px -3px 5px 3px rgba(19, 15, 64,1.0);
  background-color:rgba(236, 240, 241,1.0);
  cursor:pointer;
`
const PrevButton = styled(motion.button)`
  height:50px;
  width: 50px;
  margin-left:40px;
  border-radius:50px;
  border-width:5px;
  border-color:black;
  box-shadow: -3px -3px 5px 3px rgba(19, 15, 64,1.0);
  background-color:rgba(236, 240, 241,1.0);
  cursor:pointer;
`
const PFBox = styled(motion.div)`
  font-size:20px;
  display:flex;
  flex-direction:column;
  align-items:center;
  
`
const PFImg = styled(motion.img)`
  border-radius:7px;
  background-size:cover;
  background-position:center center;
`
const PFName = styled(motion.h3)`
  font-size:18px;
  font-weight:bold;
  text-align:center;
`
const PFTitle = styled(motion.div)`
  font-size:35px;
  font-family:'Nanum Pen Script', cursive;
  text-shadow:1px -2px 10px pink;
  color:white;
  text-align:center;
  margin-bottom: 10px;
`
const pfRowVariants = {
  hidden:(increasing:boolean) => ({
    x: increasing? +50 : -50
  }),
  animate:{
    x: 0
  },
  exit:(increasing:boolean) => ({
    x: increasing? -50 : +50
  })
}

interface IProfileDatas{
  index:number;
  alt:string;
  name:string;
  src:string;
}
const offset = 6;
//https://www.youtube.com/watch?v=FJrCetYYw3U
export default function Tv() {
  const Profiles:IProfileDatas[] = [
    {index:0, alt:"윤혜진", name:"신민아", src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210825_243%2F1629857915629iAUDa_JPEG%2F60_main_image_new_1629857915575.jpg" },
    {index:1, alt:"홍두식", name:"김선호", src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210825_233%2F1629858732784zxBGO_JPEG%2F60_main_image_new_1629858732731.jpg" },
    {index:2, alt:"지성현", name:"이상이", src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210825_110%2F1629859494712CEs1T_JPEG%2F60_main_image_new_1629859494689.jpg" },
    {index:3, alt:"표미선", name:"공민정", src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210825_114%2F162985997849740rzT_JPEG%2F60_main_image_new_1629859978437.jpg"}, 
    {index:4, alt:"최은철", name:"강형석", src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210825_37%2F1629874680131p2Egj_JPEG%2F60_24092785_main_image_new_1629874680076.jpg"},
    {index:5, alt:"김감리", name:"김영옥", src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210825_145%2F1629863803230XEJyt_JPEG%2F60_main_image_new_1629863803173.jpg"},
    {index:6, alt:"여화정", name:"이봉련", src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210825_28%2F1629869046348RXhyV_JPEG%2F60_main_image_new_1629869046324.jpg"},
    {index:7, alt:"장영국", name:"인교진", src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210825_79%2F1629869410213bxeOT_JPEG%2F60_main_image_new_1629869410154.jpg"},
    {index:8, alt:"장이준", name:"기은유", src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210825_98%2F16298734691199KF1e_JPEG%2F60_main_image_new_1629873469105.jpg"},
    {index:9, alt:"교사,유초희", name:"홍지희", src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210913_241%2F1631513953532WKUbh_JPEG%2F60_main_image_new_1631513953518.jpg"},
    {index:9, alt:"윤태화", name:"서상원", src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210825_266%2F1629860669037n7rEb_JPEG%2F60_main_image_new_1629860668982.jpg"},
    {index:10, alt:"김도하", name:"이석형", src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210825_53%2F1629861762077tWBXp_JPEG%2F60_main_image_new_1629861762066.jpg"},
    {index:11, alt:"이명신", name:"우미화", src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210825_265%2F1629860998067CxDMx_JPEG%2F60_main_image_new_1629860998048.jpg"},
    {index:12, alt:"왕지원", name:"박예영", src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210825_171%2F16298614337851SP8j_JPEG%2F60_main_image_new_1629861433716.jpg"},
    {index:13, alt:"조남숙", name:"차정화", src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210825_162%2F1629869887995REPw3_JPEG%2F60_main_image_new_1629869887976.jpg"},
    {index:14, alt:"최금철", name:"윤석현", src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210825_162%2F1629870330340lxPIv_JPEG%2F60_main_image_new_1629870330266.jpg"},
    {index:15, alt:"함윤경", name:"김주연" ,src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210825_224%2F16298718012951GVhc_JPEG%2F60_main_image_new_1629871801224.jpg"},
    {index:16, alt:"오춘재", name:"조한철", src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210825_235%2F1629864700740isAge_JPEG%2F60_main_image_new_1629864700715.jpg"},
    {index:17, alt:"오춘재 딸,오주리", name:"김민서", src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210825_289%2F1629872899508yRnRc_JPEG%2F60_main_image_new_1629872899493.jpg"},
    {index:18, alt:"마을사람,이맏이", name:"이용이", src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210825_217%2F16298640670098v7uN_JPEG%2F60_main_image_new_1629864066983.jpg" },
    {index:19, alt:"마을사람,박숙자", name:"신신애", src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210825_103%2F1629864353521wlBdG_JPEG%2F60_main_image_new_1629864353446.jpg"},
    {index:20, alt:"장이준 친구, 최보라", name:"고도연", src:"https://search.pstatic.net/common?type=f&size=210x236&quality=90&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20210825_239%2F1629874502386CqiY3_JPEG%2F60_main_image_new_1629874502331.jpg"}
  ]
  const [increasing, setIncreasing] = useState(true);  
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false)
  const toggleLeaving = () => {
    setLeaving((prev) => !prev)
  }
  const increaseIndex = () => {
    if(Profiles){
      if(leaving) return;
      toggleLeaving(); 
      setIncreasing(true); 
      const TotalProfiles = Profiles.length;
      const MaxIndex = Math.floor(TotalProfiles/6)
      setIndex((prev) => prev === MaxIndex? 0 : prev + 1)
      toggleLeaving();
    }
  }
  const decreaseIndex = () => {
    if(Profiles){
      if(leaving) return;
      toggleLeaving(); 
      setIncreasing(false); 
      const TotalProfiles = Profiles.length;
      const MaxIndex = Math.floor(TotalProfiles/6)
      setIndex((prev) => prev === 0 ? MaxIndex : prev - 1)
      toggleLeaving();
    }
  }

  const {data:airingTodayData, isLoading:airingTodayLoading} = useQuery<IGetDataResult>(
    ["AiringToday", "TV"], getAiringTodayShowTv)
  
  const airingTodayDatas = airingTodayLoading
    ? []
    : airingTodayData
    ? airingTodayData.results
    : [];
    
  const {data:PopularTodayData, isLoading:PopularTodayLoading} = useQuery<IGetDataResult>(  
  ["PopluarShow", "TV"], getPopularShowTv)
  const PopularTodayDatas = PopularTodayLoading
    ? []
    : PopularTodayData
    ? PopularTodayData.results
    : [];
  const {data:TopRatedData, isLoading:TopRatedLoading} = useQuery<IGetDataResult>(
    ["TopRated", "Tv"], getTopRatedTv)
  
  const TopRatedDatas = TopRatedLoading
   ? []
   : TopRatedData
   ? TopRatedData.results
   : [];

   const {data:LatestData, isLoading:LatestLoading} = useQuery<IGetDataResult>(
   ["Latest", "TV"], )

   const LatestDatas = LatestLoading
    ? []
    : LatestData
    ? LatestData.results
    : [];
    
    
  return (
    <Wrapper>  
      {airingTodayLoading? (
      <Loader>loading...</Loader>
      ) : (
        <>
        
          <Banner
            bgphoto={makeImagePath(airingTodayDatas[0].poster_path)}
          >
            <Title>{airingTodayDatas[0].name}</Title>
            <Ovierview>{airingTodayDatas[0].overview}</Ovierview>
          </Banner>

          <SliderWrapper>
            <SliderTitle>TopRated</SliderTitle>
            <Slider
              data={TopRatedDatas}
              kind={"tv"}
              category={category["topRated-TV"]}
             />
          </SliderWrapper>
             
            <AnimatePresence initial={false} custom={increasing} onExitComplete={toggleLeaving}  >
              <PFTitle >갯마을 차차차 </PFTitle>
              <PFSliderWrapper>
                <NextButton onClick={increaseIndex}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </NextButton>     
                  <PFRow
                    key={index} 
                    custom={increasing} 
                    transition={{type:"tween", duration:1 }} 
                    variants={pfRowVariants} 
                    initial="hidden" 
                    animate="animate" 
                    exit="exit" 
                  >
                    
                    {Profiles?.slice(index*offset, index*offset + offset).map((profile, index) => ( 
                    <PFBox
                      key={index}
                        
                      >
                      <PFImg  alt={profile.alt} src={profile.src} width="90px" height="90px"/>
                      <PFName>{profile.name}</PFName> 
                    </PFBox>
                    ))}
                  
                  </PFRow>
                <PrevButton onClick={decreaseIndex}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </PrevButton>
              </PFSliderWrapper>                 
            </AnimatePresence>
            
          <PlayerWrapper>
            <ReactPlayer
              className="react-player"
              url={`https://www.youtube.com/watch?v=FJrCetYYw3U`}
              volume={ 2 }
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
          
          
        </>
      )}
    </Wrapper> 
  )
  }
