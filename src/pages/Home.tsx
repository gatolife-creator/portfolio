import Main from "../components/Main";
import Background from "../components/Background";
import TransitionAnimation from "../components/TransitionAnimation";
import FullPageScroll from "../components/FullPageScroll";
const Home = () => {
  return (
    <TransitionAnimation>
      <Background />
      <FullPageScroll />
    </TransitionAnimation>
  );
};

export default Home;
