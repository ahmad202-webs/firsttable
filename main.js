let box = document.querySelector(".box");

let API = "https://687f27d3efe65e5200888b47.mockapi.io/firstfigma";


let dialogdelete = document.querySelector(".dialogdelete");
let yes = document.querySelector(".yes");
let no = document.querySelector(".no");


let dialogedit = document.querySelector(".dialogedit");
let editname = document.querySelector(".editname");
let editcompny = document.querySelector(".editcompny");
let editimg = document.querySelector(".editimg");
let editage = document.querySelector(".editage");
let editbtn = document.querySelector(".editbtn");
let editcancle = document.querySelector(".editcancle");


let btnadd = document.querySelector(".btnadd");


let dialogadd = document.querySelector(".dialogadd");
let addname = document.querySelector(".addname");
let addcompny = document.querySelector(".addcompny");
let addimg = document.querySelector(".addimg");
let addage = document.querySelector(".addage");
let addbtn = document.querySelector(".addbtn");
let addcancle = document.querySelector(".addcancle");


btnadd.onclick = () => {
    dialogadd.showModal();
}

addbtn.onclick = () => {
    let yuser = {
        name: addname.value,
        company: addcompny.value,
        img: addimg.value,
        age:addage.value
    }
    adduser(yuser);
}

async function adduser(yuser) {
    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(yuser)
    })
    get();
    dialogadd.close();
    addname.value = ""
    addcompny.value = ""
    addimg.value = ""
    addage.value = ""
}



editcancle.onclick = () => {
    dialogedit.close();
}

let idx = null

editbtn.onclick = () => {
    let user = {
        name:editname.value,
        company:editcompny.value,
        img:editimg.value,
        age:editage.value,
    }
    Editfunc(idx, user);
}

async function Editfunc(id,user) {
    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    })
    get();
    dialogedit.close();
}

async function deletefunc(id) {
    await fetch(`${API}/${id}`,{ method: "DELETE" });
    get()
    dialogdelete.close();
}


async function get() {
    try {
        let respone = await fetch(API);
        let data = await respone.json();
        getData(data);
    } catch (error) {
        console.log(error);
    }
}

function getData(data) {
    box.innerHTML = ""
    data.forEach((elem) => {
        let div = document.createElement("tr");
        let name = document.createElement("td");
        let company = document.createElement("td");
        let divimg = document.createElement("td");
        let img = document.createElement("img");
        let age = document.createElement("td");
        let btns = document.createElement("td");
        let btnedit = document.createElement("button");
        let btndelete = document.createElement("button");

        name.innerHTML = elem.name
        company.innerHTML = elem.company
        img.src = elem.img
        age.innerHTML = elem.age
        btnedit.innerHTML = `<i class="fa-solid fa-pen-fancy"></i>`;
        btndelete.innerHTML = `<i class="fa-solid fa-trash"></i>`;

        img.style.height = "30px"
        img.style.width = "30px"
        img.style.borderRadius = "50%"

        btnedit.style.background = "white"
        btnedit.style.border = "none"
        btnedit.style.color = "#357860";
        btnedit.style.cursor = "pointer"

        btndelete.style.background = "white";
        btndelete.style.border = "none";
        btndelete.style.color = "red";
        btndelete.style.cursor = "pointer";

        btns.append(btnedit, btndelete)
        divimg.append(img)
        div.append(name, company, divimg, age, btns)
        box.append(div)

        btndelete.onclick = () => {
            dialogdelete.showModal();
            yes.onclick = () => {
                deletefunc(elem.id);
            }
            no.onclick = () => {
                dialogdelete.close();
            }
        }

        btnedit.onclick = () => {
            dialogedit.showModal();
            editname.value = elem.name
            editcompny.value = elem.company
            editimg.value = elem.img
            editage.value = elem.age
            idx = elem.id
        }

    })

}
    
get();