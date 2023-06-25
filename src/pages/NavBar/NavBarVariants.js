export const menuVariants = {
  open: {
    x: 0,
    width: "100%",
    overflow: "visible",
    position: "absolute",
    transition: {
      stiffness: 100,
      duration: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.2
    }
  },
  closed: {
    x: -300,
    width: 0,
    overflow: "hidden",
    position: "absolute",
    transition: {
      stiffness: 100,
      when: 'afterChildren',
      staggerChildren: 0.1,
      duration: 0.5
    }
  },
  exit: {
    clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
    transition: { duration: .4 }
  }
};

export const listVariant = {
  open : {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.2
    }
  },
  closed: {
    x:-20,
    opacity: 0,
  },
}