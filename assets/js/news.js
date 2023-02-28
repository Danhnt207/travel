fetch("./assets/data/news.json")
.then(function (response) {
    if (!response.ok) {
      throw new Error("Đã có lỗi xảy ra :" + response.status);
    }
    return response.json();
  })
  .then(function(news){
    // console.log(news)

    let listItem = news;
    let html = "";

    for(let item of listItem){
        // console.log(item.title)

        html +=`
            <div class="item">
                <div class="item__img">
                    <a href="#">
                    <img src="./assets/image/news/${item.image}" alt="">
                    </a>          
                </div>
                <div class="item__info">
                    <div class="item__info-title"> 
                        <a href="#">${item.title}</a>
                    </div>
                    <div class="content__info-type-date">
                        <a class="content__info-type" href="news.html">Tin tức du lịch</a>
                        <span class="item__info-date">${item.date}</span>
                    </div>
                    <p class="item__info-description">${item.description}</p>
                </div>                                      
            </div>                        
        `
    }
    document.getElementById("box__item--bottom").innerHTML = html;
  })
