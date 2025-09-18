// to fix
/*try{
let text;
  async function getver(){
  const url = '/api/v1beta/';

const response = await fetch(url);

 text = await response.text();
            let res = JSON.parse(text);
document.write('<h3 id="version" style="position: absolute; top: 8px; left: 16px; font-size: 1.1250em;"></h3>');
    document.querySelector("#version").textContent = "version: ".concat(res.version);
  }
  getver();
}catch(err){
document.write('<h3 id="version" style="position: absolute; top: 8px; left: 16px; font-size: 1.1250em;">version: [cannot load version]</h3>');
  console.log(err)
}*/
