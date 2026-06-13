interface DataVizProps {
  src: string;
  title?: string;
  height?: number;
}

export default function DataViz({ src, title = "Interactive chart", height = 500 }: DataVizProps) {
  return (
    <figure className="my-8 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
      <iframe
        src={src}
        title={title}
        width="100%"
        height={height}
        frameBorder="0"
        scrolling="no"
        style={{ display: "block" }}
        allowFullScreen
      />
    </figure>
  );
}
