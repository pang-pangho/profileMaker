import { useRef, useState } from "react";
import domtoimage from "dom-to-image";
import "./mainPageStyle.scss";

export default function BusinessCardCreator() {
  const [name, setName] = useState("김광호");
  const [email, setEmail] = useState("day_adm@naver.com");
  const [github, setGithub] = useState("http");
  const [stack, setStack] = useState("React");
  const [image, setImage] = useState("/placeholder.svg?height=100&width=100");
  const cardRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (cardRef.current) {
      domtoimage.toPng(cardRef.current).then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "business_card.png";
        link.click();
      });
    }
  };
  return (
    <div className="business-card-creator">
      <header>
        <h1>명함제작소</h1>
      </header>

      <main className="main-content">
        <div className="card" ref={cardRef}>
          <div className="card-content">
            <div className="profile-image">
              <div className="image-wrapper">
                {image ? (
                  <img src={image} alt="" />
                ) : (
                  <div className="placeholder" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="name">이름</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
              />
            </div>
            <div className="input-group">
              <label htmlFor="github">깃허브</label>
              <input
                id="github"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/username"
              />
            </div>
            <div className="input-group">
              <label htmlFor="stack">기술 스택</label>
              <input
                id="stack"
                value={stack}
                onChange={(e) => setStack(e.target.value)}
                placeholder="React, Node.js, Python"
              />
            </div>
          </div>
          <div className="card-footer">
            <button onClick={handleDownload}>다운로드</button>
          </div>
        </div>
      </main>
    </div>
  );
}
