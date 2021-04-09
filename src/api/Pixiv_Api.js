import { Pixiv_request } from './request'

export function Get_pixiv_search() {
    return Pixiv_request({
        url: '/Pixiv_api/search?word=FGO 5000users入り&page=1'
    })
}
export function Get_pixiv_rank_test(type, mode, page, no_page,date="") {
    let url_
    let page_
    no_page ? page_ = "" : page_ = "&page=" + page
    switch (type) {
        case "rank":
            //排行榜 day week ...
            url_ = "/Pixiv_api/rank?mode=" + mode+"&date="+date + page_
            break;
        case "search":
            //搜索
            url_="/Pixiv_api/search?word="+mode+page_
            // url_ = "https://hibiapi.getloli.com/api/pixiv/?type=search&word=" + mode + page_
            break;
        case "member_illust":
            //画师画作
            url_ = "/Pixiv_api/member_illust?id=" + mode + page_
            break;
        case "illust":
            // 画作详情
            url_ = "/Pixiv_api/illust?id=" + mode
            break;
        case "related":
            // 相关画作
            url_ = "https://hibiapi.getloli.com/api/pixiv/?type=related&id=" + mode + page_
            break;
        case "member":
            // 画师信息
            url_ = "https://hibiapi.getloli.com/api/pixiv/?type=member&id=" + mode
            break;
        case "favorite":
            //用户收藏
            url_ = "https://hibiapi.getloli.com/api/pixiv/?type=favorite&id=" + mode + "&max_bookmark_id=0"
            break;
        case "tags":
            url_="https://hibiapi.getloli.com/api/pixiv/?type=tags"
            break;            

    }
    console.log(url_)
    return Pixiv_request({
        url: url_
    })
}