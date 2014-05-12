Slate.js
--------------------

Slate.js is a web framework written in JavaScript to develop modular HTML5 applications. The most of the design decisions are based on my own personal experience with designing [Single-Page Web Applications](http://en.wikipedia.org/wiki/Single-page_application). If you don't know what are Single Page Web apps, then have a look at your Gmail account or Google Maps page). I also took some polished suggestions and improvements from Nicolas Zakas' research on developing [Sacalable JavaScript Architecture](https://www.youtube.com/watch?v=vXjVFPosQHw) web application framework in javaScript.


Current Release
----------------------------

The branch that you are looking at is a `master` branch. It is the active development branch from which you can create a nightly builds. For stable release, checkout the branch with name `release-v<version-number>` (eg: `release-v0.1.0` or `release-v0.1.1` etc) and build it. You can also see the release note for the version in [Wiki](https://github.com/ashish-chopra/slatejs/wiki).

`release-v-0.1.0` is the **vanilla hackathon 2014** release version. If you are interested to hack it from there on, then its all yours!!!

The sample demo is also hosted [here](https://dl.dropboxusercontent.com/u/88867846/Slatejs/demo/index.html).


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

API Documentation
-------------------------

In order to use this framework, you must be well equipped with the APIs first. Please find a detailed description as a quick-start tutorial to get you started:

#### 1. Modules
Any module is represented by a creator function along with moduleId registered with the application core as given:

     Core.register("sample-module", function(sb) {
        
        // module level tasks are performed here
        // for detailed infromation on module, 
        // check out the samples in the code.
        
        return {
            init : function() {},
            destroy : function() {}
        };
        
     });

Each module has a `moduleId` given as first parameter to `Core.register()` method; and seconf parameter is the `creator` function that creates the module. Each creator function must have `init()` and `destroy()` public methods to manage the module's lifecycle. Each creator method takes the `sandbox` object as input parameter, which is provided by Core.

#### 2. Sandbox
A sandbox is implemented as class, which can be instantiated as,

     var sb = new Sandbox(Core);
     
A sandbox object takes `Core` as an input to initialise the sandbox. Sandbox provides following public APIs, which modules can call to:

1. sb.find(selector, context)
2. sb.bind(element, event, fn)
3. sb.unbind(element, event, fn)
4. sb.notify(topic, data)
5. sb.listen(topic, fn, context)
6. sb.ignore(topic)
6. sb.trim(str)
7. sb.tmpl(template, data)
8. sb.request(options)

#### 3. Core
Application core provided management functions to manage the lifecycle of modules, carrying out communication among them and connecting with server etc.

1. Core.register(moduleId, creator)
2. Core.start(moduleId)
3. Core.startAll()
4. Core.stop(moduleId)
5. Core.stopAll()
6. Core.boot()
7. Core.dom.query(selector, context)
8. Core.request(options)
9. Core.ignore(topic)
10. Core.publish(topic, data)
11. Core.listen(topic, fn, context)


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

