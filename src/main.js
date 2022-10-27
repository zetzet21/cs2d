window.onload = function(){
    const server = new Server;
    var user;
    var chatOld =  [];
    var hash = 123;
    make( "", "none");

    async function login(){
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const data = await server.login(login, password );
               user = await server.getUserByLogin(login);
        
        if(data)
        {console.log(data.name);
        makeConvert(data.name);}
        else 
        alert("Неверный логин или пароль");
    }

  

 async function sendMessage(){
  
        var message = document.getElementById('mesagge').value;
        document.getElementById('mesagge').value = "";
        data =  await server.sendMessage(user.id,user.name, message);
        hash = data.hasn;
 }

  async function getMessages(){
    if(user ){
        data = await server.getMessages(hash);
        if(data){
        chat =  data.messages;

        for(i = chatOld.length; i<chat.length;i++)
         console.log(chat[i].userName,": ",chat[i].message)

        chatOld = chat;   
        hash =  data.hash;
        }
      }
  }

setInterval(getMessages, 100);

    document.getElementById('sendmesagge').addEventListener('click', sendMessage );
    document.getElementById('sendConvert').addEventListener('click', sendConvertHandler );
    document.getElementById('enter').addEventListener('click', login );
    document.getElementById('exit').addEventListener('click', makeAvtor );   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    


    
    
     async function sendConvertHandler() {
        const number = document.getElementById('number').value;
        const login = document.getElementById('out').value;
        const password = document.getElementById('inn').value;
        const data = await server.convert(number, login, password);
        document.getElementById("res").innerHTML = data ;
    }
    
    function make(a, b){
        document.getElementById('avtor').style.display = `${a}`; 
      document.getElementById('login').style.display = `${a}`;  
      document.getElementById('password').style.display = `${a}`;   
      document.getElementById('enter').style.display = `${a}`; 

      document.getElementById('num').style.display = `${b}`;
      document.getElementById('number').style.display = `${b}`;  
      document.getElementById('o').style.display = `${b}`; 
      document.getElementById('out').style.display = `${b}`; 
      document.getElementById('i').style.display = `${b}`;
      document.getElementById('inn').style.display = `${b}`;  
      document.getElementById('sendConvert').style.display = `${b}`;  
      document.getElementById('exit').style.display = `${b}`;
      document.getElementById('res').style.display = `${b}`; 
      document.getElementById('ch').style.display = `${b}`; 
      document.getElementById('chat').style.display = `${b}`; 
      document.getElementById('mesagge').style.display = `${b}`;  
      document.getElementById('sendmesagge').style.display = `${b}`;  
    }

    function makeConvert(name){
      
      var p = document.createElement("p"); p.innerHTML = `Здравствуйте, ${name},  перевод в римские цифры и обратно через "rim"`; p.id = "p";
      document.body.prepend(p);
      make("none", "");
      document.getElementById('sendConvert').addEventListener('click', sendConvertHandler );
    }

    function makeAvtor(){
        document.getElementById('p').style.display = "none";
        document.getElementById('login').value = "";
        document.getElementById('password').value = "";
        document.getElementById('res').innerHTML = "";
        make("", "none");
      }
    
  
  }
