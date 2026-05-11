type DashboardPanelLoaderProps = {
  height?: string | number;
};

const DashboardPanelLoader = ({ height }: DashboardPanelLoaderProps) => {
  return (
    <div
      className="
        animate-shimmer
        w-full
        rounded-md
        bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.1)_37%,rgba(255,255,255,0.05)_63%)]
        bg-size-[1000px_100%]
      "
      style={{ height: `${height}px` }}
    ></div>
  );
};

export default DashboardPanelLoader;
