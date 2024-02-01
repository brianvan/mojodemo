

export function PricesComponent(props) {
  const { children, data, ...other } = props;

  return (
    <div>
      <p>{data}</p>
      {children}
    </div>
  );
};
