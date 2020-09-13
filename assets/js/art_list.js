$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

    function padZero(n) {
        if (n < 10) {
            return '0' + n
        } else {
            return n
        }
    }
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = dt.getMonth() + 1
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }






    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }


    initCate()
    initTable()


    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {

                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                var str = template('tpl-list', res)
                $('tbody').html(str)
                renderPage(res.total)
            }
        })
    }

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取数据失败')
                }
                var str = template('tpl-table', res)
                $('[name=cate_id]').html(str)
                form.render()
            }
        })
    }


    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            jump: function (obj, first) {
                q.pagenum = obj.curr
                if (!first) {
                    initTable()
                }
            }

        })
    }
})