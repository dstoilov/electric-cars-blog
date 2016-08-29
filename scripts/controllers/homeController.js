class HomeController{
    constructor(homeView, requester, baseServiceUrl,appKey){
        this._homeView=homeView;
        this._requester=requester;
        this._appKey=appKey;
        this._baseServiceUrl=baseServiceUrl;
    }
    showGuestPage(){
        let _that=this;
        let requestUrl=this._baseServiceUrl+"/appdata/"+this._appKey+"/posts";

        this._requester.get(requestUrl,
            function success(data){
                    data.sort(function(elem1, elem2){
                    let date1=new Date(elem1._kmd.ect)
                    let date2=new Date(elem2._kmd.ect)
                    return date2-date1;
                })

                let currentId=1

                _that._homeView.showGuestPage(data)



            },
            function error(data){
                showPopup('error',"Error loading posts!")
            }
        )

    }
    showUserPage(){
        let _that=this
        let requestUrl=this._baseServiceUrl+"/appdata/"+this._appKey+"/posts"

        this._requester.get(requestUrl,
            function success(data){

                data.sort(function(elem1, elem2){
                    let date1=new Date(elem1._kmd.ect)
                    let date2=new Date(elem2._kmd.ect)
                    return date2-date1
                })

                let currentId=1

                _that._homeView.showUserPage(data)


            },
            function error(data){
                showPopup('error','Error loading posts!')
            }
        )

    }


}
