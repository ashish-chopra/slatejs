Slate.js
--------------------

Slate.js is a web framework written in JavaScript to develop modular HTML5 applications. The most of the design decisions are based on my own personal experience with designing single-page web applications. (If you don't know what are Single Page Web apps, then watch your Gmail account or Google Maps page online). Along with this I taken some polished suggestions and improvements from the Nicolas Zakas research on developing web application framework in javaScript.


How to build it?
-----------------------

In order to use it directly from source, you may first require to build it. It's fun and easy to build a library from a source on your own machine and use it!! For this, you may need to install Node.js on your machine. and then clone the project:

    >$ git clone https://github.com/ashish-chopra/slatejs.git

Then browse to `slatejs` folder in command line and then type

    >$ npm install -g grunt-cli
    >$ npm install

This will install grunt task runner cli and all the project dependencies.
Once done, fire a command `grunt`; this will build the file in `dist/` directory.
You can use this JavaScript file at in any of your web application project.
TO know more about Architecture and APIs and sample application, keep reading !!


Architecture Overview
---------------------------

#### 1. Modules
Module is a basic unit of this framework. Every functionality on the client side will be designed as a module. Each module can start, stop, initialize each module. Each module is a cohesive unit that encapsulates all the DOM, Javascript, server connectivity into it. In order to provide loose coupling, modules communicate with each other using   publish subscribe mechanism which is faciliated by Application core.

#### 2. Sandbox
Sandox is the playground for the modules to play. Modules are allowed only to call their own methods or call methods on sandobx. Sandbox provides an application interface to the modules to access core of the framework.

#### 3. Application Core
Application core is the heart of the framework that abstracts the base libraries and toolbox used inside the web application at he lower level. Due to this it provides opportunity to switch low level implementation of libraries without breaking modules.

#### 4. Plug-ins
Plugins is a utility provided along with the framework. As a hackathon idea, Slate.js does not provide  all the features that a developer wish to use. So if any moment you found that some API is missing, you can write your plugins and plug it with the framework.


I found a bug/new feature!
---------------------------
Slate.js bugs are tracked using [Github Issue tracker system](https://github.com/ashish-chopra/slatejs/issues).

Please use issue tracker for following purpose:
 1. to raise a bug request; do include specific details and label it appropriately.
 2. to suggest any improvements in existing features.
 3. to suggest new features or structures or applications.


Want to Contribute?
----------------------------
I started this project just out of curosity. But if you find it intereseting and wanna collaborate to work on it,
drop me an email [here](mailto://sendtoashishchopra@gmail.com)

License
----------------
I am not able to decide what License to put. 
But for now It is licensed under BSD License.

