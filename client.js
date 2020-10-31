const tiles = [];
let idTile = 0;
let maxCols = 5;

function rebuildContainer(){

    const root = document.querySelector("#container");

    let objRC = getRowsCols();
    let hRow=100/objRC.rows, wCol=1;
    root.style.grid = `repeat(${objRC.rows}, ${hRow}vh) / repeat(${objRC.cols}, ${wCol}fr)`;//repeat(3, 25vh) / repeat(3, 1fr)


    let gridAreas = '';
    let ind=0;
    for (let i = 0; i < objRC.rows; i++) {
        let str = '';
        for (let j = 0; j < objRC.cols; j++) {
            if(ind>=tiles.length) ind--;
            str += tiles[ind].gridArea + " ";
            ind++;
        }
        gridAreas += `"${str}" `;

    }
    root.style.gridTemplateAreas = gridAreas;
}

function swapTiles(id1, id2){
    let tile1, ind1;
    let tile2, ind2;

    for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        if(tile.id === id1){
            tile1 = tile;
            ind1 = i;
            continue;
        }
        if(tile.id === id2){
            tile2 = tile;
            ind2 = i;
            continue;
        }

    }

    tiles[ind1] = tile2;
    tiles[ind2] = tile1;

    rebuildContainer();

}

function onDragAllow(event){
    event.preventDefault();
}

function onDragStart(event){
    event.dataTransfer.setData("id", event.target.id);
    //event.target.style.backgroundColor = "white";
    event.target.style.opacity = "0.1";
    //event.target.style.display = "none";
}

function onDrop(event){
    let itemID_1 = event.target.id;
    let itemID_2 = event.dataTransfer.getData("id");

    if(itemID_2 !== itemID_1){
        //event.target.innerText = itemID_1 + " + " + itemID_2;
        swapTiles(itemID_1, itemID_2);
        document.querySelector("#" + itemID_2).style.opacity = "1.0";
    }
    else{
        event.target.style.opacity = "1.0";
    }
}

function getRowsCols(){
    let tiles_len = tiles.length;
    let cols = tiles_len > maxCols ? maxCols : tiles_len;
    let rows = Math.ceil(tiles_len / maxCols);

    return {rows, cols};
}

function onMouseOver(event){
    const btn_set = document.querySelector("#" + event.currentTarget.id + "_btn_setting");
    btn_set.style.opacity = "0.1";
}

function onMouseOut(event){
    const btn_set = document.querySelector("#" + event.currentTarget.id + "_btn_setting");
    btn_set.style.opacity = "0.0";
}

function getIndexTile(tileID){
    for (let i = 0; i < tiles.length; i++) {
        if(tiles[i].id === tileID){
            return i;
        }
    }

    return -1;
}


function removeTile(tile, menu){
    //alert("removeTile: " + tile.id);
    //document.removeChild(tile);
    menu.style.display = "none";
    tile.remove();

    tiles.splice(getIndexTile(tile.id), 1);

    rebuildContainer();

}

function getHexFromRGBstring(rgbStr){

    //"rgb(255,255,255)"
    let a = rgbStr.split("(")[1].split(")")[0];
    a = a.split(",");
    let b = a.map((x) => {              //For each array element
        x = parseInt(x).toString(16);    //Convert to a base16 string
        return (x.length==1) ? "0"+x : x;     //Add zero if we get only one character
    });

    b = "#"+b.join("");

    return b;
}


function onClickSettings(event){
    //alert("onClickSettings: " + event.currentTarget.parentElement.id);
    const menu = document.querySelector(".menu");
    //const menu = document.createElement('div');
    const tileID = event.currentTarget.parentElement.id;
    const tile = event.currentTarget.parentElement;

    menu.style.display = "block";
    menu.style.position = "absolute";
    menu.style.top = `${tile.offsetTop}px`;
    menu.style.left = `${tile.offsetLeft}px`;
    menu.style.width = `${tile.offsetWidth}px`;
    //menu.style.height = "200px";
    // menu.style.background = "red";
    // menu.style.opacity = "0.5";

    //tile.append(menu);

    const mColor = document.querySelector(".menu #mColor");
    const inpCC  = document.querySelector(".menu [name='bg']");
    //inpCC.value = getHexFromRGBstring(tile.style.backgroundColor);
    //inpCC.value = "#0000ff";

    const mRemove = document.querySelector(".menu #mRemove");
    const mAddST = document.querySelector(".menu #mAddST");

    // mColor.onclick = function (e){
    //     e.preventDefault();
    //     chooseColorForTile(tile);
    // }

    //when a color is chosen and user abandon to window color picker
    inpCC.onchange = function (e){
        //alert(e);
    }

    //when a color is choosing in the window of color picker
    inpCC.oninput = function (e){
        //alert(e);
        //tile.style.backgroundColor = "green";
        tile.style.backgroundColor = e.target.value;
    }

    mRemove.onclick = function (e){
        e.preventDefault();
        removeTile(tile, menu);
    }

    mAddST.onclick = function (e){
        e.preventDefault();
        //addST(tile);
    }

}


function addTile(){

    idTile++;
    const root = document.querySelector("#container");
    let tileDOM = document.createElement('div');

    tileDOM.id = "tile" + idTile;
    tileDOM.className = "tile";
    tileDOM.innerText = "tile " + idTile;
    tileDOM.style.gridArea = "tile" + idTile;

    tileDOM.draggable = true;
    tileDOM.ondragover = onDragAllow;
    tileDOM.ondragstart = onDragStart;
    tileDOM.ondrop = onDrop;
    tileDOM.onmouseover = onMouseOver;
    tileDOM.onmouseout = onMouseOut;


    let img = document.createElement('img');
    img.src = "./images/settings32.png";
    img.id = `tile${idTile}_btn_setting`;
    img.style.maxHeight = "50%";
    img.style.maxWidth = "50%";
    img.style.float = "right";
    img.style.opacity = "0.0";
    img.onmouseover = function (e){
        e.stopPropagation();
        e.target.style.opacity = "0.7";
        e.target.style.cursor  = "pointer";

    };
    img.onclick = onClickSettings;
    tileDOM.append(img);


    const tile = {
        tileDOM,
        id: "tile" + idTile,
        gridArea: "tile" + idTile,
    };

    tiles.push(tile);
    let tiles_len = tiles.length;

    root.append(tileDOM);

    if(tiles_len > 30 && tiles_len < 35){
        maxCols++;
    }

    // let objRC = getRowsCols();
    // let hRow=100/objRC.rows, wCol=1;
    // root.style.grid = `repeat(${objRC.rows}, ${hRow}vh) / repeat(${objRC.cols}, ${wCol}fr)`;//repeat(3, 25vh) / repeat(3, 1fr)

    rebuildContainer();
}

function main(){
    const btnAdd = document.querySelector("#btnAdd");
    btnAdd.onclick = addTile;

    const menu = document.querySelector(".menu");
    menu.onmouseleave = function (e){
        e.target.style.display = "none";
        //console.log("menu.onmouseout");
    }


    document.querySelector("header").onmouseleave = function (e){
        //e.target.style.display = "none";
    };

    document.querySelector("#container").onmouseleave = function (e){
        if (e.clientY < 40) {
            document.querySelector("header").style.display = "block";
        }
    }
}

main();