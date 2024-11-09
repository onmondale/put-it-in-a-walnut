"use client";
import "./styles/Styles.css";
import MightyTree from "./assets/MightyTree.svg";
import Mascot from "./components/Mascot";
import { useState } from "react";
import Walnut from "./components/Walnut";
import WalnutModal from "./components/WalnutModal";

export default function Home() {
  const [mascotMode, setMascotMode] = useState<
    "hello" | "down" | "standard" | "whisper"
  >("hello");
  const [mascotMessage, setMascotMessage] = useState(
    "hello hello. please provide me with your message and i will help you put it in a walnut"
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [walnutSize, setWalnutSize] = useState(0);
  const [walnutText, setWalnutText] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = () => {
    setIsProcessing(true);
    setWalnutText(textareaValue);

    // down mode with processing message
    setMascotMode("down");
    setMascotMessage(". . . . . . ");

    // hange to standard mode
    setTimeout(() => {
      setMascotMode("standard");
      setMascotMessage("ok im gonna tell the tree");
    }, 4000);

    // change to whisper mode and move to tree
    setTimeout(() => {
      setMascotMode("whisper");
      setMascotMessage(". . . . . . ");
      document
        .querySelector(".mascot-wrapper")
        ?.classList.add("mascot-by-tree");
    }, 8000);

    // start growing the walnut and return mascot to original position
    setTimeout(() => {
      setMascotMode("standard");
      setMascotMessage(
        "ok she said the walnut is gonna take a sec to grow but once its ready you can click on it to look at it closer"
      );
      document
        .querySelector(".mascot-wrapper")
        ?.classList.remove("mascot-by-tree");

      // grow the walnut
      setWalnutSize(0);
      setTimeout(() => {
        setWalnutSize(100);
      }, 4000);
    }, 15000);
  };

  const handleReset = () => {
    setModalOpen(false);
    setWalnutSize(0);
    setWalnutText("");
    setTextareaValue("");
    setMascotMode("hello");
    setMascotMessage(
      "hello hello. please provide me with your message and i will help you put it in a walnut"
    );
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="horizon-container" />
      <div className="flex items-center justify-start absolute top-[37%] -translate-y-1/2 w-full pl-[5%]">
        <div className="flex flex-col w-[50%]">
          <h1 className="title">
            put it in a <br /> &nbsp; walnut
          </h1>
          <div className="relative mascot-wrapper mt-[20px]">
            <Mascot
              mode={mascotMode}
              width="110px"
              height="110px"
              className="mascot-container mb-[-10px]"
              message={mascotMessage}
            />
          </div>
          <textarea
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            disabled={isProcessing}
            className={`bg-black border p-4 mb-[-1px] h-[200px] resize-none ${
              isProcessing
                ? "opacity-50 cursor-not-allowed text-black "
                : "border-white text-white"
            }`}
            placeholder="type your message here...."
          />
          <button
            onClick={handleSubmit}
            disabled={isProcessing}
            className={`bg-black border border-white py-5 px-4 transition-colors submit-button ${
              isProcessing
                ? "opacity-50 cursor-not-allowed "
                : "hover:submit-button-hover"
            }`}
          >
            give your message to the mighty tree
          </button>
        </div>
      </div>
      <div className="absolute bottom-[20vh] left-2/3 w-[50%]">
        <MightyTree width="45%" height="45%" className="mighty-tree" />
        {walnutText && (
          <div className="absolute top-[41.5%] left-[21%] origin-top">
            <div onClick={() => walnutSize === 100 && setModalOpen(true)}>
              <Walnut
                seed={walnutText}
                width={100}
                height={100}
                className={`grow-animation cursor-pointer scale-${walnutSize}`}
              />
            </div>
          </div>
        )}
      </div>
      {modalOpen && (
        <WalnutModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onReset={handleReset}
          seed={walnutText}
        />
      )}
    </div>
  );
}