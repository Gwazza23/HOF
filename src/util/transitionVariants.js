export const wrapperVariants = {
    initial: {
      clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', 
      transition: { duration: .4 }
    },
    animate: {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      transition: { duration: .4, staggerChildren: .1 }
    },
    exit: {
      clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
      transition: { duration: .4 }
    }
  }