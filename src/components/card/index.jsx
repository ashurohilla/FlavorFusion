function Card(props) {
  const { variant, extra, children, ...rest } = props;
  return (
    <div
      className={`!z-5 relative flex flex-col rounded-[20px] bg-lightgray dark: dark:!bg-lightgray bg-clip-border shadow-3xl shadow-shadow-500  dark:text-white dark:shadow-none ${extra}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
