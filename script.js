const serviceName = "만화보기";
let isSubscribed = false;
let submitCount = 0;

console.log(typeof serviceName);
console.log(typeof isSubscribed);
console.log(typeof submitCount);

function makeSubscribeMessage(email, subscribed) {
    if (subscribed == true) {
        return email + "로 신청이 완료되었습니다.";
    }

    return "이메일을 입력한 뒤 신청해주세요.";
}

const subscribeForm = document.querySelector('#subscribe-form');
const emailInput = document.querySelector('#email');
const subscribeButton = document.querySelector('#subscribe-btn');
const subscribeMessage = document.querySelector('#subscribe-msg');

function handleSubscribe(event) {
    event.preventDefault();

    const subscriberEmail = emailInput.value.trim();

    if (subscriberEmail === "") {
        subscribeMessage.textContent =
            "이메일을 입력한 뒤 신청해주세요.";
        emailInput.focus();
        return;
    }

    isSubscribed = true;
    submitCount += 1;
    
    subscribeMessage.textContent =
        makeSubscribeMessage(subscriberEmail, isSubscribed);

        subscribeMessage.classList.add("is-success");

    subscribeButton.textContent = "신청 완료";
    subscribeButton.disabled = true;
}

subscribeForm.addEventListener("submit", handleSubscribe);

function handleEmailInput() {
    if (!isSubscribed) {
        return;
    }

    isSubscribed = false;
    subscribeMessage.textContent = "이메일을 입력한 뒤 신청해주세요.";
    subscribeMessage.classList.remove("is-success");
    subscribeButton.textContent = "만화 소식 신청하기";
    subscribeButton.disabled = false;
}

emailInput.addEventListener("input", handleEmailInput);

const themeButton = document.querySelector("#theme-btn");
const nicknameInput = document.querySelector("#nickname");
const nicknameCount = document.querySelector("#nickname-cnt");
const agreeCheck = document.querySelector("#agree-chk");
const agreeMessage = document.querySelector("#agree-msg");
const startButton = document.querySelector("#start-btn");

function handleThemeClick() {
    const isDark = document.body.classList.toggle("dark");
    
    themeButton.textContent = isDark ? "라이트 테마로 바꾸기" : "다크 테마로 바꾸기";
}

themeButton.addEventListener("click", handleThemeClick);

function handleNicknameInput() {
    const maxLength = nicknameInput.maxLength;
    const currentLength = Math.min(nicknameInput.value.length, maxLength);
    nicknameCount.textContent = currentLength + " / " + maxLength;
}

nicknameInput.addEventListener("input", handleNicknameInput);

function handleAgreeChange() {
    const agreed = agreeCheck.checked;

    startButton.disabled = !agreed;
    agreeMessage.textContent = agreed 
    ? "만화를 볼 수 있습니다." 
    : "동의 후 만화를 볼 수 있습니다.";

    if (agreed) {
        agreeMessage.classList.add("is-ready");
    } else {
        agreeMessage.classList.remove("is-ready");
    }
}

agreeCheck.addEventListener("change", handleAgreeChange);

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function resetTabsAndPanels() {
    tabs.forEach((tab) => {
        tab.classList.remove("is-active");
        tab.setAttribute("aria-selected", "false");
    });

    panels.forEach((panel) => {
        panel.classList.remove("is-active");
        panel.hidden = true;
    });
}

function activateTab(clickedTab) {
    const targetSelector = clickedTab.dataset.target;
    const targetPanel = document.querySelector(targetSelector);

    clickedTab.classList.add("is-active");
    clickedTab.setAttribute("aria-selected", "true");

    targetPanel.classList.add("is-active");
    targetPanel.hidden = false;
}

function handleTabClick(event) {
    resetTabsAndPanels();
    activateTab(event.currentTarget);
}

tabs.forEach((tab) => {
    tab.addEventListener("click", handleTabClick);
});

