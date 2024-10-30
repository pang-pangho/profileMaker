import { useRef, useState } from "react";
import domtoimage from "dom-to-image";
import "./mainPageStyle.scss";

export default function BusinessCardCreator() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [stack, setStack] = useState("");
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeUGzSUbfQVEgY4TH7CZEl14ED8WXrixgU9A&s"
  );
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

  // 모든 필드가 입력되었는지 확인하는 함수
  const isFormComplete = () => {
    return name && email && github && stack;
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
                  <img src={image} alt="Profile" />
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
        </div>
        {/* 다운로드 버튼을 카드 바깥에 위치 */}
        <div className="download-section">
          <button
            onClick={handleDownload}
            disabled={!isFormComplete()} // 모든 필드가 입력되지 않으면 비활성화
            className={`download-button ${isFormComplete() ? "" : "disabled"}`}
          >
            다운로드
          </button>
        </div>
      </main>
    </div>
  );
}
