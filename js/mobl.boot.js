var mobl = {};

mobl.provides = function (moduleName) {
    var parts = moduleName.split('.');
    var current = window;
    for ( var i = 0; i < parts.length; i++) {
        if (!current[parts[i]]) {
            current[parts[i]] = {};
        }
        current = current[parts[i]];
    }
};

mobl.loadedFiles = {};

mobl.IsWebkitBrowser= function(){
	return RegExp(" AppleWebKit/").test(navigator.userAgent);
}

mobl.load = function(url) {
    if(url in mobl.loadedFiles) {
       return; 
    }
    if(url.substring(url.length-4) === '.css') {
        $("head").append("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + url + "\">");
    } else {
        $("head").append("<script type=\"text/javascript\" src=\"" + url + "\">");
    }
    mobl.loadedFiles[url] = true;
};

mobl.setUpdateCacheEvent = function () {
	applicationCache.onupdateready = function(){
		mobl.reload();
	}
}


mobl.initDb = function(callback) {
  if(!mobl.IsWebkitBrowser()){
	  alert("This website is based on Webkit functionality, current browser doesn't support this. For full functionality please use a Webkit based browser like: Chrome/Safari")
  }
  mobl.setUpdateCacheEvent();
  if(mobl.migration) {
    mobl.migration.performMigration(callback)
  } else {
    persistence.schemaSync(function(tx) {
      if(persistence.loadFromLocalStorage) {
        persistence.loadFromLocalStorage();
      }
      callback();
    });
  }
};

mobl.loadingSpan = function() {
    return $("<span>Loading... <img src=\"data:image/gif;base64,R0lGODlhCgAKAJEDAMzMzP9mZv8AAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAADACwAAAAACgAKAAACF5wncgaAGgJzJ647cWua4sOBFEd62VEAACH5BAUAAAMALAEAAAAIAAMAAAIKnBM2IoMDAFMQFAAh+QQFAAADACwAAAAABgAGAAACDJwHMBGofKIRItJYAAAh+QQFAAADACwAAAEAAwAIAAACChxgOBPBvpYQYxYAIfkEBQAAAwAsAAAEAAYABgAAAgoEhmPJHOGgEGwWACH5BAUAAAMALAEABwAIAAMAAAIKBIYjYhOhRHqpAAAh+QQFAAADACwEAAQABgAGAAACDJwncqi7EQYAA0p6CgAh+QQJAAADACwHAAEAAwAIAAACCpRmoxoxvQAYchQAOw==\" width=\"10\" height=\"10\"></span>");
};

