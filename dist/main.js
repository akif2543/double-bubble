!function(t){var e={};function i(s){if(e[s])return e[s].exports;var r=e[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(s,r,function(e){return t[e]}.bind(null,r));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/dist/",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);i(1);var s=i(2);document.addEventListener("DOMContentLoaded",(function(){var t=document.getElementById("game").getContext("2d");new s(t).welcome(!0)}))},function(t,e,i){},function(t,e,i){function s(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}var r=i(3),n=function(){function t(e){var i=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.ctx=e,this.game=new r(e),this.last=0,this.bg=new Image,this.bg.onload=function(){e.drawImage(i.bg,0,0,1e3,600),e.font="48px Orbitron",e.fillStyle="white",e.fillText("Click to start",400,400,200),e.font="24px Orbitron",e.fillText("a + d or arrows to move",350,500,300),e.fillText("w, space, or up to fire",359,530,300)},this.bg.src="dist/assets/title_screen.jpg",this.start=this.start.bind(this),this.restart=this.restart.bind(this),this.animate=this.animate.bind(this),this.setRestart=this.setRestart.bind(this),this.canvas=document.getElementById("game"),this.keys={},this.handler=this.handler.bind(this)}var e,i,n;return e=t,(i=[{key:"handler",value:function(t){switch(t.preventDefault(),this.keys[t.key]="keydown"===t.type,!0){case this.keys[" "]||this.keys.w||this.keys.W||this.keys.ArrowUp:this.game.player.fire();break;case this.keys.a||this.keys.A||this.keys.ArrowLeft:this.game.player.move(-20);break;case this.keys.d||this.keys.D||this.keys.ArrowRight:this.game.player.move(20);break;default:this.game.player.move(0)}}},{key:"bindKeys",value:function(t){this.keys={},t?(document.addEventListener("keydown",this.handler),document.addEventListener("keyup",this.handler)):(document.removeEventListener("keydown",this.handler),document.removeEventListener("keyup",this.handler))}},{key:"welcome",value:function(t){this.canvas.addEventListener("mouseup",this.start),this.ctx.drawImage(this.bg,0,0,1e3,600),this.ctx.font="48px Orbitron",this.ctx.fillStyle="white",t?this.ctx.fillText("Click to start",400,400,200):this.ctx.fillText("Click to play again",300,400,400)}},{key:"animate",value:function(t){var e=t-this.last;return this.game.step(e),this.game.draw(this.ctx),this.last=t,this.game.over?this.end():this.game.pause?this.setRestart():void requestAnimationFrame(this.animate)}},{key:"start",value:function(){this.game=this.game.player.lives?this.game:new r(this.ctx),this.bindKeys(!0),this.canvas.removeEventListener("mouseup",this.start),this.game.resetLevel(),requestAnimationFrame(this.animate)}},{key:"restart",value:function(){this.bindKeys(!0),requestAnimationFrame(this.animate)}},{key:"end",value:function(){return this.bindKeys(!1),this.welcome(!1)}},{key:"setRestart",value:function(){this.bindKeys(!1),this.last=0,this.game.togglePause(),setTimeout(this.restart,1e3)}}])&&s(e.prototype,i),n&&s(e,n),t}();t.exports=n},function(t,e,i){function s(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}var r=i(4),n=i(5),a=function(){function t(e){var i=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.ctx=e,this.setDimensions(),this.level=1,this.bubbles=[],this.player=new n(e,this),this.over=!this.player.lives,this.pause=!0,this.togglePause=this.togglePause.bind(this),this.bg=new Image,this.bg.onload=function(){return e.drawImage(i.bg,0,0,i.DIMX,i.DIMY)},this.bg.src="dist/assets/db_bg.jpg",this.resetLevel=this.resetLevel.bind(this)}var e,i,a;return e=t,(i=[{key:"setDimensions",value:function(){this.DIMX=1e3,this.DIMY=600,this.FLOOR=this.DIMY-53,this.LWALL=80,this.RWALL=this.DIMX-80}},{key:"remove",value:function(t){t instanceof r?(this.bubbles.splice(this.bubbles.indexOf(t),1),t.canDivide&&t.divide()):this.resetProjectile()}},{key:"addBubble",value:function(t){this.bubbles.push(new r(t,this.ctx,this))}},{key:"setProjectile",value:function(t){Array.isArray(this.projectile)&&(this.projectile=t)}},{key:"resetProjectile",value:function(){this.projectile=[]}},{key:"allObjs",value:function(){return Array.isArray(this.projectile)?this.projectile.concat(this.bubbles,this.player):[this.projectile].concat(this.bubbles,this.player)}},{key:"movingObjs",value:function(){return this.bubbles.concat(this.projectile)}},{key:"draw",value:function(t){t.clearRect(0,0,this.DIMX,this.DIMY),t.drawImage(this.bg,0,0,this.DIMX,this.DIMY),t.font="24px Orbitron",t.fillStyle="white",t.fillText("".concat(this.player.lives>=0?this.player.lives:"0"," ").concat(1===this.player.lives?"life":"lives"," left"),this.LWALL+15,25,150),t.fillText("level ".concat(this.level),this.DIMX/2-50,25,100),this.allObjs().forEach((function(e){return e.draw(t)}))}},{key:"move",value:function(t){this.movingObjs().forEach((function(e){return e.move(t)}))}},{key:"checkCollisions",value:function(){var t=this;this.bubbles.forEach((function(e){e.isCollidedWith(t.player)?(t.player.move(0),t.player.decrementLife(),t.checkStatus("p")):e.isCollidedWith(t.projectile)&&(t.remove(e),t.resetProjectile(),t.checkStatus("b"))}))}},{key:"checkStatus",value:function(t){"p"===t&&(this.player.lives?this.resetLevel():this.over=!0),this.bubbles.length||(this.level++,this.resetLevel())}},{key:"resetLevel",value:function(){switch(this.clear(),this.level){case 1:this.addBubble({pos:[this.LWALL+42,200],vel:[15,15],radius:20,color:"red"});break;case 2:this.addBubble({pos:[this.LWALL+63,200],vel:[15,15],radius:30,color:"red"});break;case 3:this.addBubble({pos:[this.LWALL+84,200],vel:[15,15],radius:40,color:"red"});break;case 4:this.addBubble({pos:[this.LWALL+84,200],vel:[15,15],radius:40,color:"red"}),this.addBubble({pos:[this.RWALL-84,200],vel:[-15,15],radius:40,color:"red"})}this.togglePause()}},{key:"togglePause",value:function(){this.pause=!this.pause}},{key:"clear",value:function(){this.bubbles=[],this.resetProjectile(),this.player.reset()}},{key:"step",value:function(t){this.move(t),this.checkCollisions()}}])&&s(e.prototype,i),a&&s(e,a),t}();t.exports=a},function(t,e){function i(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,s)}return i}function s(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?i(Object(s),!0).forEach((function(e){r(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):i(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}function r(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function n(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var i=[],s=!0,r=!1,n=void 0;try{for(var a,o=t[Symbol.iterator]();!(s=(a=o.next()).done)&&(i.push(a.value),!e||i.length!==e);s=!0);}catch(t){r=!0,n=t}finally{try{s||null==o.return||o.return()}finally{if(r)throw n}}return i}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return a(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);"Object"===i&&t.constructor&&(i=t.constructor.name);if("Map"===i||"Set"===i)return Array.from(t);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return a(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,s=new Array(e);i<e;i++)s[i]=t[i];return s}function o(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}var h=function(){function t(e,i,s){var r=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.game=s,this.radius=e.radius,this.color=e.color,this.pos=e.pos,this.vel=e.vel,this.GRAVITY=.5,this.BOUNCE=-.9,this.canDivide=10!==this.radius,this.img=new Image,this.img.onload=function(){return r.draw(i)},this.img.src="dist/assets/yellow_disc.png"}var e,i,r;return e=t,(i=[{key:"draw",value:function(t){var e=n(this.pos,2),i=e[0],s=e[1];t.save(),t.beginPath(),t.arc(i,s,this.radius,0,2*Math.PI),t.closePath(),t.clip(),t.drawImage(this.img,i-this.radius,s-this.radius,2*this.radius,2*this.radius),t.beginPath(),t.arc(i,s,this.radius,0,2*Math.PI),t.clip(),t.closePath(),t.restore()}},{key:"move",value:function(){var t=n(this.pos,2),e=t[0],i=t[1],s=n(this.vel,2),r=s[0],a=s[1];this.pos=[e+r/3,i+a/3],this.applyPhysics()}},{key:"applyPhysics",value:function(){var t=n(this.pos,2),e=t[0],i=t[1];this.vel[1]+=this.GRAVITY,(e+this.radius>=this.game.RWALL||e-this.radius<=this.game.LWALL)&&(this.vel[0]*=Math.abs(this.vel[0])>7?this.BOUNCE:-1.1),i+.7*this.radius>=this.game.FLOOR&&(this.pos[1]=this.game.FLOOR-this.radius,this.vel[1]*=this.vel[1]>14?this.BOUNCE:-1)}},{key:"divide",value:function(){var t=this,e=n(this.pos,2),i=e[0],r=e[1],a=n(this.vel,2),o=a[0],h=a[1],l=this.radius,u={pos:[i+l,r-l],vel:[o*-this.BOUNCE,h/-this.BOUNCE],radius:this.radius-10,color:this.color};return[u,s(s({},u),{},{pos:[i-l,u.pos[1]],vel:[-1*u.vel[0],u.vel[1]]})].forEach((function(e){return t.game.addBubble(e)}))}},{key:"isCollidedWith",value:function(t){if(Array.isArray(t))return!1;var e=1.2*Math.abs(this.pos[0]-t.pX-t.width/2),i=Math.abs(this.pos[1]-t.pY-t.height/2);if(e>t.width/2+this.radius||i>t.height/2+this.radius)return!1;if(e<=t.width/2||i<=t.height/2)return!0;var s=e-t.width/2,r=i-t.height/2;return Math.pow(s,2)+Math.pow(r,2)<=Math.pow(this.radius,2)}}])&&o(e.prototype,i),r&&o(e,r),t}();t.exports=h},function(t,e,i){function s(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}var r=i(6),n=function(){function t(e,i){var s=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.game=i,this.lives=5,this.width=50,this.height=this.game.DIMY/6,this.pX=this.game.DIMX/2-.7*this.width,this.pY=this.game.FLOOR-this.height+5,this.img=new Image,this.img.onload=function(){return e.drawImage(s.img,s.pX,s.pY,s.width,s.height)},this.img.src="dist/assets/blue_back.png",this.left=["dist/assets/blue_left1.png","dist/assets/blue_left2.png","dist/assets/blue_left3.png","dist/assets/blue_left4.png"],this.right=["dist/assets/blue_right1.png","dist/assets/blue_right2.png","dist/assets/blue_right3.png","dist/assets/blue_right4.png"]}var e,i,n;return e=t,(i=[{key:"draw",value:function(t){t.drawImage(this.img,this.pX,this.pY,this.width,this.height)}},{key:"move",value:function(t){if(t>0){var e=this.right.shift();this.img.src=e,this.right.push(e)}else if(t<0){var i=this.left.shift();this.img.src=i,this.left.push(i)}else this.img.src="dist/assets/blue_back.png";var s=this.pX+t;s+this.width>=this.game.RWALL?this.pX=this.game.RWALL-this.width:s<=this.game.LWALL?this.pX=this.game.LWALL:this.pX=s}},{key:"reset",value:function(){this.pX=this.game.DIMX/2-.7*this.width}},{key:"fire",value:function(){this.img.src="dist/assets/blue_back.png",this.game.setProjectile(new r([this.pX+22.5,this.pY],this.game))}},{key:"decrementLife",value:function(){this.lives--}}])&&s(e.prototype,i),n&&s(e,n),t}();t.exports=n},function(t,e){function i(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var i=[],s=!0,r=!1,n=void 0;try{for(var a,o=t[Symbol.iterator]();!(s=(a=o.next()).done)&&(i.push(a.value),!e||i.length!==e);s=!0);}catch(t){r=!0,n=t}finally{try{s||null==o.return||o.return()}finally{if(r)throw n}}return i}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return s(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);"Object"===i&&t.constructor&&(i=t.constructor.name);if("Map"===i||"Set"===i)return Array.from(t);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return s(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,s=new Array(e);i<e;i++)s[i]=t[i];return s}function r(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}var n=function(){function t(e,s){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.game=s;var r=i(e,2);this.pX=r[0],this.pY=r[1],this.width=5,this.height=this.game.FLOOR-this.pY,this.SPEED=.75,this.img=new Image,this.img.src="dist/assets/laser.png"}var e,s,n;return e=t,(s=[{key:"draw",value:function(t){t.drawImage(this.img,this.pX,this.pY,this.width,this.height)}},{key:"move",value:function(t){this.pY-=t*this.SPEED,this.height+=t*this.SPEED,this.pY<=0&&this.game.remove(this)}}])&&r(e.prototype,s),n&&r(e,n),t}();t.exports=n}]);
//# sourceMappingURL=main.js.map