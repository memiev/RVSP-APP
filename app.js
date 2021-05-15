const form  = document.getElementById("registrar");
const input = form.querySelector('input');
const mainDiv = document.querySelector('.main');
const ul = document.getElementById('invitedList');

// _________________________________FILTER checkbox
const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckbox = document.createElement('input');
filterCheckbox.type = 'checkbox';
filterLabel.textContent = "Hide those who haven't responded";
div.appendChild(filterLabel);
div.appendChild(filterCheckbox);
mainDiv.insertBefore(div,ul);

filterCheckbox.addEventListener('change',(e) => {
    const isChecked = e.target.checked; 
    const list = ul.children;    //.children provides a reference to a collection of elements children. 

    if (isChecked) {
        for (i in list){
            let li = list[i]
            if (li.className === 'responded') {
                li.style.display = '';
            } else {
                li.style.display = 'none';
            }
        }       
    } else {
        for (j in list){
            let li = list[j]
            li.style.display = '';
        }
    }
});

// _________________________________

function createLI(text){
    function createElement(elementName,property,value) {
        const element = document.createElement(elementName);
        element[property] = value;
        return element;
    }

    function appendToLI(elementName,property,value){
        const element = createElement(elementName,property,value);
        li.appendChild(element);
        return element;
        
    }

    const li = document.createElement("li");
    appendToLI('span','textContent',text);
    appendToLI('label','textContent','Confirmed')
    .appendChild(createElement('input', 'type', 'checkbox'));
    appendToLI('button','textContent','EDIT');
    appendToLI('button','textContent','REMOVE');
    return li;
}   

form.addEventListener("submit", (e)=>{
    e.preventDefault(); // спира браузъра да изпрати информация до отделен сървър 
    const text = input.value
    if (text === '') {
        alert('Please provide a name.')
    }else{
        input.value = '';
        const li = createLI(text);
        ul.appendChild(li);  
    }
});

ul.addEventListener('change', (e) => {
    const checkbox = e.target;
    const checkED = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;    //checkbox.label.li
    if (checkED){
        listItem.className = 'responded';
    }else{
        listItem.className = '';
    }
});

ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const button = e.target;
        const li = button.parentNode;
        const ul = li.parentNode;

        function removeName(){
            ul.removeChild(li)
        }
        function editName(){
            const span = li.firstElementChild;
            const input = document.createElement('input');
            input.type  = 'text';
            input.value = span.textContent;
            li.insertBefore(input,span);
            li.removeChild(span);
            button.textContent = 'SAVE';
        }
        function saveName(){
            const input = li.firstElementChild;
            const span = document.createElement('span');
            span.textContent = input.value ;
            li.insertBefore(span,input);
            li.removeChild(input);
            button.textContent = 'EDIT';
        }
        
        const action = button.textContent;
        if (action === 'REMOVE') {
           removeName();
        } else if (action === 'EDIT'){
            editName();
        } else if (action === 'SAVE'){
            saveName();
        }
       
    }
});
