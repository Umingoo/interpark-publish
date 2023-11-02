window.addEventListener("load", function () {
  const fileName = "ticket.json";

  // 외부 데이터 가져올때 작성법
  const xhr = new XMLHttpRequest();

  xhr.open("GET", fileName);
  xhr.send();
  xhr.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      const json = JSON.parse(res);
      makeHtmlTag(json);
      // console.log(json);
    }
  };

  function makeHtmlTag(_res) {
    let htmlTicketTag = ``;
    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["ticket_" + index];
      // console.log(index);

      const tempTag = `
      <div class="swiper-slide">
        <div class="ticket-slide-item">
          <a href="${obj.url}" class="ticket-link">
            <div class="ticket-img">
              <img src="${obj.image}" alt="${obj.title}" />
            </div>
            <div>
              <span class="rank">${obj.rank}</span>
            </div>
            <div class="ticket-info">
              <ul class="ticket-good-list">
                <li>
                  <span class="ticket-info-desc">
                  ${obj.title}
                    <b>${obj.place}</b>
                    <p>${obj.date}</p>
                  </span>
                </li>
                <li>
                  <p class="ticket-seat">${obj.option}</p>
                </li>
              </ul>
            </div>
          </a>
        </div>
      </div>
    `;
      htmlTicketTag += tempTag;
    }
    showHtmlTag(htmlTicketTag);
  }
  function showHtmlTag(_html) {
    const ticketSlide = ".ticket-slide .swiper-wrapper";
    const tag = document.querySelector(ticketSlide);
    tag.innerHTML = _html;
    makeSwiper();
  }
  function makeSwiper() {
    const swiperTicket = new Swiper(".ticket-slide", {
      slidesPerView: 4,
      spaceBetween: 28,
      navigation: {
        nextEl: ".ticket-slide-wrap .slide-next-bt",
        prevEl: ".ticket-slide-wrap .slide-prev-bt",
      },
      // 4장씩 이동하라.
      slidesPerGroup: 4,
    });
  }
});
