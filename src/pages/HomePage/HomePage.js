import ExploreMore from "../ExploreMore/ExploreMore";
import Hero from "../Hero/Hero";
import NewReleases from "../NewReleases/NewReleases";
import { motion } from "framer-motion";
import { wrapperVariants } from "../../util/transitionVariants";

function HomePage() {
  return (
    <motion.div
      variants={wrapperVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Hero />
      <NewReleases />
      <ExploreMore />
    </motion.div>
  );
}

export default HomePage;
