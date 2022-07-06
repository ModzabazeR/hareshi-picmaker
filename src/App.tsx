import defaultpic from "./img/default.png";
import logoWhite from "./img/logo_white.png";
import logoBlack from "./img/logo_black.png";
import { useState, useEffect, useRef } from "react";

function App() {
  const DEFAULT_TITLE = "ชื่อตอน/ชื่อกระทู้";
  const DEFAULT_SUBTITLE = "รายละเอียด/คำโปรย";

  const [currentImg, setCurrentImg] = useState(defaultpic);
  const [previewImg, setPreviewImg] = useState(defaultpic);

  const imgRef = useRef<HTMLImageElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [subtitle, setSubtitle] = useState(DEFAULT_SUBTITLE);
  const [logoStyle, setLogoStyle] = useState(logoWhite);

  const handlePreview = () => {
    const img = imgRef.current;
    const logo = logoRef.current;
    const canvas = canvasRef.current;
    if (img && canvas && logo) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // init canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // logo
        ctx.drawImage(logo, 30, 30, 268.8, 75.6);

        // title
        ctx.textBaseline = "bottom";
        ctx!.font = "bold 72px DBHelvaticaX";
        ctx.fillStyle = "#fff";
        const width1 = ctx.measureText(title).width;
        ctx.fillRect(90, 444, width1+40, 88);
        ctx.fillStyle = "#000";
        ctx.fillText(title, 110, 530);

        // subtitle
        ctx!.font = "bold 94px DBHelvaticaX";
        ctx.fillStyle = "#FF769D";
        const width2 = ctx.measureText(subtitle).width;
        ctx.fillRect(90, 544, width2+40, 115);
        ctx.fillRect(60, 444, 10, 215);
        ctx.fillStyle = "white";
        ctx.fillText(subtitle, 110, 655);
        

        const dataURL = canvas.toDataURL("image/png");
        setPreviewImg(dataURL);
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrentImg(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = new Image();
    img.src = defaultpic
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-center lg:h-screen m-8">
      <div className="font font-bold hidden">ทดสอบ</div>
      <img src={logoStyle} className="hidden" ref={logoRef} />
      <main className="max-w-screen-md space-y-4 p-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">สร้างปกกระทู้สไตล์ฮาเรชิ</h1>
        <h2>{"(ฟอนต์ไม่ขึ้นลองกด preview ใหม่)"}</h2>

        <input type="file" onChange={handleChange} />

        <div className="flex justify-between">
          <label>หัวข้อใหญ่: </label>
          <input
            type="text"
            className="text-center text-black w-1/2 rounded-md"
            placeholder={DEFAULT_TITLE}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <label>รายละเอียด: </label>
          <input
            type="text"
            className="text-center text-black w-1/2 rounded-md"
            placeholder={DEFAULT_SUBTITLE}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <label>เลือกสไตล์โลโก้: </label>
          <select className="w-1/2 text-center rounded-md" onChange={() => {
            logoStyle === logoWhite ? setLogoStyle(logoBlack) : setLogoStyle(logoWhite);
          }}>
            <option>ขาว</option>
            <option>ดำ</option>
          </select>
        </div>

        <img
          src={currentImg}
          className="hidden"
          ref={imgRef}
          crossOrigin="anonymous"
          onLoad={handlePreview}
        />
        <canvas className="hidden" width={1280} height={720} ref={canvasRef}></canvas>
        <img className="w-full" src={previewImg} alt="ไม่สามารถโหลดภาพได้" />

        <div className="w-full flex justify-between">
        <button
            type="submit"
            className="rounded-md bg-white text-black py-2 px-4 hover:bg-slate-200 w-1/3"
            onClick={handlePreview}
          >
            Preview
          </button>
          <a
            className="rounded-md bg-white text-black py-2 px-4 hover:bg-slate-200 w-1/3"
            href={previewImg}
            download="thumbnail.png"
          >
            Download
          </a>
        </div>
      </main>
    </div>
  );
}

export default App;
