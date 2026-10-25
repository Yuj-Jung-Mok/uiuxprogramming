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

    resetCollection();

    showStep(0);
});


// 중간고사 추가 기능: 내 장르 만화 모아보기와 즐겨찾기
const completeMessage = document.querySelector("#complete-msg");
const collectionOpen = document.querySelector("#collection-open");
const collectionBack = document.querySelector("#collection-back");
const genreScopeMessage = document.querySelector("#genre-scope-msg");
const genrePickButton = document.querySelector("#genre-pick-btn");
const comicSearchForm = document.querySelector("#comic-search-form");
const comicSearch = document.querySelector("#comic-search");
const resultMessage = document.querySelector("#result-msg");
const noResult = document.querySelector("#no-result");
const noResultMessage = document.querySelector("#no-result-msg");
const searchClear = document.querySelector("#search-clear");
const searchAll = document.querySelector("#search-all");
const comicCards = document.querySelectorAll(".comic-card");
const favoriteButtons = document.querySelectorAll(".favorite-btn");
const favoriteCount = document.querySelector("#favorite-count");
const favoriteList = document.querySelector("#favorite-list");
const favoriteMessage = document.querySelector("#favorite-msg");
const removeDialog = document.querySelector("#remove-dialog");
const removeMessage = document.querySelector("#remove-msg");
const removeCancel = document.querySelector("#remove-cancel");
const removeConfirm = document.querySelector("#remove-confirm");
const maxFavorites = 3;
const defaultCompleteText = completeMessage.textContent;
let showAllGenres = false;
let removeTarget = null;

// 7주차 2단계에서 책갈피와 함께 고른 장르 이름을 " · "로 이어 붙인다.
function getMyGenreText() {
    let text = "";

    if (!formData.bookmark) return text;

    genreOptions.querySelectorAll("input:checked").forEach((input) => {
        text += (text ? " · " : "") + input.value;
    });

    return text;
}

function updateGenreScope() {
    const myGenres = getMyGenreText();

    genrePickButton.hidden = myGenres !== "";
    genreScopeMessage.classList.toggle("is-notice", myGenres === "");

    if (!myGenres) {
        showAllGenres = true;
        genreScopeMessage.textContent = "선택한 즐겨찾기 장르가 없어 전체 장르의 만화를 보여 줍니다. 장르를 고르면 내 장르만 모아 볼 수 있습니다.";
        return;
    }

    genreScopeMessage.textContent = showAllGenres
        ? "전체 장르에서 찾은 결과입니다. 검색어를 지우면 내 장르로 돌아갑니다."
        : "선택한 장르(" + myGenres + ")의 만화를 보여 줍니다.";
}

// 새로 검색하거나 검색어를 지우면 다시 내 장르 범위에서 보여 준다.
function showMyGenres() {
    showAllGenres = false;
    updateGenreScope();
    return updateComicList();
}

function updateComicList() {
    const keyword = comicSearch.value.trim();
    let count = 0;

    comicCards.forEach((card) => {
        const genreInput = document.querySelector("#genre-" + card.dataset.genre);
        const inGenre = showAllGenres || genreInput.checked;
        const matched = card.dataset.title.includes(keyword);

        card.hidden = !(inGenre && matched);

        if (!card.hidden) {
            count += 1;
        }
    });

    noResult.hidden = count > 0;

    if (count === 0) {
        resultMessage.textContent = "";
        noResultMessage.textContent = showAllGenres
            ? "'" + keyword + "'에 맞는 만화가 없습니다. 검색어를 바꾸거나 지워 주세요."
            : "내 장르에는 '" + keyword + "'에 맞는 만화가 없습니다. 검색어를 지우거나 전체 장르에서 찾아 보세요.";
        searchAll.hidden = showAllGenres;
        return;
    }

    resultMessage.textContent = keyword
        ? "'" + keyword + "' 검색 결과 " + count + "개 작품"
        : (showAllGenres ? "전체 장르" : "내 장르") + " 작품 " + count + "개";

    return count;
}

function updateFavoriteSummary() {
    let names = "";
    let count = 0;

    comicCards.forEach((card) => {
        if (!card.classList.contains("is-favorite")) return;

        count += 1;
        names += (names ? ", " : "") + card.dataset.title;
    });

    favoriteCount.textContent = count + " / " + maxFavorites + "개";
    favoriteList.textContent = names || "아직 담은 만화가 없습니다. 마음에 드는 작품의 '즐겨찾기 담기'를 눌러 보세요.";

    return count;
}