const readingFlow = document.querySelector("#reading-flow");
const flowSteps = readingFlow.querySelectorAll(".step");
const progressItems = readingFlow.querySelectorAll(".progress__item");
const titleInput = document.querySelector("#comic-title");
const titleError = document.querySelector("#title-error");
const titleNext = document.querySelector("#title-next");
const chapterRange = document.querySelector("#chapter-range");
const chapterValue = document.querySelector("#chapter-value");
const bookmarkOption = document.querySelector("#bookmark-option");
const genreOptions = document.querySelector("#genre-options");
const optionPrev = document.querySelector("#option-pre");
const optionNext = document.querySelector("#option-next");
const summaryTitle = document.querySelector("#summary-title");
const summaryChapter = document.querySelector("#summary-chapter");
const summaryBookmark = document.querySelector("#summary-bookmark");
const summaryGenre = document.querySelector("#summary-genre");
const summaryPrev = document.querySelector("#summary-prev");
const finishButton = document.querySelector("#finish-button");
const restartButton = document.querySelector("#restart-button");
const formData = {
    title: "",
    chapters: "3",
    bookmark: false,
    genreCount: "0"
};

function showStep(index) {
    flowSteps.forEach((step, i) => {
        step.hidden = i !== index;
    });

    progressItems.forEach((item, i) => {
        item.classList.toggle("is-active", i === index);
    });
}

const readingDialog = document.querySelector("#reading-dialog");
const readingCancel = document.querySelector("#reading-cancel");
const readingConfirm = document.querySelector("#reading-confirm");

function revokeReadingAgreement() {
    agreeCheck.checked = false;
    readingFlow.hidden = true;
    handleAgreeChange();
    agreeCheck.focus();
}

startButton.addEventListener("click", () => {
    if (!agreeCheck.checked) return;
    readingDialog.showModal();
});

readingCancel.addEventListener("click", () => {
    readingDialog.close();
    revokeReadingAgreement();
});

readingDialog.addEventListener("cancel", revokeReadingAgreement);

readingConfirm.addEventListener("click", () => {
    if (!agreeCheck.checked) return;
    readingDialog.close();
    readingFlow.hidden = false;
    showStep(0);
    readingFlow.scrollIntoView({ behavior: "smooth" });
    titleInput.focus();
});

function validateTitle() {
    const value = titleInput.value.trim();

    if (!value) {
        titleError.textContent = "만화 제목을 입력해 주세요.";
        titleInput.classList.add("has-error");
        titleInput.focus();
        return false;
    }

    titleError.textContent = "";
    titleInput.classList.remove("has-error");
    formData.title = value;
    return true;
}

titleNext.addEventListener("click", () => {
    if (!validateTitle()) return;

    showStep(1);
});

chapterRange.addEventListener("input", () => {
    chapterValue.value = chapterRange.value + "화";
});

bookmarkOption.addEventListener("change", () => {
    genreOptions.hidden = !bookmarkOption.checked;
});

optionPrev.addEventListener("click", () => showStep(0));

optionNext.addEventListener("click", () => {
    formData.chapters = chapterRange.value;
    formData.bookmark = bookmarkOption.checked;

    const count = genreOptions.querySelectorAll("input:checked");
    formData.genreCount = formData.bookmark ? String(count.length) : "0";

    summaryTitle.textContent = formData.title;
    summaryChapter.textContent = formData.chapters + "화";
    summaryBookmark.textContent = formData.bookmark ? "사용" : "미사용";
    summaryGenre.textContent = formData.bookmark ? formData.genreCount + "개 장르" : "없음";

    showStep(2);
});

summaryPrev.addEventListener("click", () => showStep(1));

finishButton.addEventListener("click", () => showStep(3));

restartButton.addEventListener("click", () => {
    formData.title = "";
    formData.chapters = "3";
    formData.bookmark = false;
    formData.genreCount = "0";

    titleInput.value = "";
    titleError.textContent = "";
    titleInput.classList.remove("has-error");

    chapterRange.value = "3";
    chapterValue.value = "3화";
    bookmarkOption.checked = false;
    genreOptions.hidden = true;
    genreOptions.querySelectorAll("input").forEach((input) => {
        input.checked = false;
    });

    summaryTitle.textContent = "";
    summaryChapter.textContent = "";
    summaryBookmark.textContent = "";
    summaryGenre.textContent = "";

    showStep(0);
});

