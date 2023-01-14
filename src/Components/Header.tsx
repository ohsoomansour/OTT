import styled from "styled-components";
import {motion, useAnimation, useScroll} from "framer-motion";
import {Link, useRouteMatch, useHistory } from "react-router-dom" 
import React, { useEffect,  useState } from "react";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
  display: flex;
  position: fixed;
  z-index:500;
  top:0;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;
const Col = styled.div`
  display: flex;
  align-items: center;
`;
const Items = styled.ul`
  display: flex;
  align-items:center;
`;
const Item = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
  color:${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
  font-size:15px;
`;
const Circle = styled(motion.span)`
  position: absolute;
  width:5px;
  height:5px;
  border-radius:5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;
const Logo = styled(motion.svg)`
  width: 95px;
  height: 25px;
  margin-right: 20px;
  fill: ${(props) => props.theme.red};
  path{
    stroke: white;
    stroke-width: 6px;
  }
`;
const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position:relative;
  svg {
    height: 25px;
  }
`;
const Input = styled(motion.input)`
  transform-origin: right;
  position: absolute;
  right: 30px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1; 
  color:white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;
const SVG = styled(motion.svg)`
  color:black;
  background-color:transparent;
  width:150px;
  height:100px;
 ` 

const navVariants = {
  top:{
    backgroundColor: "rgba(0, 0, 0, 1)" 
  },
  scroll:{
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
}

const svg = {
  start:{pathLength:0, fill:"rgba(255, 255, 255, 0)" },
  end:{
    fill:"rgba(255, 255, 255, 1)",
    pathLength:1, 
  }
}
interface IForm {
  keyword: string;
}

export default function Header()  {
  
  
  const homeMatch = useRouteMatch("/");
  const tvMatch = useRouteMatch("/tv");
  const [searchOpen, setSearchOpen] = useState(false);
  const inputAnimation = useAnimation(); 
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
         scaleX:0,
      })

    } else {
      inputAnimation.start({
         scaleX: 1,
      })
    }
    setSearchOpen((prev) => !prev);
  }
  const navAnimation = useAnimation();
  const {scrollY, scrollYProgress} = useScroll();

  useEffect(() => {
     
      scrollY.onChange((latest) => {
      
      if(scrollY.get() > 80 ){
        navAnimation.start("scroll")
      
      } else {
        navAnimation.start("top")
      }
     
    })
    
    
  }, [scrollY, navAnimation])

  const {register, handleSubmit} = useForm<IForm>();
  const history = useHistory();
  const Valid = ({keyword}:IForm) => {
    history.push(`/search?keyword=${keyword}`);
  };
  return (
  <Nav
   variants={navVariants}
   initial="top"
   animate={navAnimation}
  >
   
    <Col>
      <SVG xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 287 151" >
        <motion.path variants={svg} initial="start" animate="end" transition={{ default:{duration:2}, fill:{duration:10, delay:1}}} fill="white"  stroke="black" strokeWidth="0.8px" d=" M149.623383,121.443069   C149.621521,96.836853 149.621521,72.679153 149.621521,48.101479   C143.965393,48.101479 138.530701,48.101479 132.871735,48.101479   C132.871735,46.596943 132.871735,45.511326 132.871735,44.171829   C153.730530,44.171829 174.477737,44.171829 195.330215,44.171829   C196.432327,46.985306 195.701263,48.173717 192.619019,48.070728   C188.304642,47.926563 183.981827,48.034348 178.952835,48.034348   C178.952835,49.978786 178.952820,51.725788 178.952820,53.472790   C178.952789,75.637222 178.947418,97.801659 178.960480,119.966080   C178.961899,122.356049 179.356522,125.010323 175.140518,123.645897   C175.140518,98.800339 175.140518,73.852592 175.140518,48.389488   C173.508438,48.281719 172.158997,48.192616 170.479431,48.081715   C170.479431,73.454956 170.479431,98.402306 170.479431,123.295929   C166.433121,123.997787 166.377472,123.997833 166.373962,120.009071   C166.354599,98.011307 166.364670,76.013519 166.364639,54.015736   C166.364639,52.209721 166.364639,50.403706 166.364639,48.324299   C164.838913,48.324299 163.634521,48.324299 162.075821,48.324299   C162.075821,62.890198 162.075882,77.191025 162.075821,91.491859   C162.075775,101.157555 162.012955,110.823914 162.116043,120.488503   C162.144562,123.161652 161.702728,124.808144 158.063812,123.636337   C158.063812,98.752007 158.063812,73.677139 158.063812,48.327412   C156.378387,48.327412 155.174438,48.327412 153.650726,48.327412   C153.650726,73.537056 153.650726,98.489456 153.650726,123.441849   C153.291016,123.779106 152.931290,124.116356 152.571579,124.453606   C151.589478,123.599602 150.607361,122.745598 149.623383,121.443069  z"/>
        <motion.path variants={svg} initial="start" animate="end" transition={{ default:{duration:2}, fill:{duration:9, delay:1}}} fill="white"  stroke="black" strokeWidth="0.8px" d=" M220.621094,66.000130   C220.621155,59.841301 220.621155,54.182297 220.621155,48.104565   C214.966904,48.104565 209.533157,48.104565 203.873352,48.104565   C203.873352,46.600803 203.873352,45.515320 203.873352,43.919579   C211.081818,43.919579 218.193665,43.919552 225.305511,43.919586   C237.802475,43.919651 250.299484,43.934486 262.796387,43.907257   C265.255890,43.901901 267.768280,43.679024 266.377960,47.852112   C261.222931,47.852112 255.948578,47.852112 249.952835,47.852112   C249.952835,49.965233 249.952835,51.710114 249.952835,53.454994   C249.952805,75.616295 249.948578,97.777596 249.958847,119.938896   C249.959946,122.308990 250.396301,124.997566 246.150757,123.661560   C246.150757,98.828514 246.150757,73.885986 246.150757,48.408920   C244.527939,48.286942 243.187119,48.186161 241.502792,48.059559   C241.502792,73.423943 241.502792,98.362793 241.502792,123.239113   C237.438431,124.038429 237.378326,124.038483 237.374680,120.060150   C237.354050,97.565613 237.364639,75.071053 237.364594,52.576500   C237.364594,51.262955 237.364594,49.949413 237.364594,48.643219   C233.489594,46.984695 233.025436,48.837257 233.035629,51.933735   C233.110321,74.594666 233.069992,97.255959 233.083694,119.917130   C233.085266,122.517265 233.416382,125.351639 228.956985,123.369576   C228.956985,98.548599 228.956985,73.608589 228.956985,48.359856   C227.438644,48.359856 226.241074,48.359856 224.635345,48.359856   C224.635345,58.152012 224.635376,67.779320 224.635330,77.406631   C224.635254,91.736496 224.603470,106.066490 224.664810,120.396088   C224.675598,122.916222 224.478210,124.823761 220.621017,123.616531   C220.621017,104.679596 220.621017,85.589775 220.621094,66.000130  z"/>
        <motion.path variants={svg} initial="start" animate="end" transition={{ default:{duration:2}, fill:{duration:8, delay:1}}} fill="white"  stroke="black" strokeWidth="0.8px" d=" M66.445831,127.879547   C42.417213,123.304352 26.999138,109.750198 21.572338,86.195007   C15.189268,58.489094 33.886246,29.817698 61.457378,24.034061   C90.838722,17.870697 118.983086,36.319603 124.749748,65.522827   C130.304306,93.651878 111.347794,121.943359 83.271156,126.996086   C77.929581,127.957375 72.360649,127.655380 66.445831,127.879547  M111.651260,105.089195   C119.867859,93.785088 123.203201,81.292229 120.983345,67.385406   C116.944374,42.082401 92.251335,23.676355 66.925423,27.148411   C40.734642,30.739031 21.847559,54.337391 24.617744,80.009491   C26.815964,100.381027 39.810070,116.561790 59.278687,121.966171   C79.907242,127.692558 97.259956,121.808907 111.651260,105.089195  z"/>
        <motion.path variants={svg} initial="start" animate="end" transition={{ default:{duration:2}, fill:{duration:7, delay:1}}} fill="white"  stroke="black" strokeWidth="0.8px" d=" M151.000854,39.711647   C145.515335,39.711288 140.528259,39.781048 135.544403,39.684021   C132.624130,39.627171 132.626465,39.507607 133.162964,35.288254   C146.363556,35.288254 159.622284,35.288181 172.881012,35.288288   C179.362457,35.288342 185.847458,35.178684 192.322189,35.387398   C193.529861,35.426323 194.696350,36.743599 195.881836,37.470917   C194.715759,38.217579 193.556793,39.600586 192.382523,39.613712   C178.756561,39.766010 165.128281,39.711437 151.000854,39.711647  z"/>
        <motion.path variants={svg} initial="start" animate="end" transition={{ default:{duration:2}, fill:{duration:6, delay:1}}} fill="white"  stroke="black" strokeWidth="0.8px" d=" M247.999222,35.288353   C254.450699,35.288410 260.402374,35.288410 266.229187,35.288410   C267.759735,38.999317 266.264374,39.752689 263.252686,39.743141   C243.646271,39.680973 224.039581,39.711205 204.290665,39.711205   C202.650208,36.461681 203.468155,35.219299 207.115356,35.247307   C220.576019,35.350677 234.037964,35.288334 247.999222,35.288353  z"/>
        <motion.path variants={svg} initial="start" animate="end" transition={{ default:{duration:2}, fill:{duration:5, delay:1}}} fill="white"  stroke="black" strokeWidth="0.8px" d=" M189.818207,31.040436   C170.712418,31.040440 152.081177,31.040440 133.049194,31.040440   C132.963638,29.712152 132.888885,28.551468 132.803543,27.226454   C133.783356,27.130669 134.426315,27.013193 135.069336,27.012880   C155.036560,27.003195 175.003799,27.004953 195.269852,27.004953   C196.757919,32.545353 192.518036,30.568052 189.818207,31.040436  z"/>
        <motion.path variants={svg} initial="start" animate="end" transition={{ default:{duration:2}, fill:{duration:4, delay:1}}} fill="white"  stroke="black" strokeWidth="0.8px" d=" M255.963547,27.001865   C259.614410,27.001865 262.771545,27.001865 266.073944,27.001865   C267.295105,29.561735 267.246643,31.068413 263.844482,31.060734   C244.052872,31.016048 224.261108,31.038860 204.067612,31.038860   C203.971985,29.729273 203.887375,28.570648 203.772812,27.001865   C221.245865,27.001865 238.357834,27.001865 255.963547,27.001865  z"/>
        <motion.path variants={svg} initial="start" animate="end" transition={{ default:{duration:2}, fill:{duration:3, delay:1}}} fill="white"  stroke="black" strokeWidth="0.5px" d=" M46.316364,110.721878   C31.758759,98.725250 26.013702,83.630943 30.077980,65.627205   C33.951565,48.468189 44.996387,37.376427 62.030552,32.734528   C86.518059,26.061556 111.467400,41.982357 116.392166,67.198830   C121.241997,92.031609 104.028038,115.837051 79.002747,119.233749   C66.985062,120.864922 56.336304,117.863152 46.316364,110.721878  M33.410809,68.249260   C31.116493,86.575974 38.216434,101.842552 52.952904,110.269455   C67.090240,118.353729 84.534737,117.232323 97.482033,107.406921   C111.307953,96.914764 116.789742,78.144203 110.817863,61.742844   C104.857773,45.373852 87.910278,33.987831 71.317856,35.205124   C52.185497,36.608757 38.016388,48.722488 33.410809,68.249260  z"/>
        <motion.path variants={svg} initial="start" animate="end" transition={{ default:{duration:2}, fill:{duration:2, delay:1}}} fill="white"  stroke="black" strokeWidth="0.5px" d=" M33.525734,67.833054   C38.016388,48.722488 52.185497,36.608757 71.317856,35.205124   C87.910278,33.987831 104.857773,45.373852 110.817863,61.742844   C116.789742,78.144203 111.307953,96.914764 97.482033,107.406921   C84.534737,117.232323 67.090240,118.353729 52.952904,110.269455   C38.216434,101.842552 31.116493,86.575974 33.525734,67.833054  M99.765572,51.765789   C92.002899,43.243919 82.397835,39.147934 70.855034,39.901894   C56.588306,40.833771 46.269001,48.005470 40.499168,60.850685   C34.533260,74.132416 36.307068,87.018158 45.598843,98.310936   C54.641453,109.300873 66.741676,113.405136 80.473450,110.376236   C107.257477,104.468330 117.224998,74.649574 99.765572,51.765789  z"/>
        <motion.path variants={svg} initial="start" animate="end" transition={{ default:{duration:2}, fill:{duration:1, delay:1}}} fill="white"  stroke="black" strokeWidth="0.5px" d=" M100.013748,52.026173   C117.224998,74.649574 107.257477,104.468330 80.473450,110.376236   C66.741676,113.405136 54.641453,109.300873 45.598843,98.310936   C36.307068,87.018158 34.533260,74.132416 40.499168,60.850685   C46.269001,48.005470 56.588306,40.833771 70.855034,39.901894   C82.397835,39.147934 92.002899,43.243919 100.013748,52.026173  M41.969902,82.245522   C46.709747,99.978027 62.933968,110.424286 79.701111,106.539459   C97.057213,102.518173 107.701096,86.088402 104.093231,68.888069   C100.559784,52.042542 83.892067,40.971508 66.960999,44.224079   C49.872395,47.506912 39.016537,63.575893 41.969902,82.245522  z"/>
        <motion.path variants={svg} initial="start" animate="end" transition={{ default:{duration:2}, fill:{duration:1, delay:1}}} fill="white"  stroke="black" strokeWidth="0.5px" d=" M41.900890,81.833023   C39.016537,63.575893 49.872395,47.506912 66.960999,44.224079   C83.892067,40.971508 100.559784,52.042542 104.093231,68.888069   C107.701096,86.088402 97.057213,102.518173 79.701111,106.539459   C62.933968,110.424286 46.709747,99.978027 41.900890,81.833023  M79.281876,102.049759   C81.151024,101.377754 83.097221,100.865685 84.877007,100.008186   C98.002785,93.684280 103.744240,78.380753 98.120316,64.881096   C92.614326,51.664551 77.769012,44.974571 64.302811,49.641380   C50.636536,54.377533 42.937359,68.653000 46.650280,82.371918   C50.507416,96.623711 64.301445,105.203773 79.281876,102.049759  z"/>
        <motion.path variants={svg} initial="start" animate="end" transition={{ default:{duration:2}, fill:{duration:1, delay:1}}} fill="white"  stroke="black" strokeWidth="0.5px" d=" M78.869240,102.102798   C64.301445,105.203773 50.507416,96.623711 46.650280,82.371918   C42.937359,68.653000 50.636536,54.377533 64.302811,49.641380   C77.769012,44.974571 92.614326,51.664551 98.120316,64.881096   C103.744240,78.380753 98.002785,93.684280 84.877007,100.008186   C83.097221,100.865685 81.151024,101.377754 78.869240,102.102798  M50.102818,71.136520   C49.998909,72.628662 49.804466,74.120888 49.805695,75.612938   C49.814037,85.743546 56.623634,95.018639 66.043457,97.793144   C76.399780,100.843483 87.188721,96.756485 92.913704,87.614349   C98.233742,79.118874 97.340881,67.894547 90.539932,60.253895   C84.681084,53.671658 77.354324,50.939861 68.595207,52.721836   C58.810131,54.712547 52.913555,60.839855 50.102818,71.136520  z"/>
        <motion.path variants={svg} initial="start" animate="end" transition={{ default:{duration:2}, fill:{duration:1, delay:1}}} fill="white"  stroke="black" strokeWidth="0.5px" d=" M50.171440,70.716331   C52.913555,60.839855 58.810131,54.712547 68.595207,52.721836   C77.354324,50.939861 84.681084,53.671658 90.539932,60.253895   C97.340881,67.894547 98.233742,79.118874 92.913704,87.614349   C87.188721,96.756485 76.399780,100.843483 66.043457,97.793144   C56.623634,95.018639 49.814037,85.743546 49.805695,75.612938   C49.804466,74.120888 49.998909,72.628662 50.171440,70.716331  z"/>
      </SVG>
      <Items>
        <Item>
          <Link to="/"> Home{homeMatch?.isExact && <Circle layoutId="circle" />} </Link>
        </Item>
        <Item>
          <Link to="/tv"> Tv{tvMatch?.isExact && <Circle layoutId="circle" /> } </Link>
        </Item>
      </Items>
    </Col>
  
    <Col>
       
      <Search onSubmit={handleSubmit(Valid)}>  
        <motion.svg
          onClick={toggleSearch}
          animate={{ x: searchOpen ? -240 : 0 }}
          transition={{ type: "linear" }}
          fill="white"

          viewBox="0 0 512 512"
          >
          <motion.path 
            d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"
          />
        </motion.svg>
       
        <Input
          {...register("keyword", { required: true, minLength: 2 })}
          animate={inputAnimation}
          initial={{ scaleX: 0}}
          transition={{ type: "linear" }}
          placeholder="Search for moive or tv show..."
        />
      </Search>
    </Col>
  </Nav>
    )
};