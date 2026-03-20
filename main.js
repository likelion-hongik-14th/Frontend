const contactDisplay = document.querySelector("#contact");

contactDisplay.addEventListener("click", () => {
  contactDisplay.textContent = "010-5133-6001로 연락하기";
});

const profileImg = document.querySelector("#minjun-band");

profileImg.addEventListener("click", () => {
  profileImg.src = "./IMG_6127.jpeg";
});

const navAbout = document.querySelector("#nav-about");
const navContacts = document.querySelector("#nav-contacts");
const navProfile = document.querySelector("#nav-profile");
const savebut = document.querySelector("#save-button");

navAbout.addEventListener("click", () => {
  alert("제가 만든 자기소개 페이지입니다.");
});

navContacts.addEventListener("click", () => {
  alert("하단의 연락처 버튼을 누르거나 010-5133-6001로 연락하기");
});

navProfile.addEventListener("click", () => {
  alert("사진 왼쪽 아래에 있음");
});

savebut.addEventListener("click", () => {
  alert("당신의 이름이 기록되었습니다.");
});
