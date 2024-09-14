/* eslint-disable react/prop-types */
const DesktopImageCard = ({ image }) => {
  return (
    <div className="rounded shadow-lg mt-2 mx-auto">
      <div className="h-60">
        <img
          src={image.url}
          alt={image.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="pl-4 py-2">
        <p className="text-gray-700 text-sm">{image.name}</p>
        {/* Download button */}
        <a
          href={image.url}
          download={image.name}
          className="text-blue-500 text-sm hover:underline"
        >
          Download
        </a>
      </div>
    </div>
  );
};

export default DesktopImageCard;
