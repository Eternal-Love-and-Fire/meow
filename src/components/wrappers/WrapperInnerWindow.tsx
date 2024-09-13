type WrapperInnerWindowProps = {
  desc: {
    title: string;
    explanation: string;
  };
  children: React.ReactNode;
};
const WrapperInnerWindow = (props: WrapperInnerWindowProps) => {
  const { desc, children } = props;

  return (
    <article className="relative">
      <div>
        <h3>{desc.title}</h3>
        <p>{desc.explanation}</p>
      </div>
      <div>{children}</div>
    </article>
  );
};

export { WrapperInnerWindow };
