import { Pixiv_request } from './request'

export function Get_pixiv_api (type, mode, page, no_page, date = "") {
    let url_
    let page_
    no_page ? page_ = "" : page_ = "&page=" + page
    switch (type) {
        case "rank":
            //排行榜 day week ...
            url_ = "/Pixiv_api/rank?mode=" + mode + "&date=" + date + page_
            break;
        case "search":
            //搜索
            url_ = "/Pixiv_api/search?popular_preview=true&word=" + mode + page_
            // url_ = "https://hibiapi.getloli.com/api/pixiv/?type=search&word=" + mode + page_
            break;
        case "search_user":
            //搜索
            url_ = "/Pixiv_api/search_user?word=" + mode + page_
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
            url_ = "/Pixiv_api/related?id=" + mode + page_
            break;
        case "member":
            // 画师信息
            url_ = "/Pixiv_api/member?id=" + mode
            break;
        case "favorite":
            //用户收藏
            url_ = "/Pixiv_api/favorite?id=" + mode
            break;
        case "following":
            //用户关注
            url_ = "/Pixiv_api/following?id=" + mode
            break;
        case "tags":
            url_ = "/Pixiv_api/tags?type=" + mode
            break;
        //推荐
        case "recommended":
            url_ = "/Pixiv_api/recommended?mode=" + mode
            break;
        //评论
        case "comments":
            url_ = "/Pixiv_api/comments?id=" + mode
            break;
        //tag补全
        case "autocomplete":
            url_ = "/Pixiv_api/autocomplete?word=" + mode
            break;
        case "live":
            url_ = "/Pixiv_api/live"
            break;
    }
    console.log(url_)
    return Pixiv_request({
        url: url_
    })
}