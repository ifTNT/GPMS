var bell = document.querySelector(".bell")
var counter = bell.querySelector(".notifyCounter")
var notifyPlace = bell.querySelector(".notify")

function getData(uid) {
    // Default options are marked with *
    return fetch('/ics/notification/getNotification/' + uid, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
        .then(response => {
            var ctr = 0;
            data.notifications.forEach(element => {
                if (element.read = false) {
                    var path = document.createElement("li");
                    path.textContent = element.content;
                    notifyPlace.appendChild(path);
                    ctr += 1;
                    counter.textContent = ctr;
                }else{
                    var path = document.createElement("li");
                    path.textContent = element.content;
                    notifyPlace.appendChild(path);
                }
            });
        }) // 輸出成 json
}

bell.querySelector("img").addEventListener("click",()=>{
    if(notifyPlace.style.display == "none"){
        notifyPlace.style.display = 'block';
    }else{
        notifyPlace.style.display = 'none';
    }
})

