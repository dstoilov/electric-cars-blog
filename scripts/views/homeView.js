class HomeView {
    constructor(wrapperSelector, mainContentSelector) {
        this._wrapperSelector = wrapperSelector;
        this._mainContentSelector = mainContentSelector;
    }

    showGuestPage(mainData) {
        let _that = this

        $.get('templates/welcome-guest.html', function(template) {
            let renderedWrapper = Mustache.render(template, null)

            $(_that._wrapperSelector).html(renderedWrapper)

            $.get('templates/posts.html', function(template) {
                let blogPosts = {
                    blogPosts: mainData
                }
                let renderedPosts = Mustache.render(template, blogPosts)
                $('.articles').html(renderedPosts)
                // Read More/Less functionality
                $('.content').readmore({
                    speed: 100,
                    lessLink: '<a href="#">Read less</a>',
                    moreLink: '<a href="#">Read More...</a>',
                });
            })

        })


    }

    showUserPage(mainData) {
        let _that = this

        $.get('templates/welcome-user.html', function(template) {
            let renderedWrapper = Mustache.render(template, null)

            $(_that._wrapperSelector).html(renderedWrapper)


            $.get('templates/posts.html', function(template) {
                let blogPosts = {
                    blogPosts: mainData
                }
                let renderedPosts = Mustache.render(template, blogPosts)
                $('.articles').html(renderedPosts)
                // Read More/Less functionality
                $('.content').readmore({
                    speed: 100,
                    lessLink: '<a href="#">Read less</a>',
                    moreLink: '<a href="#">Read More</a>',
                });
            })

        })

    }
}
