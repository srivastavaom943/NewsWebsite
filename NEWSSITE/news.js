const API_KEY="47c8fd9fbbd542fea5d2b8b9659664c8";
const url="https://newsapi.org/v2/everything?q="
window.addEventListener('load',()=>fetchNews("india"));
async function fetchNews(query){
    const res= await fetch(`${url}${query}&apikey=${API_KEY}`);
const data=await res.json(); 
console.log(data)
bindData(data.articles)
}
function bindData(articles){
    const cardscontainer=document.getElementById("cards main conatiner")
    const newstemplate=document.getElementById("news-template")
    cardscontainer.innerHTML='';
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardclone=newstemplate.content.cloneNode(true);
        fillData(cardclone,article)
        cardscontainer.appendChild(cardclone);
    });
}
function fillData(cardclone,article){
const newsimage=cardclone.querySelector("#news-image");
const newstittle=cardclone.querySelector("#news-title");
const newssource=cardclone.querySelector("#news-source");
const newsdesc=cardclone.querySelector("#news-desc");
newsimage.src=article.urlToImage;
newstittle.innerHTML=article.title;
newsdesc.innerHTML=article.description;
const date=new Date(article.publishedAt).toLocaleString("en-us",{
    timeZone:"Asia/Jakarta"
})
newssource.innerHTML=`${article.source.name}${date}`;
cardclone.firstElementChild.addEventListener('click',()=>{
    window.open(article.url,"_blank");
})
}
function onNavItemClick(id){
    fetchNews(id);
}
const searchbutton=document.getElementById("search-button")
const searchinput=document.getElementById("search-text")
searchbutton.addEventListener('click',()=>{
    const query=searchinput.value;
    if(!query) return;
    fetchNews(query);
})