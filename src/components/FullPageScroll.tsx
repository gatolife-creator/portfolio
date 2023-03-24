import Timeline from "./Timeline";
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
import DeepSeaImg from "../images/deep-sea.png";
import ProfileImg from "../images/profile.webp";
import SoundVisualization from "../images/sound-visualization.png";

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
              <div
                className="my-5"
              >
                <BiDownArrow fontSize={36} className="block mx-auto" />
              </div>
            </motion.div>
          </>
        </FullpageSection>

        <FullpageSection className="h-screen w-full flex justify-center items-center -z-50">
          <Timeline />
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
                src={DeepSeaImg}
                title="Deep Sea"
                description="Invites you on a journey to the deep sea using p5.js."
                link="https://gatolife-creator.github.io/deep-sea/"
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
