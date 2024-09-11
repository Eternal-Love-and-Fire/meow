interface BurgerMenuProps {
  showModalMenu: boolean;
  toggleModalVisibility: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({
  showModalMenu,
  toggleModalVisibility,
}) => {
  return (
    <button
      onClick={toggleModalVisibility}
      className="flex lg:hidden flex-col justify-center w-10 h-10 space-y-2 group focus:outline-none"
    >
      <span
        className={`block w-4 h-0.5 bg-black dark:bg-white transform transition-transform duration-300 ease-in-out ${
          showModalMenu ? "rotate-45 translate-y-2" : ""
        }`}
      ></span>
      <span
        className={`block w-6 h-0.5 bg-black dark:bg-white transform transition-opacity duration-300 ease-in-out ${
          showModalMenu ? "opacity-0" : ""
        }`}
      ></span>
      <span
        className={`block w-8 h-0.5 bg-black dark:bg-white transform transition-transform duration-300 ease-in-out ${
          showModalMenu ? "-rotate-45 -translate-y-2" : ""
        }`}
      ></span>
    </button>
  );
};

export { BurgerMenu };
