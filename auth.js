// auth.js - simple localStorage based auth for demo projects
// Users are stored in localStorage under key 'hw_users' as an object { username: password }
(function(){
  window.auth = {
    signup: function(username, password){
      if(!username || !password) return { ok:false, msg: 'Enter username and password' };
      const users = JSON.parse(localStorage.getItem('hw_users') || '{}');
      if(users[username]) return { ok:false, msg: 'User already exists' };
      users[username] = password;
      localStorage.setItem('hw_users', JSON.stringify(users));
      return { ok:true };
    },
    login: function(username, password, remember){
      const users = JSON.parse(localStorage.getItem('hw_users') || '{}');
      if(users[username] && users[username] === password){
        localStorage.setItem('hw_currentUser', username);
        if(remember) localStorage.setItem('hw_remember', '1'); else localStorage.removeItem('hw_remember');
        return { ok:true };
      }
      return { ok:false, msg: 'Invalid username or password' };
    },
    logout: function(){
      localStorage.removeItem('hw_currentUser');
      localStorage.removeItem('hw_remember');
      // redirect to login
      window.location.href = 'login.html';
    },
    getCurrentUser: function(){
      const rem = localStorage.getItem('hw_remember');
      const cur = localStorage.getItem('hw_currentUser');
      if(rem && cur) return cur;
      return cur || null;
    },
    ensureAuth: function(){ // call on protected pages
      const cur = this.getCurrentUser();
      if(!cur){
        window.location.href = 'login.html';
        return false;
      }
      return true;
    }
  };
})();
