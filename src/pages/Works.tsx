import Card from "../components/Card";
import Main from "../components/Main";
import TransitionAnimation from "../components/TransitionAnimation";

const Works = () => {
  return (
    <TransitionAnimation>
      <Main>
        <h3 className="font-bold text-4xl text-center mt-[50px]">WORKS</h3>
        <div className="grid grid-cols-3 gap-4 mt-20">
          <Card
            src="/public/blockchain-world.png"
            title="Blockchain World"
            description="A beginner-friendly introduction to blockchain. Received the MIC Award at the 25th National Jr/Sr HS Web Contest."
            link="https://contest.japias.jp/tqj25/250150K/"
            className="mx-auto"
          />
          <Card
            src="/public/sound-visualization.png"
            title="Sound Visualizer"
            description="A simple sound visualizer using p5.js."
            link="https://gatolife-creator.github.io/sound_visualization/"
            className="mx-auto"
          />
          <Card
            src="/public/deep-sea.png"
            title="Deep Sea"
            description="Invites you on a journey to the deep sea using p5.js."
            link="https://gatolife-creator.github.io/deep-sea/"
            className="mx-auto"
          />
        </div>
      </Main>
    </TransitionAnimation>
  );
};

export default Works;
