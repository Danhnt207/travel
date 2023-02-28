fetch("./assets/data/promotion.json")
.then(function(response){
    if (!response.ok) {
        throw new Error("HTTP error, status = " +
        response.status)
    }
    return response.json();
})
.then(function(promotion){
    let contentList = promotion;
    let html = "";
    for (let content of contentList){
        html += `
        <div class="list-content">
                <div class="list-img">
                    <img src="./assets/image/promotion/${content.image}" alt="">
                </div>
                <div class="content-description">
                    <span class="des-title">${content.title}</span>  
                    <p>${content.description}</p>
                    <p>Thời gian áp dụng: ${content.date}</p>  
                </div>      
            </div>
`;
    }
    document.getElementById('content').innerHTML=html;
});