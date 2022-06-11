const API_URL = 'https://api.github.com'
const months = ['Jan', 'Feb', 'Mar', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let logins = [];
let inputText = null;

async function getUserData(userNameId) {
    const res = await fetch(`${API_URL}/users/${userNameId}`);
    const data = await res.json();

    const [dateCreate, time] = data.created_at.split('T');
    const [year, month, day] = dateCreate.split('-');

    if (res.status != 200) {
        console.log(`Error ${res.status}`)
    } else {
        avatarImg.setAttribute('src', data.avatar_url);
        nameUser.innerText = data.name;
        username.innerText = data.login;
        username.setAttribute('href', data.html_url);
        date.innerText = `Joined ${day} ${months[month - 1]} ${year}`

        if (data.bio == null) {
            description.innerText = 'No biography'
        } else {
            description.innerText = data.bio;
        }

        repos.innerText = data.public_repos;
        followers.innerText = data.followers;
        following.innerText = data.following;

        if (data.location == null) {
            country.innerText = 'Not aviable';

        } else {
            country.innerText = data.location;
        }

        gitHubUrl.innerText = data.html_url;

        if (data.twitter_username == null) {
            twitterUsername.classList.add('twitterNotAviable-grey')
            imgTwitter.setAttribute('src', 'img/twitterGrey.png')
        } else {
            twitterUsername.classList.remove('twitterNotAviable-grey')
            imgTwitter.setAttribute('src', 'img/twitter.png')
        }

        if (data.company == null) {
            company.innerText = 'No company'            
        } else {
            company.innerText = data.company
        }
    }
}

async function searchUser() {
    const res = await fetch(`${API_URL}/search/users?q=${inputUser.value}&per_page=6`);
    const data = await res.json();
    let logins = data.items
    ulBox.innerHTML = ''
    
    for (i = 0; i < logins.length; i++) {
        const itemResult = document.createElement('li')
        const userNameId = document.createTextNode(`${logins[i].login}`)
        itemResult.appendChild(userNameId);
        ulBox.appendChild(itemResult);
    }
    
    const liSelected = document.querySelector('ul');
    liSelected.addEventListener('click', event => {
        inputUser.value = (event.target.innerText)
        ulBox.classList.add('hidden');
        getUserData(event.target.innerText);
    })
    ulBox.classList.remove('hidden');
}

buttonSearch.addEventListener('click', () => {
    searchUser();
})


// searchUser()