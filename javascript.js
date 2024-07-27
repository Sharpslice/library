const myLibrary =[];


const book1 = new Book('Rick Riordan','Percy Jackson','509',true)
const book2 = new Book('Rick Riordan','Magnus Chase','459',true)

myLibrary.push(book1);
myLibrary.push(book2);
console.log("hello")

function Book(author,title,numOfPages,isRead){
    this.author = author;
    this.title = title;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
}
Book.prototype.toggleReadStatus=function(){
    this.isRead =!this.isRead;
}



function addBookToLibrary(author,title,numOfPages,isRead){
    let book = new Book(author,title,numOfPages,isRead)
    
    myLibrary.push(book);

}




function updateBookList(){
    
    myLibrary.forEach(book =>{
        const tableBody = document.getElementById('tableBody');

        let newRow = document.createElement('tr');

        let deleteButton = document.createElement('button');
        deleteButton.textContent="delete";
        deleteButton.classList.add('delete');

        let hasReadButton = document.createElement('input');
    hasReadButton.type="checkbox"
    hasReadButton.checked = true;


        let cell1 = document.createElement('td');
        cell1.textContent=book.title;
        newRow.appendChild(cell1);

        let cell2 = document.createElement('td');
        cell2.textContent=book.author;
        newRow.appendChild(cell2)

        let cell3 = document.createElement('td');
        cell3.textContent=book.numOfPages;
        newRow.appendChild(cell3);
    

        let cell4 = document.createElement('td');
        cell4.textContent=true;
        cell4.appendChild(hasReadButton);
        newRow.appendChild(cell4);

        newRow.appendChild(deleteButton);
        tableBody.appendChild(newRow);

    });

}



const dialog = document.querySelector('dialog');

const modalButton = document.querySelector("#openModalButton");

const addBookButton = document.querySelector("#bookButton");
const cancelButton = document.querySelector("#cancelButton");
modalButton.addEventListener("click", (e) =>{
    dialog.showModal();
});



addBookButton.addEventListener("click",(e)=>{
    e.preventDefault();
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let numOfPages = document.getElementById('pages').value;

    let isRead = document.getElementById('selectRead').value === 'Read' ? true : false
    addBookToLibrary(author,title,numOfPages,isRead);
    
    const tableBody = document.getElementById('tableBody');

    let newRow = document.createElement('tr');

    let deleteButton = document.createElement('button');
    deleteButton.textContent="delete";
    deleteButton.classList.add('delete');

    let hasReadButton = document.createElement('input');
    hasReadButton.type="checkbox"
    if(isRead)
        {
            hasReadButton.checked = true;
        }
    

    let cell1 = document.createElement('td');
    cell1.textContent=title;
    newRow.appendChild(cell1);

    let cell2 = document.createElement('td');
    cell2.textContent=author;
    newRow.appendChild(cell2)

    let cell3 = document.createElement('td');
    cell3.textContent=numOfPages;
    newRow.appendChild(cell3);
   

    let cell4 = document.createElement('td');
    cell4.textContent=isRead;
    cell4.appendChild(hasReadButton);
    newRow.appendChild(cell4);
    

    newRow.appendChild(deleteButton);
    tableBody.appendChild(newRow);

    dialog.close();
});


cancelButton.addEventListener("click",(e)=>{
    dialog.close();
})

document.getElementById('tableBody').addEventListener('click',(e) =>{
    if(e.target.tagName ==='BUTTON')
        {
            const row = e.target.closest('tr');
            
            const title = row.querySelector('td:nth-child(1)').textContent; // Assuming title is in the first column

        // Find the index of the book in myLibrary array
        const index = myLibrary.findIndex(book => book.title === title);
        if (index !== -1) {
            myLibrary.splice(index, 1); // Remove the book from myLibrary array
        }
            row.remove();
        }
    else if(e.target.tagName ==='INPUT')
    {
        const row = e.target.closest('tr');
        const title = row.querySelector('td:nth-child(1)').textContent;
        const read = row.querySelector('td:nth-child(4)');
        const index = myLibrary.findIndex(book => book.title === title);
        myLibrary[index].toggleReadStatus();
        console.log(myLibrary[index].isRead)
        read.textContent = myLibrary[index].isRead;
        read.appendChild(e.target)

        
    }
        
})
updateBookList();