function setFavorite(card, isFavorite) {
    const button = card.querySelector(".favorite-btn");

    card.classList.toggle("is-favorite", isFavorite);
    button.textContent = isFavorite ? "즐겨찾기 빼기" : "즐겨찾기 담기";
    button.setAttribute("aria-pressed", String(isFavorite));
    updateFavoriteSummary();
}

function showFavoriteMessage(text, state) {
    favoriteMessage.textContent = text;
    favoriteMessage.classList.toggle("is-success", state === "success");
    favoriteMessage.classList.toggle("is-warning", state === "warning");
}

function resetCollection() {
    showAllGenres = false;
    removeTarget = null;
    comicSearch.value = "";
    noResult.hidden = true;
    resultMessage.textContent = "";
    comicCards.forEach((card) => setFavorite(card, false));
    showFavoriteMessage("", "");
    completeMessage.textContent = defaultCompleteText;
}

// 모아보기는 항상 내 장르부터 보여 주고, 검색어와 즐겨찾기는 그대로 유지한다.
collectionOpen.addEventListener("click", () => {
    showMyGenres();
    updateFavoriteSummary();
    showStep(4);
    comicSearch.focus();
});

// 값은 그대로 둔 채 7주차 2단계(읽기 조건)로 돌아가 장르를 고르게 한다.
genrePickButton.addEventListener("click", () => {
    showStep(1);
    bookmarkOption.focus();
});

function handleComicSearch(event) {
    event.preventDefault();

    const count = showMyGenres();

    // 검색어 없이 검색하면 목록은 그대로 보여 주고, 무엇을 입력할지 안내한다.
    if (comicSearch.value.trim() === "") {
        resultMessage.textContent = "검색어가 비어 있어 작품 " + count + "개를 모두 보여 줍니다. 찾을 작품 이름을 입력해 주세요.";
        comicSearch.focus();
    }
}

comicSearchForm.addEventListener("submit", handleComicSearch);

searchClear.addEventListener("click", () => {
    comicSearch.value = "";
    showMyGenres();
    comicSearch.focus();
});

searchAll.addEventListener("click", () => {
    showAllGenres = true;
    updateGenreScope();
    updateComicList();
});

function handleFavoriteClick(event) {
    const card = document.querySelector(event.currentTarget.dataset.target);
    const title = card.dataset.title;

    if (card.classList.contains("is-favorite")) {
        removeTarget = card;
        removeMessage.textContent = "'" + title + "'을(를) 즐겨찾기에서 빼면 내 즐겨찾기 목록에서 사라집니다.";
        removeDialog.showModal();
        return;
    }

    if (updateFavoriteSummary() >= maxFavorites) {
        showFavoriteMessage("즐겨찾기는 최대 " + maxFavorites + "개까지 담을 수 있습니다. 다른 작품을 빼고 다시 담아 주세요.", "warning");
        return;
    }

    setFavorite(card, true);
    showFavoriteMessage("'" + title + "'을(를) 즐겨찾기에 담았습니다.", "success");
}

favoriteButtons.forEach((button) => {
    button.addEventListener("click", handleFavoriteClick);
});

function keepFavorite() {
    if (!removeTarget) return;

    showFavoriteMessage("'" + removeTarget.dataset.title + "'을(를) 즐겨찾기에 그대로 두었습니다.", "");
    removeTarget.querySelector(".favorite-btn").focus();
    removeTarget = null;
}

removeCancel.addEventListener("click", () => {
    removeDialog.close();
    keepFavorite();
});

removeDialog.addEventListener("cancel", keepFavorite);

removeConfirm.addEventListener("click", () => {
    removeDialog.close();
    setFavorite(removeTarget, false);
    showFavoriteMessage("'" + removeTarget.dataset.title + "'을(를) 즐겨찾기에서 뺐습니다.", "");
    removeTarget.querySelector(".favorite-btn").focus();
    removeTarget = null;
});

collectionBack.addEventListener("click", () => {
    const count = updateFavoriteSummary();

    completeMessage.textContent = count > 0
        ? "즐겨찾기에 " + count + "개 작품을 담았습니다. 더 둘러보거나 다시 설정할 수 있습니다."
        : "아직 즐겨찾기에 담은 작품이 없습니다. 내 장르 만화를 다시 둘러볼 수 있습니다.";
    showStep(3);
    collectionOpen.focus();
});
