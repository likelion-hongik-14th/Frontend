const infoDisplay = document.querySelector("#info-display");

const aboutBtn = document.querySelector("#menu-about");
const contactBtn = document.querySelector("#menu-contact");
const profileBtn = document.querySelector("#menu-profile");

aboutBtn.addEventListener("click", () => {
  infoDisplay.style.display = "block";
  infoDisplay.innerHTML = "<h3>About</h3><p>영상애니메이션과 컴퓨터공학을 전공하고 있습니다<br> 영상과 기술을 융합하는 개발자가 되고 싶어용</p>";
});

contactBtn.addEventListener("click", () => {
  infoDisplay.style.display = "block";
  infoDisplay.innerHTML = "<h3>Contact</h3><p>인스타: _ideal_bin<br>전화번호: 010-9916-2561</p>";
});

profileBtn.addEventListener("click", () => {
  infoDisplay.style.display = "block";
  infoDisplay.innerHTML = "<h3>Profile</h3><p>• 멋쟁이사자처럼 14기 프론트엔드<br>• 영상 편집 관련 툴 사용 가능<br>• 개발은 완전 초보이지만.. 열심히 하겠습니다</p>";
});