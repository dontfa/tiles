function getDataFromServer(){
    //alert("getDataFromServer");
    const h3 = document.querySelector("h3")

    fetch('http://localhost:3000/rn')
        .then(resp => resp.text())
        .then(text => {
            h3.innerText = "Hello from Tiles 2 & " + text;
        })
        .catch(err => console.log("Error:: " + err));
}

function main(){

    const btn1 = document.querySelector("#btn1");
    btn1.onclick = getDataFromServer;


}

main()