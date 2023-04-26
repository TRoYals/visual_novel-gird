import { useState } from "react";

type Props = {
  x: number;
  y: number;
};

const GridCell: React.FC<Props> = ({ x, y }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);

  const handleCellClick = () => {
    const input = prompt(`请输入 ${x + 1}-${y + 1} 格的内容：`);
    setSearchTerm(input || "");
  };

  const handleDownloadClick = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;

    const context = canvas.getContext("2d");
    context?.strokeRect(0, 0, 100, 100);
    // context?.font = "12px sans-serif";
    context?.fillText(`${x + 1}-${y + 1}: ${searchTerm}`, 5, 20);

    const imageDataURL = canvas.toDataURL();
    setImageData(imageDataURL);
  };

  const handleSaveClick = () => {
    if (imageData) {
      const blob = dataURItoBlob(imageData);
      saveAs(blob, `grid-${x + 1}-${y + 1}.png`);
    }
  };

  const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div
      className="w-24 h-24 bg-gray-200 border border-gray-400 relative"
      onClick={handleCellClick}
    >
      {searchTerm && <div className="absolute inset-0 bg-white opacity-75" />}
      {searchTerm && (
        <div className="absolute inset-0 flex items-center justify-center">
          {searchTerm}
        </div>
      )}
      {imageData && (
        <img src={imageData} className="mt-4" alt={`grid-${x + 1}-${y + 1}`} />
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute bottom-0 left-0 ml-2 mb-2"
        onClick={handleDownloadClick}
      >
        生成图像
      </button>
      {imageData && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute bottom-0 left-0 ml-2 mb-2"
          onClick={handleSaveClick}
        >
          保存图像
        </button>
      )}
    </div>
  );
};

function saveAs(blob: Blob, arg1: string) {
  throw new Error("Function not implemented.");
}

export default GridCell;
