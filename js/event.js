window.addEventListener("load", function () {
  const fileName = "event.json";

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
    let htmlEventTag = ``;

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      // console.log(index);
      const obj = _res["event_" + index];
      // console.log(obj);

      const tempTag = `
      <div class="swiper-slide">
      <div class="event-slide-item">
          <a href="${obj.url}" class="event-link">
              <div class="event-img">
                  <img src="${obj.image}" alt="${obj.image}" />
              </div>
          </a>
      </div>
  </div>
        `;
      // console.log(tempTag);
      htmlEventTag += tempTag;
      // console.log("check" + htmleventTag);
    }
    showHtmlTag(htmlEventTag);
  }
  function showHtmlTag(_html) {
    // console.log(_html);
    const eventSlide = ".event-slide .swiper-wrapper";
    const tag = document.querySelector(eventSlide);
    // console.log(tag);

    tag.innerHTML = _html;
    // console.log(tag.innerHTML);

    makeSwiper();
  }

  function makeSwiper() {
    // 4. swiper 작동시킨다.
    const swiperevent = new Swiper(".event-slide", {
      slidesPerView: 4,
      spaceBetween: 27,
      // 좌측, 우측 이동 버튼
      navigation: {
        nextEl: ".event-slide-wrap .slide-next-bt",
        prevEl: ".event-slide-wrap .slide-prev-bt",
      },
      // 4장씩 이동하라.
      slidesPerGroup: 4,
    });
  }
  // 3. swiper 태그에 백틱을 배치한다.
  // const eventSlide = `.event-slide .slide-wrap`;
});
