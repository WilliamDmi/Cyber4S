const WHITE = 'white';
const DARK = 'dark';

let selectedCell;
let pieces = [];

class Piece 
{
    constructor(position, type, color) 
    {
      this.position = position;
      this.type = type;
      this.color = color;
    }
    
    showMovement()
    {
        let tdList = document.getElementsByTagName('td'); 

        if(this.type == 'rook')
        {
            for(let i = 0; i<tdList.length ; i++)
            {
                if(this.position[0] == tdList[i].id[0])
                {
                    tdList[i].classList.add("selected");
                }
                else if(this.position[1] == tdList[i].id[1])
                {
                    tdList[i].classList.add("selected");
                }
            }
        }
    }

}

function resetPieces() 
{
    let result = [];
    let temp =["rook","knight","bishop","queen","king","bishop","knight","rook"];
    
    for(let i=0; i<8; i++)
    {
    result.push(new Piece(0 + i.toString() , temp[i], DARK ));
    result.push(new Piece(1 + i.toString() , "pawn", DARK));
    result.push(new Piece(7 + i.toString() , temp[i], WHITE ));
    result.push(new Piece(6 + i.toString() , "pawn", WHITE));
    }
    return result;
}


function createBoard()
{
    const newDiv = document.createElement("div"); 
    newDiv.className="mainBody";
    document.body.appendChild(newDiv);
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");
    for(let i = 0 ; i < 10 ; i++ )
    {
        let row = document.createElement("tr");
        for(let j = 0 ; j < 10 ; j++ )
        {
            if(i===0 || i===9)
            {
                let header = document.createElement("th"); 
                if(j!==0 && j!==9)
                    header.textContent = String.fromCharCode(j + 64);
                row.appendChild(header);
            }
            else
            {
                if(j===0 || j===9)
                {
                    let header = document.createElement("th"); 
                    header.textContent = 9-i;
                    row.appendChild(header);
                }
                else
                {
                    let cell = document.createElement("td");
                    if( (j+i)%2 === 1)
                    {
                        cell.className="tdBlack";
                    }
                    else cell.className="tdWhite";
                    cell.id = (i-1).toString() + (j-1).toString();

                    row.appendChild(cell);
                    cell.addEventListener('click', onCellClick);
                }   
            }
        }
        tblBody.appendChild(row);
    }

    tbl.appendChild(tblBody);
    newDiv.appendChild(tbl);

    pieces = resetPieces();

    for (let piece of pieces) {
      addImage(tbl.rows[parseInt(piece.position[0])+1].cells[parseInt(piece.position[1])+1], piece.color, piece.type);
    }

}

function onCellClick(event) 
{
    resetSelected();
    selectedCell = event.currentTarget;
    selectedCell.classList.add('selected');

    let currentPiece = checkCellPiece(pieces , selectedCell.id);
    if(currentPiece != undefined)
        currentPiece.showMovement();
    
}

function resetSelected()
{
    let tdList = document.getElementsByTagName('td'); 
    for(let tdIndex of tdList)
    {
        tdIndex.classList.remove('selected');

    }
}

function checkCellPiece(pieces,position)
{
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].position == position) return pieces[i];
      }
}


function addImage(cell, color, name) 
{
    const img = document.createElement('img');
    img.src = 'images/' + color + '/' + name + '.png';
    img.classList.add("pieceImg");
    img.classList.add(name);
    cell.appendChild(img);
}
  
function addImageByIndex(cell, color, index)
{
    if (index === 1 || index === 8) {
      addImage(cell, color, 'rook');
    } else if (index === 2 || index === 7) {
      addImage(cell, color, 'knight');
    } else if (index === 3 || index === 6) {
      addImage(cell, color, 'bishop');
    } else if (index === 4) {
      addImage(cell, color, 'queen');
    } else if (index === 5) {
      addImage(cell, color, 'king');
    }
}


window.addEventListener('load',createBoard);
//new board + cvhange positions

//catch (error)
//{
//     if(!(error instanceof TypeError))
//         alert ("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
// }