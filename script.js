const imageList = document.querySelector(".image-list");
const btns = document.querySelectorAll(".view-options button");
const imageListItems = document.querySelectorAll(".image-list li"); // document 대신 imageList 사용해도 됨
const active = "active";
const listView = "list-view";
const gridView = "grid-view";
const dNone = "d-none";

// 1. 버튼 활성화

for (const btn of btns) {
    btn.addEventListener("click", function () {
        const parent = this.parentElement;

        // border 생성과 제거
        document.querySelector(".view-options .active").classList.remove(active);
        parent.classList.add(active);

        // .zoom 생성과 제거 & 보기방식 변경
        // contains('a') a를 가지고 있는지
        // previousElementSibling 형제요소 중 이전요소
        if (parent.classList.contains("show-list")) {
            parent.previousElementSibling.previousElementSibling.classList.add(dNone);
            imageList.classList.remove(gridView);
            imageList.classList.add(listView);
        } else {
            parent.previousElementSibling.classList.remove(dNone);
            imageList.classList.remove(listView);
            imageList.classList.add(gridView);
        }
    });
} // 각각의 btns을 btn라고 선언

// 2. 리스트 너비 조절 Range

// documentElement : html 자체
const rangeInput = document.querySelector('input[type="range"]');
rangeInput.addEventListener("input", function () {
    document.documentElement.style.setProperty("--minRangeValue", `${this.value}px`);
});
// input 대신 change 사용해도 됨
// 선택자.style.backgroundColor = 'blue';     ->     선택자.style.setProperty('backgroundColor' = 'blue');
// setProperty를 사용한 이유 : --minRangeValue는 내가 만든 이름이라서
// 문자열과 변수명을 함께 출력 this.value+'px'     ->     `${this.value}px`

// 3. 검색 키워드로 필터 적용

const captions = document.querySelectorAll(".image-list figcaption p:first-child");
const myArray = [];
let counter = 1; // nth-child()에 넣을 숫자라서 0부터 시작 안하고 1부터 시작

for (const caption of captions) {
    myArray.push({
        id: counter++,
        text: caption.textContent,
    }); // push 넣다
}
console.log(myArray);

const searchInput = document.querySelector('input[type="search"]');
const photosCounter = document.querySelector(".toolbar .counter span");

// keyup 사용자가 입력하고 키보드에서 손을 땠을 때
// keydown 사용자가 키보드를 눌렀을 때 (키보드를 쭉 누르고 있어도 한 번만 적용)
// keypress 사용자가 키보드를 눌렀을 때 (키보드를 쭉 누르고 있으면 계속 적용)
searchInput.addEventListener("keyup", keyupHandler);

// filter
var arr = [3, 15, 9, 20, 25];

/* var arr2 = arr.filter(function (n) {
    return n % 5 == 0;
}); // n은 arr 배열의 각각의 값 */

// 축약하면
/* var arr2 = arr.filter((n) => {
    return n % 5 == 0;
}); */

// 실행할 일이 return 하나밖에 없는 경우 중괄호 생략가능
var arr2 = arr.filter((n) => n % 5 == 0);

console.log(arr2);

function keyupHandler() {
    // 이미지 모두 제거
    for (const item of imageListItems) {
        item.classList.add(dNone);
    }

    // 키워드를 포함하는 이미지 필터링 (대소문자 구분)
    const keywords = this.value;
    // const filteredArray = myArray.filter((el) => el.text.includes(keywords));
    // n은 myArray 배열의 각각의 값
    // 대소문자 구분 안하게 하려면
    const filteredArray = myArray.filter((el) => el.text.toLowerCase().includes(keywords.toLowerCase()));
    console.log(filteredArray);

    if (filteredArray.length > 0) {
        for (const el of filteredArray) {
            document.querySelector(`.image-list li:nth-child(${el.id})`).classList.remove(dNone);
        }
    } // filteredArray.length > 0는 필터링 결과값이 있다는 의미

    // Total photos의 갯수 변경
    photosCounter.textContent = filteredArray.length;
}
