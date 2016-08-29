(function() {

    // Create your own kinvey application

    let baseUrl = "https://baas.kinvey.com";
    let appKey = "kid_rJOyY6eY"; // Place your appKey from Kinvey here...
    let appSecret = "fb7145fef3dd4362a3ad0ae6d1574435"; // Place your appSecret from Kinvey here...
    var _guestCredentials = "392cb128-9cef-4f71-ab59-13df16bd2d22.eyxU/TXtdBx4OTpXOR5w0tPIyMP+s60sCi4KZmR4pXw="; // Create a guest user using PostMan/RESTClient/Fiddler and place his authtoken here...

    //Create AuthorizationService and Requester

    let selector = ".wrapper";
    let mainContentSelector = ".main-content";

    let authService = new AuthorizationService(baseUrl,
        appKey,
        appSecret,
        _guestCredentials
    )
    authService.initAuthorizationType("Kinvey")
    let requester = new Requester(authService)

    // Create HomeView, HomeController, UserView, UserController, PostView and PostController

    let homeView = new HomeView(selector, mainContentSelector)
    let homeController = new HomeController(homeView, requester, baseUrl, appKey)

    let userView = new UserView(selector, mainContentSelector)
    let userController = new UserController(userView, requester, baseUrl, appKey)

    let postView = new PostView(selector, mainContentSelector)
    let postController = new PostController(postView, requester, baseUrl, appKey)

    //homeController.showUserPage() //test view
    //userController.showRegisterPage() //test view
    //postController.showCreatePostPage() //test view

    initEventServices();

    onRoute("#/", function() {
        // Check if user is logged in and if its not show the guest page, otherwise show the user page...
        if (!authService.isLoggedIn()) {
            homeController.showGuestPage()
        } else {
            homeController.showUserPage()
        }
    });

    onRoute("#/post-:id", function() {
        // Create a redirect to one of the recent posts...
        let top = $("#post-" + this.params['id']).position().top
        $(window).scrollTop(top)
    });

    onRoute("#/login", function() {
        // Show the login page...
        userController.showLoginPage(authService.isLoggedIn())
    });

    onRoute("#/register", function() {
        // Show the register page...
        userController.showRegisterPage(authService.isLoggedIn())
    });

    onRoute("#/logout", function() {
        // Logout the current user...
        userController.logout()
    });

    onRoute('#/posts/create', function() {
        // Show the new post page...
        let data = {
            fullName: sessionStorage['fullName']
        }
        postController.showCreatePostPage(data, authService.isLoggedIn())
    });

    bindEventHandler('login', function(ev, data) {
        // Login the user...
        userController.login(data)
    });

    bindEventHandler('register', function(ev, data) {
        // Register a new user...
        userController.register(data)
    });

    bindEventHandler('createPost', function(ev, data) {
        // Create a new post...
        postController.createPost(data)
    });

    run('#/');

})();
