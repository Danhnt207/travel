fetch("./assets/data/about_us.json")
.then(function(response){
    if (!response.ok) {
        throw new Error("HTTP error, status = " +
        response.status)
    }
    return response.json();
})
.then(function(about_us){
    let contentList = about_us;
    let html = "";
    for (let content of contentList){
        html += `
        <div class="content">
        <div class="list-content">
                <span class="content-title">${content.title}</span>  
                <p>${content.content}</p>       
            </div>
        </div>
`;
    }
    document.getElementById('content').innerHTML=html;
});