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
    agreeMessage.textContent = agreed ? "만화를 볼 수 있습니다." : "동의 후 만화를 볼 수 있습니다.";

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