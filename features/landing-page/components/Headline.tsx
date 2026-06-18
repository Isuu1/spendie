type HeadlineProps = {
  title: string;
  subtitle: string;
};

const Headline = ({ title, subtitle }: HeadlineProps) => {
  return (
    <div className="text-center flex flex-col gap-2 leading-7">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
};

export default Headline;
