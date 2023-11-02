window.addEventListener("load", function () {
  console.log("투어상품");

  // 추천 상품 슬라이드 기능
  // 글로써 코딩 시나리오 작성 : 의사코드
  // 1. 외부 데이터를 불러온다.

  const fileName = "tour.json";

  // 외부 데이터 가져올때 작성법
  const xhr = new XMLHttpRequest();

  xhr.open("GET", fileName);
  xhr.send();

  xhr.onreadystatechange = function (event) {
    // console.log("투어");
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      const json = JSON.parse(res);
      // console.log(json);
      makeHtmlTag(json);
    }
  };

  // 2. html 태그를 백틱을 이용해서 만든다.
  function makeHtmlTag(_res) {
    // console.log(_res);
    let htmlTourTag = ``;

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      // console.log(index);
      const obj = _res["tour_" + index];
      // console.log(obj);

      const tempTag = `
      <div class="swiper-slide">
      <div class="tour-slide-item">
        <a href="${obj.url}" class="tour-link">
          <div class="tour-img">
            <img src="${obj.image}" alt="${obj.place}" />
          </div>
          <div class="tour-info">
            <ul class="tour-good-list">
              <li>
                <span class="tour-good-info-desc">
                  <em>${obj.title}</em>
                  <p>
                  ${obj.place}
                  </p>
                  <b>${obj.price}</b>
                  원~
                </span>
              </li>
            </ul>
          </div>
          <button class="tour-plus">${obj.event}</button>
        </a>
      </div>
    </div>
      `;
      // console.log(tempTag);
      htmlTourTag += tempTag;
      // console.log("check" + htmlTourTag);
    }
    showHtmlTag(htmlTourTag);
  }
  function showHtmlTag(_html) {
    // console.log(_html);
    const tourSlide = ".tour-slide .swiper-wrapper";
    const tag = document.querySelector(tourSlide);
    // console.log(tag);

    tag.innerHTML = _html;
    // console.log(tag.innerHTML);

    makeSwiper();
  }

  function makeSwiper() {
    // 4. swiper 작동시킨다.
    const swiperTour = new Swiper(".tour-slide", {
      slidesPerView: 3,
      spaceBetween: 26,
      // 좌측, 우측 이동 버튼
      navigation: {
        nextEl: ".tour-slide-wrap .slide-next-bt",
        prevEl: ".tour-slide-wrap .slide-prev-bt",
      },
      // 4장씩 이동하라.
      slidesPerGroup: 3,
    });
  }
  // 3. swiper 태그에 백틱을 배치한다.
  // const tourSlide = `.tour-slide .slide-wrap`;
});
