import Card from "./Card";
import FullPage, {
  FullPageSections,
  FullpageSection,
  FullpageNavigation,
  // @ts-ignore
} from "@ap.cx/react-fullpage";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { BiDownArrow } from "react-icons/bi";

import BlockchainWorldImg from "../images/blockchain-world.png";
import ChatAppImg from "../images/chat-app.png";
import ProfileImg from "../images/profile.webp";
import SoundVisualization from "../images/sound-visualization.png";
import RustLogo from "../images/rust-logo-blk.svg";

const FullPageScroll = () => {
  return (
    <FullPage>
      <FullpageNavigation />
      <FullPageSections>
        <FullpageSection className="h-screen w-full flex justify-center items-center -z-50">
          <>
            <motion.div
              className="w-[400px] h-full mx-auto text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ stiffness: 260, damping: 20, duration: 0.6 }}
            >
              <img
                className="mask mask-circle mx-auto mt-48 mb-5"
                src={ProfileImg}
                alt="GatoLifeIcon"
              />
              <h3 className="font-bold text-4xl">GatoLife</h3>
              <p className="mt-5">
                Hobby programmer. Started programming in middle school and
                mainly uses p5.js, TypeScript, Node.js, and React.js. <br />
                Recently, I have become aware of issues with education
                businesses in Japan that target teachers rather than students,
                and I want to change this using Web3 technology, so I am
                currently learning Solidity.
              </p>
              <div className="my-5">
                <BiDownArrow fontSize={36} className="block mx-auto" />
              </div>
            </motion.div>
          </>
        </FullpageSection>

        <FullpageSection className="relative h-screen w-full flex justify-center items-center -z-50">
          <div className="text-center">
            <h3 className="max-h-fit mt-[150px] font-bold text-4xl text-center">
              SKILLS
            </h3>
            <h4 className="font-bold text-3xl text-left mt-10">Profession</h4>
            <hr />
            <div className="grid grid-cols-5 gap-4 text-left mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="144"
                height="144"
                viewBox="0 0 48 48"
              >
                <path fill="#ffd600" d="M6,42V6h36v36H6z"></path>
                <path
                  fill="#000001"
                  d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368L29.538 32.947zM17.952 33.029c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368L17.952 33.029z"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="144"
                height="144"
                viewBox="0 0 48 48"
              >
                <rect width="36" height="36" x="6" y="6" fill="#1976d2"></rect>
                <polygon
                  fill="#fff"
                  points="27.49,22 14.227,22 14.227,25.264 18.984,25.264 18.984,40 22.753,40 22.753,25.264 27.49,25.264"
                ></polygon>
                <path
                  fill="#fff"
                  d="M39.194,26.084c0,0-1.787-1.192-3.807-1.192s-2.747,0.96-2.747,1.986 c0,2.648,7.381,2.383,7.381,7.712c0,8.209-11.254,4.568-11.254,4.568V35.22c0,0,2.152,1.622,4.733,1.622s2.483-1.688,2.483-1.92 c0-2.449-7.315-2.449-7.315-7.878c0-7.381,10.658-4.469,10.658-4.469L39.194,26.084z"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="144"
                height="144"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#21a366"
                  d="M24.007,45.419c-0.574,0-1.143-0.15-1.646-0.44l-5.24-3.103c-0.783-0.438-0.401-0.593-0.143-0.682	c1.044-0.365,1.255-0.448,2.369-1.081c0.117-0.067,0.27-0.043,0.39,0.028l4.026,2.389c0.145,0.079,0.352,0.079,0.486,0l15.697-9.061	c0.145-0.083,0.24-0.251,0.24-0.424V14.932c0-0.181-0.094-0.342-0.243-0.432L24.253,5.446c-0.145-0.086-0.338-0.086-0.483,0	L8.082,14.499c-0.152,0.086-0.249,0.255-0.249,0.428v18.114c0,0.173,0.094,0.338,0.244,0.42l4.299,2.483	c2.334,1.167,3.76-0.208,3.76-1.591V16.476c0-0.255,0.2-0.452,0.456-0.452h1.988c0.248,0,0.452,0.196,0.452,0.452v17.886	c0,3.112-1.697,4.9-4.648,4.9c-0.908,0-1.623,0-3.619-0.982l-4.118-2.373C5.629,35.317,5,34.216,5,33.042V14.928	c0-1.179,0.629-2.279,1.646-2.861L22.36,3.002c0.994-0.562,2.314-0.562,3.301,0l15.694,9.069C42.367,12.656,43,13.753,43,14.932	v18.114c0,1.175-0.633,2.271-1.646,2.861L25.66,44.971c-0.503,0.291-1.073,0.44-1.654,0.44"
                ></path>
                <path
                  fill="#21a366"
                  d="M28.856,32.937c-6.868,0-8.308-3.153-8.308-5.797c0-0.251,0.203-0.452,0.455-0.452h2.028	c0.224,0,0.413,0.163,0.448,0.384c0.306,2.066,1.218,3.108,5.371,3.108c3.308,0,4.715-0.747,4.715-2.502	c0-1.01-0.401-1.76-5.54-2.263c-4.299-0.424-6.955-1.371-6.955-4.809c0-3.167,2.672-5.053,7.147-5.053	c5.026,0,7.517,1.745,7.831,5.493c0.012,0.13-0.035,0.255-0.122,0.35c-0.086,0.09-0.208,0.145-0.334,0.145h-2.039	c-0.212,0-0.397-0.149-0.44-0.354c-0.491-2.173-1.678-2.868-4.904-2.868c-3.611,0-4.031,1.257-4.031,2.2	c0,1.143,0.495,1.477,5.367,2.122c4.825,0.64,7.116,1.544,7.116,4.935c0,3.418-2.853,5.379-7.827,5.379"
                ></path>
              </svg>
              <svg
                width="100%"
                height="100%"
                viewBox="-10.5 -9.45 21 18.9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mt-4 mb-3 text-link dark:text-link-dark w-24 lg:w-28 self-center text-sm me-0 flex origin-center transition-all ease-in-out"
              >
                <circle cx="0" cy="0" r="2" fill="#149ECA"></circle>
                <g stroke="#149ECA" stroke-width="1" fill="none">
                  <ellipse rx="10" ry="4.5"></ellipse>
                  <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
                  <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
                </g>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="144"
                height="144"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#000000"
                  d="M18.974,31.5c0,0.828-0.671,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-14c0-0.653,0.423-1.231,1.045-1.43 c0.625-0.198,1.302,0.03,1.679,0.563l16.777,23.704C40.617,36.709,44,30.735,44,24c0-11-9-20-20-20S4,13,4,24s9,20,20,20 c3.192,0,6.206-0.777,8.89-2.122L18.974,22.216V31.5z M28.974,16.5c0-0.828,0.671-1.5,1.5-1.5s1.5,0.672,1.5,1.5v13.84l-3-4.227 V16.5z"
                ></path>
              </svg>
            </div>
            <h4 className="font-bold text-3xl text-left mt-10">Learning</h4>
            <hr />
            <div className="grid grid-cols-5 gap-4 text-left mt-5 mb-24">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="144"
                height="144"
                viewBox="0 0 48 48"
              >
                <polygon fill="#1c1c1c" points="25,15 18.5,4 12,15"></polygon>
                <polygon fill="#666" points="38,15 31.5,4 25,15"></polygon>
                <polygon fill="#383838" points="18.5,4 25,15 31.5,4"></polygon>
                <polygon fill="#383838" points="12,15 18.5,26 25,15"></polygon>
                <polygon fill="#1c1c1c" points="25,33 31.5,44 38,33"></polygon>
                <polygon fill="#666" points="12,33 18.5,44 25,33"></polygon>
                <polygon
                  fill="#383838"
                  points="31.5,44 25,33 18.5,44"
                ></polygon>
                <polygon fill="#383838" points="38,33 31.5,22 25,33"></polygon>
              </svg>
              <img src={RustLogo} alt="" width={144} height={144} />
            </div>
          </div>
        </FullpageSection>

        <FullpageSection className="h-screen w-full flex justify-center -z-50">
          <div className="text-center">
            <h3 className="max-h-fit mt-[150px] font-bold text-4xl text-center">
              WORKS
            </h3>
            <div className="grid grid-cols-3 gap-4 mt-20 text-left">
              <Card
                src={BlockchainWorldImg}
                title="Blockchain World"
                description="A beginner-friendly introduction to blockchain. Received the MIC Award at the 25th National Jr/Sr HS Web Contest."
                link="https://contest.japias.jp/tqj25/250150K/"
              />
              <Card
                src={SoundVisualization}
                title="Sound Visualizer"
                description="A simple sound visualizer using p5.js."
                link="https://gatolife-creator.github.io/sound_visualization/"
              />
              <Card
                src={ChatAppImg}
                title="Decentralized Chat App"
                description="My first dApp I created. "
                link="https://dapp-chat-six.vercel.app/"
              />
            </div>
            <Link
              to="/works"
              className="btn btn-lg btn-secondary gap-2 text-center mt-10"
            >
              See More <FaArrowRight fontSize={16} />
            </Link>
          </div>
        </FullpageSection>
      </FullPageSections>
    </FullPage>
  );
};

export default FullPageScroll;
