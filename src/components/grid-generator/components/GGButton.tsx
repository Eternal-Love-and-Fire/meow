type GGButtonType = {
  handleClick?: () => void;
  type: "button" | "reset" | "submit";
  className: string;
  children: React.ReactNode;
};

const GGButton = (props: GGButtonType) => {
  const { handleClick, type, children, className, ...rest } = props;

  return (
    <button type={type} className={className} onClick={handleClick} {...rest}>
      {children}
    </button>
  );
};

export { GGButton };
